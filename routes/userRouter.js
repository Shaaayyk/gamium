const { Router } = require('express');
const { User } = require('../models');
const { hashPassword, genToken, checkPassword } = require('../services/auth');

const userRouter = Router();

const buildAuthResponse = (user) => {
  const userData = {
    username: user.username,
    id: user.id,
  };

  const token = genToken(userData);

  return {
    user: userData,
    token,
  };
};

userRouter.post('/register', async (req, res) => {
  try {
    const password_digest = await hashPassword(req.body.password);
    const { username } = req.body;

    const user = await User.create({
      username,
      password_digest,
    });

    const respData = buildAuthResponse(user);

    res.json(respData);
  } catch (e) {
    next(e);
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (await checkPassword(req.body.password, user.password_digest)) {
      const respData = buildAuthResponse(user);

      res.json(respData);
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (e) {
    next(e);
  }
});

userRouter.get('/verify', restrict, (req, res) => {
  const user = res.locals.user;
  res.json(user);
})

module.exports = userRouter;
