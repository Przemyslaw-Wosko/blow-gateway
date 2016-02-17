import {Observable} from 'rxjs';
import {createCollection} from '../server';

export class UserRaw {
  public email: string;
  public password: string;
  public name: string;
}

const usersCollection = createCollection<UserRaw>('users');

export function create(data: UserRaw): Observable<UserRaw> {
  return usersCollection.save(data);
}