const seatManagementTable = require('./seatManagementTable');
const clickerDeviceDetailsTable = require('./clickerDeviceDetailsTable');
const screenTable = require('./screenTable');

seatManagementTable.belongsTo(clickerDeviceDetailsTable, { foreignKey: 'clickerID', onUpdate: 'NO ACTION', onDelete: 'CASCADE' });
seatManagementTable.belongsTo(screenTable, { foreignKey: 'screenID', onUpdate: 'NO ACTION', onDelete: 'CASCADE' });

clickerDeviceDetailsTable.belongsTo(screenTable, { foreignKey: 'screenID', onUpdate: 'NO ACTION', onDelete: 'CASCADE' });
clickerDeviceDetailsTable.belongsTo(seatManagementTable, { foreignKey: 'seatNo', onUpdate: 'NO ACTION', onDelete: 'CASCADE' });

screenTable.belongsTo(theatreTable, { foreignKey: 'theatreID', onUpdate: 'NO ACTION', onDelete: 'CASCADE' });
