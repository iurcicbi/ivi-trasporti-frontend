import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AuthRequest } from '../middleware/auth';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Utente già esistente' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch {
    res.status(500).json({ error: 'Errore interno del server' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Email o password non validi' });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch {
    res.status(500).json({ error: 'Errore interno del server' });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Errore interno del server' });
  }
};