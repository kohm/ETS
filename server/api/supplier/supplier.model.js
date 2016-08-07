'use strict';

import mongoose from 'mongoose';
var SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true
  },
  legalName: {
    type: String,
    lowercase: true,
    trim: true
  },
  taxId: {
    type: String,
    lowercase: true,
    trim: true
  },
  contactName: {
    type: String,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    lowercase: true,
    trim: true
  },
  phoneAlt: {
    type: String,
    lowercase: true,
    trim: true
  },
  fax: {
    type: String,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    lowercase: true,
    trim: true
  },
  country: {
    type: String,
    lowercase: true,
    trim: true
  },
  state: {
    type: String,
    lowercase: true,
    trim: true
  },
  city: {
    type: String,
    lowercase: true,
    trim: true
  }
});

export default mongoose.model('Supplier', SupplierSchema);
