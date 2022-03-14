var express = require('express');
var router = express.Router();
const categoriasController = require('../controllers/categoriasController');

router.get('/', categoriasController.traerTodo);
router.post('/', categoriasController.crear);
router.delete('/:id', categoriasController.eliminar);

module.exports = router;
