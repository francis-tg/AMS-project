"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Role, {
				foreignKey: "role_id",
				onDelete: "CASCADE",
			});
		}
	}
	User.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			email: DataTypes.STRING,
			contact: DataTypes.STRING,
			role_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "User",
		},
	);
	return User;
};
