const { signup, login } = require('../middleware/serverside');
const { signup2, login2 } = require('../controller/controller');
const {forget}=require('../controller/controller')
const {verify}=require('../controller/controller')
const {reset}=require('../controller/controller')
const {filter}=require('../controller/dbfilter')
const router = require('express').Router();

router.post('/login', login, login2);
router.post('/signup',signup2);
router.post('/forget',forget)
router.post('/verify',verify)
router.post('/reset',reset)
router.post('/filter',filter)
module.exports = router;


