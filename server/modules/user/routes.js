const controller = require('./controller');
const middlewares = require('../shared/middlewares');
const validator = require('./validator');

const mount = router => {
  router.post(
    '/register',
    validator.registrationRules(),
    validator.registration,
    controller.register,
  );
  router.post('/login', controller.login);
  router.get('/profile', middlewares.authentication, controller.getUserProfile);

  return router;
};

module.exports = { mount };
