import React, {useState, useReducer} from 'react';
import {AppPageBack, H1, H2, P, Button, Dropdown, ListWrapGeneral} from '../../components/component';
import {Container, SizedBox, ScrollArea, ImageWrap, TouchWrap, Avatar, Rounded} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import {Modal, Alert} from 'react-native';
import Colors from '../../helpers/colors';
import numeral from 'numeral';
import {useStoreState} from 'easy-peasy';

const Checkout = props => {
  const planType = props.route.params;

  const {user} = useStoreState(state => ({
    user: state.userDetails.user,
  }));

  const [loading, setLoading] = useState(false);
  const [selectOption, setSelectOption] = useState('');

  const goToPay = () => {
    if (selectOption === '') {
      Alert.alert('AGS', 'Please select a payment option');
      return;
    }
    //setLoading(true)
    if (selectOption === 'card') {
      let route = `${selectOption}_${planType.details.type}`;
      props.navigation.navigate('Webview', route);
    }

    if (selectOption === 'paypal') {
      let route = `${selectOption}_${planType.details.type}`;
      props.navigation.navigate('Webview', route);
    }
  };

  return (
    <AppPageBack {...props}>
      <ScrollArea>
        <Container paddingTop={6} marginBottom={4} horizontalAlignment="center">
          <H1 fontSize={23}>Checkout</H1>
          <P fontSize={10} color={Colors.greyBase900}>
            Select one of the following method
          </P>
        </Container>

        <Container marginTop={4} marginBottom={4}>
          <TouchWrap onPress={() => setSelectOption('card')}>
            <Container
              direction="row"
              verticalAlignment="center"
              borderWidth={2}
              borderColor={selectOption === 'card' ? Colors.primary : '#dfdfdf'}
              paddingVertical={4}
              paddingHorizontal={5}
              borderRadius={10}>
              <Rounded size={4}>
                <ImageWrap source={require('../../../assets/img/icons/card.png')} />
              </Rounded>
              <SizedBox width={5} />
              <Container>
                <H1 fontSize={13}>Pay with Debit/Credit Card</H1>
                {/* <P fontSize={8}>som gist about card payment</P> */}
              </Container>
            </Container>
          </TouchWrap>

          <SizedBox height={2} />

          <TouchWrap onPress={() => setSelectOption('paypal')}>
            <Container
              marginBottom={2}
              direction="row"
              verticalAlignment="center"
              borderWidth={2}
              borderColor={selectOption === 'paypal' ? Colors.primary : '#dfdfdf'}
              paddingVertical={4}
              borderRadius={10}
              paddingHorizontal={5}>
              <Rounded size={4}>
                <ImageWrap source={require('../../../assets/img/icons/paypal.png')} />
              </Rounded>
              <SizedBox width={5} />
              <Container>
                <H1>Pay with PayPal</H1>
                {/* <P fontSize={8}>som gist about card paypal</P> */}
              </Container>
            </Container>
          </TouchWrap>
        </Container>

        <Button title="Proceed to Payment" loading={loading} onPress={goToPay} />
      </ScrollArea>
    </AppPageBack>
  );
};

export default Checkout;
