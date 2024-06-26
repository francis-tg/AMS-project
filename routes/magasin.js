const { ensureAuthenticated } = require("../config/auth");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
const db = require("../models");

const router = require("express").Router();

router
	.get("/", ensureAuthenticated, async (req, res) => {
		try {
			const magasins = await db.Magasin.findAll({ raw: true });
			return res.render("magasin", { magasins });
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	})

	.post("/add", ValidateField, ensureAuthenticated, async (req, res) => {
		try {
			const { location, name, weight } = req.body;
			const getMagasin=await db.Magasin.findOne({where:{name}});
			if(getMagasin){
				req.session.messages.push({
					type: "danger",
					msg: "ce magasin existe deja",
				});
				return res.redirect(req.headers.referer);
			}else{
				req.session.messages.push({
					type: "success",
					msg: "magasin creer avec success",
				});
				
			}
			await db.Magasin.create({ location, name, weight });
			return res.redirect(req.headers.referer);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Internal server error");
		}
	})

	.post(
		"/edit/:id",
		ValidateField,
		ValidateParams,
		ensureAuthenticated,
		async (req, res) => {
			try {
				const { location, name, weight } = req.body;
				const { id } = req.params;
				await db.Magasin.update({ location, name, weight }, { where: { id } });
				return res.redirect(req.headers.referer);
			} catch (error) {
				return res.status(500).send("Internal server error");
			}
		},
	)

	.get("/delete/:id", ValidateParams, ensureAuthenticated, async (req, res) => {
		try {
			const { id } = req.params;
			await db.Magasin.destroy({ where: { id } });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	});

module.exports = router;
