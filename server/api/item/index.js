'use strict';

import {Router} from 'express';
import * as controller from './item.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
//TODO fix this shit, add validation by role and logged in
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/brands', auth.isAuthenticated(), controller.getBrands);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
