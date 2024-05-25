const {DataTypes} = require("sequelize")
const seque = require('../config/db')
//id	userId						
const ticketBookingTable = seque.define('ticketBookingTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userID:{
        type:DataTypes.INTEGER,
    },
    theaterId:{
        type:DataTypes.INTEGER,
    },
    showId:{
        type:DataTypes.INTEGER,
    },
    showDate:{
        type:DataTypes.DATE,
    },
    showTime:{
        type:DataTypes.TIME,
    },
    selectedSeat:{
        type:DataTypes.INTEGER,
    },
    screenId:{
        type:DataTypes.INTEGER,
    }
},{
    tableName: 'ticketBookingTable', // specify the exact table name
  });

seque.sync().then(() =>{
    console.log("ticketBookingTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating ticketBookingTable", error)
});


module.exports = ticketBookingTable;
