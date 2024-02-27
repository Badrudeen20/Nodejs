const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await prisma.user.findUnique({  where: {
      email:email,
      password:password
    }})
    // create a token
    const token = createToken(user.id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password,username} = req.body
  
  try {
    const user = await prisma.User.create({
      data: {
        username:username,
        email: email,
        password: password,
      },
    })
    // create a token
    const token = createToken(user.id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }