import { getToken} from 'firebase/messaging';
import { messaging } from '../firebase-config';

//....

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BHOUcLL5InGTXfdwBtquZC0P5E9J3kdn4Peu143ltd_H-5GowhaNt7Jmsv3TFkTTF1TteDPcmlYVw97w8z-Xt9w' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};