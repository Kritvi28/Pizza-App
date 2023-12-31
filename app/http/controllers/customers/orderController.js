const Order = require('../../../models/order')
const moment = require('moment')


function orderConroller() {
    return {
        store(req,res) {
            // Validate request 
            const { phone , address } =  req.body
            if(!phone || !address) {
                req.flash('error', 'All feilds are required') 
                return res.redirect('/cart')
            }

            const order = new Order ({
                customerId: req.user._id , 
                items: req.session.cart.items, 
                phone: phone , 
                address: address 
            }) 

            order.save().then(result => {
                Order.populate(result, { path:'customerId' }, (err , placedOrder) => {
                    req.flash('success', 'order placed successfully') 
                delete req.session.cart 

                // emit 
                const eventEmitter = req.app.get('eventEmitter') 
                eventEmitter.emit('orderPlaced', placedOrder)
                return res.redirect('/customers/orders') 
                })
    
            }) 
            .catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart') 
            })
        }, 


        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id } , 
                null, {sort: {'createdAt': -1}}) 
                res.header(
                    'cache-control', 'no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0'
                    ) 
            res.render('customers/orders', { orders: orders, moment: moment})  
        } , 

        async showOrder(req,res) {
            
         const order = await Order.findById(req.params.id) 

    //  authorise user  

    if(req.user._id.toString() === order.customerId.toString()) {
        return res.render('customers/singleOrder', {order})
    } 
    return res.redirect('/')

        }
    } 
}


module.exports = orderConroller; 



    