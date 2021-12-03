import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Page, Container, TouchWrap, SizedBox, scaleFont, Rounded, ImageWrap, Avatar, ScrollArea} from 'simple-react-native-components';
import {H1, H2, P, Button} from '../../../../components/component';
import {Verify} from '../../../../components/verify';
import Colors from '../../../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {InvestmentDetailsTabScreen} from '../../../../helpers/route';
import {addEventToCalendar} from '../../../../helpers/add_to_calendar';
import moment from 'moment';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {apiFunctions} from '../../../../helpers/api';
import {Linking} from 'react-native';
import {ToastLong} from '../../../../helpers/utils';

const InvestDetails = ({navigation, route, props}) => {
  const [showVerify, setShowVerify] = useState(false);
  const {notification_id} = route.params;
  console.log({notification_id});
  const {token, seen_notifications} = useStoreState(state => ({
    token: state.userDetails.token,
    seen_notifications: state.notification.seen_notifications,
  }));

  console.log({seen_notifications});

  const {updateSeen} = useStoreActions(actions => ({
    updateSeen: actions.notification.updateSeen,
  }));

  const {userD} = useStoreState(state => ({
    userD: state.userDetails.user,
  }));

  const invest = () => {
    console.log({userD});
    if (userD.is_email_verified === false) {
      setShowVerify(true);
    } else {
      navigation.navigate('BuyUnits', {investment: route.params.opportunity});
    }
  };

  React.useEffect(() => {
    if (notification_id) {
      apiFunctions.markAsSeen(token, notification_id);
    }
    if (notification_id && !seen_notifications?.includes(notification_id)) {
      global.tot_notifications = global.tot_notifications - 1;
      updateSeen([...seen_notifications, notification_id]);
    }
  });

  const resendVerification = async () => {
    let fd = {email: userD.email};
    apiFunctions
      .resendVerification(fd)
      .then(res => {
        console.log({res});
        Alert.alert('email verification sent');
      })
      .catch(err => console.log(err));
  };

  const opportunity = route.params.opportunity;
  return (
    <Page barIconColor="light-content" backgroundColor={Colors.primary}>
      <Container paddingHorizontal={6} paddingTop={6} direction="row" verticalAlignment="center">
        <TouchWrap paddingRight={5} paddingTop={1.5} paddingBottom={1.5} onPress={() => navigation.goBack()}>
          <Feather Icon name="chevron-left" size={scaleFont(25)} color="#fff" />
        </TouchWrap>
      </Container>
      <SizedBox height={8} />

      <Container backgroundColor={Colors.white} flex={1} borderTopLeftRadius={50} borderTopRightRadius={50}>
        <Container horizontalAlignment="center" flex={1}>
          <Rounded size={45} radius={5} marginTop={-12}>
            <ImageWrap backgroundColor="#efefef" borderRadius={10} elevation={5} url={route.params.opportunity.logo} flex={1} />
          </Rounded>
          <SizedBox height={6} />

          {showVerify && (
            <Container marginBottom={2}>
              <Verify onPress={() => resendVerification()} />
            </Container>
          )}

          <Container flex={1} widthPercent="100%" paddingHorizontal={6}>
            <Container>
              {/* ANCHOR - PROFILE NAME */}

              <Container horizontalAlignment="center" verticalAlignment="center" borderBottomWidth={1} borderColor={Colors.line}>
                <H1 fontSize={15}>{opportunity.title}</H1>
                <SizedBox height={1.5} />
              </Container>
              <SizedBox height={0.5} />
            </Container>
            <SizedBox height={4} />
            <InvestmentDetailsTabScreen />
            <Container>
              {route.params.opportunity.status === 'active' && (
                <Container direction="row" padding={4} paddingBottom={5}>
                  <Container widthPercent="70%">
                    <Button
                      title={opportunity.cta_title ? opportunity.cta_title.toString().toUpperCase() : 'INVEST'}
                      borderRadius={4}
                      backgroundColor={Colors.lightGreen}
                      borderColor={Colors.lightGreen}
                      onPress={() => {
                        if (opportunity.investment_type === 'real estate' || (opportunity.cta_link && opportunity.cta_link.length > 0)) {
                          return opportunity.cta_link ? Linking.openURL(opportunity.cta_link) : ToastLong('Invalid link provided');
                        }
                        navigation.navigate('BuyUnits', {investment: opportunity});
                      }}
                    />
                  </Container>
                  <Container width="20%" marginLeft={4}>
                    <TouchWrap
                      onPress={() =>
                        addEventToCalendar(
                          route.params.opportunity.title,
                          moment.utc(route.params.opportunity.start_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                          moment.utc(route.params.opportunity.end_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                          route.params.opportunity.description,
                        )
                      }>
                      <Container paddingRight={5} padding={2.5} paddingLeft={4} borderWidth={2} borderColor={Colors.line} borderRadius={3}>
                        <Feather Icon name="calendar" size={scaleFont(25)} color={Colors.black} />
                      </Container>
                    </TouchWrap>
                  </Container>
                </Container>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    </Page>
  );
};

export default InvestDetails;
