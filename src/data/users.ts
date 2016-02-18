import {Observable} from 'rxjs';
import {Collection} from 'blow-server';
import {getCollection} from '../server';

export class UserRaw {
  public email: string;
  public password: string;
  public name: string;
}

const collection: Collection<UserRaw> = getCollection<UserRaw>('users');

export class UserModel {

  static create(data: UserRaw): Observable<UserRaw> {
    return collection.save(data);
  }

  static find(): Observable<UserRaw> {
    return collection.find();
  }
}
