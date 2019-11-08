const Sequelize = require('sequelize')


const sequelize = new Sequelize({
  database: 'games_db',
  dialect: 'postgres',
  define: {
    underscored: true
  }
});
class Games extends Sequelize.Model { }

Games.init({
  name: Sequelize.STRING,
  image_url: Sequelize.TEXT,
  description: Sequelize.TEXT,
  review: Sequelize.TEXT
}, {
  sequelize,
  modelName: 'game'
});

module.exports = {
  Games,
  sequelize
} 