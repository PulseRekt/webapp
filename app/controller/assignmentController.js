import assignmentRouter from '../routes/assingmentRoute.js';
import handleBasicAuthentication from '../security/authentication.js';
import * as as from '../service/assignmentService.js'

const validateAssignment = (assignment) => {
  const errors = [];

  if (!assignment.name || typeof assignment.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required and must be a string' });
  }

  if (!assignment.points || isNaN(Number(assignment.points)) || assignment.points < 0 || assignment.points > 100) {
    errors.push({ field: 'points', message: 'Points is required and must be a number' });
  }

  if (!assignment.num_of_attempts || isNaN(Number(assignment.num_of_attempts)) ||  assignment.num_of_attempts < 0 || assignment.num_of_attempts > 100) {
    errors.push({ field: 'num_of_attempts', message: 'Number of attempts is required and must be a number' });
  }
  if (!assignment.deadline) {
    errors.push({ field: 'deadline', message: 'Invalid date format for deadline' });
  }

  return errors.length === 0 ? null : errors;
};

export const createAssignment = async (req, res, next) => {
    try {
      if (Object.keys(req.query).length === 0){
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send('Unauthorized: Missing token');
      }
  
      const credentials = await handleBasicAuthentication(token);
  
      if (!credentials.authenticated) {
        return res.status(401).send('Unauthorized: Invalid credentials');
      }

      

  
      const body = req.body;
      const validationErrors = validateAssignment(body);

      if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
      }
      body.userId = credentials.userId;



  
      const assignment = await as.createAssignment(body);
  
      if (!assignment) {
        return res.status(500).send('Internal Server Error: Failed to create assignment');
      }
  
      return res.status(201).json(assignment);}
      else{
        return res.status(400).send();
      }
    } catch (error) {
      console.error('Error in createAssignment:', error);
      return res.status(500).send('Internal Server Error');
    }
  };

  export const getAssignments = async (req, res, next) => {
    try {
      if (Object.keys(req.query).length === 0){

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
    }
      else{
        res.status(400).send();
      }
    } catch (error) {
      console.error('Error in getAssignments:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  

export const putAssignment = async (req, res, next) => {
    try {
      if (Object.keys(req.query).length === 0){

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
      const validationErrors = validateAssignment(body);

      if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
      }
      body.userId = credentials.userId;
      body.userId = credentials.userId;
  
      const assignment = await as.getAssignmentById(id);
      console.log(assignment);
      if (!assignment) {
        return res.status(404).send('Not Found: Assignment not found');
      }

      if (assignment.userId === credentials.userId) {
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).send(); 
        }
  
        await as.updateAssingmentById(body, id);
        return res.status(204).send();
      } else {
        return res.status(403).send('Forbidden: You do not have permission to update this assignment');
      }}
      else{
        res.status(400);
      }
    } catch (error) {
      console.error('Error in putAssignment:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  

  export const deleteAssignmentById = async (req, res, next) => {
    try {
      if (Object.keys(req.query).length === 0){

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
        return res.status(204).send();
      } else {
        return res.status(403).send('Forbidden: You do not have permission to delete this assignment');
      }}
      else{
        res.status(400).send();
      }
    } catch (error) {
      console.error('Error in deleteAssignmentById:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  
  export const getAssignmentById = async (req, res, next) => {
    try {
      if (Object.keys(req.query).length === 0){

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
    }
    else{
      res.status(400).send();
    }
    } catch (error) {
      console.error('Error in getAssignmentById:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  