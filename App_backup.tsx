// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { withIAPContext } from 'react-native-iap';
// import SubscriptionScreen from './SubscriptionScreen';
// import MainAppContent from './MainAppContent';
// import * as RNIap from 'react-native-iap';

// const itemSubs = ['com.idenikey.subscription']; // Your subscription product ID

// const App = () => {
//   const [isSubscribed, setIsSubscribed] = useState(null);

//   const checkSubscription = async () => {
//     try {
//       await RNIap.initConnection();
//       const purchases = await RNIap.getAvailablePurchases();
//       console.log(purchases);
//       const subscription = purchases.find(
//         (purchase) => purchase.productId === itemSubs[0]
//       );

//       if (subscription) {
//         // Add client-side validation logic if necessary
//         setIsSubscribed(true);
//       } else {
//         setIsSubscribed(false);
//       }

//     } catch (err) {
//       console.warn(err.code, err.message);
//       setIsSubscribed(false);
//     } finally {
//       await RNIap.endConnection();
//     }
//   };

//   useEffect(() => {
//     checkSubscription();

//     // Polling mechanism to check subscription status every minute
//     const interval = setInterval(() => {
//       checkSubscription();
//     }, 60 * 1000); // 1 minute

//     return () => clearInterval(interval);
//   }, [isSubscribed]);

//   const updateSubscriptionStatus = () => { / Add the function here /
//       setIsSubscribed(true);
//   };

//   if (isSubscribed === null) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return isSubscribed ? <MainAppContent /> : <SubscriptionScreen onSubscribe={updateSubscriptionStatus} />;
// };

// export default withIAPContext(App);
