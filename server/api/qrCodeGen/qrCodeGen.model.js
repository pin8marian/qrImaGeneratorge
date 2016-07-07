'use strict';

import mongoose from 'mongoose';

var QrCodeGenSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('QrCodeGen', QrCodeGenSchema);
