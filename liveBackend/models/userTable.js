const {DataTypes}= require('sequelize');
const seque = require('../config/db');
const brandTable = require('./brandTable');
const theatreTable = require('./theatreTable');


const userTable = seque.define('userTable', {
id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
userName:{
    type: DataTypes.STRING(200),
    allowNull: false,
},
dateOfBirth:{
    type: DataTypes.DATE,
    allowNull: false,
},
phoneNumber:{
    type: DataTypes.BIGINT,//change it back to bigint later
    allowNull: false,
},
emailID: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
photo:{
    type:DataTypes.BLOB,
    allowNull: false,
  },
cardID:{
    type: DataTypes.BIGINT,
    allowNull: false,
  },
address:{
    type: DataTypes.TEXT,
  },
pinCode:{
    type: DataTypes.BIGINT,
  },
languageSpoken:{
    type: DataTypes.STRING(200),
  },
loginPIN:{
    type: DataTypes.INTEGER,
  },
brandID:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
theatreID:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
dateTime:{
    type: DataTypes.DATE,
    allowNull: false,
  },
isDeleted:{
    type:DataTypes.BOOLEAN,
  }
},
{
  tableName: 'userTable' // specify the exact table name
});

userTable.belongsTo(brandTable, { foreignKey: 'brandID' , onUpdate: 'NO ACTION',onDelete: 'CASCADE'});
userTable.belongsTo(theatreTable, { foreignKey: 'theatreID' , onUpdate: 'NO ACTION',onDelete: 'CASCADE'});

    seque.sync().then(() => {
    console.log('userTable table created successfully!');
  }).catch((error) => {
    console.error('Unable to create userTable : ', error);
  });

module.exports = userTable;