import React, {useState, useRef} from 'react';
import {TouchWrap, Container, ScrollArea, ImageWrap, SizedBox, scaleFont, InputWrap, TextWrap} from 'simple-react-native-components';
import {Dimensions} from 'react-native';
import {H1, H2, P, CheckBok} from '../../components/component';
import {useStoreActions} from 'easy-peasy';
import {RouteContext} from '../../helpers/routeContext';
import Colors from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {View, ActivityIndicator, Keyboard, Alert, Platform, Linking} from 'react-native';
import {ToastLong} from '../../helpers/utils';
import {GoogleSignin} from '@react-native-community/google-signin';
import {storeData, getData} from '../../helpers/functions';
import {apiFunctions} from '../../helpers/api';
import {appleAuth, AppleButton} from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import {endPoint} from '../../helpers/api';
import { FONTSIZE } from '../../helpers/constants';

const width = Dimensions.get('window').width;
console.log({width});

const Welcome = props => {
  const inputOne = useRef(null);
  const {currentStack, setCurrentState} = React.useContext(RouteContext);

  const [loading, setLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loginAction = useStoreActions(actions => actions.userDetails.appLogin);

  const updateUser = useStoreActions(actions => actions.userDetails.updateUser);
  const updateToken = useStoreActions(actions => actions.userDetails.updateToken);

  const submitGoogleSign = async () => {
    try {
      let {idToken} = await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      processUser(user.givenName, user.familyName, user.email, user.id, user.id);
    } catch (error) {
      console.log({error});
    }
  };

  const processUser = async (first_name, last_name, email, password1, password2) => {
    setLoading(true);
    try {
      let fd = {first_name, last_name, email, password1, password2};
      let res = await apiFunctions.registration(fd);
      updateUser(res.user);
      updateToken(res.token);
      global.token = res.token;
      console.log(res);
      if (res) {
        setLoading(false);
        setCurrentState('onboard');
      }
    } catch (error) {
      console.log('Error>>>', error);
      setLoading(false);
      if (error.status === 500) {
        return ToastLong('Connection Error. Please try again later');
      }
      if (error.msg) {
        if (error.msg.email) {
          Alert.alert('Herconomy', error.msg.email[0]);
          return;
        }
      }
      if (error.msg.non_field_errors) {
        Alert.alert('Herconomy', error.msg.non_field_errors[0]);
      }
      console.log(error);
    }
  };

  const loadUserName = async () => {
    let getEmail = await getData('email');
    if (getEmail) {
      setEmail(getEmail.email);
    }
  };

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (appleAuthRequestResponse) {
      // console.log(appleAuthRequestResponse);
      appleSignup(appleAuthRequestResponse);
    }

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }

  const appleSignup = async response => {
    setAppleLoading(true);
    console.log('payload', response);
    let url = `${endPoint}/rest-auth/apple_registration/`;
    console.log({url});

    await axios(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: response,
    })
      .then(res => {
        console.log({res});
        // console.log('response', res.data);
        setAppleLoading(false);
        updateUser(res.user);
        updateToken(res.token);
        global.token = res.token;
        // console.log(res);
        if (res) {
          setLoading(false);
          setCurrentState('onboard');
        }
      })
      .catch(error => {
        console.log(error.response);
        setAppleLoading(false);
        if (error.response.data.email) {
          appleSignin(response);
          return;
        }

        if (error.response.data.message) {
          // Alert.alert('Herconomy', error.response.data.message);
          appleSignin(response);
          return;
        }

        setAppleLoading(false);

        console.log('err', error.response);
        console.log('err2', error.response.data);
        if (error.status === 500) {
          return ToastLong('Connection Error. Please try again later');
        }
      });
  };

  const appleSignin = async response => {
    console.log('payload', response);
    setAppleLoading(true);
    let url = `${endPoint}/rest-auth/apple_auth/`;
    await axios(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: response,
    })
      .then(res => {
        console.log('applelogin', res.data, 'onboarded', res.data.onboarded);
        updateUser(res.data.user);
        updateToken(res.data.token);
        global.token = res.token;
        res.data.user.onboarded ? setCurrentState('main') : setCurrentState('onboard');

        setAppleLoading(false);
      })
      .catch(err => {
        console.log('ERROR', err.response.data.message);
        setAppleLoading(false);
        console.log(err.response.data.message);
        ToastLong(err.response.data?.message);
        // console.log('err', err.response.data?.non_field_errors[0]);
        // ToastLong(err.response.data?.non_field_errors[0]);
      });
  };

  React.useEffect(() => {
    loadUserName();
    GoogleSignin.configure({
      webClientId: '470433460061-5aookol460l1qt77r02doc9u8ic3ab1h.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Container flex={1} backgroundColor={Colors.primary} verticalAlignment="center" paddingHorizontal={3}>
        <SizedBox height={4} />

        <ScrollArea flexGrow={1}>
          <Container flex={1} verticalAlignment="center">
            <ImageWrap source={require('../../../assets/img/agsLogo_dark.png')} fit="contain" height={8} />
          </Container>

          <Container backgroundColor={Colors.primary} paddingTop={3} flex={1}>
            <Container paddingHorizontal={2} marginBottom={1}>
              <H1 color={Colors.black} textAlign="center" fontSize={FONTSIZE.semiBig}>
                Sign up to join Africa's first community for empowered women combined with financial platform.
                Men who believe in the empowerment of women are also welcome to join.
              </H1>

              <SizedBox height={2} />

              <Container flex={1} backgroundColor={Colors.primary} borderTopLeftRadius={50}>
                {loading ? (
                  <Container
                    paddingVertical={1.3}
                    flex={1}
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    backgroundColor={Colors.black}
                    borderRadius={5}>
                    <ActivityIndicator color={Colors.white} size="large" />
                  </Container>
                ) : (
                  <TouchWrap flex={1} onPress={() => props.navigation.navigate('SignUp')}>
                    <Container
                      paddingVertical={2}
                      flex={1}
                      borderRadius={5}
                      horizontalAlignment="center"
                      verticalAlignment="center"
                      backgroundColor={Colors.black}
                      direction="row">
                      <Feather name="mail" size={scaleFont(15)} color={Colors.white} />
                      <SizedBox width={2} />
                      <H2 fontSize={FONTSIZE.medium} color={Colors.white}>
                        Continue with Email
                      </H2>
                    </Container>
                  </TouchWrap>
                )}
              </Container>

              <SizedBox height={3} />

              {Platform.OS === 'ios' &&
                (appleLoading ? (
                  <ActivityIndicator color={Colors.white} size="large" />
                ) : (
                  <AppleButton
                    buttonStyle={AppleButton.Style.BLACK}
                    buttonType={AppleButton.Type.CONTINUE}
                    style={{
                      width: '100%', // You must specify a width
                      height: 45, // You must specify a height
                      fontSize : FONTSIZE.medium
                    }}
                    onPress={() => onAppleButtonPress()}
                  />
                ))}

              <SizedBox height={3} />
              <TouchWrap paddingBottom={1} onPress={() => props.navigation.navigate('SignIn')}>
                <H2 color={Colors.black} fontSize={FONTSIZE.medium} textAlign="center">
                  Already have an account? <H1>Sign In.</H1>
                </H2>
              </TouchWrap>
            </Container>
          </Container>
          <Container horizontalAlignment="center">
            <TouchWrap onPress={() => Linking.openURL('https://www.agstribe.org/privacy-policy')}>
              <P color={Colors.black} fontSize={FONTSIZE.medium} textAlign="center">
                By Signing up, you agree to our{' '}
                <H2 fontSize={FONTSIZE.medium} color={Colors.black}>
                  Privacy policy
                </H2>{' '}
                and
              </P>
            </TouchWrap>
            <TouchWrap onPress={() => Linking.openURL('https://www.agstribe.org/terms/')}>
              <P color={Colors.black} fontSize={FONTSIZE.medium} textAlign="center">
                <H2 fontSize={FONTSIZE.medium} color={Colors.black}>
                  Terms and conditions.
                </H2>
              </P>
            </TouchWrap>
          </Container>
          <SizedBox height={3} />
        </ScrollArea>
      </Container>
    </View>
  );
};

export default Welcome;
