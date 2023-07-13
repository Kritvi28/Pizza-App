const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController') 
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')  
const AdminOrderController = require('../app/http/controllers/admin/orderController')  
const statusController = require('../app/http/controllers/admin/statusController')  

// Middlewares
const guest = require('../app/http/middlewares/guest')  
const auth= require('../app/http/middlewares/auth')  
const admin = require('../app/http/middlewares/admin')  
const Order = require('../app/models/order') 


function initRountes(app) {
    app.get('/', homeController().index)
    
    app.get('/login', guest , authController().login)
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
    
}  

module.exports = initRountes; 