const userRole  = require('../helper/userRole')
 async function admin (req, res, next) {
    if(req.isAuthenticated() && await userRole(req.user.role_id) === 'Admin') {
        return next()
    }
    return res.redirect('/auth/dashboard')
}

module.exports = admin