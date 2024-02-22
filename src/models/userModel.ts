import db from '../utils/db';

interface User {
  id: number;
  username: string;
  password: string;
}

export function getUserByUsername(username: string): Promise<User | undefined> {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) return reject(err);
      resolve(row as User | undefined);
    });
  });
}
