const {DataTypes} = require("sequelize")
const seque = require('../config/db')


const brandTable = seque.define('brandTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    brandName:{
        type:DataTypes.STRING,
       
    },
    brandLogo:{
        type:DataTypes.STRING,
        
    },
    contactName:{
        type:DataTypes.STRING,
    },
    contactPhone:{
        type:DataTypes.BIGINT,
        allowNull:true,
        defaultValue:0,
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
