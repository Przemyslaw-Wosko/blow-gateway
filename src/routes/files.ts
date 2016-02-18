import {createRoute} from '../server';
import {writeFile} from '../utils/fs';
import {resolve, join} from 'path';
import {setResponse} from '../utils/object';
import {gzipSync} from 'zlib';

const StorageLocalPath = resolve(__dirname, '../../.tmp/');

createRoute('/files/:filename')

  // Save file
  .post(({request, response}) => {
    return writeFile(join(StorageLocalPath, request.params['filename']), request.body)
      .mapTo({
        filename: request.params['filename']
      })
      .do(setResponse(response));
  });