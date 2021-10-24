var express = require('express');
var router = express.Router();
const controller = require('../controller/mainController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/addUser',controller.createUser)
router.post('/api/addAdmin',controller.createAdmin)
router.post('/api/selfAssessment',controller.addRecord)
router.post('/api/updateResult',controller.updateResult)
router.post('/api/zones',controller.zoneData)
module.exports = router;
