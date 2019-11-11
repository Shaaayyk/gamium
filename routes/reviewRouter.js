const { Router } = require('express');
const reviewRouter = Router();
const { Review } = require('../models.js');
const { restrict } = require('../services/auth');

reviewRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findAll();
      res.json(reviews);
    } catch (e) {
      next(e)
    }
  })
  .post(restrict, async (req, res, next) => {
    try {
      const review = await Review.create({
        ...req.body,
        userId: res.locals.user.id,
        gameId: res.locals.game.id
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