'use strict';

import mongoose from 'mongoose';
//TODO ADD MORE FIELDS AND VALIDATIONS
var SupplierSchema = new mongoose.Schema({
  name: String,
  legalName: String,
  taxId: String,
  contactName: String,
  email: String,
  phone: String,
  phoneAlt: String,
  fax: String,
  address: String,
  country: String,
  state: String,
  city: String
});

export default mongoose.model('Supplier', SupplierSchema);
