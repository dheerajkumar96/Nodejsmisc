'use strict';

const mailHandler = require('../controllers/mailController');
module.exports = app => {
    app.route('/sendmail').get(mailHandler.sendmail);
    app.route('/upload').post(mailHandler.uploadfile);
    app.route('/getname').get(mailHandler.getname)
}