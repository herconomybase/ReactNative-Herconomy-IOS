import React, {useEffect, useState} from 'react';
import {Page, Container, TouchWrap, scaleFont, SizedBox, ImageWrap, ScrollArea, Width} from 'simple-react-native-components';
import {H1} from '../../../components/component';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import {apiFunctions} from '../../../helpers/api';
import {EventTabScreens} from '../../../helpers/route';
import Agsbanner from '../../../../assets/img/agsLogo_dark.png';
import {ToastLong, ToastShort} from '../../../helpers/utils';
import {useStoreState} from 'easy-peasy';
import {FlatList, ScrollView, Image, ImageBackground, Linking} from 'react-native';
import Swiper from 'react-native-swiper';
import {Retry} from '../../../components/retry';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Events = ({navigation}) => {
  const [flagshipEvents, setFlagshipEvent] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const {token} = useStoreState(state => ({
    token: state.userDetails.token,
  }));

  const {retry, funcCall} = useStoreState(state => ({
    retry: state.retryModel.retry,
    funcCall: state.retryModel.funcCall,
  }));

  const getMyEvents = async () => {
    try {
      setLoading(true);
      let adverts = await apiFunctions.getAdvert(token);
      let filter = adverts.filter(ad=>!moment(new Date()).isAfter(moment(ad.end_date)))
      console.log(filter);
      setAdverts(filter);
      setLoading(false);
    } catch (error) {
      console.log(error);
      ToastLong(error.msg);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyEvents();
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, [navigation, retry]);
  return (
    <Page backgroundColor={Colors.white} barColor={Colors.black} barIconColor="dark-content">
      <Container paddingHorizontal={4} paddingTop={4} backgroundColor={Colors.white}>
        <TouchWrap paddingRight={2} paddingBottom={2} paddingTop={2} onPress={() => navigation.openDrawer()}>
          <Feather Icon name="menu" size={scaleFont(25)} color={Colors.black} />
        </TouchWrap>

        {adverts.length > 0 ? (
          <Container height={20}>
            <Swiper autoplay={true} activeDotColor={Colors.primary}>
              {adverts.map((item, index) => {
                return (
                  <TouchableOpacity 
                    key={index}
                    onPress={()=>{
                      if(!Linking.canOpenURL(item.link)) return;
                      Linking.openURL(item.link)
                    }}
                  >
                    <Container>
                      <ImageWrap
                        borderTopLeftRadius={10}
                        borderBottomLeftRadius={10}
                        url={item.image}
                        borderRadius={10}
                        backgroundColor="#efefef"
                        height={20}
                        widthPercent="100%"
                        fit="cover"
                      />
                    </Container>
                  </TouchableOpacity>
                );
              })}
            </Swiper>
          </Container>
        ) : (
          <ImageWrap
            borderTopLeftRadius={10}
            borderBottomLeftRadius={10}
            source={Agsbanner}
            borderRadius={10}
            backgroundColor="#efefef"
            height={20}
            fit="contain"
          />
        )}
      </Container>

      {/* ANCHOR - HEADER 2 */}
      <Container flex={1} marginTop={2} backgroundColor={Colors.white} borderTopLeftRadius={50} borderTopRightRadius={50}>
        <EventTabScreens />
        {retry ? <Retry funcCall={funcCall} param={[]} /> : null}
      </Container>
    </Page>
  );
};

export default Events;
