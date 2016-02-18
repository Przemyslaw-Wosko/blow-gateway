import {Observable} from 'rxjs';
import {writeFile as writeFile_} from 'fs';

export const writeFile = Observable.bindNodeCallback(writeFile_);