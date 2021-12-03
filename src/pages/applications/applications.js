import React from 'react';
import {Page, Container, TouchWrap, scaleFont, SizedBox} from 'simple-react-native-components';
import {H1} from '../../components/component';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../helpers/colors';
import {ApplicationsTabScreens} from '../../helpers/route';
import { FONTSIZE } from '../../helpers/constants';

const Applications = props => {
  return (
    <Page backgroundColor={Colors.white}>
      <Container paddingHorizontal={6} paddingTop={6} backgroundColor={Colors.primary} direction="row" horizontalAlignment="space-between">
        <TouchWrap paddingRight={2} paddingBottom={2} paddingTop={2} onPress={() => props.navigation.openDrawer()}>
          <Feather Icon name="menu" size={scaleFont(FONTSIZE.menu)} color="#fff" />
        </TouchWrap>

        {/* <Container direction="row">
          <TouchWrap paddingLeft={2} paddingBottom={2} paddingTop={2} onPress={() => props.navigation.navigate('Search')}>
            <Feather Icon name="search" size={scaleFont(25)} color="#fff" />
          </TouchWrap>
        </Container> */}
      </Container>

      {/* ANCHOR - HEADER 2 */}
      <Container backgroundColor={Colors.primary} borderBottomLeftRadius={50} paddingHorizontal={6} paddingTop={2} paddingBottom={3}>
        <H1 fontSize={FONTSIZE.page} color={Colors.whiteBase}>
          My Applications
        </H1>
        <SizedBox height={2} />
      </Container>

      {/* ANCHOR - HEADER 2 */}
      <Container flex={1} marginTop={2}>
        <ApplicationsTabScreens />
      </Container>
    </Page>
  );
};

export default Applications;
