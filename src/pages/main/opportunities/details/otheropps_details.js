import React, {useState, useEffect} from 'react';
import {Page, Container, TouchWrap, SizedBox, scaleFont, Rounded, ImageWrap} from 'simple-react-native-components';
import {Button} from '../../../../components/component';
import Colors from '../../../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {OtherOppsDetailsTabScreen} from '../../../../helpers/route';
import {apiFunctions} from '../../../../helpers/api';
import {ToastShort, ToastLong} from '../../../../helpers/utils';
import {ActivityIndicator, TouchableOpacity, Linking} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {addEventToCalendar} from '../../../../helpers/add_to_calendar';
import moment from 'moment';

const OtherOppsDetails = ({navigation, route}) => {
  let {opportunity, tabname, showButtons, notification_id} = route.params;
  const {token, seen_notifications} = useStoreState(state => ({
    token: state.userDetails.token,
    seen_notifications: state.notification.seen_notifications,
  }));

  console.log({tabname});
  const navigateTo = tabname === 'loans' || tabname === 'grants' || tabname === 'scholarships' ? 'FundApplication' : 'JobApplication';
  console.log(navigateTo);

  const likeUnlikeOpportunity = async () => {
    let oppGroup = tabname === 'jobs' ? 'jobs' : 'scholarships';

    try {
      if (tabname === 'loans' || tabname === 'grants') {
        oppGroup = 'funds';
      }

      console.log('group', oppGroup);
      let res = isLoved
        ? await apiFunctions.unlikeOppOperation(token, opportunity.id, oppGroup)
        : await apiFunctions.likeOppOperation(token, opportunity.id, oppGroup);
      console.log(res.liked);
      setLoved(res.liked);
      setLoading(false);
    } catch (error) {
      console.log(error);
      ToastShort(error.msg.detail);
    }
  };

  const new_opp = opportunity.oppo !== undefined ? opportunity.oppo : opportunity;
  const {updateSeen} = useStoreActions(actions => ({
    updateSeen: actions.notification.updateSeen,
  }));

  const [isLoved, setLoved] = useState(opportunity.liked);
  const [isLoading, setLoading] = useState(false);

  console.log('ID', opportunity.id);

  useEffect(() => {
    if (notification_id) {
      apiFunctions.markAsSeen(token, notification_id);
    }
    if (notification_id && seen_notifications && !seen_notifications.includes(notification_id)) {
      global.tot_notifications = global.tot_notifications - 1;
      updateSeen([...seen_notifications, notification_id]);
    }
    // eslint-disable-next-line
  }, []);

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
          <Rounded size={45} radius={5} marginTop={-14}>
            <ImageWrap
              backgroundColor="#efefef"
              borderRadius={10}
              elevation={5}
              url={new_opp.banner ? new_opp.banner : new_opp.logo}
              flex={1}
            />
          </Rounded>
          <SizedBox height={2} />
          <Container flex={1} widthPercent="100%" paddingHorizontal={6}>
            <SizedBox height={5} />
            <OtherOppsDetailsTabScreen tabname={tabname} />

            {showButtons && (
              <Container direction="row" padding={5} horizontalAlignment="center">
                <TouchableOpacity
                  onPress={() => {
                    likeUnlikeOpportunity();
                  }}>
                  <Container paddingVertical={2.3} borderWidth={2} borderColor={Colors.lightGrey} padding={4} borderRadius={5}>
                    {isLoved && !isLoading && (
                      <ImageWrap width={6} height={3} source={require('../../../../../assets/img/icons/love.png')} fit="contain" />
                    )}
                    {!isLoved && !isLoading && <Feather Icon name="heart" size={scaleFont(18)} color={Colors.primary} />}
                    {isLoading && <ActivityIndicator size="small" color={Colors.primary} />}
                  </Container>
                </TouchableOpacity>
                <SizedBox width={3} />
                <TouchableOpacity
                  onPress={() => {
                    addEventToCalendar(
                      opportunity.title,
                      moment.utc(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                      moment.utc(new Date(opportunity.end_date)).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                      opportunity.description ? opportunity.description : opportunity.eligibility,
                    );
                  }}>
                  <Container paddingVertical={2.3} borderWidth={2} borderColor={Colors.lightGrey} padding={4} borderRadius={5}>
                    <Feather Icon name="calendar" size={scaleFont(16)} color={Colors.primary} />
                  </Container>
                </TouchableOpacity>
                <SizedBox width={3} />
                {opportunity.inapp ? (
                  <Button
                    title="APPLY"
                    backgroundColor={Colors.primary}
                    borderColor={Colors.primary}
                    widthPercent="50%"
                    borderRadius={5}
                    onPress={() => navigation.navigate(navigateTo, {opportunity, tabname})}
                  />
                ) : (
                  <Button
                    title="APPLY"
                    backgroundColor={Colors.primary}
                    borderColor={Colors.primary}
                    widthPercent="50%"
                    borderRadius={5}
                    onPress={() => Linking.openURL(opportunity.link)}
                  />
                )}
              </Container>
            )}
          </Container>
        </Container>
      </Container>
    </Page>
  );
};

export default OtherOppsDetails;
