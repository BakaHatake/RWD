const { signup, login } = require('../middleware/serverside');
const { signup2, login2 } = require('../controller/controller');
const router = require('express').Router();

router.post('/login', login, login2);
router.post('/signup',signup2);

module.exports = router;
