const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const { promisify } = require('util');

import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  userId?: string;
}

module.exports = async (request: CustomRequest, response: Response, next: NextFunction) => {
  const auth = request.headers.authorization;

  if (!auth) {
    return response.status(401).json({
      success: false,
      error: 'Token not provided'
    });
  }

  const [, token] = auth.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, config.secret);

    if(!decoded) {
      return response.status(401).json({
        success: false,
        error: 'Token invalid'
      });
    }

    request.userId = decoded.id;
    return next();

  } catch (error) {
    return response.status(401).json({
      success: false,
      error: 'Token invalid'
    });
  }
}
