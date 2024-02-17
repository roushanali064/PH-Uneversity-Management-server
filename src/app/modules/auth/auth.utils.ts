import jwt, { JwtPayload } from 'jsonwebtoken';

export const createJwtToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expire: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: expire });
};

export const verifyJwtToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
