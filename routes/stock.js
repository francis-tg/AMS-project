const router = require("express").Router();
const db = require("../models");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
router.get("/", async (_, res) => {
	try {
		const stocks = await db.Stock.findAll({
			include: ["Colie", "Magasin"],
			raw: true,
		});
		const colies = await db.Colie.findAll({ raw: true });
		const magasins = await db.Magasin.findAll({ raw: true });
		return res.render("stock", { stocks, colies, magasins });
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post("/add", ValidateField, async (req, res) => {
	try {
		await db.Stock.create({ ...req.body });
		return res.redirect(req.headers.referer);
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post("/edit/:id", ValidateField, ValidateParams, async (req, res) => {
	const { id } = req.params;
	try {
		await db.Stock.update({ ...req.body }, { where: { id } });
		return res.redirect(req.headers.referer);
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});
module.exports = router;