var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// router.post('/', usuariosController.crear);
router.post('/iniciar', usuariosController.iniciar);
// router.delete('/:id', usuariosController.eliminar);

module.exports = router;
