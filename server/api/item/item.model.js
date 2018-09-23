'use strict';

import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');
import {Schema} from 'mongoose';

var ItemSchema = new Schema({
    age: {
      max: {
        type: Number,
        default: 1200,
        min: 0,
        max: 1200
      },
      min: {
        type: Number,
        default: 0,
        min: 0,
        max: 1200
      }
    },
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
    photo: [String],
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
    productPresentation: {
      internalCode: String,
      amountPerPackage: {type: Number, default: 1},
      description: String
    },
    productNumber: String,
    suppliers: [{type: Schema.Types.ObjectId, ref: 'Supplier', required: true}],
    tags: {
      type: [{type: String, lowercase: true, trim: true}],
      required: true
    },
    stock: {
      type: Array,
      default: {
        depot: 0,
        local: 0,
        store: String
      }
    },
    active: Boolean
  },
  {
    timestamps: true
  }
);
ItemSchema
  .pre('save', function (next) {
    console.log(this);
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    if (this.age.min > this.age.max) {
      return next(new Error('Las edades mínima y máxima no concuerdan'));
    } else {
      return next();
    }
  });

export default mongoose.model('Item', ItemSchema);
