import express from 'express';
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

//routing
//regiter
router.post('/register', registerController);

//login
router.post('/login', loginController);

//FORGOT PASSWORD || POST
router.post('/forgot-password', forgotPasswordController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

// PROTECT USER ROUTE AUTH
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ oke: true });
});

// PROTECT ADMIN ROUTE AUTH
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ oke: true });
});

export default router;
