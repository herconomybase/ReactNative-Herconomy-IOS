import React from 'react';
import {Container, ImageWrap, SizedBox, Page} from 'simple-react-native-components';
import {H2, H1, Button} from '../../components/component';
import Colors from '../../helpers/colors';
import { FONTSIZE } from '../../helpers/constants';

const text =
  'You are joining Hundreds of other Female Professionals and Entreprenuers who are making a difference in their Communities and on the Continent!';
const img = require('../../../assets/img/walk3.png');

const OnboardTwo = props => {
  return (
    <Page barIconColor="dark-content" backgroundColor={Colors.primary}>
      <Container height={100}>
        <Container flexGrow={1} paddingHorizontal={6} paddingVertical={2} flex={1} horizontalAlignment="center" verticalAlignment="center">
          <ImageWrap source={img} height={30} widthPercent="80%" fit="contain" />

          <SizedBox height={1} />

          <H1 textAlign="center" fontSize={FONTSIZE.semiBig}>
            Welcome to the Tribe
          </H1>

          <SizedBox height={4} />

          <H2 textAlign="center" fontSize={FONTSIZE.medium} color={Colors.button}>
            {text}
          </H2>

          <SizedBox height={6} />

          <Button widthPercent="80%" borderRadius={5} title="Continue" onPress={() => props.navigation.navigate('TermsAndConditions')}>
            <H2 textAlign="center" backgroundColor="blue" fontSize={FONTSIZE.medium}>
              Continue
            </H2>
          </Button>
        </Container>
      </Container>
    </Page>
  );
};

export default OnboardTwo;
