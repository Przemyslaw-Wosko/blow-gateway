import {Observable} from 'rxjs';
import {security} from '../server';

export function hash(password: string): Observable<string> {
  return security.bcrypt.hash(password, null, null);
}

export function compare(password: string, encryptedPassword: string): Observable<string> {
  return security.bcrypt.compare(password, encryptedPassword);
}