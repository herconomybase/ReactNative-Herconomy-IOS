import React, {useState, useRef} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {TouchWrap, Container, ScrollArea, ImageWrap, SizedBox, scaleFont, InputWrap} from 'simple-react-native-components';
import {H1, H2, P, CheckBok} from '../../components/component';
import {useStoreActions} from 'easy-peasy';
import {RouteContext} from '../../helpers/routeContext';
import Colors from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {View, ActivityIndicator, Alert, Platform, Keyboard} from 'react-native';
import {ToastLong} from '../../helpers/utils';
import {GoogleSignin} from '@react-native-community/google-signin';
import {storeData, getData} from '../../helpers/functions';
import {AppleButton, appleAuth} from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import {apiFunctions, endPoint} from '../../helpers/api';
import {FONTSIZE} from '../../helpers/constants';
import {getUniqueId, getManufacturer, getDeviceId, getDeviceName, getIpAddress, getDeviceType, getBaseOs} from 'react-native-device-info';

const SignIn = props => {
  const inputOne = useRef(null);
  const {currentStack, setCurrentState} = React.useContext(RouteContext);
  /*   const [email, setEmail] = React.useState('preye7@yahoo.com');
  const [password, setPassword] = React.useState('Sweetness@1987'); */

  /*   const [email, setEmail] = React.useState('love@admin.com');
  const [password, setPassword] = React.useState('123456'); */

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loginAction = useStoreActions(actions => actions.userDetails.appLogin);

  const updateUser = useStoreActions(actions => actions.userDetails.updateUser);
  const updateToken = useStoreActions(actions => actions.userDetails.updateToken);
  const [secure, setSecure] = React.useState(true);
  /*   //google auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [passedToken, setPassedToken] = useState(''); */

  const submitGoogleSign = async () => {
    try {
      let {idToken} = await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      console.log(user);
      processUser(user.email, user.id);
    } catch (error) {
      console.log({error});
      console.log(error.response);
    }
  };

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const {identityToken} = appleAuthRequestResponse;

    // console.log({appleAuthRequestResponse});

    if (appleAuthRequestResponse) {
      appleSignin(appleAuthRequestResponse);
      // console.log(appleAuthRequestResponse);
    }

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }

  const submit = async () => {
    if (email === '' || password === '') {
      Alert.alert('Herconomy', 'Email and password are required');
      return;
    }
    Keyboard.dismiss();
    storeData('email', {email});
    processUser(email, password);
  };

  const processUser = async (email, password) => {
    setLoading(true);
    try {
      let fd = {email, password};
      let res = await loginAction(fd);
      if (res) {
        let device_id = await getDeviceId();
        let device_name = await getDeviceName();
        let device_ip = await getIpAddress();
        let device_type = await getDeviceType();
        let fd = {
          device: `${device_id}|${device_name}|${device_ip}|${device_type}|${Platform.OS}`,
        };
        let token = await getData('token');
        console.log('token', token);
        apiFunctions.send_mail(token, fd);
        setLoading(false);
        storeData('tourscreen', true);
        res.onboarded ? setCurrentState('main') : setCurrentState('onboard');
      }
    } catch (error) {
      console.log('Err', error);
      setLoading(false);
    }
  };

  const appleSignin = async response => {
    console.log('payload', response);
    setLoading(true);
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
        storeData('tourscreen', true);
        res.data.user.onboarded ? setCurrentState('main') : setCurrentState('onboard');

        setLoading(false);
      })
      .catch(err => {
        console.log('ERROR', err.response.data.message);
        if (err.response.data.message === "User doesn't not exist") {
          appleSignup(response);
          return;
        }
        setLoading(false);
        console.log(err.response.data.message);
        ToastLong(err.response.data?.message);
        // console.log('err', err.response.data?.non_field_errors[0]);
        // ToastLong(err.response.data?.non_field_errors[0]);
      });
  };

  const appleSignup = async response => {
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
        setLoading(false);
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
        setLoading(false);
        console.log('err', error.response);
        console.log('err2', error.response.data);
        if (error.status === 500) {
          return ToastLong('Connection Error. Please try again later');
        }

        if (error.response.data.email) {
          Alert.alert('Herconomy', error.response.data.email[0]);
          return;
        }
        if (error.response.data.message) {
          Alert.alert('Herconomy', error.response.data.message);
          return;
        }
      });
  };
  const loadUserName = async () => {
    let getEmail = await getData('email');
    if (getEmail) {
      setEmail(getEmail.email);
    }
  };

  React.useEffect(() => {
    loadUserName();
    GoogleSignin.configure({
      webClientId: '470433460061-5aookol460l1qt77r02doc9u8ic3ab1h.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Container flex={1} backgroundColor={Colors.primary} verticalAlignment="center" paddingHorizontal={3}>
          <SizedBox height={4} />

          <ScrollArea flexGrow={1}>
            <Container flex={1} verticalAlignment="center">
              <ImageWrap source={require('../../../assets/img/agsLogo_dark.png')} fit="contain" height={8} />
            </Container>

            <Container backgroundColor={Colors.primary} paddingTop={3} flex={1}>
              <Container paddingHorizontal={2} marginBottom={1}>
                <H1 color={Colors.black} textAlign="center" fontSize={FONTSIZE.medium}>
                  Sign in to the Pan African Network of female professionals and entrepreneurs.
                </H1>

                <SizedBox height={2} />

                {Platform.OS === 'ios' && (
                  <AppleButton
                    buttonStyle={AppleButton.Style.BLACK}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                      width: '100%', // You must specify a width
                      height: 45, // You must specify a height
                    }}
                    onPress={() => onAppleButtonPress()}
                  />
                )}
                {/*Platform.OS !== 'ios' && (
                  <>
                    <TouchWrap onPress={submitGoogleSign}>
                      <Container
                        direction="row"
                        backgroundColor={Colors.black}
                        horizontalAlignment="center"
                        verticalAlignment="center"
                        borderRadius={5}
                        paddingVertical={1.5}>
                        <ImageWrap source={require('../../../assets/img/icons/google.png')} height={5} widthPercent="6%" fit="contain" />
                        <SizedBox width={2} />
                        <H1 color={Colors.white} fontSize={12}>
                          Continue with Google
                        </H1>
                      </Container>
                    </TouchWrap>
                    <SizedBox height={2} />
                  </>
                )}

                {Platform.OS === 'ios' && (
                  <>
                    <TouchWrap>
                      <Container
                        direction="row"
                        backgroundColor={Colors.black}
                        horizontalAlignment="center"
                        verticalAlignment="center"
                        borderRadius={5}
                        paddingVertical={1.5}>
                        <ImageWrap
                          source={require('../../../assets/img/icons/apple_logo.png')}
                          height={5}
                          // widthPercent="20%"
                          width={4}
                          fit="contain"
                        />
                        <SizedBox width={2} />
                        <H1 color={Colors.white} fontSize={12}>
                          Continue with Apple
                        </H1>
                      </Container>
                    </TouchWrap>
                    <SizedBox height={2} />
                  </>
                )*/}

                <Container direction="row" verticalAlignment="center">
                  <Container widthPercent="40%" borderBottomWidth={1} borderColor={Colors.black} />
                  <Container widthPercent="20%">
                    <P textAlign="center" color={Colors.black} fontSize={10}>
                      OR
                    </P>
                  </Container>
                  <Container widthPercent="40%" borderBottomWidth={1} borderColor={Colors.black} marginRight={3} />
                </Container>

                <SizedBox height={2} />

                <InputWrap
                  value={email}
                  onChangeText={text => setEmail(text)}
                  placeholder="Email"
                  color={Colors.black}
                  returnKeyType="next"
                  placeholderTextColor={Colors.lightGrey}
                  backgroundColor={Colors.white}
                  icon={<Feather Icon name="mail" color={Colors.black} size={scaleFont(FONTSIZE.icon)} />}
                  keyboardType="email-address"
                  borderColor="black"
                  borderRadius={5}
                  onSubmit={() => inputOne.current.focus()}
                  borderWidth={2.5}
                  paddingTop={1.5}
                  paddingBottom={1.5}
                  textAlignVertical="center"
                />

                <SizedBox height={1.5} />

                <InputWrap
                  refValue={inputOne}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeholder="Password"
                  secure={secure}
                  color={Colors.black}
                  returnKeyType="done"
                  placeholderTextColor={Colors.lightGrey}
                  backgroundColor={Colors.white}
                  icon={<Feather Icon name="lock" color={Colors.black} size={scaleFont(FONTSIZE.icon)} />}
                  onSubmit={submit}
                  borderColor={Colors.black}
                  borderRadius={5}
                  borderWidth={2.5}
                  paddingTop={1.5}
                  paddingBottom={1.5}
                  textAlignVertical="center"
                  secureIcon={<Feather Icon name={secure ? 'eye' : 'eye-off'} color={Colors.black} size={scaleFont(FONTSIZE.icon)} />}
                  onToggleSecure={() => setSecure(!secure)}
                />
                <SizedBox height={3} />
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
                    <TouchWrap flex={1} onPress={submit}>
                      <Container
                        paddingVertical={2}
                        flex={1}
                        borderRadius={5}
                        horizontalAlignment="center"
                        verticalAlignment="center"
                        backgroundColor={Colors.black}>
                        <H2 fontSize={FONTSIZE.medium} color={Colors.white}>
                          Sign In
                        </H2>
                      </Container>
                    </TouchWrap>
                  )}
                </Container>
                <SizedBox height={3} />
                <TouchWrap paddingBottom={1} onPress={() => props.navigation.navigate('Forgot')}>
                  <H2 color={Colors.black} fontSize={FONTSIZE.medium} textAlign="center">
                    Forgot Password?
                  </H2>
                </TouchWrap>

                <SizedBox height={3} />
                <TouchWrap paddingBottom={1} onPress={() => props.navigation.navigate('SignUp')}>
                  <H2 color={Colors.black} fontSize={FONTSIZE.medium} textAlign="center">
                    Don't have an account? Create one.
                  </H2>
                </TouchWrap>
              </Container>
            </Container>
          </ScrollArea>
        </Container>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
