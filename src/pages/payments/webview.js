import React, {useState, useRef, useEffect} from 'react';
import ProgressWebView from 'react-native-progress-webview';
import Colors from '../../helpers/colors';
import {Container, SizedBox, scaleFont, TouchWrap} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import {color} from 'react-native-reanimated';
import {H1} from '../../components/component';
import {useNavigation} from '@react-navigation/native';

const paymentRoutes = {
  card_year: 'https://paystack.com/pay/agstribeyearly',
  card_month: 'https://paystack.com/pay/2oy9cddbnv',
  paypal_month: 'https://paystack.com/pay/agstribemonthly',
  paypal_year: 'https://paystack.com/pay/agstribemonthly',
};

const Webview = props => {
  const navigation = useNavigation();
  const webView = useRef(null);
  const route = props.route.params;
  const [url] = useState(paymentRoutes[route]);
  console.log('paymentRoutes<<<', paymentRoutes);
  const [loadingColor, setLoadingColor] = useState(Colors.primary);

  const pageLoadingStart = evt => {
    setLoadingColor(Colors.primary);
  };

  const loadProgress = evt => {
    setLoadingColor(Colors.primary);
  };

  const pageLoadingEnd = evt => {
    let pageTitle = evt.nativeEvent.title;
  };

  return (
    <Container flex={1}>
      <Container backgroundColor={Colors.primary}>
        <SizedBox height={6} />
        <Container paddingHorizontal={6} direction="row" verticalAlignment="center" horizontalAlignment="space-between">
          <TouchWrap onPress={() => props.navigation.goBack()}>
            <Feather Icon name="x" size={scaleFont(20)} color="#fff" />
          </TouchWrap>

          <TouchWrap onPress={() => navigation.navigate('Home', {screen: 'Home'})}>
            <H1 color="#fff">Close</H1>
          </TouchWrap>
        </Container>
        <SizedBox height={2} />
      </Container>
      <ProgressWebView
        source={{uri: url}}
        color={loadingColor}
        ref={webView}
        onLoadEnd={pageLoadingEnd}
        onLoadStart={pageLoadingStart}
        onLoadProgress={loadProgress}
      />
    </Container>
  );
};

export default Webview;
