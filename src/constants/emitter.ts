import {EventEmitter} from 'eventemitter3';

export const emitter = new EventEmitter();

export enum EventsList {
  IMPORT_COMPLETE = 'import_complete',
}
