import {Observable} from 'rxjs';
import {security, config} from '../server';

export function sign(payload: Object): Observable<string> {
  return security.jwt.sign(payload, config('auth.secret'), config('auth.tokenTTL'));
}

export function verify(token: string): Observable<Object> {
  return security.jwt.verify(token, config('auth.secret'));
}