import React from 'react';
import {Container, ImageWrap, scaleFont, TouchWrap} from 'simple-react-native-components';
import {Modal} from 'react-native';
import {avatar, H1} from '../components/component';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../helpers/colors';
const FullImage = props => {
  return (
    <Modal visible={props.show} transparent={true}>
      <Container paddingVertical={5} paddingHorizontal={5} backgroundColor={Colors.white} flex={1}>
        <TouchWrap horizontalAlignment="flex-end" onPress={() => props.setShow(false)}>
          <Feather name="x" size={scaleFont(10)}/>
        </TouchWrap>
        <Container flexGrow={1} horizontalAlignment="center" verticalAlignment="center">
          {props.image ? <ImageWrap url={props.image} fit="contain" height={70} /> : <ImageWrap source={avatar} />}
        </Container>
      </Container>
    </Modal>
  );
};

export const FullImageModal = React.memo(FullImage)
