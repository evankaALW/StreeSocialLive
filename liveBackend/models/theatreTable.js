const {DataTypes} = require("sequelize")
const seque = require('../config/db')


const theatreTable = seque.define('theatreTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    theatreName:{
        type:DataTypes.STRING,
    },
    theatreLocation:{
        type:DataTypes.STRING, 
    },
    theatreCity:{
        type:DataTypes.STRING,
    },
    theatrePinCode:{
        type:DataTypes.BIGINT,
    },
    theatreOperatorEmail:{
        type:DataTypes.STRING,
    },
    theatreOperatorContact:{
        type:DataTypes.BIGINT,
    },
    theatreOperatorName:{
        type:DataTypes.STRING,
    },

    theatreOperatorIDproof:{
        type:DataTypes.BLOB,
    },
    theaterScreens:{
        type:DataTypes.INTEGER,
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
      },
      pinCodesForAllocation:{
        type:DataTypes.STRING,
      },

},{
    tableName: 'theatreTable',
  });

seque.sync().then(() =>{
    console.log("theatreTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating theatreTable", error)
});


module.exports = theatreTable;
