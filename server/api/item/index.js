'use strict';

import {Router} from 'express';
import * as controller from './item.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
router.get('/', controller.index);
router.get('/:id', controller.show);
//TODO avoid using id to reach controllers
router.get('/:id/brands', controller.brands);
router.get('/:id/findOne', controller.findOne);
router.get('/:id/typeAhead', controller.typeAhead);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
