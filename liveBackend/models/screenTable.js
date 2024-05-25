const {DataTypes} = require("sequelize")
const seque = require('../config/db')
const theatreTable = require('./theatreTable')

const screenTable = seque.define('screenTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    theatreID:{
        type:DataTypes.INTEGER,
    },
    seatingCapacity:{
        type:DataTypes.INTEGER,
    },
    screenDescription:{
        type:DataTypes.TEXT('long'),
    },
    screenNo:{
        type:DataTypes.INTEGER,
    },
    dateAndTime:{
        type:DataTypes.STRING,
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
      }
},
{
  // options
  tableName: 'screenTable' // specify the exact table name
});


seque.sync().then(() =>{
    console.log("screenTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating screenTable", error)
});


module.exports = screenTable;
