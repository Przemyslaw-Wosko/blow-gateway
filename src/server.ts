'use strict';

import {Blow, HttpServer, RouteBuilder, Collection, handlers} from 'blow-server';

import {settings as dbSettings} from './settings/database';
import {settings as httpSettings} from './settings/http';
import {settings as pluginsSettings} from './settings/plugins';

const settings = {};

if (dbSettings) {
  Object.assign(settings, { connections: dbSettings });
}
if (httpSettings) {
  Object.assign(settings, { http: httpSettings });
}

export const server: Blow = Blow.create(settings);
export const http: HttpServer = server.http;
export const createRoute: (path: string) => RouteBuilder = http.route.bind(http);
export const createCollection: <T>(collectionName: string, connection?: string) => Collection<T>
  = server.dataService.collection.bind(server.dataService);

if (pluginsSettings.requestId) {
  http.use(handlers.requestId());
}

if (pluginsSettings.cors) {
  http.use(handlers.cors());
}
