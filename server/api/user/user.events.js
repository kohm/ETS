/**
 * User model events
 */

'use strict';

import {EventEmitter} from 'events';
import User from './user.model';
var UserEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  User.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    console.log(doc);
    console.log('event emmited from USER');
    UserEvents.emit(event + ':' + doc._id, doc);
    UserEvents.emit(event, doc);
  }
}

export default UserEvents;
