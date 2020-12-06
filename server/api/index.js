const { Router } = require('express');
const router = Router();

router.use('/pastes', require('./pastes'));
router.use('/search', require('./search'));


module.exports = router;
