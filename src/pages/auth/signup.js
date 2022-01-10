import React, {useState, useRef} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Page, TextWrap, TouchWrap, Container, ScrollArea, ImageWrap, SizedBox, scaleFont, InputWrap} from 'simple-react-native-components';
import {H1, H2, P, CheckBok} from '../../components/component';
import {useStoreActions} from 'easy-peasy';
import {RouteContext} from '../../helpers/routeContext';
import Colors from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {View, ActivityIndicator, Alert, Linking, Platform} from 'react-native';
import {apiFunctions} from '../../helpers/api';
import {ToastShort, ToastLong} from '../../helpers/utils';
import {GoogleSignin} from '@react-native-community/google-signin';
import {AppleButton, appleAuth} from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import {endPoint} from '../../helpers/api';
import { FONTSIZE } from '../../helpers/constants';

const SignUp = props => {
  const {currentStack, setCurrentState} = React.useContext(RouteContext);
  /*   const [email, setEmail] = React.useState('love@admin.com');
  const [password, setPassword] = React.useState('123456'); */

  const inputOne = useRef(null);
  const inputTwo = useRef(null);
  const inputThree = useRef(null);
  const inputFour = useRef(null);

  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [first_name, setFName] = useState('');
  const [last_name, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [appleLoading, setAppleLoading] = useState(false);

  const updateUser = useStoreActions(actions => actions.userDetails.updateUser);
  const updateToken = useStoreActions(actions => actions.userDetails.updateToken);

  const submitGoogleSign = async () => {
    // if (!agree) {
    //   Alert.alert('Herconomy', 'You must agree to our privacy policy to continue');
    //   return;
    // }

    try {
      let {idToken} = await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      processUser(user.givenName, user.familyName, user.email, user.id, user.id);
    } catch (error) {
      console.log({error});
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
          storeData('tourscreen', true)
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
        storeData('tourscreen', true)

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

  const submit = async () => {
    if (first_name === '' || last_name === '' || email === '' || password1 === '' || password2 === '') {
      return;
    }

    if (password1 !== password2) {
      return Alert.alert('Herconomy', 'Passwords do not match');
    }
    if (password1.length < 6) {
      return Alert.alert('Herconomy', 'Password must be a minimum of 6 characters');
    }
    processUser(first_name, last_name, email, password1, password2);
  };

  const processUser = async (first_name, last_name, email, password1, password2) => {
    setLoading(true);
    try {
      let fd = {first_name, last_name, email, password1, password2};
      let res = await apiFunctions.registration(fd);
      console.log('Response>>', res);
      updateUser(res.user);
      updateToken(res.token);
      global.token = res.token;
      console.log(res);
      if (res) {
        setLoading(false);
        storeData('tourscreen', true)
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

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {}
  };

  React.useEffect(() => {
    //submit(); uncomment for auto login
    // signOut();
    // GoogleSignin.configure({
    //   webClientId: '470433460061-5aookol460l1qt77r02doc9u8ic3ab1h.apps.googleusercontent.com',
    //   offlineAccess: true,
    // });

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Container flex={1} backgroundColor={Colors.primary} verticalAlignment="center">
          <SizedBox height={6} />

          <ScrollArea flexGrow={1}>
            <Container flex={1} paddingHorizontal={10} marginBottom={2} verticalAlignment="center">
              <ImageWrap flex={1} source={require('../../../assets/img/agsLogo_dark.png')} fit="contain" height={8} />
            </Container>
            <Container backgroundColor={Colors.primary} verticalAlignment="flex-end">
              <Container paddingHorizontal={6}>
                <P color={Colors.black} textAlign="center" fontSize={FONTSIZE.medium}>
                  Sign up to a pan African Network of female professionals and entrepreneurs.
                </P>
                <SizedBox height={2} />
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
                      }}
                      onPress={() => onAppleButtonPress()}
                    />
                  ))}
                <SizedBox height={2} />
                <SizedBox height={2} />

                <SizedBox height={2} />

                <InputWrap
                  value={first_name}
                  onChangeText={text => setFName(text)}
                  placeholder="First Name"
                  color={Colors.black}
                  returnKeyType="next"
                  placeholderTextColor={Colors.lightGrey}
                  backgroundColor={Colors.white}
                  icon={<Feather Icon name="user" color={Colors.black} size={scaleFont(FONTSIZE.icon)} />}
                  onSubmit={() => inputOne.current.focus()}
                  borderWidth={2.5}
                  borderRadius={5}
                  paddingTop={1.5}
                  paddingBottom={1.5}
                  fontSize={FONTSIZE.medium}
                  textAlignVertical="center"
                />

                <SizedBox height={1.5} />

                <InputWrap
                  value={last_name}
                  onChangeText={text => setLName(text)}
                  placeholder="Last Name"
                  color={Colors.black}
                  returnKeyType="next"
                  placeholderTextColor={Colors.lightGrey}
                  backgroundColor={Colors.white}
                  icon={<Feather Icon name="user" color={Colors.black} size={scaleFont(FONTSIZE.icon)} />}
                  onSubmit={() => inputTwo.current.focus()}
                  refValue={inputOne}
                  borderWidth={2.5}
                  borderRadius={5}
                  paddingTop={1.5}
                  paddingBottom={1.5}
                  fontSize={FONTSIZE.medium}
                  textAlignVertical="center"
                />

                <SizedBox height={1.5} />

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
                  onSubmit={() => inputThree.current.focus()}
                  refValue={inputTwo}
                  borderWidth={2.5}
                  borderRadius={5}
                  paddingTop={1.5}
                  paddingBottom={1.5}
                  fontSize={FONTSIZE.medium}
                  textAlignVertical="center"
                />

                <SizedBox height={1.5} />

                <InputWrap
                  value={password1}
                  onChangeText={text => setPassword1(text)}
                  placeholder="Password"
                  secure={true}
                  color={Colors.black}
                  returnKeyType="done"
                  placeholderTextColor={Colors.lightGrey}
                  backgroundColor={Colors.white}
                  icon={<Feather Icon name="lock" color={Colors.black} size={scaleFont(FONTSIZE.icon)} />}
                  onSubmit={() => inputFour.current.focus()}
                  refValue={inputThree}
                  borderWidth={2.5}
                  borderRadius={5}
                  paddingTop={1.5}
                  paddingBottom={1.5}
                  fontSize={FONTSIZE.medium}
                  textAlignVertical="center"
                />

                <SizedBox height={1.5} />

                <InputWrap
                  value={password2}
                  onChangeText={text => setPassword2(text)}
                  placeholder="Confirm Password"
                  secure={true}
                  returnKeyType="done"
                  placeholderTextColor={Colors.lightGrey}
                  backgroundColor={Colors.white}
                  icon={<Feather Icon name="lock" color={Colors.black} size={scaleFont(FONTSIZE.icon)} />}
                  onSubmit={submit}
                  refValue={inputFour}
                  color={Colors.black}
                  borderWidth={2.5}
                  borderRadius={5}
                  paddingTop={1.5}
                  paddingBottom={1.5}
                  fontSize={FONTSIZE.medium}
                  textAlignVertical="center"
                />

                {/* <SizedBox height={1.5} />
              <Container direction="row" verticalAlignment="center">
                <CheckBok onPress={() => setAgree(!agree)} status={agree} />
                <SizedBox width={2} />
                <TouchWrap
                  onPress={()=>Linking.openURL('https://www.agstribe.org/privacy-policy')}
                >
                  <P color={Colors.black}>
                    I agree with the <H2 color={Colors.black}>Privacy Policy</H2>
                  </P>
                </TouchWrap>
              </Container> */}
                <SizedBox height={1.5} />
                <Container verticalAlignment="center">
                  <Container flex={1} backgroundColor={Colors.primary} borderTopLeftRadius={50}>
                    {loading ? (
                      <Container
                        backgroundColor={Colors.black}
                        paddingVertical={2}
                        direction="row"
                        flex={1}
                        horizontalAlignment="center"
                        verticalAlignment="center">
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
                            Sign Up
                          </H2>
                        </Container>
                      </TouchWrap>
                    )}
                  </Container>
                  <SizedBox height={1.5} />
                  <TouchWrap flex={1} onPress={() => props.navigation.navigate('SignIn')}>
                    <P fontSize={8} textAlign="center" color={Colors.black}>
                      Already a member?{' '}
                      <H2 fontSize={FONTSIZE.medium} color={Colors.black}>
                        Sign In
                      </H2>
                    </P>
                  </TouchWrap>
                  <SizedBox height={1.5} />
                </Container>
              </Container>
            </Container>
          </ScrollArea>
        </Container>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
