import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import { validateSchema } from '../../common/index';

// controllers
import * as authController from './controllers/auth.controller';
import * as userController from './controllers/user.controller';
import * as statisticsContoller from './controllers/statistics.controller';

// schema
import { signupSchema, loginSchema } from './schemas/auth.schema';

const router = express.Router();

// auth
router.post('/signup', json(), validateSchema(signupSchema), authController.signup);
router.post('/login', json(), validateSchema(loginSchema), authController.login);

// user
router.get('/users', userController.getAllUsers);
router.get('/admins', userController.getAllAdmins);
router.get('/supervisors', userController.getAllSupervisors);
router.get('/buyers', userController.getAllBuyers);
router.get('/suppliers', userController.getAllSuppliers);
router.get('/user/:id', userController.getUserById);

// statistics
router.get('/statistics', statisticsContoller.getUsersStatistics);

// version
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Users APIs Version 1.0.0');
});

export default router;