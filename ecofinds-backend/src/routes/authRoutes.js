const router = require('express').Router();
const auth = require('../middleware/auth');
const { register, login, me, updateProfile, getPurchases } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);
router.put('/me', auth, updateProfile);
router.get('/purchases', auth, getPurchases);

module.exports = router;
