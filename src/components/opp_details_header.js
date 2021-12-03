import React from 'react';
import {Page, Container, TouchWrap, SizedBox, scaleFont, Rounded, ImageWrap, Avatar, ScrollArea} from 'simple-react-native-components';
import {H1, P} from '../components/component';
import Colors from '../helpers/colors';
import { FONTSIZE } from '../helpers/constants';

const OppDetailsHeader = ({oppo}) => {
  return (
    <Container padding={5}>
      <Container horizontalAlignment="center" verticalAlignment="center" borderBottomWidth={1} borderColor={Colors.line}>
        <SizedBox height={2} />
        <H1 fontSize={FONTSIZE.semiBig} textAlign="center">
          {oppo.title
            .split(' ')
            .map(word => {
              return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
            })
            .join(' ')}
        </H1>
        <>
          <H1 fontSize={6} textAlign="center">
            {oppo.user.first_name} {oppo.user.last_name}
          </H1>
          <SizedBox height={1.5} />
          {oppo.location && (
            <P fontSize={4} color={Colors.greyBase900}>
              {oppo.user.location}
            </P>
          )}
        </>

        <SizedBox height={2} />
      </Container>
      <SizedBox height={0.5} />
    </Container>
  );
};

export default OppDetailsHeader;
