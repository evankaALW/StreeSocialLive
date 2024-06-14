const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Assuming you have a database configuration file
const userTable = require('../models/userTable');

const postLoginData ={
    postLogin: async (req, res,next) => {
  const { cardID, loginPIN } = req.body;
  try {
    // const query = `SELECT * FROM userTable WHERE cardID = ${cardID} AND loginPIN = ${loginPIN}`;
    // const result = await connection.query(query);
    // const query = `SELECT * FROM userTable WHERE cardID = ? AND loginPIN = ?`;
    // const [result] = await connection.query(query, [cardID, loginPIN]);
    const result = await userTable.findOne({ where: { cardID, loginPIN } });
    if(result){
        console.log(JSON.stringify(result, null, 2))

          const token = jwt.sign({ userID: result.id ,  role: 'user' }, 'kCu83ALWzcE04HAUTHepj', { expiresIn: '1h' });
          return res.status(200).json({ "result":`{${token}}, {${JSON.stringify(result, null, 2)}}` });
        //return res.status(200).json({ "result":result});
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