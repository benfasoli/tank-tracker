// import { ReactNode } from 'react';
// import { TankHistory } from '../lib/types';
// import firebase from 'firebase/app';
// import { firestore } from '../lib/firebase';
// import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

// type Props = {
//   children: ReactNode;
// };

// const TanksProvider = ({ children }) => {
//   const [tanks] = useCollectionDataOnce<TankHistory>(
//     firestore.collection('tanks').limit(15),
//     {
//       idField: 'tankId',
//       refField: 'docRef',
//       transform: (documentData: firebase.firestore.DocumentData) =>
//         Object.fromEntries(
//           Object.entries(documentData).map(([key, value]) => {
//             console.log({ key, value });
//             if (
//               value !== null &&
//               typeof value === 'object' &&
//               'toDate' in value
//             ) {
//               value = value.toDate();
//             }
//             return [key, value];
//           })
//         ) as TankHistory,
//     }
//   );

//   return { children };
// };

// export default TanksProvider;
