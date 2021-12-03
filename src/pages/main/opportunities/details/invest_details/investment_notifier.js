import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Dimensions, Button, Image} from 'react-native';
import {Page, Container, TouchWrap, SizedBox, scaleFont} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import {ToastLong, ToastShort, randomString} from '../../../../../helpers/utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dash from 'react-native-dash';
import {apiFunctions} from '../../../../../helpers/api';
import {useStoreState} from 'easy-peasy';
import {Alert} from 'react-native';
import {ModalWebView} from '../../../../../helpers/paystack_webview';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

function InvestmentNotifier({navigation, route}) {
  const {investment, unit_count, payload} = route.params;
  const {token, user} = useStoreState(state => ({
    token: state.userDetails.token,
    user: state.userDetails.user,
  }));

  console.log('<<<<INVESTMENT>>>>>', investment);
  console.log('<<<<UNITCOUNT>>>>>', unit_count);
  console.log('<<<<PAYLOAD>>>>>', payload);

  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const invest = () => {
    setShowModal(true);
  };

  const transactionHandler = async data => {
    setLoading(false);
    var webResponse = JSON.parse(data);
    setShowModal(false);
    switch (
      webResponse.message //i used paymentStatus here, it might be diff from yours. know the right one to use wen u log out webResponse
    ) {
      case 'USER_CANCELLED':
        {
          setShowModal(false);
        }
        break;
      case 'Approved': {
        try {
          // verify the ref here by sending it back to the backend
          let fd = {
            investment_id: investment.id,
            reference: webResponse.reference,
          };
          let response = await apiFunctions.payInvestment(token, fd);
          console.log(response);
          navigation.navigate('Oppo');
          Alert.alert('Herconomy', 'Payment was successful');
        } catch (error) {
          console.log('>>', Object.values(error.msg)[0][0]);
          return Object.values(error.msg)[0] && Object.values(error.msg)[0][0]
            ? ToastShort(Object.values(error.msg)[0][0])
            : Object.values(error.msg)[0]
            ? Object.values(error.msg)[0]
            : ToastShort('Connection Error. Please try again');
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchWrap paddingRight={5} paddingTop={1.5} paddingBottom={1.5} paddingHorizontal={6} onPress={() => navigation.goBack()}>
        <Feather Icon name="chevron-left" size={scaleFont(25)} color="gray" />
      </TouchWrap>
      <View style={styles.icon__section}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../../../../assets/img/agsLogo_dark.png')}
            style={{width: '80%', height: '80%', resizeMode: 'contain'}}
          />
        </View>
        <Dash style={{width: '10%', height: 1}} />
        <View style={styles.iconContainer}>
          <Image source={require('../../../../../../assets/img/money.png')} style={{width: '50%', height: '50%', resizeMode: 'contain'}} />
        </View>
      </View>
      <View style={styles.payment__info}>
        <MaterialCommunityIcons name="door-open" size={30} color="#CCCCCC" />
        <Text style={styles.payment__infoText}>You are about to leave the app to go to an external investment service.</Text>
      </View>
      <View style={styles.payment__info}>
        <Icon name="lock" size={30} color="#CCC" />
        <Text style={styles.payment__infoText}>The investment service does not unlock additional content within the app</Text>
      </View>
      <Button title="Continue" onPress={() => invest()} />

      {Object.keys(payload).length > 0 && (
        <ModalWebView
          payload={payload}
          isLoading={isLoading}
          transactionHandler={transactionHandler}
          setLoading={setLoading}
          isLoading={isLoading}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}

      <Text style={styles.note__text}>
        This Organization is able to receive tax-deductible contributions based on their federal and/or state tax-exemption status
      </Text>
    </SafeAreaView>
  );
}

export default InvestmentNotifier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon__section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
    marginTop: '20%',
    marginBottom: '20%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 6,
    width: width / 3,
    // backgroundColor: 'white',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    // shadowColor: '#000',

    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  payment__info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  payment__infoText: {
    width: '60%',
    paddingLeft: 10,
    color: 'gray',
  },
  note__text: {
    position: 'absolute',
    bottom: height / 20,
    paddingHorizontal: 20,
    textAlign: 'center',
    alignSelf: 'center',
    // width: '80%',
    color: 'gray',
  },
});
