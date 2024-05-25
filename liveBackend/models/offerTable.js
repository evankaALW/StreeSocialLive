const {DataTypes} = require("sequelize")
const seque = require('../config/db')

//id									

const offerTable = seque.define('offerTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    offerName:{
        type:DataTypes.STRING,
       
    },
    offerDescription:{
        type:DataTypes.TEXT('long'),
        
    },
    startDate:{
        type:DataTypes.DATE,
    },
    endDate:{
        type:DataTypes.DATE,
    },
    discountAmount:{
        type:DataTypes.DOUBLE,
    },
    discountPercentage:{
        type:DataTypes.DOUBLE,
    },
    minimumPurchase:{
        type:DataTypes.DOUBLE,
    },
    imageURL:{
        type:DataTypes.TEXT('long'),
    },
    isActive:{
        type:DataTypes.BOOLEAN,
      }
},
{
  // options
  tableName: 'offerTable' // specify the exact table name
});

seque.sync().then(() =>{
    console.log("offerTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating offerTable", error)
});


module.exports = offerTable;
