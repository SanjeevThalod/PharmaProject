import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Replace with your actual secret key

// Generate a JWT token
const generateToken = async (data, expiresIn) => {
  return await jwt.sign(data, secretKey, { expiresIn });
};

// Verify and decode a JWT token
const verifyToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader ) {
    return res.status(404).json({ message: 'No token provided' });
  }
  if(!authHeader.startsWith('Bearer')){
    return res.status(403).json({message:'Invalid token'});
  }

  const token = authHeader.replace('Bearer ', ''); // Extract the token from the header

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Add the decoded user to the request object

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};


export { generateToken, verifyToken };
