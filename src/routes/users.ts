import {createRoute} from '../server';
import {UserModel} from '../data/users';
import {removeProperties, setResponse} from '../utils/object';

const hideProperties = removeProperties(['password']);

createRoute('/users')

  // all users list
  .get(({response}) => {
    return UserModel.find()
      .map(hideProperties)
      .toArray()
      .do(setResponse(response));
  })

  // create new user
  .post(({request, response}) => {
    return UserModel.create(request.body)
      .map(hideProperties)
      .do(setResponse(response));
  });

createRoute('/users/:id')

  // user details
  .get(({request, response}) => {
    return UserModel.get(request.params['id'])
      .map(hideProperties)
      .do(setResponse(response));
  });