const { Router } = require('express');
const gameRouter = Router();
const { Game } = require('../models.js');

// index
gameRouter.get('/', async (req, res) => {
  const games = await Game.findAll()
  res.json( games )
})

// show
gameRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const game = await Game.findByPk(id)
  res.json({ game })
})

module.exports = gameRouter;