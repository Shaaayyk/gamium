const { Router } = require('express');
const { Review, Game } = require('../models.js');
const { restrict } = require('../services/auth');
const reviewRouter = Router({ mergeParams: true })

reviewRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const gameId = req.params.gameId
      const reviews = await Review.findAll({ include: ['game', 'user'] }, {
        where: {
          gameId
        }
      });
      res.json(reviews);
    } catch (e) {
      next(e)
    }
  })
  .post(restrict, async (req, res, next) => {
    try {
      console.log(req.params.gameId)
      const review = await Review.create({
        ...req.body,
        gameId: req.params.gameId,
        userId: res.locals.user.id
      });
      res.json(review);
    } catch (e) {
      next(e)
    }
  })

reviewRouter.route('/:id')
  .get(async (req, res, next) => {
    try {
      const review = await Review.findByPk(req.params.id);
      res.json(review);
    } catch (e) {
      next(e)
    }
  })
  .put(restrict, async (req, res, next) => {
    try {
      const review = await Review.findByPk(req.params.id);
      await review.update(req.body)
      res.json(review)
    } catch (e) {
      next(e)
    }
  })
  .delete(restrict, async (req, res, next) => {
    try {
      const review = await Review.destroy({ where: { id: req.params.id } })
      res.json(review)
    } catch (e) {
      next(e)
    }
  })

module.exports = reviewRouter;