'use strict';

import {Observable} from 'rxjs';
import {Blow, HttpServer, RouteBuilder, Collection, handlers, security} from 'blow-server';

import {settings as dbSettings} from './settings/database';
import {settings as httpSettings} from './settings/http';
import {settings as authSettings} from './settings/auth';
import {settings as pluginsSettings} from './settings/plugins';


const settings = {};

if (dbSettings) {
  Object.assign(settings, { connections: dbSettings });
}
if (httpSettings) {
  Object.assign(settings, { http: httpSettings });
}
if (authSettings) {
  Object.assign(settings, { auth: authSettings });
}

export {security};
export const server: Blow = Blow.create(settings);
export const http: HttpServer = server.http;
export const config = (path: string) => server.get(path);
export const createRoute: (path: string) => RouteBuilder = http.route.bind(http);
export const getCollection: <T>(collectionName: string, connection?: string) => Collection<T>
  = server.dataService.collection.bind(server.dataService);

if (pluginsSettings.requestId) {
  http.use(handlers.requestId());
}

if (pluginsSettings.cors) {
  http.use(handlers.cors());
}

if (authSettings.enabled) {
  let excludeRoutesRule;
  if (authSettings.excludeRoutesRule) {
    excludeRoutesRule = context => {
      return !authSettings.excludeRoutesRule(context);
    };
  }
  http.use(handlers.jwt(authSettings), excludeRoutesRule);
}

http.errors$.subscribe(error => {
  console.log(error);
})