import React, {useState, useEffect, useRef} from 'react';
import {Platform, ActivityIndicator, Alert, Linking} from 'react-native';
import {AppPageBack, H1, P, Button, H2} from '../../components/component';
import {Container, SizedBox, scaleFont, ScrollArea, ImageWrap, Avatar, TouchWrap} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import {ToastShort} from '../../helpers/utils';
import Swiper from 'react-native-swiper';
import {ScrollView} from 'react-native-gesture-handler';
import numeral from 'numeral';
import Colors from '../../helpers/colors';
import {apiFunctions} from '../../helpers/api';
import {useStoreState, useStoreActions} from 'easy-peasy';
import PlanLady from '../../../assets/img/silver_lady.png';

import IAP from 'react-native-iap';

const items = Platform.select({
  ios: ['ags_gold_50000', 'ags_silver_5000'],
  android: [''],
});

const Plans = [
  {
    name: 'Silver',
    image: require('../../../assets/img/silver-plan.png'),
    price: 5000,
    period: 'Monthly',
    desc: 'Billed monthly',
    type: 'month',
    popular: false,
    currency: 'NGN',
    feature: [
      'Features Include:',
      'All features in free plan',
      'Unlimited Direct Messages - Reach out to anyone in the community and send a direct message to expand your network',
      'Resources - Access to live events and webinars with industry leaders.',
      'Referral Bonus - Get N500 if you refer someone who becomes a Silver Member.',
    ],
    productId: 'ags_silver_5000',
    subInfo:
      'subscriptions will be charged to your iTunes account at confirmation of purchase and will automatically renew after one month unless auto-renew is turned off at least 24 hrs before the end of the current period.\n  • Account will be charged for renewal within 24-hours prior to the end of the current period\n  • Current subscription may not be cancelled during the active subscription period; however, you can manage your subscription and/or turn off auto-renewal by visiting your iTunes Account Settings after purchase.\n',
  },
  {
    name: 'Gold',
    image: require('../../../assets/img/gold-plan.png'),
    price: 50000,
    period: 'Annually',
    desc: 'Billed annually',
    type: 'year',
    popular: true,
    currency: 'NGN',
    feature: [
      'Features Include:',
      'All features in silver plan',
      'Referral Bonus - Get N1,000 if you refer someone who becomes a Gold Member',
      'Get up to 30% discounts on products and services from some of the best brands in Africa through the Tribe Gold Card',
    ],
    productId: 'ags_gold_50000',
    subInfo:
      'subscriptions will be charged to your iTunes account at confirmation of purchase and will automatically renew after one year, unless auto-renew is turned off at least 24 hrs before the end of the current period.\n  • Account will be charged for renewal within 24-hours prior to the end of the current period\n  • Current subscription may not be cancelled during the active subscription period; however, you can manage your subscription and/or turn off auto-renewal by visiting your iTunes Account Settings after purchase.\n',
  },
];

let purchaseUpdatedListener;
let purchaseErrorListener;

