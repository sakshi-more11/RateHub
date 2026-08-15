const authService = require('../services/auth.service');
const { signupSchema, loginSchema } = require('../validators/auth.validator');

async function signupController(req, res) {
  try {
    const validatedData = signupSchema.parse(req.body);
    const result = await authService.signup(validatedData);
    res.status(201).json(result);
  } catch (error) {
    if (error.issues) {
      return res.status(400).json({ message: error.issues[0].message });
    }
    res.status(400).json({ message: error.message });
  }
}

async function loginController(req, res) {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.login(validatedData);
    res.status(200).json(result);
  } catch (error) {
    if (error.issues) {
      return res.status(400).json({ message: error.issues[0].message });
    }
    res.status(401).json({ message: error.message });
  }
}

module.exports = { signupController, loginController };