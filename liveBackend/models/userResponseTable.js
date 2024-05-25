const {DataTypes} = require("sequelize")
const seque = require('../config/db')
const userTable = require('./userTable')
const schedulerTable = require('./schedulerTable')

const userResponseTable = seque.define('userResponseTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userID:{
        type:DataTypes.INTEGER,
    },
    ad_ID:{
        type:DataTypes.INTEGER,
    },
    optionSelected:{
        type:DataTypes.STRING,
    },
    dateTime :{
        type:DataTypes.DATE,
    },
    
},{
    tableName: 'userResponseTable', // specify the exact table name
  });

userResponseTable.belongsTo(userTable, { foreignKey: 'userID' , onUpdate: 'NO ACTION',onDelete: 'CASCADE'});
userResponseTable.belongsTo(schedulerTable, { foreignKey: 'ad_ID' , onUpdate: 'NO ACTION',onDelete: 'CASCADE'});

seque.sync().then(() =>{
    console.log("userResponseTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating userResponseTable", error)
});


module.exports = userResponseTable;
