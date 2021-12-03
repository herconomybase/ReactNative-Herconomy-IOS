import React, {useState} from 'react';
import {Container, SizedBox, InputWrap, scaleFont, TouchWrap, Page, ImageWrap} from 'simple-react-native-components';
import Colors from '../../helpers/colors';
import {H1} from '../../components/component';
import {ResourcesTabScreen} from '../../helpers/route';
import Feather from 'react-native-vector-icons/Feather';
import walk2 from '../../../assets/img/walk2.png';
import walk4 from '../../../assets/img/walk4.png';
import {FlatList} from 'react-native-gesture-handler';

const Resources = ({navigation, route}) => {
  const data = [
    {
      id: 1,
      image: walk2,
      name: 'Sessions',
      type: 'session',
      title: 'LightBox Sessions',
    },
    {
      id: 2,
      image: walk4,
      name: 'PDF',
      type: 'pdf',
      title: 'PDF Resources',
    },
  ];
  return (
    <Page barIconColor="light-content" backgroundColor={Colors.primary}>
      <Container paddingHorizontal={6} paddingTop={6} direction="row" verticalAlignment="center">
        <TouchWrap paddingRight={5} paddingTop={1.5} paddingBottom={1.5} onPress={() => navigation.openDrawer()}>
          <Feather Icon name="menu" size={scaleFont(25)} color="#fff" />
        </TouchWrap>
      </Container>
      <SizedBox height={1} />
      <Container
        flex={1}
        paddingHorizontal={6}
        backgroundColor={Colors.white}
        borderTopLeftRadius={50}
        borderTopRightRadius={50}
        marginTop={2}>
        <SizedBox height={4} />
        <Container flexGrow={1}>
          <FlatList
            keyExtractor={(item, id) => id.toString()}
            extraData={data}
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Container marginBottom={10}>
                <TouchWrap onPress={() => navigation.navigate('ResourceDetails', {item})}>
                  <ImageWrap source={item.image} height={30} fit="contain" />
                  <H1 textAlign="center">{item.title}</H1>
                </TouchWrap>
              </Container>
            )}
          />
        </Container>
        <SizedBox height={4} />
      </Container>
    </Page>
  );
};
export default Resources;
