import assignmentRouter from '../routes/assingmentRoute.js';
import handleBasicAuthentication from '../security/authentication.js';
import * as as from '../service/assignmentService.js';
import logger from '../../logger/logger.js';
import { assignmentExists } from '../service/submissonService.js';


const validateAssignment = (assignment) => {
  const errors = [];

  if (!assignment.name || typeof assignment.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required and must be a string' });
  }

  if (
    !Number.isInteger(assignment.points) ||  // Check if it's an integer
    assignment.points < 0 ||                  // Check if it's non-negative
    assignment.points % 1 !== 0 ||            // Check if it's not a float
    isNaN(Number(assignment.points)) ||       // Check if it's not NaN
    assignment.points > 10                   // Check if it's less than or equal to 100
  ) {
    errors.push({ field: 'points', message: 'Points is required and must be a non-negative integer' });
  }
  

  if (!assignment.num_of_attempts || isNaN(Number(assignment.num_of_attempts)) ||  assignment.num_of_attempts < 0 || assignment.num_of_attempts > 100 ||   assignment.num_of_attempts % 1 !== 0 ) {
    errors.push({ field: 'num_of_attempts', message: 'Number of attempts is required and must be a number' });
  }
  if (!assignment.deadline || !isValidDate(assignment.deadline)) {
    errors.push({ field: 'deadline', message: 'Invalid date format for deadline' });
  }

  return errors.length === 0 ? null : errors;
};

const isValidDate = (dateString) => {
  const date = new Date(dateString);

  return !isNaN(date.getTime());
};

const validateAssignmentObject = (obj) => {
  const expectedProperties = ["name", "points", "num_of_attempts", "deadline"];

  for (const prop of expectedProperties) {
    if (!(prop in obj)) {
      return `Missing property: ${prop}`;
    }
  }

  for (const prop in obj) {
    if (!expectedProperties.includes(prop)) {
      return `Extra property: ${prop}`;
    }
  }

  return null; 
};

export const createAssignment = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const token = req.headers.authorization;
      if (!token) {
        logger.error('Unauthorized: Missing token');
        return res.status(401).send('Unauthorized: Missing token');
      }

      const credentials = await handleBasicAuthentication(token);

      if (!credentials.authenticated) {
        logger.error('Unauthorized: Invalid credentials');
        return res.status(401).send('Unauthorized: Invalid credentials');
      }

      const body = req.body;
      const validationErrors = validateAssignment(body);
      const validationStatus = validateAssignmentObject(body);

      if (validationErrors) {
        logger.error('Validation Errors:', validationErrors);
        return res.status(400).json({ errors: validationErrors });
      }
      if (validationStatus) {
        logger.error('Validation Status:', validationStatus);
        return res.status(400).json({ errors: validationStatus });
      }

      body.userId = credentials.userId;
      const assignment = await as.createAssignment(body);

      if (!assignment) {
        logger.error('Internal Server Error: Failed to create assignment');
        return res.status(500).send('Internal Server Error: Failed to create assignment');
      }

      logger.info('Assignment created successfully');
      return res.status(201).json(assignment);
    } else {
      logger.error('Bad Request');
      return res.status(400).send();
    }
  } catch (error) {
    logger.error('Error in createAssignment:', error);
    return res.status(500).send('Internal Server Error');
  }
};

export const getAssignments = async (req, res, next) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0 && Object.keys(req.query).length === 0) {
      const token = req.headers.authorization;

      if (!token) {
        logger.error('Unauthorized: Missing Authorization Token');
        return res.status(401).send('Unauthorized: Missing Authorization Token');
      }

      const credentials = await handleBasicAuthentication(token);

      if (!credentials.authenticated) {
        logger.error('Unauthorized: Invalid Credentials');
        return res.status(401).send('Unauthorized: Invalid Credentials');
      }

      const assignments = await as.getAllAssignments();

      logger.info('Retrieved all assignments successfully');
      res.status(200).json(assignments);
    } else {
      logger.error('Bad Request');
      res.status(400).send();
    }
  } catch (error) {
    logger.error('Error in getAssignments:', error);
    res.status(500).send('Internal Server Error');
  }
};
  
