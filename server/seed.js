const { User } = require('./models');

async function testUsers() {
  await User.destroy({
    where: {

    },
  });
  await User.bulkCreate([
    {
      user_name: 'user_name',
      password: '$2b$12$UXi32xClgX6aB3wbnj0ydu4KYDQ/3RiirGaaHWLhjnERk5.IGeITe',
    },
    {
      user_name: 'test',
      password: '$2b$12$lkkrpdxCR0aObyoctbw8heY.zxtVoZj0I6mfrprezNiNYOuvdF79a',
    },
  ]);
}

async function run() {
  try {
    await testUsers();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

run();
