import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {TouchWrap, Container, ScrollArea, ImageWrap, SizedBox, scaleFont, InputWrap} from 'simple-react-native-components';
import {H2, P, CheckBok} from '../../components/component';
import {useStoreActions} from 'easy-peasy';
import {RouteContext} from '../../helpers/routeContext';
import Colors from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {View, ActivityIndicator, Keyboard, Alert} from 'react-native';
import {ToastLong} from '../../helpers/utils';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {apiFunctions} from '../../helpers/api';
import {storeData, getData} from '../../helpers/functions';
import { FONTSIZE } from '../../helpers/constants';

const Forgot = props => {
  const {setCurrentState} = React.useContext(RouteContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = React.useState('');
  const loginAction = useStoreActions(actions => actions.userDetails.appLogin);

  const submit = async () => {
    if (email === '') {
      return;
    }
    Keyboard.dismiss();

    storeData('email', {email});

    setLoading(true);
    try {
      let fd = {email};
      let res = await apiFunctions.forgot(fd);
      if (res) {
        setLoading(false);
        ToastLong('Password Reset Code sent');
        props.navigation.navigate('Verify');
      }
    } catch (error) {
      setLoading(false);
      if (error.msg && !Array.isArray(error.msg)) {
        Alert.alert('Herconomy', Object.values(error.msg)[0]);
      }
    }
  };

  const loadUserName = async () => {
    let getEmail = await getData('email');
    if (getEmail) {
      setEmail(getEmail.email);
    }
  };

  React.useEffect(() => {
    loadUserName();
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Container flex={1} backgroundColor={Colors.primary} verticalAlignment="center">
          <SizedBox height={10} />

          <ScrollArea flexGrow={1}>
            <Container flex={1} paddingHorizontal={10} marginBottom={2} verticalAlignment="center">
              <ImageWrap flex={1} source={require('../../../assets/img/agsLogo_dark.png')} fit="contain" height={8} />
            </Container>
            <SizedBox height={4} />

            <Container
              backgroundColor={Colors.primary}
              paddingTop={3}
              borderTopLeftRadius={50}
              borderTopRightRadius={50}
              verticalAlignment="flex-end"
              flex={1}>
              <Container paddingHorizontal={6} marginBottom={3}>
                <H2 textAlign="center" color={Colors.black} fontSize={FONTSIZE.semiBig}>
                  Forgot Password
                </H2>

                <SizedBox height={3} />

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
                  onSubmit={() => this.one.focus()}
                  borderRadius={5}
                  borderColor={Colors.black}
                  borderWidth={2.5}
                  paddingTop={1.5}
                  paddingBottom={1.5}
                  fontSize={FONTSIZE.medium}
                  textAlignVertical="center"
                />

                <SizedBox height={2} />

                <Container verticalAlignment="center">
                  <Container flex={1} backgroundColor={Colors.primary} borderTopLeftRadius={50}>
                    {loading ? (
                      <Container
                        backgroundColor={Colors.black}
                        paddingVertical={1.3}
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
                            Submit
                          </H2>
                        </Container>
                      </TouchWrap>
                    )}
                  </Container>
                  <SizedBox height={2} />
                  <TouchWrap flex={1} onPress={() => props.navigation.navigate('SignIn')}>
                    <H2 textAlign="center" fontSize={FONTSIZE.medium} color={Colors.black}>
                      Remember Password?
                    </H2>
                  </TouchWrap>
                </Container>
              </Container>
            </Container>
          </ScrollArea>
        </Container>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Forgot;
