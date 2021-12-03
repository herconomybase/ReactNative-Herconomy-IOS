import React from 'react';
import {Page, Container, TouchWrap, SizedBox, scaleFont, Rounded, ImageWrap, Avatar, ScrollArea} from 'simple-react-native-components';
import {H1, H2, P, Button} from '../../../components/component';
import Colors from '../../../helpers/colors';
import {useStoreState} from 'easy-peasy';

const DiscountInfo = props => {
  const {affinity} = useStoreState(state => ({
    affinity: state.affinity.affinity,
  }));
  console.log('>>', affinity);
  return (
    <ScrollArea>
      <Container flexGrow={1}>
        <SizedBox height={3} />
        <Container paddingHorizontal={5}>
          <P>{affinity.long_description}</P>
        </Container>
        <SizedBox height={5} />
      </Container>
    </ScrollArea>
  );
};

export default DiscountInfo;
