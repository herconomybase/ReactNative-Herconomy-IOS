import React, {useState, useEffect, useReducer} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {AppPageBack, H1, H2, P, Button, Dropdown, ListWrapGeneral} from '../../components/component';
import {Container, SizedBox, ScrollArea, scaleFont, ImageWrap, TouchWrap, Avatar, Rounded} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import {Modal, Alert} from 'react-native';
import Colors from '../../helpers/colors';
import numeral from 'numeral';
import {useStoreState} from 'easy-peasy';
import IAP from 'react-native-iap';

let purchaseUpdatedListener;
let purchaseErrorListener;
const PaymentOption = props => {
  const planType = props.route.params;

  const {user} = useStoreState(state => ({
    user: state.userDetails.user,
  }));

  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [subType, setSubType] = useState('');
  const [checking, setChecking] = useState(false);

  const validate = async receipt => {
    setChecking(true);
    const receiptBody = {
      'receipt-data': receipt,
      password: '23975d45cb714267b6210184d57261d3',
    };

    const result = await IAP.validateReceiptIos(receiptBody, true)
      .catch(err => {
        console.log(err);
      })
      .then(receipt => {
        try {
          console.log({receipt});
          const renewalHistory = receipt.latest_receipt_info;
          console.log({renewalHistory});
          const expiration = renewalHistory[renewalHistory.length - 1].expires_date_ms;
          console.log({expiration});
          let expired = Date.now() > expiration;
          // let expired = expiration < '1605537767001';

          const DateNow = Date.now(); // 1602710690936
          console.log('today', new Date(DateNow).toString());
          const expiring = 1605537767000; // 1602710690936
          console.log('expiring', new Date(expiring).toString());

          console.log({expired});
          //
          if (!expired) {
            setPurchased(true);
            if (renewalHistory[renewalHistory.length - 1].product_id === 'ags_gold_50000') {
              setSubType('Gold');
            } else {
              setSubType('Silver');
            }
          } else {
            setPurchased(false);
            Alert.alert('Purchased Expired', 'Your subscription has expired, please, resubscribe to continue');
          }
          setChecking(false);
        } catch (err) {
          console.log(err);
          setChecking(false);
        }
      });
  };

  useEffect(() => {
    IAP.getPurchaseHistory()
      .catch(err => {
        setChecking(false);
        console.log(err);
      })
      .then(res => {
        console.log({res});
        if (res) {
          if (res.length > 0) {
            const receipt = res[res.length - 1].transactionReceipt;
            if (receipt) {
              validate(receipt);
              // console.log(receipt);
            }
          }
        }
      });

    purchaseErrorListener = IAP.purchaseErrorListener(error => {
      if (error.responseCode === '2') {
        // user cancels
        setChecking(false);
      } else {
        setChecking(false);
        Alert.alert('Error', 'There has been an error with your purchase, error code = ' + error.code);
      }
    });

    purchaseUpdatedListener = IAP.purchaseUpdatedListener(purchase => {
      try {
        const receipt = purchase.transactionReceipt;
        console.log({receipt});

        // Validate receipt
        if (receipt) {
          validate(receipt);
        }

        // setPurchased(true);
      } catch (err) {}
    });
  }, []);

  const goToPay = () => {
    // props.navigation.navigate('Checkout', {details: planType});
    setChecking(true);
    console.log('initiate payment');
    IAP.requestSubscription(planType.productId);
  };

  console.log({purchased});

  return (
    <AppPageBack {...props}>
      <ScrollArea>
        <Container paddingTop={6} marginBottom={1} horizontalAlignment="center">
          <H1 fontSize={23}>Hi! {user.first_name}</H1>
          <P fontSize={10} textAlign="center" color={Colors.greyBase900}>
            We are glad to have you join us. Kindly make payment to unlock all the benefits of Gold plan.
          </P>
        </Container>
        {checking && (
          <Container horizontalAlignment="center">
            <ActivityIndicator size="small" color="gold" />
          </Container>
        )}
        <Container marginTop={4} marginBottom={10}>
          <H2 fontSize={18}>Transaction Summary</H2>
          {purchased && (
            <Container marginTop={2} direction="row" verticalAlignment="center" horizontalAlignment="space-between">
              <H2 fontSize={18} color="green">
                Active Subscription {subType}
              </H2>
              <Feather Icon name="check-circle" size={scaleFont(20)} color="green" />
            </Container>
          )}
          <Container direction="row" marginTop={4} horizontalAlignment="space-between">
            <P color={Colors.greyBase900}>Account Name</P>
            <H2>
              {user.first_name} {user.last_name}
            </H2>
          </Container>

          <Container direction="row" marginTop={4} horizontalAlignment="space-between">
            <P color={Colors.greyBase900}>Package</P>
            <H2>{planType.name} Plan</H2>
          </Container>

          <Container direction="row" marginTop={4} horizontalAlignment="space-between">
            <P color={Colors.greyBase900}>Billed</P>
            <H2>{planType.period}</H2>
          </Container>

          <Container direction="row" marginTop={4} horizontalAlignment="space-between">
            <P color={Colors.greyBase900}>Total Amount (1 {planType.type})</P>
            <H2>
              {planType.currency + ' '}
              {numeral(planType.price).format('0,0')}
            </H2>
          </Container>
        </Container>

        <Container marginBottom={2}>
          <Button title="Proceed to Checkout" loading={loading} onPress={goToPay} />
        </Container>
        <Container marginBottom={2}>
          {purchased && <Button title="Back To Plans" loading={loading} onPress={() => props.navigation.navigate('Upgrade')} />}
        </Container>
      </ScrollArea>
    </AppPageBack>
  );
};

export default PaymentOption;
