module.exports = (req, res) => {
    if (req.session.username) {
        res.redirect('/admin/user');
    } else {
        res.render('admin/login');
    }
}