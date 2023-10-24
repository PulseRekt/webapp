import express from 'express';
import * as ar from '../controller/assignmentController.js'
import { notAllowed, notFound } from '../controller/healthCheckController.js';

const assignmentRouter = express.Router();

assignmentRouter.route('/')
    .get(ar.getAssignments)
    .post(ar.createAssignment)
    .all(notAllowed)

assignmentRouter.route('/:id')
    .get(ar.getAssignmentById)
    .put(ar.putAssignment)
    .delete(ar.deleteAssignmentById)
    .all(notAllowed)

assignmentRouter.route('*',notFound);


export default assignmentRouter;