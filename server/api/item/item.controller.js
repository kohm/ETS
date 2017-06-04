/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/items              ->  index
 * POST    /api/items              ->  create
 * GET     /api/items/:id          ->  show
 * PUT     /api/items/:id          ->  update
 * DELETE  /api/items/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Item from './item.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Items
export function index(req, res) {
  return Item.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Bands Items
export function brands(req, res) {
  return Item.find().distinct('brand').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a info to fulfill typeAhead
// TODO Validation if tags is not exist or brand
export function typeAhead(req, res) {
  var typeAhead = [];
  return Item.find().distinct('tags').exec()
    .then((res)=> {
      typeAhead = res;
      return Item.find().distinct('brand').exec()
        .then((res) => {
          typeAhead.concat(res);
          return Item.find().distinct('name').exec().
            then((res) => {
              return typeAhead.concat(res);
          });
        })
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Item from the DB
export function findOne(req, res) {
  return Item.findOne().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Item from the DB
export function show(req, res) {
  return Item.findById(req.params.id)
    .populate('suppliers', 'name')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Item in the DB
export function create(req, res) {
  return Item.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Performs a smart search
export function smartFind(req, res) {
  console.log(req.params);
  //return Item.find({name: new RegExp('^'+ req.params.string +'$', "i")}).exec()
  return Item.find({
    '$or': [
      {"name": { "$regex": req.params.string, "$options": "i" } },
      {"tags": { "$regex": req.params.string, "$options": "i" } },
      {"brand": { "$regex": req.params.string, "$options": "i" } },
      {"productNumber": { "$regex": req.params.string, "$options": "i" } },
      {"barCode": { "$regex": req.params.string, "$options": "i" } }
    ]}).sort([['name', 1]]).limit(20).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));

}

// Updates an existing Item in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Item.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Item from the DB
export function destroy(req, res) {
  return Item.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
