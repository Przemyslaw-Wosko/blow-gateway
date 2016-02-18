import {createRoute} from '../server';
import {UserModel} from '../data/users';
import {setResponse} from '../utils/object';

createRoute('/auth')

  // Login user
  .post(({request, response}) => {
    return UserModel.login(request.body.email, request.body.password)
      .do(setResponse(response));
  })

  // Renew token
  .put(({response, user}) => {
    return UserModel.createToken(user)
      .do(setResponse(response));
  });