export const putAssignment = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const token = req.headers.authorization;
      const id = req.params.id;

      if (!token) {
        logger.error('Unauthorized: Missing Authorization Token');
        return res.status(401).send('Unauthorized: Missing Authorization Token');
      }

      const credentials = await handleBasicAuthentication(token);

      if (!credentials.authenticated) {
        logger.error('Unauthorized: Invalid Credentials');
        return res.status(401).send('Unauthorized: Invalid Credentials');
      }

      const body = req.body;
      const validationErrors = validateAssignment(body);
      const validationStatus = validateAssignmentObject(body);

      if (validationErrors) {
        logger.error('Validation Errors:', validationErrors);
        return res.status(400).json({ errors: validationErrors });
      }
      if (validationStatus) {
        logger.error('Validation Status:', validationStatus);
        return res.status(400).json({ errors: validationStatus });
      }

      body.userId = credentials.userId;
      const assignment = await as.getAssignmentById(id);

      if (!assignment) {
        logger.error('Not Found: Assignment not found');
        return res.status(404).send('Not Found: Assignment not found');
      }

      if (assignment.userId === credentials.userId) {
        if (!req.body || Object.keys(req.body).length === 0) {
          logger.error('Bad Request: Empty request body');
          return res.status(400).send(); 
        }

        await as.updateAssingmentById(body, id);
        logger.info('Assignment updated successfully');
        return res.status(204).send();
      } else {
        logger.error('Forbidden: You do not have permission to update this assignment');
        return res.status(403).send('Forbidden: You do not have permission to update this assignment');
      }
    } else {
      logger.error('Bad Request');
      res.status(400).send();
    }
  } catch (error) {
    logger.error('Error in putAssignment:', error);
    res.status(500).send('Internal Server Error');
  }
};
  
  export const deleteAssignmentById = async (req, res, next) => {
    try {
      if (req.body.constructor === Object && Object.keys(req.body).length === 0 && Object.keys(req.query).length === 0) {
        const token = req.headers.authorization;
        const id = req.params.id;
  
        if (!token) {
          logger.error('Unauthorized: Missing Authorization Token');
          return res.status(401).send('Unauthorized: Missing Authorization Token');
        }
  
        const credentials = await handleBasicAuthentication(token);
  
        if (!credentials.authenticated) {
          logger.error('Unauthorized: Invalid Credentials');
          return res.status(401).send('Unauthorized: Invalid Credentials');
        }
  
        const assignment = await as.getAssignmentById(id);
  
        if (!assignment) {
          logger.error('Not Found: Assignment not found');
          return res.status(404).send('Not Found: Assignment not found');
        }
  
        if (assignment.userId === credentials.userId) {
          const exists = await assignmentExists(id);
          if(exists){
            return res.status(403).send("Cannot delete assignment: Submission exists");
          }
          await as.deleteAssignmentById(id);
          logger.info('Assignment deleted successfully');
          return res.status(204).send();
        } else {
          logger.error('Forbidden: You do not have permission to delete this assignment');
          return res.status(403).send('Forbidden: You do not have permission to delete this assignment');
        }
      } else {
        logger.error('Bad Request');
        res.status(400).send();
      }
    } catch (error) {
      logger.error('Error in deleteAssignmentById:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
export const getAssignmentById = async (req, res, next) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0 && Object.keys(req.query).length === 0) {
      const token = req.headers.authorization;
      const id = req.params.id;

      if (!token) {
        logger.error('Unauthorized: Missing Authorization Token');
        return res.status(401).send('Unauthorized: Missing Authorization Token');
      }

      const credentials = await handleBasicAuthentication(token);

      if (!credentials.authenticated) {
        logger.error('Unauthorized: Invalid Credentials');
        return res.status(401).send('Unauthorized: Invalid Credentials');
      }

      const assignment = await as.getAssignmentById(id);
      
      if (!assignment) {
        logger.error('Not Found: Assignment not found');
        return res.status(404).send('Not Found: Assignment not found');
      }

      logger.info('Retrieved assignment by ID successfully');
      res.status(200).json(assignment);
    } else {
      logger.error('Bad Request');
      res.status(400).send();
    }
  } catch (error) {
    logger.error('Error in getAssignmentById:', error);
    res.status(500).send('Internal Server Error');
  }
};
  