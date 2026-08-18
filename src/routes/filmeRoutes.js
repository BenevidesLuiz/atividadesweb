const express = require('express');
const controller = require('../controllers/filmeController');
const exigeLogin = require('../middlewares/exigeLogin');
const router = express.Router();

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', exigeLogin, controller.criar);
router.put('/:id', exigeLogin, controller.atualizar);
router.delete('/:id', exigeLogin, controller.excluir);

module.exports = router;