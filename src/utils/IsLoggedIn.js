import { getAuth } from 'firebase/auth';  

const IsLoggedIn = () => {
  const auth = getAuth();
  return ( auth.currentUser );
}
 
export default IsLoggedIn;