import express from 'express';
import { createUser, loginUser, getUsers, getUserId } from '../Controllers/UserController.mjs';
import { verifyToken } from '../Config/jwt.mjs';

const userRouter = express.Router();

// Route to create a new user
userRouter.post('/signup', createUser);

// Route to log in a user
userRouter.post('/login', loginUser);

// Route to get a list of all users
userRouter.get('/users', getUsers);

// Route to get a user by ID
userRouter.get('/users/profile',verifyToken,getUserId);

export default userRouter;
