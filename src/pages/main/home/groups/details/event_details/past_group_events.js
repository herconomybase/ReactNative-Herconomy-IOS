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
import {ToastLong, ToastShort} from '../../../helpers/utils';
import {storeData, getData} from '../../../helpers/functions';

const PastEvents = ({navigation, route}) => {
  const {token} = useStoreState(state => ({
    token: state.userDetails.token,
  }));
  const getMyEvents = async () => {
    try {
      setLoading(true);
      console.log('calling');
      let events = await apiFunctions.getEvents(token);
      let pastEvents = events.filter(event => new Date(event.start_datetime).getTime() < new Date().getTime());
      storeData('pastEvents', events);
      setPastEvents(pastEvents);
      setEventsHolder(pastEvents);
      setLoading(false);
    } catch (error) {
      console.log(error);
      ToastLong(error.msg);
    }
  };

  const fetchEvents = async () => {
    let events = await getData('pastEvents');
    if (events) {
      console.log('stored past events', events);
      let pastEvents = events.filter(event => new Date(event.start_datetime).getTime() < new Date().getTime());
      setPastEvents(pastEvents);
      setEventsHolder(pastEvents);
      setLoading(false);
    }
  };

  const searchEngine = value => {
    let result = eventsHolder.filter(({event}) => {
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
    value.length === 0 ? setPastEvents(eventsHolder) : setPastEvents(result);
  };

  const [pastEvents, setPastEvents] = useState([]);
  const [eventsHolder, setEventsHolder] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyEvents();
      fetchEvents();
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
            <>
              {!isLoading && pastEvents.length > 0 ? (
                <Container>
                  <FlatList
                    data={pastEvents}
                    extraData={pastEvents}
                    keyExtractor={pastEvent => pastEvent.id.toString()}
                    renderItem={({item, index}) => (
                      <EventCard navigation={navigation} data={item} navigateTo="EventDetails" groupByMonth={false} tabName="pastEvents" />
                    )}
                    showsVerticalScrollIndicator={false}
                  />
                </Container>
              ) : (
                <Container horizontalAlignment="center" verticalAlignment="center">
                  <H1>No events found</H1>
                </Container>
              )}
            </>
          )}

          {!isLoading && pastEvents.length === 0 && eventsHolder.length === 0 && (
            <Container horizontalAlignment="center" verticalAlignment="center">
              <H1>No past events found</H1>
            </Container>
          )}
        </Container>
      </ScrollArea>
    </Container>
  );
};

export default PastEvents;
