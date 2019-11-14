const { Router } = require('express');
const gameRouter = Router({ mergeParams: true });
const { Game } = require('../models.js');
const { restrict } = require('../services/auth');

gameRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const userId = req.params.userId
      const games = await Game.findAll({
        where: {
          userId
        }
      });
      res.json(games);
    } catch (e) {
      next(e)
    }
  })
  .post(restrict, async (req, res, next) => {
    try {
      const game = await Game.create({
        ...req.body,
        userId: res.locals.user.id
      });
      res.json(game);
    } catch (e) {
      next(e)
    }
  })

gameRouter.route('/:id')
  .get(async (req, res, next) => {
    try {
      const game = await Game.findByPk(req.params.id);
      res.json(game);
    } catch (e) {
      next(e)
    }
  })
  .put(restrict, async (req, res, next) => {
    try {
      const game = await Game.findByPk(req.params.id);
      await game.update(req.body)
      res.json(game)
    } catch (e) {
      next(e)
    }
  })
  .delete(restrict, async (req, res, next) => {
    try {
      const game = await Game.destroy({ where: { id: req.params.id } })
      res.json(game)
    } catch (e) {
      next(e)
    }
  })

module.exports = gameRouter;