const JWT = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    message: 'Auth Failed',
                    success: false
                });
            } else {
                if (!req.body.userId) {
                    req.body.userId = decode.id;
                }
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'Auth Failed',
            success: false
        });
    }
};