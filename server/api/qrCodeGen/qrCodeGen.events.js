/**
 * QrCodeGen model events
 */

'use strict';

import {EventEmitter} from 'events';
import QrCodeGen from './qrCodeGen.model';
var QrCodeGenEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QrCodeGenEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  QrCodeGen.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    QrCodeGenEvents.emit(event + ':' + doc._id, doc);
    QrCodeGenEvents.emit(event, doc);
  }
}

export default QrCodeGenEvents;
