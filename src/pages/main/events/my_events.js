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
import {storeData, getData} from '../../../helpers/functions';
import {ToastLong, ToastShort} from '../../../helpers/utils';

const MyEvents = ({navigation, route}) => {
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
      let myEvents = await apiFunctions.getMyEvents(token);
      setmyEvents(myEvents);
      setEventsHolder(myEvents);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      updateFunc(getMyEvents);
      updateRetry(true);
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

  const searchEngine = value => {
    let result = eventsHolder.filter(data => {
      return (
        data.event.title.toLowerCase().includes(value.toLowerCase()) ||
        moment(data.event.start_datetime)
          .format('MMM')
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        (data.event.location && data.event.location.toLowerCase().includes(value.toLowerCase())) ||
        (data.event.location && data.event.city.toLowerCase().includes(value.toLowerCase()))
      );
    });
    value.length === 0 ? setmyEvents(eventsHolder) : setmyEvents(result);
  };

  const [myEvents, setmyEvents] = useState([]);
  const [eventsHolder, setEventsHolder] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyEvents();
      // fetchData();
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
          {console.log("my_events")}
          {
              isLoading && eventsHolder.length === 0 ? (
                  <ImageCardHolder />
              ) : null
          }
          {!isLoading && eventsHolder.length > 0 && (
            <Container>
              <FlatList
                data={myEvents}
                extraData={myEvents}
                keyExtractor={myEvent => myEvent.id.toString()}
                renderItem={({item, index}) => (
                  <EventCard navigation={navigation} data={item} navigateTo="EventDetails" tabName="myEvents" 
                  groupByMonth={false} key={index}/>
                )}
                showsVerticalScrollIndicator={false}
              />
            </Container>
          )}

          {!isLoading && myEvents.length === 0 && eventsHolder.length === 0 && !retry ? (
            <Container horizontalAlignment="center" verticalAlignment="center">
              <H1>No events found</H1>
            </Container>
          ) : null}
        </Container>
      </ScrollArea>
    </Container>
  );
};

export default MyEvents;
