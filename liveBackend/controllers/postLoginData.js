// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Assuming you have a database configuration file

const postLoginData ={
    postLogin: async (req, res,next) => {
  const { userName, loginPIN } = req.body;
  try {
    const query = `SELECT * FROM userTable WHERE userName = '${userName}' AND loginPIN = ${loginPIN}`;
    const [result] = await connection.query(query);
    if(result[0]){
        return res.status(200).json({ "result":result});
    }
    else {
      return res.status(404).json({ message: 'Login data not found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
  }};
  module.exports = postLoginData;