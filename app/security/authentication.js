import { findUserByNameAndPass } from "../service/userService.js";
import bcrypt from 'bcrypt';

const handleBasicAuthentication = async(headerString) => {
    if (headerString) {
        // console.log(headerString);
      const base64Credentials = headerString.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [username, password] = credentials.split(':');

      const user = await findUserByNameAndPass(username);
      console.log("inside authentication");
    //   console.log(user);
    // console.log(user.id);

    // console.log(user.id);
    try {
        const match = await bcrypt.compare(password, user.password);
    
        if (match) {
          console.log('Authenticated successfully');
          return {
            authenticated: true,
            userId:user.id
            // userId:user.
          };
        } else {
          console.log('Password is incorrect');
          return { authenticated: false };
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        return { authenticated: false };
      }
    }
    //   console.log(user);
    
    else{
        return {
            authenticated: false,
          };
    }
  };
  
export default handleBasicAuthentication;  