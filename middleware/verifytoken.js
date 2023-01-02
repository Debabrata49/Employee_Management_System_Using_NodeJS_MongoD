const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.session.token;

    if (token != null) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                req.session.destroy();
                return res.redirect("/");
            }
            return next();
        });
    } else {
        return res.redirect("/");
    }
};