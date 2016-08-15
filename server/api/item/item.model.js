'use strict';

import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import {Schema} from 'mongoose';

var ItemSchema = new Schema({
    age: Number,
    name: String,
    barCode: String,
    brand: String,
    description: {type: String, lowercase: true, trim: true},
    gender: {
      female: {type: Boolean, default: true},
      male: {type: Boolean, default: true}
    },
    history: [{
      purchase: [{
        amount: Number,
        date: {type: Date, default: Date.now},
        price: {
          cost: Number
        },
        providerName: String,
        sellerName: String,
        storeName: String
      }],
      sale: [{
        amount: Number,
        date: {type: Date, default: Date.now},
        price: {
          cost: String,
          list: String
        },
        storeName: String
      }]
    }],
    photo: String,
    price: {
      cost: String,
      list: String
    },
    providers: String,
    tags: [{type: String, lowercase: true, trim: true}],
    stock: [{
      depot: Number,
      local: Number,
      store: String
    }],
    active: Boolean
  },
  {
    timestamps: true
  });

export default mongoose.model('Item', ItemSchema);
