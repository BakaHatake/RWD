const { signup, login } = require('../middleware/serverside');
const { signup2, login2 } = require('../controller/controller');
const { forget, verify, reset } = require('../controller/controller');
const { filter, search } = require('../controller/dbfilter');
const { add2cart, returncart, deleteItem, removeQuantity } = require('../controller/cart');
const getCart = require('../controller/getCart');
const { getwallet, updatewallet } = require('../controller/wallet');

const router = require('express').Router();

router.post('/login', login, login2);
router.post('/signup', signup2);
router.post('/forget', forget);
router.post('/verify', verify);
router.post('/reset', reset);

router.post('/filter', filter);

router.get('/search', search);

router.get('/cart', getCart);
router.post('/add2cart', add2cart);
router.get('/returncart', returncart);
router.post('/delete-item', deleteItem);
router.post('/remove-quantity', removeQuantity);

router.post('/getwallet', getwallet);
router.post('/updatewallet', updatewallet);

module.exports = router;
