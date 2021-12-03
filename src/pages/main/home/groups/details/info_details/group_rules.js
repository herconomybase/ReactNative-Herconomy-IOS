import React from 'react';
import {Page, Container, TouchWrap, SizedBox, scaleFont, Rounded, ImageWrap, Avatar, ScrollArea} from 'simple-react-native-components';
import {H1, H2, P, Button} from '../../../../../../components/component';
import OppDetailsHeader from '../../../../../../components/opp_details_header';
import Colors from '../../../../../../helpers/colors';
import {useStoreState} from 'easy-peasy';

const GroupRules = ({data}) => {
  return (
    <Container flex={1} backgroundColor={Colors.white}>
      <ScrollArea>
        {/*<OppDetailsHeader oppo={new_opp} />*/}
        <Container padding={5}>
          <Container widthPercent="97%">
            <H1>Rules</H1>
            <SizedBox height={5} />
            {console.log("rules",data)}
            {data && data.rules ? <P>{data.rules && data.rules}</P> : <P>There are no rules in this group</P>}
          </Container>
        </Container>
      </ScrollArea>
    </Container>
  );
};

export default GroupRules;
