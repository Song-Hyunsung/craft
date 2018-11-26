const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				isAlphanumeric: true,
			},
		},
		password_hash: {
			type: DataTypes.STRING,
		},
	});

	User.associate = function(models){
		models.User.hasMany(models.Project);
	};

	User.beforeCreate((user) =>
		new sequelize.Promise((resolve) => {
			bcrypt.hash(user.password_hash, null, null, (err, hashed_password) => {
				resolve(hashed_password);
			});
		}).then((hashed_pw) => {
			user.password_hash = hashed_pw;
		})
	);

	return User;
}