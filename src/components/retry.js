import React from 'react';
import Colors from '../helpers/colors';
import {Container, TouchWrap} from 'simple-react-native-components';
import {P} from '../components/component';

export const Retry = ({funcCall, param}) => (
  <TouchWrap onPress={() => funcCall(...param)}>
    <Container paddingHorizontal={4}
            paddingVertical={2}
            backgroundColor={Colors.primary}
        >
            <P color={Colors.white} textAlign="center">
                This should not happen. Please tap the box to retry.
            </P>
        </Container>
  </TouchWrap>
);
