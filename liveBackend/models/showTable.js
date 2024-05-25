const {DataTypes}= require('sequelize');
const seque = require('../config/db');
const movieTable = require('./movieTable');
const theatreTable = require('./theatreTable');


const showTable = seque.define('showTable', {
id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
showDesc:{
    type: DataTypes.TEXT('long'),
    allowNull: false,
},
movieID:{
    type: DataTypes.INTEGER,
    allowNull: false,
},
theatreID:{
    type: DataTypes.INTEGER,//change it back to bigint later
},
dateTime: {
    type: DataTypes.DATE,
  },
showDate:{
    type: DataTypes.DATE,
  },
showTime:{
    type: DataTypes.DATE,
  },
availableSeats:{
    type: DataTypes.INTEGER,
  },
bookedSeats:{
    type: DataTypes.INTEGER,
  },
isDeleted:{
    type:DataTypes.BOOLEAN,
  }
},
{
  // options
  tableName: 'showTable' // specify the exact table name
});

showTable.belongsTo(movieTable, { foreignKey: 'movieID' , onUpdate: 'NO ACTION',onDelete: 'CASCADE'});
showTable.belongsTo(theatreTable, { foreignKey: 'theatreID' , onUpdate: 'NO ACTION',onDelete: 'CASCADE'});

    seque.sync().then(() => {
    console.log('showTable table created successfully!');
  }).catch((error) => {
    console.error('Unable to create showTable : ', error);
  });

module.exports = showTable;