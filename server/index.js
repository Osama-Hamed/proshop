const express = require('express');
require('express-async-errors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { router } = require('./router');
const { errorHandler } = require('./modules/shared/middlewares');
const { NotFoundError } = require('./modules/shared/errors');

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
router(app);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

(async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('===== Connected to database successfuly =====');
  } catch (err) {
    console.error(err);
  }
})();

app.listen(PORT, () => {
  console.log(`===== Listening on port ${PORT} in ${NODE_ENV} mode =====`);
});
