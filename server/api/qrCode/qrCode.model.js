'use strict';

import mongoose from 'mongoose';

var QrCodeSchema = new mongoose.Schema({
  userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
  url: String,
  format: String,
  el:String,
  pathToFile: String,
  dateGenerated:  { type: Date, default: Date.now },
  lastAccess: Date
});

export default mongoose.model('QrCode', QrCodeSchema);
