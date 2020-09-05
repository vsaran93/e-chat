import jwt from 'jsonwebtoken'
const tokenSecret = 'echatapp';

export const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, tokenSecret);
    return decoded;
  } catch (error) {
    console.error("there is an error in decoding token", error);
  }
};