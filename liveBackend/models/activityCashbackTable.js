const {DataTypes} = require("sequelize")
const seque = require('../config/db')
const brandTable = require('./brandTable')

const activityCashbackTable = seque.define('activityCashbackTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    activityDetails:{
        type:DataTypes.TEXT('long'),
    },
    categoryDetails:{
        type:DataTypes.TEXT('long'),
    },
    cashBackImagesURL:{
        type:DataTypes.TEXT('long'),
    },
    cashbackAmount:{
        type:DataTypes.DOUBLE,
    },
    dateAndTime:{
        type:DataTypes.DATE,
    },
    activityType:{
        type:DataTypes.STRING,
    },
    categoryType:{
        type:DataTypes.STRING,
    },
    brandID: {
        type: DataTypes.INTEGER,
        references: {
          model: brandTable, // Name of the table
          key: brandTable.id // Primary key in the referenced table
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      },
      gameURL:{
        type: DataTypes.TEXT('long'),
      }
},
{
  tableName: 'activityCashbackTable'
});

activityCashbackTable.belongsTo(brandTable,  { foreignKey: 'brandID' });

seque.sync().then(() =>{
    console.log("activityCashbackTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating activityCashbackTable", error)
});


module.exports = activityCashbackTable;
