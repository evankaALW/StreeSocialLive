const {DataTypes} = require("sequelize")
const seque = require('../config/db');
const brandTable = require("./brandTable");
const questionTable = require('./questionTable')

const advertisementTable = seque.define('advertisementTable', {
    id:{//videoadid
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    adVideoLink:{
        type:DataTypes.TEXT('medium'),
    },
    adFileSize:{
        type:DataTypes.BIGINT,//DOUBLE
    },
    totalOptionNumber:{
        type:DataTypes.INTEGER,
    },
    questionTableID:{//fk
        type:DataTypes.INTEGER,
    },
    userResponseToggle:{
        type:DataTypes.INTEGER,
    },
    displayToggle:{
        type:DataTypes.INTEGER,
    },
    brandID:{
        type:DataTypes.INTEGER,
    },
    duration:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
    },
    adStartTime:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
    },
    isSample:{
        type:DataTypes.BOOLEAN,
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
      }
},
{
  tableName: 'advertisementTable'
});

advertisementTable.belongsTo(brandTable,  { foreignKey: 'brandID' , onUpdate: 'NO ACTION',onDelete: 'CASCADE'});
advertisementTable.belongsTo(questionTable, { foreignKey: 'questionTableID' , onUpdate: 'NO ACTION',onDelete: 'CASCADE'});

seque.sync().then(() =>{
    console.log("advertisementTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating advertisementTable", error)
});


module.exports = advertisementTable;
