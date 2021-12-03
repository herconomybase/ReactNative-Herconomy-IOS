import React, {useState, useEffect} from 'react';
import {
  Container,
  Page,
  TouchWrap,
  scaleFont,
  SizedBox,
  InputWrap,
  ImageWrap,
  Avatar,
  Rounded,
  ScrollArea,
} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../helpers/colors';
import {SettingsTabScreen} from '../../helpers/route';
import {Input, Button} from '../../components/component';
import {ToastLong} from '../../helpers/utils';
import {apiFunctions} from '../../helpers/api';
import {Alert} from 'react-native';
import {useStoreState} from 'easy-peasy';

const ResetPwd = props => {
  const {token} = useStoreState(state => ({
    token: state.userDetails.token,
  }));
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [con_password, setConPassword] = useState('');

  const submit = async () => {
    try {
      if (password === '' || con_password === '' || password !== con_password) {
        return Alert.alert('Herconomy', 'Please make sure password match');
      }
      if (password.length < 6) {
        return Alert.alert('Herconomy', 'Password must not be less than 6 characters');
      }
      setLoading(true);
      let fd = {
        password1: password,
      };
      await apiFunctions.pwdChange(token, fd);
      Alert.alert('Herconomy', 'Password has been changed');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastLong('Network Error! Please try again');
    }
  };

  return (
    <Page barIconColor="light-content" backgroundColor={Colors.primary}>
      <Container paddingHorizontal={6} paddingTop={6} direction="row" verticalAlignment="center">
        <TouchWrap paddingRight={5} paddingTop={1.5} paddingBottom={1.5} onPress={() => props.navigation.navigate("Settings")}>
          <Feather Icon name="chevron-left" size={scaleFont(25)} color="#fff" />
        </TouchWrap>
      </Container>
      <SizedBox height={3} />
      <Container backgroundColor={Colors.white} flex={1} paddingHorizontal={6} borderTopLeftRadius={50} borderTopRightRadius={50}>
        <SizedBox height={10} />
        <ScrollArea flexGrow={1}>
          <Container>
            <Input type={password} secure={true} placeholder="Password" value={password} onChangeText={text => setPassword(text)} />
            <Input
              type={password}
              secure={true}
              placeholder="Confirm Password"
              value={con_password}
              onChangeText={text => setConPassword(text)}
            />
            <SizedBox height={3} />
            <Button title="Submit" loading={loading} onPress={submit} />
          </Container>
        </ScrollArea>
      </Container>
    </Page>
  );
};

export default ResetPwd;
