import React from 'react';
import {Container, TouchWrap, SizedBox, Rounded, ImageWrap, Avatar} from 'simple-react-native-components';
import Colors from '../helpers/colors';
import {H1, P, H2, LocalAvatar} from '../components/component';

export const BlockedCard = ({data, index, count, onPress}) => (
  <Container paddingHorizontal={2} marginBottom={count - 1 === index ? 5 : 2}>
    <TouchWrap>
      <Container direction="row" verticalAlignment="center" backgroundColor={Colors.lightGrey} padding={2} borderRadius={10}>
        <Container widthPercent="12%">
          {data.photo ? <Avatar backgroundColor="#efefef" size={10} url={data.photo} /> : <LocalAvatar size={10} />}
        </Container>
        <Container verticalAlignment="center" widthPercent="65%" paddingHorizontal={4}>
          <H1 color={Colors.button} fontSize={10}>
            {data.first_name} {data.last_name}
          </H1>
          <P color={Colors.button} fontSize={10}>
            {data.username}
          </P>
        </Container>
        <TouchWrap onPress={onPress}>
          <Container backgroundColor="#000" borderRadius={20} paddingHorizontal={3} paddingVertical={1}>
            <H1 color="#fff" fontSize={6}>
              Unblock
            </H1>
          </Container>
        </TouchWrap>
      </Container>
    </TouchWrap>
  </Container>
);
