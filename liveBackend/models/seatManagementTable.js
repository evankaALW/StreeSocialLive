const {DataTypes} = require("sequelize");
const seque = require('../config/db');
const clickerDeviceDetailsTable = require("./clickerDeviceDetailsTable");
const screenTable = require('./screenTable');


const seatManagementTable = seque.define('seatManagementTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    screenID:{
        type:DataTypes.INTEGER,
    },
    clickerID:{
        type:DataTypes.INTEGER,
    },
    cardID:{//not a fk
        type:DataTypes.BIGINT,
    },
    bookedSeat:{
        type:DataTypes.INTEGER,
    },
    changedSeat:{
        type:DataTypes.INTEGER,
    },
    sampleBooked:{
        type:DataTypes.TEXT('long'),
    }
},
{
  // options
  tableName: 'seatManagementTable' // specify the exact table name
});


seque.sync().then(() =>{
    console.log("seatManagementTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating seatManagementTable", error)
});


module.exports = seatManagementTable;
