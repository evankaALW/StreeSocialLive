const {DataTypes} = require("sequelize")
const seque = require('../config/db')
const screenTable = require('./screenTable')

const schedulerTable = seque.define('schedulerTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    city:{
        type:DataTypes.TEXT('medium'),
    },
    theatreID:{
        type:DataTypes.INTEGER,
    },
    screenID:{
        type:DataTypes.INTEGER,
    },
    premiereDate:{
        type:DataTypes.DATE,
    },
    premiereTime:{
        type:DataTypes.TIME,
    },
    slotIndex:{
        type:DataTypes.INTEGER,
    },
    videoLinks:{
        type:DataTypes.TEXT('long'),
    },
    movieID:{
        type:DataTypes.INTEGER,
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
      }
},
{
  // options
  tableName: 'schedulerTable' // specify the exact table name
});

schedulerTable.belongsTo(screenTable,{ foreignKey: 'screenID' , onUpdate: 'NO ACTION',onDelete: 'CASCADE'});


seque.sync().then(() =>{
    console.log("schedulerTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating schedulerTable", error)
});


module.exports = schedulerTable;
