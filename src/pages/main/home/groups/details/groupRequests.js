import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {
  Page,
  Container,
  TouchWrap,
  SizedBox,
  scaleFont,
  Rounded,
  ImageWrap,
  Avatar,
  ScrollArea,
  InputWrap,
} from 'simple-react-native-components';
import {ActivityIndicator} from 'react-native';
import {H1, H2, P, LocalAvatar} from '../../../../../components/component';
import OppDetailsHeader from '../../../../../components/opp_details_header';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../../../helpers/colors';
import {apiFunctions} from '../../../../../helpers/api';
import {ToastLong, ToastShort} from '../../../../../helpers/utils';
import axios from 'axios';
import { getData, storeData } from '../../../../../helpers/functions';
import { ReloadGroups } from '../../../../../helpers/global_sockets';

const MemberBox = ({navigation, member, admins, token,data,index,requests,setRequest,setRequestHolder}) => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const updateResult = useStoreActions(action => action.resultModel.updateResult);

  const accept = async () => {
    try {
      if(loading2){
        return
      } 
      setLoading1(true);
      let payload = {
        request_id: member.id,
      };
      await apiFunctions.groupRequestAccept(token, member.group, payload);
      let grps = await getData("groups");
      let grp_index = grps.map(grp=>grp.id).indexOf(data.post !== false ? data.id : data.action_id);
      let grp_members = grps[grp_index] && grps[grp_index].members && grps[grp_index].members.length > 0 ? 
      [...grps[grp_index].members,member.user] : [member.user];
      grps[grp_index].members = grp_members;
      await storeData("groups",grps);
      let members = await getData(`members-${data.post !== false ? data.id : data.action_id}`);
      await storeData(`members-${data.post !== false ? data.id : data.action_id}`,[...members,member.user]);
      let pending = [...requests];
      pending.splice(index,1);
      setRequest(pending);
      setRequestHolder(pending);
      ToastLong('User Accepted');
      let fd = {"group_id" : member.group}
      ReloadGroups(fd);
      setLoading1(false);
    } catch (err) {
      console.log("err",err);
      setLoading1(false);
    }
  };

  const decline = async () => {
    try {
      if(loading1){
        return
      } 
      setLoading2(true);
      let payload = {
        request_id: member.id,
      };
      let res = await apiFunctions.groupRequestDecline(token, member.group, payload);
      let fd = {"group_id" : member.group}
      let reloaded = ReloadGroups(fd);
      setLoading2(false);
      let pending = [...requests];
      pending.splice(index,1);
      setRequest(pending);
      setRequestHolder(pending);
      ToastLong('User Declined');
    } catch (err) {
      setLoading2(false);
    }
  };

  return (
    <TouchWrap
      onPress={() => {
        updateResult(member.user);
        navigation.navigate('Profile', {
          member_info: member.user,
        });
      }}>
      <Container borderColor={Colors.line} borderTopWidth={1}>
        <Container paddingVertical={1} direction="row" key={member.id}>
          <Container padding={2}>
            {member.user.photo === null ? (
              <LocalAvatar size={16} />
            ) : (
              <Avatar size={16} url={member.user.photo} backgroundColor={Colors.primary} />
            )}
          </Container>
          <Container padding={2} marginRight={8} paddingRight={2}>
            <Container borderBottomWidth={0.1} borderBottomColor={Colors.line} marginBottom={1}>
              <H1>
                {member.user.first_name} {member.user.last_name}
              </H1>
            </Container>
            {member.user.profession !== null && member.user.profession.length > 0 && (
              <>
                <P color={Colors.otherText}>{member.user.profession}</P>
                <SizedBox height={0.4} />
              </>
            )}
            {member.user.location !== null &&
              member.user.location !== '0' &&
              member.user.location !== '' &&
              member.user.location.length > 0 && (
                <Container direction="row">
                  <Container paddingTop={0.5}>
                    <Feather name="map-pin" size={scaleFont(10)} color={Colors.black} />
                  </Container>
                  <SizedBox width={1} />
                  <P color={Colors.otherText}>{member.user.location}</P>
                </Container>
              )}
          </Container>
        </Container>

        <Container position="absolute" right={0}>
          <TouchWrap onPress={accept}>
            <Container
              marginTop={2}
              widthPercent={75}
              backgroundColor={Colors.primary}
              horizontalAlignment="center"
              padding={1}
              borderRadius={5}>
              {loading1 ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <P color="white" fontSize={8}>
                  Accept
                </P>
              )}
            </Container>
          </TouchWrap>

          <TouchWrap onPress={decline}>
            <Container marginTop={2} widthPercent={75} backgroundColor="red" horizontalAlignment="center" padding={1} borderRadius={5}>
              {loading2 ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <P color="white" fontSize={8}>
                  Decline
                </P>
              )}
            </Container>
          </TouchWrap>
        </Container>
      </Container>
    </TouchWrap>
  );
};

