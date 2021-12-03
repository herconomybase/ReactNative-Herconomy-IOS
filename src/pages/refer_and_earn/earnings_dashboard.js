import React, {useEffect, useState} from 'react';
import {
  Page,
  Container,
  TouchWrap,
  SizedBox,
  scaleFont,
  Rounded,
  ImageWrap,
  Avatar,
  ScrollArea,
  InputWrap,
} from 'simple-react-native-components';
import {H1, H2, P, Button, Input} from '../../components/component';
import Colors from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList, ActivityIndicator} from 'react-native';
import {apiFunctions} from '../../helpers/api';
import {useStoreState} from 'easy-peasy';
import {ToastLong, Capitalize} from '../../helpers/utils';
import ReferralList from '../../components/referral_list';

const EarningsDashboard = props => {
  return (
    <Page barIconColor="light-content" backgroundColor={Colors.primary}>
      <ReferralList navigation={props.navigation} />
    </Page>
  );
};

export default EarningsDashboard;