const Payments = props => {
  const swiper = useRef(null);
  const tabs = props.route.params ? props.route.params.tabs : [4, 6];
  const [purchased, setPurchased] = useState(false);
  const [products, setProducts] = useState([]);
  const [checking, setChecking] = useState(false);
  const [subType, setSubType] = useState('');
  const [init, setInit] = useState(false);
  const [sub_plans, setPlans] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [yearlyPrice, setYearlyPrice] = useState('');

  const privacyPolicyUrl = 'https://www.agstribe.org/privacy-policy';
  const termsUrl = 'https://www.agstribe.org/terms/';

  const {user, token} = useStoreState(state => ({
    user: state.userDetails.user,
    token: state.userDetails.token,
  }));

  Plans[0].price = monthlyPrice;
  Plans[1].price = yearlyPrice;

  useEffect(() => {
    IAP.initConnection()
      .catch(() => {
        console.log('error connection to store');
      })
      .then(() => {
        console.log('connected to store...');
        // IAP.getSubscriptions(items)
        IAP.getSubscriptions(items)
          .catch(err => {
            console.log(err);
          })
          .then(res => {
            console.log('got products');
            console.log({res});
            //return
            setYearlyPrice(res[0].localizedPrice);
            setMonthlyPrice(res[1].localizedPrice);
            setInit(true);
            setProducts(res);
          });
      });

    // eslint-disable-next-line
  }, []);

  const {_updateSubscriptionStatus} = useStoreActions(actions => ({
    _updateSubscriptionStatus: actions.userDetails.updateSubscriptionStatus,
  }));

  const sendReceipt = async purchase => {
    let fd = {
      receipt: purchase.transactionReceipt,
    };
    await apiFunctions
      .sendReceipt(token, fd)
      .then(async res => {
        setChecking(false);
        console.log({res});
        if (res) {
          if (res.sub_status === true) {
            await IAP.finishTransactionIOS(purchase.transactionId);
            if (res.plan.name === 'ags_silver_5000') {
              setSubType('Silver');
            } else {
              setSubType('Gold');
            }

            setChecking(false);
            ToastShort('Subscribed');
            // _updateSubscriptionStatus(res);
            setTimeout(() => {
              // props.navigation.goBack();
              setPurchased(true);
            }, 2000);
          }
        }
      })
      .catch(err => {
        console.log("reciept_err",err)
        ToastShort('Error, please try again later');
        setChecking(false);
      });
  };

  useEffect(() => {
    setChecking(true);
    IAP.getPurchaseHistory()
      .catch(err => {
        setChecking(false);
      })
      .then(res => {
        setChecking(false);
        console.log({res});
        if (res) {
          if (res.length > 0) {
            const receipt = res[res.length - 1].transactionReceipt;
            if (receipt) {
              sendReceipt(res[res.length - 1]);
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
        // Alert.alert('Error', 'There has been an error with your purchase, error code = ' + error.code);
        ToastShort('Subscription Error, please try again later');
      }
    });

    purchaseUpdatedListener = IAP.purchaseUpdatedListener(async purchase => {
      try {
        const receipt = purchase.transactionReceipt;
        // Validate receipt
        // if (receipt) {
        //   await validate(receipt);
        //   // await IAP.finishTransaction(purchase);
        // }
        if (receipt) {
          sendReceipt(purchase);
          // await IAP.finishTransaction(purchase);
        }
        // setPurchased(true);
      } catch (err) {
      }
    });

    return () => {
      if (purchaseUpdatedListener) {
        purchaseUpdatedListener.remove();
        purchaseUpdatedListener = null;
      }

      if (purchaseErrorListener) {
        purchaseErrorListener.remove();
        purchaseErrorListener = null;
      }
    };
    //eslint-disable-next-line
  }, []);

  const goToPay = async id => {
    setChecking(true);
    try {
      IAP.requestSubscription(id);
      setChecking(false);
    } catch (err) {
      console.log("requestSubscription",err)
    }
  };

  const openTerms = () => {
    Linking.openURL(termsUrl);
  };

  const openPrivacyPolicy = () => {
    Linking.openURL(privacyPolicyUrl);
  };

  // console.log(tabs);
  let g = Plans.filter(item => item.name === 'Gold');

  return (
    <AppPageBack title="Choose A Plan" {...props}>
      <Container flex={1} paddingBottom={4}>
        {tabs.length > 1 ? (
          <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
            {Plans.map((el, i) => (
              <Container
                key={i}
                width={68}
                marginLeft={0}
                marginBottom={1}
                marginRight={4}
                marginTop={3}
                borderRadius={20}
                backgroundColor={el.name === 'Silver' ? '#efefef' : '#EBDFC4'}
                padding={4}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 1.41,
                  elevation: 1,
                }}>
                <ScrollArea>
                  <ImageWrap borderRadius={10} elevation={5} source={el.image} height={15} fit="contain" />
                  {checking && (
                    <Container horizontalAlignment="center" marginTop={2}>
                      <ActivityIndicator size="small" color="black" />
                    </Container>
                  )}
                  <Container
                    horizontalAlignment="center"
                    marginTop={0}
                    borderWidth={0.2}
                    // marginBottom={2}
                    padding={3}
                    paddingVertical={2}
                    borderRadius={5}>
                    <H2 color={Colors.text} fontSize={28} style={{fontWeigt: '700'}}>
                      {el.name.toUpperCase()}
                    </H2>
                    <H1 color={Colors.black} fontSize={22}>
                      {/*numeral(el.price).format('0,0')*/}
                      {el.price}
                    </H1>

                    <SizedBox height={1} />

                    <P textAlign="center" fontSize={16}>
                      {el.desc}
                    </P>
                  </Container>
                  {purchased && (
                    <Container direction="row" verticalAlignment="center" horizontalAlignment="space-between">
                      <H2 fontSize={10} color="green">
                        Active Subscription {subType}
                      </H2>
                      <Feather Icon name="check-circle" size={scaleFont(20)} color="green" />
                    </Container>
                  )}

                  <Container marginBottom={6} widthPercent="100%">
                    {el.feature.map((ell, ii) => (
                      <Container paddingVertical={1} direction="row" flex={1} key={ii} widthPercent="85%">
                        <SizedBox width={3} />
                        <Container
                          flex={1}
                          direction="row"
                          verticalAlignment="flex-start"
                          horizontalAlignment="flex-start"
                          widthPercent="85%">
                          <Feather Icon name="check" size={scaleFont(14)} color="#FFAC30" style={{marginRight: 5, paddingTop: 2}} />
                          <P fontSize={10}>{ell}</P>
                        </Container>
                      </Container>
                    ))}
                  </Container>

                  <Container horizontalAlignment="center" paddingHorizontal={1}>
                    <P fontSize={6} color="gray" textAlign="center">
                      {el.subInfo}
                    </P>
                  </Container>

                  <Container horizontalAlignment="center">
                    <Container marginBottom={1}>
                      <TouchWrap onPress={openTerms}>
                        <P fontSize={7} color="gray">
                          Terms Of Service
                        </P>
                      </TouchWrap>
                    </Container>
                    <Container marginBottom={1}>
                      <TouchWrap onPress={openPrivacyPolicy}>
                        <P fontSize={7} color="gray">
                          Privacy Policy
                        </P>
                      </TouchWrap>
                    </Container>
                  </Container>
                </ScrollArea>
                <SizedBox height={1} />
                {init ? (
                  <Button title="Choose Plan" onPress={() => goToPay(el.productId)} />
                ) : (
                  <ActivityIndicator size="small" color="gray" />
                )}

                <SizedBox height={2} />
                {purchased && <Button title="go back" onPress={() => props.navigation.goBack()} />}
              </Container>
            ))}
          </ScrollView>
        ) : (
          <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
            {Plans.filter(item => item.name === 'Gold').map((el, i) => (
              <Container
                key={i}
                width={68}
                marginLeft={8}
                marginBottom={1}
                // marginRight={4}
                marginTop={3}
                borderRadius={20}
                backgroundColor={el.name === 'Silver' ? '#efefef' : '#EBDFC4'}
                padding={4}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 1.41,
                  elevation: 1,
                }}>
                <ScrollArea>
                  <ImageWrap borderRadius={10} elevation={5} source={el.image} height={15} fit="contain" />
                  {checking && (
                    <Container horizontalAlignment="center" marginTop={2}>
                      <ActivityIndicator size="small" color="black" />
                    </Container>
                  )}
                  <Container
                    horizontalAlignment="center"
                    marginTop={0}
                    borderWidth={0.2}
                    // marginBottom={2}
                    padding={3}
                    paddingVertical={2}
                    borderRadius={5}>
                    <H2 color={Colors.text} fontSize={28} style={{fontWeigt: '700'}}>
                      {el.name.toUpperCase()}
                    </H2>
                    <H1 color={Colors.black} fontSize={22}>
                      {el.price}
                    </H1>

                    <SizedBox height={1} />

                    <P textAlign="center" fontSize={16}>
                      {el.desc}
                    </P>
                  </Container>
                  {purchased && (
                    <Container direction="row" verticalAlignment="center" horizontalAlignment="space-between">
                      <H2 fontSize={12} color="green">
                        Active Subscription {subType}
                      </H2>
                      <Feather Icon name="check-circle" size={scaleFont(20)} color="green" />
                    </Container>
                  )}

                  <Container marginBottom={6} widthPercent="100%">
                    {el.feature.map((ell, ii) => (
                      <Container paddingVertical={1} direction="row" flex={1} key={ii} widthPercent="85%">
                        <SizedBox width={3} />
                        <Container
                          flex={1}
                          direction="row"
                          verticalAlignment="flex-start"
                          horizontalAlignment="flex-start"
                          widthPercent="85%">
                          <Feather Icon name="check" size={scaleFont(14)} color="#FFAC30" style={{marginRight: 5, paddingTop: 2}} />
                          <P fontSize={10}>{ell}</P>
                        </Container>
                      </Container>
                    ))}
                  </Container>

                  <Container horizontalAlignment="center" paddingHorizontal={1}>
                    <P fontSize={6} color="gray" textAlign="center">
                      {el.subInfo}
                    </P>
                  </Container>

                  <Container horizontalAlignment="center">
                    <Container marginBottom={1}>
                      <TouchWrap onPress={openTerms}>
                        <P fontSize={7} color="gray">
                          Terms Of Service
                        </P>
                      </TouchWrap>
                    </Container>
                    <Container marginBottom={1}>
                      <TouchWrap onPress={openPrivacyPolicy}>
                        <P fontSize={7} color="gray">
                          Privacy Policy
                        </P>
                      </TouchWrap>
                    </Container>
                  </Container>
                  {/* <Container horizontalAlignment="center" paddingTop={2}>
          <P textAlign="center" fontSize={10}>
            Have a membership code. <H1>Redeem Now</H1>
          </P>

          <P>or</P>

          <H1>Gift someone</H1>
        </Container> */}
                </ScrollArea>
                <SizedBox height={1} />
                {init ? (
                  <Button title="Choose Plan" onPress={() => goToPay(el.productId)} />
                ) : (
                  <ActivityIndicator size="small" color="gray" />
                )}

                <SizedBox height={2} />
                {purchased && <Button title="go back" onPress={() => props.navigation.goBack()} />}
              </Container>
            ))}
          </ScrollView>
        )}
      </Container>
    </AppPageBack>
  );
};

export default Payments;
