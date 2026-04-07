const authService = require('../services/authService');
// const { sendMail } = require('../services/mail.service');
// const { welcomeTemplate } = require('../templates/welcome.template');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const result = await authService.register(email, password, name);
      // call email service here (after successful register)
      // try {
      //   await sendMail({
      //     to: email,
      //     subject: 'Welcome!',
      //     html: welcomeTemplate(name)
      //   });
      // } catch (mailError) {
      //   // do not block registration if email fails
      //   console.error('Welcome email failed:', mailError);
      // }
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }


  async resetPassword(req, res, next) {
    try {
      const { email, password, confirmPassword } = req.body;
      const result = await authService.resetPassword(email, password, confirmPassword);
      res.status(200).json({
        success: true,
        message: 'Password reset successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();