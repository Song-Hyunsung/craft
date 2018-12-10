module.exports = (sequelize, DataTypes) => {
	const Project = sequelize.define('Project', {
		projectTitle : {
			type: DataTypes.STRING,
			allowNull : false,
			validate : {
				notEmpty : true,
			},
		},
		projectDescription : {
			type: DataTypes.TEXT,
		},
		projectArchived : {
			type: DataTypes.BOOLEAN,
			allowNull : false,
			defaultValue: false,
		},
	});

	Project.associate = function(models){
		models.Project.hasMany(models.Task);
	}


	return Project;
}