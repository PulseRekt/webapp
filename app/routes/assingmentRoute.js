import express from 'express';
import * as ar from '../controller/assignmentController.js'

const assignmentRouter = express.Router();

assignmentRouter.route('/')
    .get(ar.getAssignments)
    .post(ar.createAssignment)

assignmentRouter.route('/:id')
    .get(ar.getAssignmentById)
    .put(ar.putAssignment)
    .delete(ar.deleteAssignmentById)


export default assignmentRouter;