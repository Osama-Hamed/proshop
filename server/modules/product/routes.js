const controller = require('./controller');

const mount = router => {
  router.get('/', controller.getProduct);
  router.get('/:id', controller.getProductById);

  return router;
};

module.exports = { mount };
