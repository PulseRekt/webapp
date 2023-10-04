import assignmentRouter from '../routes/assingmentRoute.js';
import handleBasicAuthentication from '../security/authentication.js';
import * as as from '../service/assignmentService.js'
export const createAssignment = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send('Unauthorized: Missing token');
      }
  
      const credentials = await handleBasicAuthentication(token);
  
      if (!credentials.authenticated) {
        return res.status(401).send('Unauthorized: Invalid credentials');
      }
  
      const body = req.body;
      body.userId = credentials.userId;
  
      const assignment = await as.createAssignment(body);
  
      if (!assignment) {
        return res.status(500).send('Internal Server Error: Failed to create assignment');
      }
  
      return res.status(201).json(assignment);
    } catch (error) {
      console.error('Error in createAssignment:', error);
      return res.status(500).send('Internal Server Error');
    }
  };

  export const getAssignments = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).send('Unauthorized: Missing Authorization Token');
      }
  
      const credentials = await handleBasicAuthentication(token);
  
      if (!credentials.authenticated) {
        return res.status(401).send('Unauthorized: Invalid Credentials');
      }
  
      const assignments = await as.getAllAssignments();
  
      res.status(200).json(assignments);
    } catch (error) {
      console.error('Error in getAssignments:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  

export const putAssignment = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const id = req.params.id;
  
      if (!token) {
        return res.status(401).send('Unauthorized: Missing Authorization Token');
      }
  
      const credentials = await handleBasicAuthentication(token);
  
      if (!credentials.authenticated) {
        return res.status(401).send('Unauthorized: Invalid Credentials');
      }
  
      const body = req.body;
      body.userId = credentials.userId;
  
      const assignment = await as.getAssignmentById(id);
  
      if (!assignment) {
        return res.status(404).send('Not Found: Assignment not found');
      }
  
      if (assignment.userId === credentials.userId) {
        await as.updateAssignmentById(body, id);
        return res.status(200).send('Assignment updated successfully');
      } else {
        return res.status(403).send('Forbidden: You do not have permission to update this assignment');
      }
    } catch (error) {
      console.error('Error in putAssignment:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  

  export const deleteAssignmentById = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const id = req.params.id;
  
      if (!token) {
        return res.status(401).send('Unauthorized: Missing Authorization Token');
      }
  
      const credentials = await handleBasicAuthentication(token);
  
      if (!credentials.authenticated) {
        return res.status(401).send('Unauthorized: Invalid Credentials');
      }
  
      const assignment = await as.getAssignmentById(id);
  
      if (!assignment) {
        return res.status(404).send('Not Found: Assignment not found');
      }
  
      if (assignment.userId === credentials.userId) {
        await as.deleteAssignmentById(id);
        return res.status(200).send('Assignment deleted successfully');
      } else {
        return res.status(403).send('Forbidden: You do not have permission to delete this assignment');
      }
    } catch (error) {
      console.error('Error in deleteAssignmentById:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  
  export const getAssignmentById = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const id = req.params.id;
  
      if (!token) {
        return res.status(401).send('Unauthorized: Missing Authorization Token');
      }
  
      const credentials = await handleBasicAuthentication(token);
  
      if (!credentials.authenticated) {
        return res.status(401).send('Unauthorized: Invalid Credentials');
      }
  
      const assignment = await as.getAssignmentById(id);
  
      if (!assignment) {
        return res.status(404).send('Not Found: Assignment not found');
      }
  
      res.status(200).json(assignment);
    } catch (error) {
      console.error('Error in getAssignmentById:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  