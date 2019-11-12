const express = require('express');
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes/userRouter.js');
const gameRouter = require('./routes/gameRouter.js');
const reviewRouter = require('./routes/reviewRouter.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const { Game } = require('./models.js')

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/auth/', userRouter);
app.use('/users/:userId/games', gameRouter);
app.use('/games/:gameId/reviews', reviewRouter);
app.get('/games', async (req, res) => {
  const games = await Game.findAll();
  res.json(games)
})
app.get('/games/:id', async (req, res) => {
  const game = await Game.findByPk(id);
  res.json(game)
})


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});