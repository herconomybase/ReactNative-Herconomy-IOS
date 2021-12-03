import React, {useState} from 'react';
import {Container, SizedBox, InputWrap, scaleFont, TouchWrap, Page} from 'simple-react-native-components';
import Colors from '../../helpers/colors';
import {H2} from '../../components/component';
import {ResourcesTabScreen, BlockedTabScreen} from '../../helpers/route';
import Feather from 'react-native-vector-icons/Feather';

const Privacy = ({navigation, route}) => {
  return (
    <>
      {/*  <Page barIconColor="light" backgroundColor={Colors.primary}>
      <Container paddingHorizontal={6} paddingTop={6} direction="row" verticalAlignment="center">
        <TouchWrap paddingRight={5} paddingTop={1.5} paddingBottom={1.5} onPress={() => navigation.openDrawer()}>
          <Feather Icon name="menu" size={scaleFont(25)} color="#fff" />
        </TouchWrap>
      </Container>
      <SizedBox height={1} />
      <Container
        flex={1}
        paddingHorizontal={6}
        backgroundColor={Colors.white}
        borderTopLeftRadius={50}
        borderTopRightRadius={50}
        marginTop={2}>
        <SizedBox height={2} />
          <Container direction="row" width="100%" marginHorizontal={6}>
          <InputWrap
            placeholder="Search"
            backgroundColor="#fff"
            flex={1}
            elevation={10}
            paddingTop={2}
            paddingLeft={5}
            borderRadius={50}
            width={65}
          />
          <TouchWrap verticalAlignment="center" paddingHorizontal={3}>
            <Feather Icon name="search" size={scaleFont(25)} color={Colors.primary} />
          </TouchWrap>
        </Container>
        <SizedBox height={4} />
        */}
      <Container flex={1}>
        <BlockedTabScreen />
      </Container>
      {/*  </Container>
    </Page>*/}
    </>
  );
};
export default Privacy;
