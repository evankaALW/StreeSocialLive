const {DataTypes} = require("sequelize")
const seque = require('../config/db')

//id				emailID	permissions	theatreAssignedID	dateAdded
const brandTable = seque.define('brandTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    role:{
        type:DataTypes.STRING,
    },
    name:{
        type:DataTypes.STRING,
        
    },
    phoneNumber:{
        type:DataTypes.BIGINT,
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
      }
},
{
  // options
  tableName: 'brandTable' // specify the exact table name
});

seque.sync().then(() =>{
    console.log("brandTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating brandTable", error)
});


module.exports = brandTable;
