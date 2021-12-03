import React from 'react';
import {Container, TouchWrap, SizedBox, scaleFont} from 'simple-react-native-components';
import Colors from '../helpers/colors';
import {H1, P, H2} from '../components/component';
import Feather from 'react-native-vector-icons/Feather';
import {ActivityIndicator} from 'react-native';
export const Verify = props => (
  <Container
    direction="row"
    verticalAlignment="flex-start"
    paddingTop={3}
    borderColor={Colors.line}
    paddingBottom={3}
    paddingHorizontal={7}
    backgroundColor="#000">
    <Container
      width={6}
      height={3}
      borderRadius={40}
      horizontalAlignment="center"
      verticalAlignment="center"
      position="absolute"
      right={2}
      top={1}
      backgroundColor="#fff">
      <Feather Icon name="bell" color="red" size={scaleFont(10)} />
    </Container>
    <Container>
      <P>
        <H2 fontSize={7} textAlign="left" color="#fff">
          Thank you for signing up. However, you need to verify your email address to continue. Tap to refresh after verification.
        </H2>
      </P>

      <SizedBox height={1} />
      <TouchWrap widthPercent="60%" onPress={props.onPress}>
        <P fontSize={7} color="#fff">
          Tap to resend verification email
        </P>
        {props.is_sending ? <ActivityIndicator size="small" color={Colors.primary} /> : null}
      </TouchWrap>
    </Container>
  </Container>
);
