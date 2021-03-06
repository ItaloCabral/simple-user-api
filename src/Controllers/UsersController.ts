import { Request, Response } from "express";
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const yup = require("yup");

class UsersController {

  async list(request: Request, response: Response) {

    try {
      
      const users = await User.find({});
      return response.status(200).json({ success: true, data: users });

    } catch (error: any) {

      return response.status(400).json({
        success: false,
        error: error.message,
      });

    }
  }

  async create(request: Request, response: Response) {
    
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    try {

      await schema.validate(request.body);

      const { name, email, password } = request.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return response.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });

      return response.status(201).json(user);
    } catch (error: any) {
      return response.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

}

module.exports = new UsersController();
