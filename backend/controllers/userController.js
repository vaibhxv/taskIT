import User from '../models/User.js';
import { generateUniqueId } from '../helpers/generateUniqueId.js';
import { generateJWT } from '../helpers/generateJWT.js';
import { sendConfirmationEmail, sendResetPasswordEmail } from '../services/emailService.js';
import { front } from '../config/config.js';

export const status = (req,res) => {
  res.status(200).json({message: 'Connected to Server Successfully!'})
}

export const createUser = async (req, res) => {

  const { email, name, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User exists' });
  }

  try {
    const newUser = new User({ email, name, password });
    newUser.token = generateUniqueId();

    const user = await newUser.save();
    user.confirmed = true;
    await user.save();
  
   // sendConfirmationEmail(user.email, `${front.URL}/auth/confirm-account/${user.token}`);

    return res.status(201).json({ message: 'New User Successfully Created. Please Login.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error Creating New User.' });
  }
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'Invalid' });
  }

  if (!user.confirmed) {
    return res.status(403).json({ message: 'Incorrect Password!' });
  }

  if (await user.checkpassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    })
  } else {
    return res.status(403).json({ message: 'Incorrect Password!' });
  }
}

export const confirmUser = async (req, res) => {
  const token = req.params.token;

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(404).json({ message: 'Unable to find user' });
  }

  try {
    user.confirmed = true;
    user.token = '';
    await user.save();
    return res.json({ message: 'Success!' });
  } catch (error) {
    return res.status(500).json({ message: 'Error' }, error);
  }
}



export const verifyToken = async (req, res) => {
  const token = req.params.token;

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(404).json({ message: 'Unable to find user' });
  }
  return res.json({ message: 'Token valid.' });
}



export const profile = async (req, res) => {
  res.json({ user: req.user });
}