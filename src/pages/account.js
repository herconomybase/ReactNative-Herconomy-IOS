import React, {useState, useEffect} from 'react';
import {AppPageTitle, H1, H2, P, LocalAvatar, Button} from '../components/component';
import {ActivityIndicator} from 'react-native';
import {
  Container,
  Page,
  TouchWrap,
  scaleFont,
  SizedBox,
  InputWrap,
  ImageWrap,
  Avatar,
  Rounded,
  ScrollArea,
} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../helpers/colors';
import {apiFunctions} from '../helpers/api';
import {ToastLong} from '../helpers/utils';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Pay1 from '../../assets/img/icons/watch.png';
import Pay2 from '../../assets/img/icons/people.png';
import Pay3 from '../../assets/img/icons/naira.png';
import PlanLady1 from '../../assets/img/silver_lady.png';
import moment from 'moment';

const Account = props => {
  const [reload, setReload] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [subscription, setSubscription] = useState({});

  const {userD, subscriptionStatus, token} = useStoreState(state => ({
    userD: state.userDetails.user,
    subscriptionStatus: state.userDetails.subscriptionStatus,
    token: state.userDetails.token,
  }));

  const {_updateSubscriptionStatus} = useStoreActions(actions => ({
    _updateSubscriptionStatus: actions.userDetails.updateSubscriptionStatus,
  }));

  const getPlan = async () => {
    try {
      setLoading(true);
      let res = await apiFunctions.subscriptionStatus(token);
      setSubscription(res);
      _updateSubscriptionStatus(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastLong(error.msg);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getPlan();
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, [props.navigation]);

  return (
    <Page barIconColor="light-content" backgroundColor={Colors.primary}>
      <Container paddingHorizontal={6} paddingTop={6} direction="row" verticalAlignment="center">
        <TouchWrap paddingRight={5} paddingTop={1.5} paddingBottom={1.5} onPress={() => props.navigation.goBack()}>
          <Feather Icon name="chevron-left" size={scaleFont(25)} color="#fff" />
        </TouchWrap>
      </Container>
      <SizedBox height={3} />
      <Container backgroundColor={Colors.white} flex={1} paddingHorizontal={10} borderTopLeftRadius={50} borderTopRightRadius={50} over>
        <ScrollArea flexGrow={1}>
          <SizedBox height={3} />
          <Container backgroundColor="#FFB742" borderRadius={20}>
            <SizedBox height={2} />
            <ImageWrap source={PlanLady1} fit="contain" height={16} />
            <SizedBox height={3} />
            <Container horizontalAlignment="center" paddingHorizontal={7}>
              <P>{userD.email}</P>
            </Container>
            <Container horizontalAlignment="center" verticalAlignment="center" padding={5}>
              <H2>You are on</H2>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.button} />
              ) : (
                <H1 fontSize={18}>
                  {subscriptionStatus.sub_status === false
                    ? 'Free Plan'
                    : subscriptionStatus.plan.name === 'ags_gold_50000'
                    ? 'Gold'
                    : 'Silver'}
                </H1>
              )}

              {/*<P textAlign="center" fontSize={10}>
                  Unlock your membership to gain full access to the Tribe and a host of benefits.
                </P>*/}
            </Container>
            <SizedBox height={2} />
            <Container paddingLeft={7} paddingRight={7} marginBottom={2}>
              {!isLoading && subscriptionStatus.sub_status === false && (
                <P>
                  Upgrade to a paid membership to interact with people of like minds in Groups, chat directly to members and even more,
                  unlock exclusive shopping discounts with the Gold plan.
                </P>
              )}
              {!isLoading && subscriptionStatus.sub_status && subscriptionStatus.plan.name !== 'ags_gold_50000' && (
                <>
                  <P>Upgrade to the Gold Plan to join the affinity network and enjoy up to 30% discounts with top brands.</P>
                  <SizedBox height={2} />
                  <H1 fontSize={10}>
                    Next Payment Date:{' '}
                    {subscriptionStatus.next_payment_date && moment(subscriptionStatus.next_payment_date).format('DD MMMM, YYYY')}
                  </H1>
                </>
              )}
              {!isLoading && subscriptionStatus.sub_status && subscriptionStatus.plan.name === 'ags_gold_50000' && (
                <>
                  <SizedBox height={2} />
                  <H1 fontSize={10}>
                    Next Payment Date:{' '}
                    {subscriptionStatus.next_payment_date && moment(subscriptionStatus.next_payment_date).format('DD MMMM, YYYY')}
                  </H1>
                </>
              )}
            </Container>
            {/*
              <Container direction="row">
                <Container widthPercent="30%" verticalAlignment="flex-start" horizontalAlignment="center">
                  <ImageWrap source={Pay2} height={5} fit="contain" />
                </Container>
                <Container widthPercent="70%" paddingRight={6} verticalAlignment="center" horizontalAlignment="flex-start">
                  <P>Join an exclusive group of talented and influential women.</P>
                </Container>
              </Container>
              <SizedBox height={4} />
              <Container direction="row">
                <Container widthPercent="30%" verticalAlignment="flex-start" horizontalAlignment="center">
                  <ImageWrap source={Pay3} height={5} fit="contain" />
                </Container>
                <Container widthPercent="70%" paddingRight={5} verticalAlignment="center" horizontalAlignment="flex-start">
                  <P>Earn money by joining our affiliate program.</P>
                </Container>
              </Container>
              <SizedBox height={4} />
              <Container direction="row">
                <Container widthPercent="30%" verticalAlignment="flex-start" horizontalAlignment="center">
                  <ImageWrap source={Pay1} height={5} fit="contain" />
                </Container>
                <Container
                  widthPercent="70%"
                  paddingRight={5}
                  verticalAlignment="center"
                  horizontalAlignment="flex-start"
                  paddingBottom={2}>
                  <P>Get timely information about opportunities such as grants, loans, investment, jobs, fellowships and more...</P>
                </Container>
              </Container>
              */}
            {/*subscriptionStatus.sub_status === false && (
                <Container padding={10} horizontalAlignment="center">
                  <Button borderRadius={5} onPress={() => props.navigation.navigate('Upgrade')} title="Upgrade" />
                </Container>
              )*/}

            {/*subscriptionStatus.sub_status && subscriptionStatus.plan.name !== 'ags_gold_50000' && (
                <Container padding={10} horizontalAlignment="center">
                  <Button borderRadius={5} onPress={() => props.navigation.navigate('Upgrade to Gold')} title="Upgrade" />
                </Container>
              )*/}

            {!isLoading && subscriptionStatus.sub_status && subscriptionStatus.plan.name !== 'ags_gold_50000' && (
              <Container padding={10} horizontalAlignment="center">
                <Button borderRadius={5} onPress={() => props.navigation.navigate('Upgrade', {tabs: [6]})} title="Upgrade to GOLD" />
              </Container>
            )}

            {!isLoading && subscriptionStatus.sub_status === false && (
              <Container padding={10} horizontalAlignment="center">
                <Button borderRadius={5} onPress={() => props.navigation.navigate('Upgrade', {tabs: [4, 6]})} title="Upgrade" />
              </Container>
            )}
          </Container>
        </ScrollArea>
      </Container>
    </Page>
  );
};

export default Account;
