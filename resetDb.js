const { sequelize } = require('./models');

const main = async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit();
  }
}

main();