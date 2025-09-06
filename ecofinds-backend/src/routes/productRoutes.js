const router = require('express').Router();
const auth = require('../middleware/auth');
const pc = require('../controllers/productController');

router.get('/', pc.list);
router.get('/mine', auth, pc.mine);
router.get('/:id', pc.getOne);
router.post('/', auth, pc.create);
router.put('/:id', auth, pc.update);
router.delete('/:id', auth, pc.remove);

module.exports = router;
