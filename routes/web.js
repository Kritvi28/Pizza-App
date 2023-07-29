const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController') 
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')  
const AdminOrderController = require('../app/http/controllers/admin/orderController')  
const statusController = require('../app/http/controllers/admin/statusController')  
const controlPanelController = require('../app/http/controllers/admin/controlPanelController')  
const productController = require('../app/http/controllers/admin/productController')   

// Middlewares
const guest = require('../app/http/middlewares/guest')  
const auth= require('../app/http/middlewares/auth')  
const admin = require('../app/http/middlewares/admin')  
const Order = require('../app/models/order') 
const Menu = require('../app/models/menu') 


function initRountes(app) {
    app.get('/', homeController().index)
    
    app.get('/login',guest , authController().login)
    app.post('/login',authController().postLogin)
    
    app.get('/register', guest , authController().register) 
    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
    
    // Customer routes 
    app.post('/orders', auth, orderController().store) 
    app.get('/customers/orders' , auth, orderController().index) 
    app.get('/customers/orders/:id' , auth, orderController().showOrder)


    // Admin Routes 
    app.get('/admin/orders' , admin , AdminOrderController().index)  
    app.post('/admin/orders/status', admin , statusController().update) 

    // control panel 
    app.get('/admin/controlPanel',admin,controlPanelController().index) 
    app.get('/addItem', admin , controlPanelController().addItemIndex)
    app.post('/admin/addItem',admin,productController().addPizza) 


    app.get('/editPizza', admin , controlPanelController().editPizzaIndex) 
    app.get('/admin/editPizza/:id' , admin , productController().editPizza)
    app.post('/admin/editSinglePizza',admin,productController().updatePizza)


    app.get('/admin/removePizza/:id',admin,productController().removePizza)




    

    // // app.post('/admin/editPizza',admin,productController().editPizza) 
    // app.post('/admin/editPizza',admin,productController().updatePizza) 
    
    // app.get('/admin/editPizza',admin,productController().removePizza)



}  

module.exports = initRountes; 