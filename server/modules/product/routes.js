const controller = require('./controller');

const mount = router => {
  router.get('/', controller.getProduct);

  return router;
};

module.exports = { mount };
