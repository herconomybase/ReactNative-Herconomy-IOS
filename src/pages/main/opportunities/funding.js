import React, {useState} from 'react';
import {Container, TouchWrap, SizedBox, scaleFont, InputWrap} from 'simple-react-native-components';
import Colors from '../../../helpers/colors';
import {H1, P, H2} from '../../../components/component';
import Card from '../../../components/card';
import {FlatList} from 'react-native';
import {FundingTabScreen} from '../../../helpers/route';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Feather from 'react-native-vector-icons/Feather';
import { FONTSIZE } from '../../../helpers/constants';

const Funding = props => {
  const updateFunds = useStoreActions(actions => actions.funds.updateFunds);
  const {fundsHolder,funds} = useStoreState(state => ({
    fundsHolder : state.funds.fundsHolder,
    funds : state.funds.funds,
    search : state.funds.search
  }));
  const {updateSearch} = useStoreActions(action=>({
    updateSearch : action.funds.updateSearch
  }))
  const [search,setSearch] = useState("");
  return (
    <Container flex={1} paddingHorizontal={6} backgroundColor={Colors.white}>
        <SizedBox height={1} />
        <Container direction="row" width="100%" marginHorizontal={6} marginTop={2}>
          <InputWrap 
            placeholder="Search" backgroundColor="#fff" 
            height={5}
            elevation={10} 
            //paddingTop={2} 
            paddingLeft={5} 
            borderRadius={50}
            value={search}
            onChangeText={async (value)=>{}}
            width={65}
          />
          <TouchWrap 
            verticalAlignment="center" paddingHorizontal={3}
            onPress={async ()=>{}}
          >
            <Feather Icon name="search" size={scaleFont(FONTSIZE.icon)} color={Colors.primary} />
          </TouchWrap>
        </Container>
        <SizedBox height={3} />
        <FundingTabScreen />
    </Container>
  );
};

export default Funding;
