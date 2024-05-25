// middleware/authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = "loginSuccessfulStreeS";//add in .env file
const authenticate = (req, res, next) => {

  try{
    let token = req.headers.authorization;
    if(token){
      token = token.split(" ")[1];
      let user = jwt.verify(token,SECRET_KEY);
      req.userId = user.id;
    }
    else{
      res.status(401).json({message:"Unauthorized user"});
    }

    next();//postLoginDetails controller function

  }catch(error){
    console.log(error);
    res.status(401).json({"error":error});
  }
};

module.exports = authenticate;



//  // Check if username and loginPIN are present in the request body
//  if (!req.body.userName || !req.body.loginPIN) {
//   return res.status(400).json({ message: 'Username and loginPIN are required' });
// }

// // Assuming you have a secret key for JWT token generation
// const secretKey = 'LoginSuccess';

// // Mock authentication logic (Replace this with your actual authentication logic)
// // For example, you might want to verify the credentials against your database
// const { userName, loginPIN } = req.body;
// if (userName  && loginPIN ) {
//   // If credentials are valid, generate JWT token
//   const token = jwt.sign({ userName }, secretKey, { expiresIn: '1h' });
//   req.token = token; // Attach the token to request object for later use
//   next(); // Call next middleware
// } else {
//   return res.status(401).json({ message: 'Invalid username or loginPIN' });
// }