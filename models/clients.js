"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Clients extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Bon_livraison, {
				foreign_key: "client_id",
				onDelete: "CASCADE",
			});
		}
	}
	Clients.init(
		{
			name: DataTypes.STRING,
			contact: DataTypes.STRING,
			email: DataTypes.STRING,
			location: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Clients",
		},
	);
	return Clients;
};
