module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define('Task', {
		// id, createdAt, updatedAt already exists in sequelize
		taskDescription: {	
			type: DataTypes.TEXT,
		},
		taskTitle: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	return Task;
}