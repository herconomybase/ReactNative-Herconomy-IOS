import React, {useState, useEffect} from 'react';
import {Page, Container, TouchWrap, scaleFont, SizedBox, ImageWrap, ScrollArea, InputWrap} from 'simple-react-native-components';
import {H1, ImageCardHolder} from '../../../components/component';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import FilterIcon from '../../../../assets/img/icons/filter_icon.png';
import EventCard from '../../../components/event_card';
import {FlatList} from 'react-native-gesture-handler';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {apiFunctions} from '../../../helpers/api';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';
import {ToastLong, ToastShort} from '../../../helpers/utils';
import {storeData, getData} from '../../../helpers/functions';

const PastEvents = ({navigation, route}) => {
  const {token, retry} = useStoreState(state => ({
    token: state.userDetails.token,
    retry: state.retryModel.retry,
  }));
  const {updateFunc, updateRetry} = useStoreActions(action => ({
    updateFunc: action.retryModel.updateFunc,
    updateRetry: action.retryModel.updateRetry,
  }));

  const getMyEvents = async () => {
    try {
      setLoading(true);
      updateRetry(false);
      updateFunc(getMyEvents);
      let events = await apiFunctions.getEvents(token);
      let pastEvents = events.filter(event => new Date(event.start_datetime).getTime() < new Date().getTime());
      setPastEvents(pastEvents);
      setEventsHolder(pastEvents);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      updateFunc(getMyEvents);
      updateRetry(true);
      ToastLong(error.msg);
    }
  };

  const fetchEvents = async () => {
    let events = await getData('pastEvents');
    if (events) {
      let pastEvents = events.filter(event => new Date(event.start_datetime).getTime() < new Date().getTime());
      setPastEvents(pastEvents);
      setEventsHolder(pastEvents);
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
        (event.location && event.location.toLowerCase().includes(value.toLowerCase())) ||
        (event.city && event.city.toLowerCase().includes(value.toLowerCase()))
      );
    });
    value.length === 0 ? setPastEvents(eventsHolder) : setPastEvents(result);
  };

  const [pastEvents, setPastEvents] = useState([]);
  const [eventsHolder, setEventsHolder] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyEvents();
      // fetchEvents();
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, [navigation, retry]);
  return (
    <Container flex={1}>
      <ScrollArea>
        <Container padding={5}>
          <Container horizontalAlignment="center">
            <Container widthPercent="80%">
              <InputWrap
                placeholder="Search"
                backgroundColor="#fff"
                height={5}
                elevation={10}
                paddingLeft={5}
                borderRadius={50}
                onChangeText={value => searchEngine(value)}
                height={7.3}
              />
            </Container>
          </Container>
          <SizedBox height={3} />
            {
                isLoading && pastEvents.length === 0 && eventsHolder.length === 0 && !retry ? (
                    <ImageCardHolder />
                ) : null
            }
            <FlatList 
                data={pastEvents} 
                extraData={pastEvents} 
                keyExtractor={pastEvent => pastEvent.id} 
                renderItem={({item, index}) => <EventCard navigation={navigation} data={item} 
                navigateTo="EventDetails" 
                groupByMonth={false} tabName="pastEvents" index={index} key={index} />} 
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
            />

            {
              !isLoading && pastEvents.length === 0 && eventsHolder.length === 0 && !retry ? (
                    <Container horizontalAlignment="center" verticalAlignment="center">
                        <H1>No past events found</H1>
                    </Container>
              ) : null
            }

          {!isLoading && pastEvents.length === 0 && eventsHolder.length === 0 && !retry ? (
            <Container horizontalAlignment="center" verticalAlignment="center">
              <H1>No past events found</H1>
            </Container>
          ) : null}
        </Container>
      </ScrollArea>
    </Container>
  );
};

export default PastEvents;
