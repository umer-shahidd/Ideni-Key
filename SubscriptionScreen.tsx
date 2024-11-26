// import React, { useEffect, useState } from 'react';
// import { View, Dimensions, ImageBackground, Image, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
// import { useIAP, getSubscriptions, requestSubscription, finishTransaction, acknowledgePurchaseAndroid } from 'react-native-iap';

// const subscriptionSkus = ['com.idenikey.subscription'];
// const image = { uri: 'https://calik.app/img/idenikeyLogo.png' };
// const { width } = Dimensions.get('window');
// const scale = width / 320; // based on iphone 5s's width

// const SubscriptionScreen = ({ onSubscribe }) => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const { connected, currentPurchase } = useIAP();

//   useEffect(() => {
//     if (connected) {
//       getSubscriptions({ skus: subscriptionSkus }).then((products) => {
//         setSubscriptions(products);
//       }).catch((error) => {
//         console.error('Error fetching subscriptions', error);
//       });
//     }
//   }, [connected]);

//   useEffect(() => {
//     if (currentPurchase) {
//       const { purchaseToken, isAcknowledged } = currentPurchase;
//       if (!isAcknowledged) {
//         acknowledgePurchaseAndroid({ purchaseToken });
//       }
//       finishTransaction(currentPurchase);
//       onSubscribe();
//     }
//   }, [currentPurchase]);

//   const handleSubscribe = async (subscription) => {
//     const subscriptionOffers = [{ sku: subscription.productId, offerToken: subscription.subscriptionOfferDetails[0].offerToken }];
//     try {
//       await requestSubscription({ subscriptionOffers });
//     } catch (error) {
//       console.error('Error requesting subscription', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={require('./assets/background_img.jpeg')} resizeMode="cover" style={styles.bgimage}>
//         <View style={styles.logocontainer}>
//           <Image resizeMode="contain" style={styles.headerLogo} source={image} />
//         </View>
//         <View style={styles.subcontainer}>
//           {subscriptions.map((subscription) => (
//             <View key={subscription.productId}>
//               <Text style={styles.productTitle}>{subscription.title}</Text>
//               <Text style={styles.price}>
//                 {subscription.description} for {subscription.subscriptionOfferDetails[0].pricingPhases.pricingPhaseList[0].formattedPrice} per month
//               </Text>
//               <View style={styles.btncontainer}>
//                 <TouchableOpacity style={styles.btn} onPress={() => handleSubscribe(subscription)} >
//                   <Text style={{ color: '#fff' }}>SUBSCRIBE</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   bgimage: {
//     flex: 1,
//     padding: 14,
//   },
//   logocontainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: '20%',
//   },
//   headerLogo: {
//     width: 200, height: 200,
//   },
//   subcontainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: 'white',
//     fontSize: 20 * scale,
//     fontWeight: 'normal',
//     marginBottom: 20,
//   },
//   product: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   productTitle: {
//     color: 'white',
//     fontSize: 18 * scale,
//     fontWeight: 'bold',
//   },
//   price: {
//     fontSize: 14 * scale,
//     color: 'white',
//     marginVertical: '10%',
//   },
//   btncontainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btn: {
//     backgroundColor: '#0E3050',
//     alignItems: 'center',
//     width: 200,
//     padding: 15,
//     borderRadius: 20,
//     fontWeight: 'bold',
//   },
// });

// export default SubscriptionScreen;
