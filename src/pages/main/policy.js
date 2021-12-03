import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import ProgressWebView from 'react-native-progress-webview';
import {Container, TouchWrap, scaleFont, SizedBox} from 'simple-react-native-components';
import {H2} from '../../components/component';

const Policy = props => {
  return (
    <Container backgroundColor="red" flex={1}>
      <Container paddingHorizontal={6} elevation={5} backgroundColor="#fff" direction="row" verticalAlignment="center">
        <TouchWrap paddingVertical={2} onPress={() => props.navigation.goBack()}>
          <Feather Icon name="chevron-left" size={scaleFont(25)} />
        </TouchWrap>

        <SizedBox width={3} />

        <H2>Privacy Policy </H2>
      </Container>
      <ProgressWebView source={{uri: 'https://en.wikipedia.org/wiki/Privacy_policy'}} />
    </Container>
  );
};

export default Policy;
