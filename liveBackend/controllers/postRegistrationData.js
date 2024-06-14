const connection = require('../config/db');
const config = require('../config/config'); // Assuming you have a database configuration file
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const upload = multer({ dest: 'uploads/' });
const apiUrl = config.apiUrl || 'http://192.168.0.113:8012'; // Assuming you have this configured

const postRegistrationData = {
  postRegistration: [
    upload.single('photo'), // Middleware to handle single file upload
    async (req, res, next) => {
      const {
        userName,
        dateOfBirth,
        phoneNumber,
        emailID,
        cardID,
        address,
        pinCode,
        languageSpoken,
        loginPIN,
        brand,
        city,
        theatre,
        pinCodesForAllocation
      } = req.body;

      const photo = req.file; // Access the uploaded file
      let brandID;

      try {
        const queryOne = `SELECT id FROM brandTable WHERE brandName = '${brand}'`;
        const [brandIDJSON] = await connection.query(queryOne);
        brandID = brandIDJSON[0].id;

        const queryTwo = `SELECT * FROM userTable WHERE userName = '${userName}' OR emailID = '${emailID}' OR phoneNumber = ${phoneNumber};`;
        const [resultTwo] = await connection.query(queryTwo);

        if (resultTwo[0]) {
          return res.status(409).json({ error: "Cannot enter duplicate entry of User name, Phone Number or Email ID" });
        } else {
          let photoUrl = '';
          if (photo) {
            // Upload the image using axios
            try {
              const response = await axios.post(`${apiUrl}/uploads`, fs.createReadStream(photo.path), {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });

              photoUrl = response.data.url; // Get the URL of the uploaded image
            } catch (error) {
              console.error('Error uploading image to server:', error);
              return res.status(500).json({ error: 'Internal server error while uploading image.' });
            } finally {
              // Clean up the uploaded file from the local storage
              fs.unlinkSync(photo.path);
            }
          }

          if (brandID) {
            const queryThree = `INSERT INTO userTable (id, userName, dateOfBirth, phoneNumber, emailID, photo, cardID, address, city, pinCode, languageSpoken, loginPIN, brandID, theatreID, dateTime, isDeleted, createdAt, updatedAt)
              VALUES (null, '${userName}', '${dateOfBirth}', ${phoneNumber}, '${emailID}', '${photoUrl}', ${cardID}, '${address}', '${city}', ${pinCode}, '${languageSpoken}', '${loginPIN}', ${brandID}, 1, CONVERT_TZ(NOW(), '+00:00', '+05:30'), false, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

            const [result] = await connection.query(queryThree);
            const userId = result;

            if (userId) {
              const queryFour = `INSERT INTO walletTable (id, userID, value, dateAdded, updatedDateTime, createdAt, updatedAt)
                VALUES (NULL, ${userId}, 0, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

              const resultFour = await connection.query(queryFour);
              if (resultFour) {
                return res.status(200).json({ message: "Registration successful" });
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  ]
};

module.exports = postRegistrationData;
