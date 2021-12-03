import React, {useEffect} from 'react';
import {Page, Container, TouchWrap, scaleFont, SizedBox} from 'simple-react-native-components';
import {H1} from '../../../components/component';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import {OpportunityTabScreens} from '../../../helpers/route';
import {Retry} from '../../../components/retry';
import {useStoreState} from 'easy-peasy';
import { FONTSIZE } from '../../../helpers/constants';

const Opportunities = props => {
  const {retry, funcCall} = useStoreState(state => ({
    retry: state.retryModel.retry,
    funcCall: state.retryModel.funcCall,
  }));
  useEffect(() => {
    console.log("OPPO USE EFFECT")
  }, [retry]);
  return (
    <Page backgroundColor={Colors.primary}>
      <Container paddingHorizontal={6} paddingTop={6} backgroundColor={Colors.primary} direction="row">
        <TouchWrap paddingRight={2} paddingBottom={2} paddingTop={2} onPress={() => props.navigation.openDrawer()}>
          <Feather Icon name="menu" size={scaleFont(FONTSIZE.menu)} color="#fff" />
        </TouchWrap>
        <Container backgroundColor={Colors.primary} paddingHorizontal={6} paddingTop={0.5} paddingBottom={3}>
          <H1 fontSize={FONTSIZE.page} color={Colors.whiteBase}>
            Opportunity Board
          </H1>
        </Container>
      </Container>
      {/* ANCHOR - HEADER 2 */}
      <Container flex={1} backgroundColor={Colors.white} marginTop={2} borderTopLeftRadius={50} borderTopRightRadius={50}>
        <SizedBox height={3} />
        {console.log("loader>>")}
        <OpportunityTabScreens />
        {retry ? <Retry funcCall={funcCall} param={[]} /> : null}
      </Container>
    </Page>
  );
};

export default React.memo(Opportunities);
