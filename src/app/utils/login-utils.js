
import { AUTHENTICATION } from '../../constants/enums'; 

/**
 * Mock function for credentials
 * @param {*} credentials 
 */
const authenticate = ({encodedUsername, encodedPassword}) => {
    console.log(encodedUsername, encodedPassword);

    return (
        (encodedUsername && encodedPassword) 
        ? (encodedUsername === AUTHENTICATION.MOCK_USERNAME && encodedPassword === AUTHENTICATION.MOCK_PASSWORD) 
        : false
    );
}
    

export default authenticate;