const GroupRequests = ({navigation, route}) => {
  const [requestHolder, setRequestHolder] = useState([]);
  const [requests, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  const {token, groupInfo,seen_notifications} = useStoreState(state => ({
    groupInfo: state.community.groupInfo,
    token: state.userDetails.token,
    seen_notifications : state.notification.seen_notifications,
  }));
  const updateSeen = useStoreActions(action => action.notification.updateSeen);
  const {data,notification_id} = route.params;
  const getGroupRequests = async groupId => {
    try {
      setLoading(true);
      let groupID = data.post !== false ? data.id : data.action_id;
      let res = await apiFunctions.myGroupRequests(token, groupID);
      // filter for pending requests
      let pending = res.filter(el => el.status === 'pending');
      setRequest(pending);
      setRequestHolder(pending);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(notification_id){
        apiFunctions.markAsSeen(token,notification_id);
        updateSeen([...seen_notifications,notification_id])
      }
      getGroupRequests();
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, [navigation]);

  const searchValue = value => {
    let filtered_members = requestHolder.filter(member => {
      return (
        member.user && member.user.first_name && member.user.first_name.toLowerCase().includes(value.toLowerCase()) ||
        member.user && member.user.last_name && member.user.last_name.toLowerCase().includes(value.toLowerCase()) ||
        member.user && member.user.profession && member.user.profession.toLowerCase().includes(value.toLowerCase()) ||
        member.user && member.user.location && member.user.location.toLowerCase().includes(value.toLowerCase())
      );
    });
    value.length === 0 ? setRequest(requestHolder) : setRequest(filtered_members);
  };

  return (
    <Page barIconColor="light-content" backgroundColor={Colors.primary}>
      <Container paddingHorizontal={6} paddingTop={6} direction="row" horizontalAlignment="space-between" verticalAlignment="center">
        <Container direction="row" verticalAlignment="center">
          <TouchWrap paddingRight={3} onPress={() => navigation.goBack()}>
            <Feather Icon name="chevron-left" size={scaleFont(25)} color="#fff" />
          </TouchWrap>
          <H1 color="#fff" fontSize={18}>
            Requests
          </H1>
        </Container>
      </Container>
      <SizedBox height={6} />
      <Container flex={1} backgroundColor={Colors.white}>
        <Container direction="row" width="100%" marginHorizontal={6} marginTop={-3} horizontalAlignment="center">
          <InputWrap
            placeholder="Search"
            backgroundColor="#fff"
            flex={1}
            elevation={10}
            paddingTop={2}
            paddingBottom={2}
            paddingLeft={5}
            borderRadius={50}
            onChangeText={value => searchValue(value)}
            width={85}
          />
        </Container>
        <SizedBox height={2} />

        <SizedBox height={2} />

        <ScrollArea>
          <Container paddingHorizontal={5}>
            <Container paddingRight={2}>
              {
                requests.length === 0 && !loading ? (
                    <Container>
                        <P textAlign="center">You have no pending requests</P>
                    </Container>
                ) : null
              }
              {
                <FlatList
                  data={requests}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item, index}) => <MemberBox member={item} navigation={navigation} 
                    token={token} data={data} 
                    index={index}
                    requests={requests}
                    setRequest={setRequest}
                    setRequestHolder={setRequestHolder}
                  />}
                  showsVerticalScrollIndicator={false}
                  refreshing={loading}
                  onRefresh={getGroupRequests}
                />
              }
            </Container>
          </Container>
        </ScrollArea>
      </Container>
    </Page>
  );
};

export default GroupRequests;
