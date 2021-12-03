import React, {useEffect, useState} from 'react';
import {Page, Container, TouchWrap, scaleFont, SizedBox, ImageWrap, InputWrap, ScrollArea} from 'simple-react-native-components';
import {H1} from '../../../../../components/component';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../../../helpers/colors';
import {apiFunctions} from '../../../../../helpers/api';
import {GroupEventTabScreens} from '../../../../../helpers/route';
import Agsbanner from '../../../../../../assets/img/agsLogo_dark.png';
import {ToastLong, ToastShort} from '../../../../../helpers/utils';
import {useStoreState, useStoreActions} from 'easy-peasy';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {Retry} from '../../../../../components/retry';
import {ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import EventCard from '../../../../../components/event_card';

const GroupEvents = ({navigation, route}) => {
  const [flagshipEvents, setFlagshipEvent] = useState([]);

  const {token, retry, funcCall} = useStoreState(state => ({
    token: state.userDetails.token,
    retry: state.retryModel.retry,
    funcCall: state.retryModel.funcCall,
  }));

  const {updateFunc, updateRetry} = useStoreActions(action => ({
    updateFunc: action.retryModel.updateFunc,
    updateRetry: action.retryModel.updateRetry,
  }));

  let group = route.params.data;
  console.log({group});
  let admin = route.params.is_admin;
  // console.log('events>>', data);

  const getGroupEvents = async () => {
    try {
      console.log('data>>', group);
      setLoading(true);
      updateRetry(false);
      updateFunc(getGroupEvents);
      let data = await apiFunctions.getGroupEvent(token, group.id);
      console.log('>>', data);
      let events = data.map(item => item.event);
      setEvents(events);
      setEventsHolder(events);
      setLoading(false);
    } catch (error) {
      console.log('<<>>>err', error);
      updateFunc(getGroupEvents);
      updateRetry(true);
      setLoading(false);
      ToastLong('Network Error! Please check your internet and retry');
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
    value.length === 0 ? setEvents(eventsHolder) : setEvents(result);
  };

  const [events, setEvents] = useState([]);
  const [eventsHolder, setEventsHolder] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const {group_id} = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateRetry(false);
      getGroupEvents();
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, [navigation, retry]);
  return (
    <Page backgroundColor={Colors.primary} barColor={Colors.black} barIconColor="dark-content">
      <Container
        paddingHorizontal={4}
        paddingTop={4}
        backgroundColor={Colors.primary}
        marginTop={2}
        direction="row"
        verticalAlignment="center">
        <TouchWrap paddingRight={2} paddingBottom={2} paddingTop={2} onPress={() => navigation.goBack()}>
          <Feather Icon name="chevron-left" size={scaleFont(25)} color={Colors.white} />
        </TouchWrap>
        <H1 fontSize={15} color={Colors.white}>
          {group.name}
        </H1>
        <Container widthPercent="30%" />
        {admin ? (
          <TouchWrap onPress={() => navigation.navigate('AddGroupEvent', {group_id})}>
            <Container direction="row">
              <FontAwesome name="calendar" size={scaleFont(20)} color={Colors.white} />
              <Feather name="plus" size={scaleFont(20)} color={Colors.white} />
            </Container>
          </TouchWrap>
        ) : null}
      </Container>
      <SizedBox height={3} />

      {/* ANCHOR - HEADER 2 */}
      <Container flex={1} marginTop={2} backgroundColor={Colors.white} borderTopLeftRadius={50} borderTopRightRadius={50}>
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
                      // paddingTop={2}
                      paddingLeft={5}
                      borderRadius={50}
                      onChangeText={value => searchEngine(value)}
                      height={7.3}
                    />
                  </Container>
                </Container>
                <SizedBox height={0.8} />
                {!isLoading && events.length > 0 ? (
                  <Container>
                    <FlatList
                      data={events}
                      extraData={events}
                      keyExtractor={events => events.id.toString()}
                      renderItem={({item, index}) => (
                        <EventCard
                          navigation={navigation}
                          data={item}
                          navigateTo="EventDetails"
                          tabName="upcomingEvents"
                          is_admin={admin}
                        />
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
            {!isLoading && events.length === 0 && eventsHolder.length === 0 && !retry ? (
              <Container horizontalAlignment="center" verticalAlignment="center">
                <H1>No events found</H1>
              </Container>
            ) : null}
          </Container>
        </ScrollArea>
        {retry ? <Retry funcCall={funcCall} param={[]} /> : null}
      </Container>
    </Page>
  );
};

export default GroupEvents;
