const {DataTypes} = require("sequelize")
const seque = require('../config/db');
const screenTable = require('../models/screenTable');
const seatManagementTable = require('./seatManagementTable');

const clickerDeviceDetailsTable = seque.define('clickerDeviceDetailsTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    screenID:{
        type:DataTypes.INTEGER,
    },
    IPAddress:{
        type:DataTypes.STRING,
    },
    seatNo:{
        type:DataTypes.INTEGER,
    },
    isReplaced:{
        type:DataTypes.BOOLEAN,
      },
    dateTime:{
        type:DataTypes.DATE,
    },
    issueIfReplaced:{
        type:DataTypes.STRING,
    },
    macAddress:{
        type:DataTypes.STRING,
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
      }
},
{
  // options
  tableName: 'clickerDeviceDetailsTable' // specify the exact table name
});

seque.sync().then(() =>{
    console.log("clickerDeviceDetailsTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating clickerDeviceDetailsTable", error)
});


module.exports = clickerDeviceDetailsTable;
