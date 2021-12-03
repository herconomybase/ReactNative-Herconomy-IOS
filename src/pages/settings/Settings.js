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
import {useStoreState} from 'easy-peasy';
import {H1, H2, P, LocalAvatar} from '../../components/component';
import { FONTSIZE } from '../../helpers/constants';

const Settings = props => {
  const {userD} = useStoreState(state => ({
    userD: state.userDetails.user,
  }));
  const settings  = [
    {
      title : "Account",
      logo : "credit-card",
      navigation : "Account"
    },
    {
      title : "Password Reset",
      logo : "lock",
      navigation : "ResetPwd"
    },
    {
      title : "Privacy",
      logo : "lock",
      navigation : "BlockedResource"
    },
    {
      title : "Notification Settings",
      logo : "bell",
      navigation : "SetNotification"
    },
  ]
  return (
    <>
      <Page barIconColor="light-content" backgroundColor={Colors.primary}>
        <Container paddingHorizontal={6} paddingTop={6} direction="row" horizontalAlignment="space-between">
          <TouchWrap paddingRight={2} paddingBottom={2} paddingTop={2} onPress={() => props.navigation.openDrawer()}>
            <Feather Icon name="menu" size={scaleFont(20)} color="#fff" />
          </TouchWrap>
        </Container>
        <SizedBox height={3} />
        <Container backgroundColor={Colors.white} flex={1} paddingHorizontal={6} borderTopLeftRadius={50} borderTopRightRadius={50}>
          <SizedBox height={3} />
          <Container
            marginBottom={2}
            paddingBottom={2}
            direction="row"
            verticalAlignment="center"
          >
            <Container marginRight={1.3}>
              {userD.photo === null ? <LocalAvatar size={16} /> : <Avatar url={userD.photo} backgroundColor={Colors.offWhite} size={16} />}
            </Container>

            <Container marginLeft={3}>
              <H2 fontSize={10}>
                {userD.first_name} {userD.last_name}
              </H2>
              <P fontSize={7}>{userD.location}</P>
            </Container>
          </Container>

            <Container backgroundColor={Colors.white} flex={1} borderTopLeftRadius={50} borderTopRightRadius={50}>
              <SizedBox height={2} />
              {
                settings.map((item,i)=>(
                  <Container borderWidth={0.3} borderRadius={10} padding={2} borderColor={Colors.offWhite} key={i} marginBottom={3}>
                    <TouchWrap
                      onPress={() => {
                        props.navigation.navigate(item.navigation)
                      }}>
                      <Container direction="row" verticalAlignment="center" borderRadius={5} paddingHorizontal={4} paddingVertical={1.5}>
                        <Feather Icon name={item.logo} size={scaleFont(15)} color={Colors.primary} />
                        <SizedBox width={5} />
                        <H2 fontSize={FONTSIZE.medium}>{item.title}</H2>
                      </Container>
                    </TouchWrap>
                  </Container>
                ))
              }
            </Container>
        </Container>
      </Page>
    </>
  );
};

export default Settings;
