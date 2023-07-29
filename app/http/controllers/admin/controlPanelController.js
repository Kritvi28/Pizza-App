const Menu = require("../../../models/menu");

function controlPanelController() {
  return {
    index(req, res) {
      res.render("admin/controlPanel");
    },
    addItemIndex(req, res) {
      res.render("admin/addItem");
    },

    async editPizzaIndex(req, res) {
      const menu = await Menu.find({})
      res.render("admin/editPizzaIndex", { menu: menu });
    },
    
 
  };
}
module.exports = controlPanelController;
