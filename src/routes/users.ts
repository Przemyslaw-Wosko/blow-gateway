import {createRoute} from '../server';
import {UserModel} from '../data/users';
import {removeProperties} from '../utils';

export class UserRaw {
  public email: string;
  public password: string;
  public name: string;
}

const hideProperties = removeProperties(['password']);

createRoute('/users')
  .get(({response}) => {
    return UserModel.find()
      .map(hideProperties)
      .toArray()
      .do(users => response.body = users);
  })
  .post(({request, response}) => {
    return UserModel.create(request.body)
      .map(hideProperties)
      .do(user => response.body = user);
  });