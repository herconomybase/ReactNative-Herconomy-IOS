import React, {useState, useEffect} from 'react';
import {Container, SizedBox, InputWrap, scaleFont, TouchWrap, Page, ImageWrap} from 'simple-react-native-components';
import Colors from '../../helpers/colors';
import {H2, P} from '../../components/component';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {Capitalize} from '../../helpers/utils';
import YouTube from 'react-native-youtube';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';

const Show = ({navigation, route}) => {
  const source =
    route.params.type === 'PDF'
      ? {uri: route.params.data ? route.params.data.file : '', cache: true}
      : route.params.data
      ? route.params.data.link.split('https://youtu.be/')[1]
      : '';
  console.log('source>>', route);
  return (
    <Page barIconColor="light-content" backgroundColor={Colors.primary}>
      <Container paddingHorizontal={6} paddingTop={6} direction="row" verticalAlignment="center" paddingRight={15}>
        <TouchWrap paddingRight={5} paddingTop={1.5} paddingBottom={1.5} onPress={() => navigation.navigate("ResourceDetails")}>
          <Feather Icon name="chevron-left" size={scaleFont(25)} color="#fff" />
        </TouchWrap>
        <H2 fontSize={13} color={Colors.whiteBase}>
          {route.params.data ? route.params.data.title : ''}
        </H2>
      </Container>
      <SizedBox height={1} />
      {route.params.type === 'video' ? (
        <Container flex={1} paddingHorizontal={6} backgroundColor={Colors.white} marginTop={2}>
          <SizedBox height={4} />
          <Container flexGrow={1}>
            <YouTube
              apiKey="AIzaSyCVyf4csy4trJfLZRH2TmfFsaRBEgMprKg"
              videoId={source} // The YouTube video ID
              play={false} // control playback of video with true/false
              fullscreen={true} // control whether the video should play in fullscreen or inline
              loop // control whether the video should loop when ended
              style={{alignSelf: 'stretch', height: 200}}
            />
          </Container>
          <SizedBox height={4} />
        </Container>
      ) : (
        <View style={styles.container}>
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={error => {
            }}
            onPressLink={uri => {
            }}
            style={styles.pdf}
          />
        </View>
      )}
    </Page>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default Show;
