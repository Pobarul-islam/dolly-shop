import { hash } from "bcrypt";
import userModel from "../models/userModel.js";
import { hashedPassword } from "../helpers/authHelpers.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });

    // existing user
    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }

    // register user
    const hashePassword = await hashedPassword(password);

    // save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashePassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
     res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};
