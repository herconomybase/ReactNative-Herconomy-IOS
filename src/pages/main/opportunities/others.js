import React, {useState} from 'react';
import {Container, SizedBox, InputWrap, scaleFont, TouchWrap} from 'simple-react-native-components';
import Colors from '../../../helpers/colors';
import {H2} from '../../../components/component';
import {OtherOppsTabScreen} from '../../../helpers/route';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Feather from 'react-native-vector-icons/Feather';
import { FONTSIZE } from '../../../helpers/constants';

const OthersOpp = props => {
  const {updateOthSearch,updateOthHolder,updateOthOpps} = useStoreActions(actions => ({
    updateOthHolder : actions.otherOpps.updateOthHolder,
    updateOthSearch : actions.otherOpps.updateOthSearch,
    updateOthOpps : actions.otherOpps.updateOthOpps
  }));

  const {oth_opp_holder,other_search} = useStoreState(state => ({
    oth_opp_holder : state.otherOpps.oth_opp_holder,
    other_search : state.otherOpps.other_search
  }));
  return (
    <Container flex={1} paddingHorizontal={6} backgroundColor={Colors.white}>
        <SizedBox height={1} />
        <Container direction="row" width="100%" marginHorizontal={6} marginTop={2}>
          <InputWrap 
            placeholder="Search" backgroundColor="#fff" flex={1} 
            elevation={10} 
            paddingTop={2} paddingLeft={5} borderRadius={50}
            onChangeText={(value)=>{
              
            }}
            width={65}
            value={other_search}
          />
          <TouchWrap 
            verticalAlignment="center" paddingHorizontal={3}
            onPress={()=>{}}
          >
            <Feather Icon name="search" size={scaleFont(FONTSIZE.icon)} color={Colors.primary} />
          </TouchWrap>
        </Container>
        <SizedBox height={3} />
        <OtherOppsTabScreen />
    </Container>
  );
};

export default OthersOpp;
