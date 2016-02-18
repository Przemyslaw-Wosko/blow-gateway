'use strict';

// Import server
import {server} from './server';

// Import routes
import './routes/auth';
import './routes/files';
import './routes/users';

// Run server
server.run();
