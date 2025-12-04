const { signup, login } = require('../middleware/serverside');
const { signup2, login2 } = require('../controller/controller');
const {forget}=require('../controller/controller')
const {verify}=require('../controller/controller')
const {reset}=require('../controller/controller')
const {filter,search}=require('../controller/dbfilter')
const add2cart = require('../controller/cart');
const getCart = require('../controller/getCart'); 


const router = require('express').Router();

router.post('/login', login, login2);
router.post('/signup',signup2);
router.post('/forget',forget)
router.post('/verify',verify)
router.post('/reset',reset)
router.post('/filter',filter)
router.post('/search',search)
router.post('/cart', getCart);
router.post('/add2cart', add2cart);

module.exports = router;


