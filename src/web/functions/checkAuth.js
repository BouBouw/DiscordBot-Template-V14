module.exports = async(req, res, next) => {
    console.log(req)
    if(req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect('/login');
}