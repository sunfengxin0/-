const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');
module.exports = async(req, res) => {
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) res.status(400).render('admin/error', { msg: "用户名或密码错误" })
    let user = await User.findOne({ email: email });
    // console.log(user);
    if (user) {
        let isTure = await bcrypt.compare(password, user.password);
        if (isTure) {
            req.session.username = user.username;
            req.app.locals.userInfo = user;
            res.redirect('/admin/user');
        } else {
            res.status(400).render('admin/error', { msg: "用户名或密码错误" });
        }
    } else {
        res.status(400).render('admin/error', { msg: "用户名或密码错误" });
    }
}