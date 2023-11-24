import logger from "../../logger/logger.js";
import { findUserByNameAndPass } from "../service/userService.js";
import bcrypt from 'bcrypt';

const handleBasicAuthentication = async(headerString) => {
    if (headerString) {
      const base64Credentials = headerString.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [username, password] = credentials.split(':');

      const user = await findUserByNameAndPass(username);
      // logger.info(`User '${username}' attempted authentication.`);

      console.log("inside authentication");

    try {
        const match = await bcrypt.compare(password, user.password);
    
        if (match) {
          // logger.info(`User '${username}' authenticated successfully.`);

          console.log('Authenticated successfully');
          return {
            authenticated: true,
            userId:user.id,
            email:user.email
          };
        } else {
          logger.warn(`User '${username}' authentication failed - Incorrect password.`);

          console.log('Password is incorrect');
          return { authenticated: false };
        }
      } catch (error) {
        logger.error(`Error during authentication for user '${username}': ${error}`);

        console.error('Error comparing passwords:', error);
        return { authenticated: false };
      }
    }
    
    else{
        return {
            authenticated: false,
          };
    }
  };
  
export default handleBasicAuthentication;  