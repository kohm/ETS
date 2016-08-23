'use strict';

import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import {Schema} from 'mongoose';

var ItemSchema = new Schema({
    age: Number,
    name: {
      type: String,
      required: true
    },
    barCode: String,
    brand: {
      type: String,
      required: true
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },

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
        supplierName: String,
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
      cost: {
        type: Number,
        min: 0
      },
      list: {
        type: Number,
        min: 0
      }
    },
    productNumber: Number,
    suppliers: [{type: Schema.Types.ObjectId, ref: 'Supplier', required: true}],
    tags: {
      type: [{type: String, lowercase: true, trim: true}],
      required: true
    }
    ,
    stock: [{
      depot: Number,
      local: Number,
      store: String
    }],
    active: Boolean
  },
  {
    timestamps: true
  }
  )
  ;

export default mongoose.model('Item', ItemSchema);
