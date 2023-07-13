const LocalStrategy = require('passport-local').Strategy 
const User = require('../models/user') 
const bcrypt = require('bcryptjs')


function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email'}, 

    async (email, password,done) => {
        // Login 
        // Check if email exists 
        const user =  await User.findOne({ email: email}) 

        if(!user)  {
            return done(null , false , { message: 'No user with this email'}) 
        }  
        console.log(password);
        
        let hashPass= user.password
        bcrypt.compare(password, hashPass).then(match => {
            if(match) {
                return done(null, user, { message: 'Logged in successfully' })  
            }  

            return done(null, false, { message: 'Wrong username or password' })   
        }).catch(err => {
            return done(null, false, { message: `Something is wrong ${err}` }) 
        })

    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    }) 

    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => {
    //         done(err, user) 
    //     })
    // })

    passport.deserializeUser((id, done) => {
        User.findById(id)
          .then((user) => {
            done(null, user);
          })
          .catch((err) => {
            done(err, null);
          });
      });
}



module.exports = init 