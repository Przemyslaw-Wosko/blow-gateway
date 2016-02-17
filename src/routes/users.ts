import {createRoute} from '../server';
import * as users from '../services/data/users';

const usersRoute = createRoute('/users');

usersRoute
  .get(({response}) => {
    response.body = {
      hello: 'world'
    };
  })
  .post(({request, response}) => {
    return users.create(request.body)
      .do(user => response.body = user);
  });