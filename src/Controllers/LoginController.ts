const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');

import { Request, Response } from 'express';

interface CustomRequest extends Request {
  email: string;
  password: string;
}

class LoginController {

  async index(request: CustomRequest, response: Response) {
      
      const { email, password } = request.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(400).json({
          success: false,
          error: 'User not found'
        });
      }
  
      if (!(await bcrypt.compare(password, user.password))) {
        return response.status(400).json({
          success: false,
          error: 'Invalid password'
        });
      }
  
      const token = jwt.sign(
        { id: user._id },
        config.secret,
        { expiresIn: config.expiresIn },
      );
  
      return response.status(200).json({
        user: {
          name: user.name,
          email: user.email,
        }, token
      });
    }

}

module.exports = new LoginController();
