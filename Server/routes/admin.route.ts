import express from 'express';
import { addTour } from '../controllers/admin.controller';

const adminRouter = express.Router();

// Route to add a new tour
adminRouter.post('/tours', addTour);

export default adminRouter;
