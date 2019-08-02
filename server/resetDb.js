/* eslint-disable no-console */
const { sequelize } = require('./models');

async function resetDb() {
  try {
    await sequelize.sync({ force: true });
    console.log('database sync\'d');
  } catch (e) {
    console.error(e);
  } finally {
    process.exit();
  }
}

async function retry() {
  console.log('I am from the inside of the retry function');
  let retries = 5;
  while (retries) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await resetDb();
    } catch (e) {
      console.log(e, 'sdf;alksjdfkjf');
      retries -= 1;
      // eslint-disable-next-line no-await-in-loop
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

retry();
