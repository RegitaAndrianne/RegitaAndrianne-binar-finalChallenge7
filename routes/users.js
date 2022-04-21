var express = require('express');
var router = express.Router();
const { User } = require('../models')


router.get('/', async (_, res) => {
  const userData = await User.findAll();
  res.render('users', {
    users: userData
  })
});

router.get('/user/edit/:id', async (req, res) => {
  const userData = await User.findByPk(req.params.id)
  
  res.render('edit-user', {
    user: userData
  })
})

router.post('/user/update', async (req, res) => {
  await User.update({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }, {
    where: {
      id: +req.body.id
    }
  })
  res.redirect('/users')
})

router.get('/user/delete/:id', async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    }
  })
  res.redirect('/users')
})

module.exports = router;
