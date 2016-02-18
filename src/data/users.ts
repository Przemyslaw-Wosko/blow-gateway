import {Observable} from 'rxjs';
import {Collection, Query} from 'blow-server';
import {Validator, ValidationResult} from 'blow-validate';
import {getCollection} from '../server';

export class UserRaw {
  public email: string;
  public password: string;
  public name: string;
}

const collection: Collection<UserRaw> = getCollection<UserRaw>('users');

const newUserValidator = Validator.create({
  email: {
    string: true,
    email: true,
    uniqueEmail: function(property) {
      const value = this[property];
      const query = Query.create().equal('email', value);
      return collection.count(query)
        .filter(count => count > 1)
        .mapTo({
          path: property,
          type: 'uniqueEmail',
          message: `Email "${value}" is already in use.`
        });
    }
  }
});

export class UserModel {

  static create(data: UserRaw): Observable<UserRaw | ValidationResult> {
    return newUserValidator.validate(data)
      .mergeMap(result => {
        if (result.isValid) {
          return collection.save(data);
        } else {
          return Observable.of(result);
        }
      });
  }

  static find(): Observable<UserRaw> {
    return collection.find();
  }
}
