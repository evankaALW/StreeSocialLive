const {DataTypes} = require("sequelize")
const seque = require('../config/db')


const walletTable = seque.define('walletTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userID:{
        type:DataTypes.INTEGER,
    },
    value:{
        type:DataTypes.DOUBLE,
    },
    dateAdded:{
        type:DataTypes.DATE,
    },
    updatedDateTime:{
        type:DataTypes.DATE,
      }
},
{
  // options
  tableName: 'walletTable' // specify the exact table name
});

seque.sync().then(() =>{
    console.log("walletTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating walletTable", error)
});


module.exports = walletTable;
