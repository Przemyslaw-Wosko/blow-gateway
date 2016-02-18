import {Observable} from 'rxjs';
import {Validator, ValidationResult, ValidationError} from 'blow-validate';
import {Collection, Query} from 'blow-server';
import {getCollection} from '../server';
import {UserModel} from './users';

export interface GroupRaw {
  _id?: string;
  name: string;
}

const collectionGroups: Collection<GroupRaw> = getCollection<GroupRaw>('groups');

export class GroupModel implements GroupRaw {

  public _id: string;
  public name: string;

  constructor({_id, name}: GroupRaw) {
    this._id = _id;
    this.name = name;
  }

  addUser(user: UserModel) {

  }

  static create(data: GroupRaw): Observable<GroupRaw | ValidationResult> {
    return collectionGroups.save(data);
  }
}