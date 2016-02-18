import {Observable} from 'rxjs';
import {Collection, Query} from 'blow-server';
import {Validator, ValidationResult, ValidationError} from 'blow-validate';
import {getCollection} from '../server';
import {sign} from '../utils/jwt';
import {ifValid, isTrue} from '../utils/rx';
import {copyProperties, setProperty} from '../utils/object';
import {
  hash as hashPassword,
  compare as comparePasswords
} from '../utils/bcrypt';

export class UserRaw {
  public _id: string;
  public email: string;
  public password: string;
  public name: string;
}

const collection: Collection<UserRaw> = getCollection<UserRaw>('users');

const newUserValidator = Validator.create({
  email: {
    string: true,
    required: true,
    email: true,
    uniqueEmail: function(property) {
      const value = this[property];
      const query = Query.create().equal('email', value);
      return collection.count(query)
        .filter(count => count > 0)
        .mapTo({
          path: property,
          type: 'uniqueEmail',
          message: `Email "${value}" is already in use.`
        });
    }
  },
  password: {
    string: true,
    required: true,
    min: 8
  }
});

const loginUserValidator = Validator.create({
  email: {
    string: true,
    required: true,
    email: true
  },
  password: {
    string: true,
    required: true
  }
});

const validationCustomResults = {
  invalidEmailOrPassword: ValidationResult.create().addError(
    ValidationError.create({ type: 'invalidEmailOrPassword', message: 'Invalid email or password.' })
  )
};


export class UserModel {

  static create(data: UserRaw): Observable<UserRaw | ValidationResult> {
    const save = hashPassword(data.password)
      .map(setProperty('password')(data))
      .mergeMap(collection.save.bind(collection));

    return newUserValidator.validate(data)
      .mergeMap(ifValid(save));
  }

  static find(query?: Query): Observable<UserRaw> {
    return collection.find(query);
  }

  static findByEmail(email: string): Observable<UserRaw> {
    const query = Query.create().equal('email', email);
    return collection.find(query);
  }

  static login(email: string, password: string) {
    const checkPassword = user => comparePasswords(password, user.password)
      .filter(isTrue)
      .mapTo(user);

    const authorize = user => checkPassword(user)
      .mergeMap(this.createToken);

    const find = this.findByEmail(email)
      .mergeMap(authorize)
      .defaultIfEmpty(validationCustomResults.invalidEmailOrPassword);

    return loginUserValidator.validate({ email, password })
      .mergeMap(ifValid(find));
  }

  static createToken(user) {
    const payload = copyProperties(['_id', 'email', 'name'])({})(user);
    return sign(payload).map(token => ({ token }));
  }
}
