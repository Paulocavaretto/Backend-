import { Request, Response } from 'express';
import { getUserByUsername } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET as string);
  res.json({ accessToken });
}
