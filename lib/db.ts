import { TankRecord, UserRole } from './types';

import firebase from 'firebase/app';
import { firestore } from './firebase';

export const getUsers = () => {
  return firestore.collection('users');
  // .get()
  // .then((querySnapshot) => {
  //   return querySnapshot.docs.map((doc) => {
  //     const uid = doc.id;
  //     const data = doc.data();
  //     return { ...data, uid };
  //   });
  // });
};

/**
 * Modify a user's permissions. The calling user must have the admin
 * role or Firestore's security rules will return an error.
 */
export const setUserRole = (uid: string, role: UserRole) => {
  return firestore.collection('users').doc(uid).update({ role });
};

/**
 * Remove user from database. If the user tries to login, they will be assigned
 * the "pending" role.
 */
export const deleteUser = (uid: string) => {
  return firestore.collection('users').doc(uid).delete();
};

export const createTank = ({ id, data }) => {
  const time = new Date();
  return firestore
    .collection('tanks')
    .doc(id)
    .set({ time, ...data }, { merge: true });
};

// export const getTankHistroy = (tankId: string) => {
//   return firestore
//     .collection('tanks')
//     .doc(tankId)
//     .collection('history')
//     .orderBy('updatedAt', 'desc')
//     .get()
//     .then((querySnapshot) => {
//       return querySnapshot.docs.map((doc) => {
//         return doc.data() as TankRecord;
//       });
//     });
// };
