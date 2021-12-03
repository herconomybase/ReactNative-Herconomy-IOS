import React, {useEffect, useState} from 'react';
import {Page, Container, SizedBox, ScrollArea, InputWrap} from 'simple-react-native-components';
import {H1} from '../../../components/component';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import FilterIcon from '../../../../assets/img/icons/filter_icon.png';
import EventCard from '../../../components/event_card';
import {FlatList} from 'react-native-gesture-handler';
import {apiFunctions} from '../../../helpers/api';
import {ActivityIndicator} from 'react-native';
import {ToastLong, ToastShort} from '../../../helpers/utils';
import {storeData, getData} from '../../../helpers/functions';
import {useStoreState} from 'easy-peasy';
import moment from 'moment';

const UpcomingEvents = ({navigation, route}) => {
  const {token} = useStoreState(state => ({
    token: state.userDetails.token,
  }));
  const getEvents = async () => {
    try {
      setLoading(true);
      let events = await apiFunctions.getEvents(token);
      console.log(events);
      let upcomingEvents = events.filter(event => {
        return event.status === 'open' && new Date(event.start_datetime).getTime() > new Date().getTime();
      });

      storeData('upcomingEvents', events);
      console.log(upcomingEvents);
      setUpcomingEvents(upcomingEvents);
      setEventsHolder(upcomingEvents);
      setLoading(false);
    } catch (error) {
      console.log(error);
      ToastLong(error.msg);
    }
  };

  const fetchEvents = async () => {
    let events = await getData('upcomingEvents');
    if (events) {
      let upcomingEvents = events.filter(event => {
        return event.status === 'open' && new Date(event.start_datetime).getTime() > new Date().getTime();
      });
      console.log('storedevents', upcomingEvents);
      setUpcomingEvents(upcomingEvents);
      setEventsHolder(upcomingEvents);
      setLoading(false);
    }
  };

  const searchEngine = value => {
    let result = eventsHolder.filter(event => {
      return (
        event.title.toLowerCase().includes(value.toLowerCase()) ||
        moment(event.start_datetime)
          .format('MMM')
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        event.location.toLowerCase().includes(value.toLowerCase()) ||
        event.city.toLowerCase().includes(value.toLowerCase())
      );
    });
    console.log(result);
    value.length === 0 ? setUpcomingEvents(eventsHolder) : setUpcomingEvents(result);
  };

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsHolder, setEventsHolder] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getEvents();
      fetchEvents();
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, [navigation]);
  return (
    <Container flex={1}>
      <ScrollArea>
        <Container padding={5}>
          {isLoading && <ActivityIndicator size="large" color={Colors.primary} />}
          {!isLoading && eventsHolder.length > 0 && (
            <>
              <Container horizontalAlignment="center" padding={2}>
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
              <SizedBox height={0.8} />
              {!isLoading && upcomingEvents.length > 0 ? (
                <Container>
                  <FlatList
                    inverted
                    data={upcomingEvents}
                    extraData={upcomingEvents}
                    keyExtractor={upcomingEvent => upcomingEvent.id.toString()}
                    renderItem={({item, index}) => (
                      <EventCard navigation={navigation} data={item} navigateTo="EventDetails" tabName="upcomingEvents" />
                    )}
                    showsVerticalScrollIndicator={false}
                  />
                </Container>
              ) : (
                <Container horizontalAlignment="center" verticalAlignment="center">
                  <H1>No upcoming events found</H1>
                </Container>
              )}
            </>
          )}
          {!isLoading && upcomingEvents.length === 0 && eventsHolder.length === 0 && (
            <Container horizontalAlignment="center" verticalAlignment="center">
              <H1>No upcoming events found</H1>
            </Container>
          )}
        </Container>
      </ScrollArea>
    </Container>
  );
};

export default UpcomingEvents;
