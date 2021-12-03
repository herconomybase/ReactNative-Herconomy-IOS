import React, {useState, useEffect} from 'react';
import {Page, Container, TouchWrap, scaleFont, SizedBox, ImageWrap, ScrollArea, InputWrap} from 'simple-react-native-components';
import {H1} from '../../../components/component';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import FilterIcon from '../../../../assets/img/icons/filter_icon.png';
import EventCard from '../../../components/event_card';
import {FlatList} from 'react-native-gesture-handler';
import {useStoreState} from 'easy-peasy';
import {apiFunctions} from '../../../helpers/api';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';
import {storeData, getData} from '../../../helpers/functions';
import {ToastLong, ToastShort} from '../../../helpers/utils';

const MyEvents = ({navigation, route}) => {
  const {token} = useStoreState(state => ({
    token: state.userDetails.token,
  }));
  const getMyEvents = async () => {
    try {
      setLoading(true);
      let myEvents = await apiFunctions.getMyEvents(token);
      console.log(myEvents);
      storeData('myEvents', myEvents);
      setmyEvents(myEvents);
      setEventsHolder(myEvents);
      setLoading(false);
    } catch (error) {
      console.log(error);
      ToastLong(error.msg);
    }
  };

  const fetchData = async () => {
    let myEvents = await getData('myEvents');
    if (myEvents) {
      console.log('storedMyEvents', myEvents);
      setmyEvents(myEvents);
      setEventsHolder(myEvents);
      setLoading(false);
    }
  };

  // const searchEngine = value => {
  //   let result = eventsHolder.filter(data => {
  //     return (
  //       data.event.title.toLowerCase().includes(value.toLowerCase()) ||
  //       moment(data.event.start_datetime)
  //         .format('MMM')
  //         .toLowerCase()
  //         .includes(value.toLowerCase()) ||
  //       data.event.location.toLowerCase().includes(value.toLowerCase()) ||
  //       data.event.city.toLowerCase().includes(value.toLowerCase())
  //     );
  //   });
  //   value.length === 0 ? setmyEvents(eventsHolder) : setmyEvents(result);
  // };

  const [myEvents, setmyEvents] = useState([]);
  const [eventsHolder, setEventsHolder] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyEvents();
      fetchData();
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, [navigation]);
  return (
    <Container flex={1}>
      <ScrollArea>
        <Container padding={5}>
          <Container horizontalAlignment="center">
            <Container widthPercent="80%">
              <InputWrap
                placeholder="Search"
                backgroundColor="#fff"
                flex={1}
                elevation={10}
                paddingTop={2}
                paddingLeft={5}
                borderRadius={50}
                // onChangeText={value => searchEngine(value)}
                height={7.3}
              />
            </Container>
          </Container>

          <SizedBox height={3} />
          {isLoading && <ActivityIndicator size="large" color={Colors.primary} />}
          {!isLoading && eventsHolder.length > 0 && (
            <Container>
              <FlatList
                data={myEvents}
                extraData={myEvents}
                keyExtractor={myEvent => myEvent.id.toString()}
                renderItem={({item, index}) => (
                  <EventCard navigation={navigation} data={item} navigateTo="EventDetails" tabName="myEvents" groupByMonth={false} />
                )}
                showsVerticalScrollIndicator={false}
              />
            </Container>
          )}

          {!isLoading && myEvents.length === 0 && eventsHolder.length === 0 && (
            <Container horizontalAlignment="center" verticalAlignment="center">
              <H1>No events found</H1>
            </Container>
          )}
        </Container>
      </ScrollArea>
    </Container>
  );
};

export default MyEvents;
