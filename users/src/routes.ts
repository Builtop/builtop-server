import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import { validateSchema } from '../../common/index';

// controllers
import * as authController from './controllers/auth.controller';
import * as adminController from './controllers/admin.controller';
import * as userController from './controllers/user.controller';
import * as profileController from './controllers/profile.controller';
import * as statisticsContoller from './controllers/statistics.controller';

// schema
import { signupSchema, loginSchema } from './schemas/auth.schema';
import { addSupervisorSchema, approveAccountSchema, activateAccountSchema, deactivateAccountSchema } from './schemas/admin.schema';
import { editAdminSchema, editSupervisorSchema, changePasswordSchema } from './schemas/profile.schema';

const router = express.Router();

// auth
router.post('/signup', json(), validateSchema(signupSchema), authController.signup);
router.post('/login', json(), validateSchema(loginSchema), authController.login);

// admin
router.post('/add-supervisor', json(), validateSchema(addSupervisorSchema), adminController.addSupervisor);
router.put('/approve-account', json(), validateSchema(approveAccountSchema), adminController.approveAccount);
router.put('/activate-account', json(), validateSchema(activateAccountSchema), adminController.activateAccount);
router.put('/deactivate-account', json(), validateSchema(deactivateAccountSchema), adminController.deactivateAccount);
router.delete('/user/:id', adminController.deleteUser);

// user
router.get('/users', userController.getAllUsers);
router.get('/active-users', userController.getAllActiveUsers);
router.get('/pending-users', userController.getAllPendingUsers);
router.get('/inactive-users', userController.getAllInActiveUsers);
router.get('/admins', userController.getAllAdmins);
router.get('/supervisors', userController.getAllSupervisors);
router.get('/buyers', userController.getAllBuyers);
router.get('/suppliers', userController.getAllSuppliers);
router.get('/user/:id', userController.getUserById);

// profile
router.put('/edit-admin', json(), validateSchema(editAdminSchema), profileController.editAdminProfile);
router.put('/edit-supervisor', json(), validateSchema(editSupervisorSchema), profileController.editSupervisorProfile);
router.put('/change-password', json(), validateSchema(changePasswordSchema), profileController.changePassword);

// statistics
router.get('/statistics', statisticsContoller.getUsersStatistics);

// version
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Users APIs Version 1.0.0');
});

export default router;