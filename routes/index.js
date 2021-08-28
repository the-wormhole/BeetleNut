const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/',homeController.home);

router.post('/shipment/create',homeController.create);

router.get('/tracking/:id',homeController.track);

router.get('/tracking/excel/:id',homeController.print);
module.exports = router;