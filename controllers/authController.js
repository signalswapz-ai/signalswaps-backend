const authService = require('../services/authService');
const { sendMail } = require('../services/mail.service');
const { welcomeTemplate } = require('../templates/welcome.template');
const ActivationCodeService = require('../services/activationCode.service');

class AuthController {
  async register(req, res, next) {
    try {
      const { email } = req.body;
      const result = await authService.register(email);
       const activationCode = await ActivationCodeService.generateActivationCode(email);
      // call email service here (after successful register)
      try {
        await sendMail({
          to: email,
          subject: 'Welcome!',
          html: welcomeTemplate(activationCode)
        });
      } catch (mailError) {
        // do not block registration if email fails
        console.error('Welcome email failed:', mailError);
      }
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
  async verifyActivationCode(req, res, next) {
    try {
      const { email, code } = req.body;
      if (!email || !code) {
        return res.status(400).json({
          success: false,
          message: 'email and code are required',
        });
      }
      const result = await authService.verifyActivationCode(email, code);
      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        data: result,
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