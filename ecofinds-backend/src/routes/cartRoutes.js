const router = require('express').Router();
const auth = require('../middleware/auth');
const cc = require('../controllers/cartController');

router.get('/', auth, cc.getCart);
router.post('/add', auth, cc.addToCart);
router.delete('/remove/:productId', auth, cc.removeFromCart);
router.post('/checkout', auth, cc.checkout);

module.exports = router;
