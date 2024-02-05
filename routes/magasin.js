const { ValidateField, ValidateParams } = require("../middlewares/validations")
const db = require("../models")

const router = require("express").Router()


router.get("/", async (req, res) => {
    try {
        const magasins = await db.Magasin.findAll({ raw: true });
        return res.render("magasin",{magasins})
    } catch (error) {
       
        return res.status(500).send("Internal server error");
    }
})

.post("/add",ValidateField, async (req, res) => {
    try {
        const { location, name,weight } = req.body
        await db.Magasin.create({ location, name, weight });
        return res.redirect(req.headers.referer)
    } catch (error) {
         console.log(error)
        return res.status(500).send("Internal server error");
    }
})

.post("/edit/:id",ValidateField, ValidateParams, async (req, res) => {
    try {
        const { location,name, weight } = req.body
        const {id} = req.params
        await db.Magasin.update({ location,name, weight },{where:{id}});
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})

.get("/delete/:id", ValidateParams, async (req, res) => {
    try {
        const {id} = req.params
        await db.Magasin.destroy({where:{id}});
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})


module.exports = router