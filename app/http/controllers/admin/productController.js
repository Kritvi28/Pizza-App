const Menu = require("../../../models/menu");

function productController() {
  return {
    addPizza(req, res) {
      //use menu model to save data from req.body
      const { pizzaName, pizzaImage, pizzaPrice, pizzaSize } = req.body;
      const menu = new Menu({
        name: pizzaName,
        image: pizzaImage,
        price: pizzaPrice,
        size: pizzaSize,
      });

      menu
        .save()
        .then((menu) => {
          return res.redirect("/addItem");
        })
        .catch((err) => {
          res.send("Something went wrong");
        });
    },
    async editPizza(req, res) {
      const item = await Menu.findOne({ _id: req.params.id });
      res.render("admin/editPizza", { item: item });
    },

    updatePizza(req, res) {
      const item = Menu.updateOne(
        { _id: req.body.pizzaId },
        {
          $set: {
            name: req.body.pizzaName,
            image: req.body.pizzaImage,
            price: req.body.pizzaPrice,
            size: req.body.pizzaSize,
          },
        }
      ).then((result) => {
        console.log("Pizza updated successfully");
        return res.redirect("/editPizza");
      });
    },


    removePizza(req,res) {
        // have to remove the data from that id so use (req.params.id) 
        Menu.deleteOne({_id : req.params.id}).then((result) => {
            if(result.deletedCount) {
                console.log("Pizza Removed"); 
                res.redirect("/editPizza"); 
            } 
        }).catch((err) => {
            console.log(err); 
        });
    }
  };
}
module.exports = productController;