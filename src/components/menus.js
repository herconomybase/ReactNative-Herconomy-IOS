import React, {useEffect} from 'react';
import {
  Container,
  TouchWrap,
  scaleFont,
  SizedBox,
  SlideTransitionCallback,
  Avatar,
  Rounded,
  ImageWrap,
} from 'simple-react-native-components';
import Colors from '../helpers/colors';
import {H1, H2, P, LocalAvatar, Button} from './component';
import CustomIcon from './customIcon';
import {SafeAreaView, Keyboard} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {RouteContext} from '../helpers/routeContext';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin} from '@react-native-community/google-signin';
import ReferEarn from '../pages/refer_and_earn/refer_earn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getData, storeData} from '../helpers/functions';
import {manageFeedData, manageGroupData, manageTopicData, ReloadGroups } from '../helpers/global_sockets';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { FONTSIZE, Version_Number } from '../helpers/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { apiFunctions } from '../helpers/api';

//const drawerRouteIcon = ['home', 'package', 'calendar','refresh-cw','file-text', 'thumbs-up', 'gift', 'box', 'settings', 'phone'];
const drawerRouteIcon = ['home','pocket', 'refresh-cw','file-text','box','thumbs-up','calendar','gift','package','phone','settings'];

// const routeIcon = ['home', 'bag', 'plus', 'message', 'event'];
const routeIcon = ['home','savings','plus', 'bag','bell'];

export const HomeTabMenu = props => {
  const [route] = React.useState(props.state.routes);

  return (
    <Container
      paddingBottom={2}
      direction="row"
      backgroundColor={Colors.white}
      paddingHorizontal={6}
      marginTop={2}
      horizontalAlignment="space-between">
      {route.map((el, i) => (
        <TouchWrap
          widthPercent="32%"
          key={i}
          onPress={() => {
            props.navigation.navigate(el.name);
          }}>
          <Container
            borderRadius={5}
            backgroundColor={i === props.state.index ? Colors.primary : Colors.white}
            horizontalAlignment="center"
            paddingVertical={1.5}>
            <H1 fontSize={FONTSIZE.medium} color={i === props.state.index ? '#fff' : Colors.text}>
              {el.name.split('Apps')[0]}
              {/** Investment applications tab names have 'Apps' */}
            </H1>
          </Container>
        </TouchWrap>
      ))}
    </Container>
  );
};

export const OppDetailsTabMenu = props => {
  const [route] = React.useState(props.state.routes);

  return (
    <Container
      paddingBottom={2}
      direction="row"
      backgroundColor={Colors.white}
      paddingHorizontal={2}
      paddingRight={6}
      horizontalAlignment="space-between">
      {route.map((el, i) => (
        <TouchWrap
          widthPercent="35%"
          key={i}
          onPress={() => {
            props.navigation.navigate(el.name);
          }}>
          <Container
            borderRadius={5}
            backgroundColor={i === props.state.index ? Colors.primary : Colors.white}
            horizontalAlignment="center"
            paddingVertical={
              el.name &&
              el.name.includes('_') &&
              (props._props.tabname !== 'scholarships' ||
                props._props.tabname !== 'loans' ||
                props._props.tabname !== 'grants' ||
                props._props.tabname !== 'jobs')
                ? 2
                : 2.2
            }
            height={7}>
            <H1 fontSize={FONTSIZE.medium} color={i === props.state.index ? '#fff' : Colors.text} textAlign="center">
              {props._props.tabname === 'scholarships' && el.name === 'Description'
                ? 'Summary'
                : (props._props.tabname === 'scholarships' ||
                    props._props.tabname === 'loans' ||
                    props._props.tabname === 'grants' ||
                    props._props.tabname === 'jobs') &&
                  el.name === 'Company_Info'
                ? 'How to Apply'
                : el.name.replace('_', '\n')}
            </H1>
          </Container>
        </TouchWrap>
      ))}
    </Container>
  );
};

export const GroupDetailsTabMenu = props => {
  const [route] = React.useState(props.state.routes);

  return (
    <Container
      paddingBottom={2}
      direction="row"
      backgroundColor={Colors.white}
      paddingHorizontal={2}
      paddingRight={6}
      horizontalAlignment="space-between">
      {route.map((el, i) => (
        <TouchWrap
          widthPercent="35%"
          key={i}
          onPress={() => {
            props.navigation.navigate(el.name);
          }}>
          <Container
            borderRadius={5}
            backgroundColor={i === props.state.index ? Colors.primary : Colors.white}
            horizontalAlignment="center"
            paddingVertical={el.name && el.name.includes('_') ? 1 : 2}
            height={8}>
            <H1 fontSize={9} color={i === props.state.index ? '#fff' : Colors.text} textAlign="center">
              {el.name.replace('_', '\n')}
            </H1>
          </Container>
        </TouchWrap>
      ))}
    </Container>
  );
};

export const EventsTabMenu = props => {
  const [route] = React.useState(props.state.routes);

  return (
    <Container
      paddingBottom={2}
      direction="row"
      backgroundColor={Colors.white}
      paddingHorizontal={2}
      paddingRight={6}
      horizontalAlignment="center"
      marginTop={1}
      marginBottom={1}>
      {route.map((el, i) => (
        <TouchWrap
          widthPercent="30%"
          key={i}
          onPress={() => {
            props.navigation.navigate(el.name);
          }}>
          <Container
            borderRadius={5}
            backgroundColor={i === props.state.index ? Colors.primary : Colors.white}
            horizontalAlignment="center"
            paddingVertical={1.5}>
            <H1 fontSize={9} color={i === props.state.index ? '#fff' : Colors.text} textAlign="center">
              {el.name.replace('_', ' ')}
            </H1>
          </Container>
        </TouchWrap>
      ))}
    </Container>
  );
};

export const MainTabMenu = props => {
  const [route] = React.useState(props.state.routes);
  const [isKeyboardDown, setIsKeyboardDown] = React.useState(true);

  const {newMessage, hide_notifications} = useStoreState(state => ({
    newMessage: state.background.newMessage,
    hide_notifications: state.notificationBadge.hide_notifications,
  }));

  const {updateMessages} = useStoreActions(action => ({updateMessages: action.background.updateMessages}));
  const [last_checked, setLastChecked] = React.useState(null);
  const [last_notified, setLastNotified] = React.useState(null);
  const {tot_notifications} = useStoreState(state=>({
    tot_notifications : state.notification.tot_notifications
  }));
  const getLastChecked = async () => {
    let checked = await getData('last_checked');
    let last_notified = await getData('last_notify_date');
    setLastNotified(last_notified);
    setLastChecked(checked);
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    getLastChecked();

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardDown(false);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardDown(true);
  };

  return (
    <>
      <SlideTransitionCallback index={isKeyboardDown} from={6} duration={250}>
        <Container
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
          paddingVertical={1}
          elevation={5}
          direction="row"
          backgroundColor="#fff"
          horizontalAlignment="space-evenly"
          style={{transform: [{rotateZ: '0deg'}]}}>
          {route.map((el, i) => {
            if (el.name === 'Notifications') {
              return (
                <Container key={i} widthPercent="20%">
                  {
                    tot_notifications ? (
                      <Container position="absolute" 
                        backgroundColor={"red"}
                        borderRadius={50}
                        padding={1}
                        width={tot_notifications.toString().length > 2 ? 9 : 7}
                        marginTop={-2}
                        marginLeft={5}
                        horizontalAlignment="center"
                        verticalAlignment="center"
                      >
                        <H1 color={Colors.white} fontSize={8}>
                          {tot_notifications}
                        </H1>
                    </Container>
                    ) : null
                  }
                  <TouchWrap
                    flex={i}
                    onPress={() => {
                      props.navigation.navigate(el.name);
                      // updateMessages('');
                    }}>
                    <Container horizontalAlignment="center"
                      verticalAlignment="center"
                      paddingVertical={0.8}
                    >
                      <Feather name={routeIcon[i]} size={scaleFont(FONTSIZE.icon)} color={i === props.state.index ? Colors.primary : '#231F20'} />
                      <SizedBox height={0.2} />
                      <P color={i === props.state.index ? Colors.primary : '#231F20'} fontSize={5}>{el.name}</P>
                    </Container>
                  </TouchWrap>
                </Container>
              );
            } else {
              return (
                <TouchWrap
                  widthPercent="20%"
                  key={i}
                  onPress={() => {
                    props.navigation.navigate(el.name);
                  }}>
                  <Container horizontalAlignment="center" paddingVertical={1}>
                  {
                        el.name === "Savings" ? (
                          <Fontisto name="wallet" size={scaleFont(FONTSIZE.icon)}
                            color={i === props.state.index ? Colors.primary : '#231F20'} 
                          />
                        ) : (
                          <CustomIcon name={routeIcon[i]} size={scaleFont(FONTSIZE.icon)} 
                            color={i === props.state.index ? Colors.primary : '#231F20'} 
                          />
                        )
                      }
                    <SizedBox height={0.2} />
                    <P fontSize={5} color={i === props.state.index ? Colors.primary : '#231F20'}>
                      {el.name === "Oppo" ? "Opportunities" : el.name}
                    </P>
                  </Container>
                </TouchWrap>
              );
            }
          })}
        </Container>
        {/*<SafeAreaView />*/}
      </SlideTransitionCallback>
    </>
  );
};

export const ProfileTabMenu = props => {
  const [route] = React.useState(props.state.routes);
  return (
    <Container direction="row" backgroundColor={Colors.white} horizontalAlignment="space-between">
      {route.map((el, i) => (
        <TouchWrap
          widthPercent="50%"
          key={i}
          onPress={() => {
            props.navigation.navigate(el.name);
          }}>
          <Container
            paddingBottom={1}
            backgroundColor={Colors.white}
            horizontalAlignment="center"
            borderBottomWidth={i === props.state.index ? 5 : null}
            borderColor={i === props.state.index ? Colors.primary : null}>
            <H1 fontSize={FONTSIZE.medium} color={i === props.state.index ? Colors.primary : Colors.text}>
              {el.name.replace(/_/g, ' ').split('List')[0]} {/**Remove 'List' from 'FundingList' */}
            </H1>
          </Container>
        </TouchWrap>
      ))}
    </Container>
  );
};

export const DrawerMenu = props => {
  const [route] = React.useState(props.state.routes);
  const {setCurrentState} = React.useContext(RouteContext);
  const {userD, _subscriptionStatus,group_data,cur_grp_posts} = useStoreState(state => ({
    userD: state.userDetails.user,
    _subscriptionStatus: state.userDetails.subscriptionStatus,
    group_data : state.community.group_data,
    cur_grp_posts : state.community.cur_grp_posts
  }));

  const {updateResult,updateFeedData,updateCurrentFeed,
    updateTopicData,updateGroupData,updateContactInfo,updateFeedHolders,
    updateCurGrpPosts,updateCurTopicPosts,updateTopicHolders,
    _updateFetchContact,
    updateSenders
  } = useStoreActions(action=>({
    updateResult : action.resultModel.updateResult,
    updateFeedData : action.community.updateFeedData,
    updateCurrentFeed : action.community.updateCurrentFeed,
    updateTopicData : action.community.updateTopicData,
    updateGroupData : action.community.updateGroupData,
    updateFeedHolders : action.community.updateFeedHolders,
    updateContactInfo : action.community.updateContactInfo,
    updateCurGrpPosts : action.community.updateCurGrpPosts,
    updateCurTopicPosts : action.community.updateCurTopicPosts,
    updateTopicHolders : action.community.updateTopicHolders,
    _updateFetchContact : action.community.updateFetchContact,
    updateSenders : action.community.updateSenders
  }));
  const logout = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.log("err",error);
    }
    updateFeedData([]);
    updateCurrentFeed({});
    updateTopicData([]);
    updateGroupData([]);
    delete global.allContacts;
    delete global.token;
    signOut();
    setCurrentState('login');
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
    }
  };
  const getSocialData = () => {
    global.socket.off('get_feeds').on('get_feeds',async (data) =>{
      if(data.message) return;
      let arr = await manageFeedData(data,'feeds');
      console.log("getSocialData--",data,arr);
      Array.isArray(arr) ? updateFeedData([...arr]) : 
      updateCurrentFeed({...arr});
      updateFeedHolders([])
    });
    global.socket.off('get_topics').on('get_topics',async (data)=>{
      if(data.message) return;
      console.log("gettopics-response",data)
      let arr = await manageTopicData(data);
      console.log("gettopics-arr",arr)
      await storeData("topic_update",true);
      if(arr && !Array.isArray(arr)){
        updateCurTopicPosts([arr]);
      }
      updateTopicHolders([]);
      if(arr && Array.isArray(arr)){
        let res = [...arr];
        updateCurTopicPosts(res);
      }
    });
    global.socket.off(`get_all_topics_${userD.id}`).on(`get_all_topics_${userD.id}`,async ({res})=>{
      if(res.message) return
      let user = await getData("user");
      let token = await getData("token");
      let resp = await apiFunctions.onboarding1(token,user.id, {'onboarded':1});
      if(resp.compromised){
        return logout()
      }
      storeData("topics",res);
      updateTopicData(res);
    });
  }

  const checkCurrentVersion = async () => {
    try{
      let res = await apiFunctions.getCurrentVersion(token)
      if(Number(res.version) > Version_Number){
        navigation.navigate("AppUpgrade");
      }
    }catch(err){
    }
  }

  const getMsgNotification = async () => {
    try{
      let res = await apiFunctions.getMsgNotification(token);
      updateSenders(res.length);
    }catch(error){
    }
  }

  const getAllTopics = () => {
    global.socket.emit('get_all_topics', {token: global.token }, async (data) => {});
    global.socket.off(`unfollow_topic_${userD.id}`).on(`unfollow_topic_${userD.id}`, async ({res}) => {
      if(res.message) return
      let topic_data = await getData("topics");
      if(!topic_data) return;
      var index = topic_data
        .map(function(e) {
          return e.id;
        })
        .indexOf(res.id);

      let arr = [...topic_data];
      arr[index] = res;
      updateTopicData([...arr]);
      storeData('topics',arr);
    });
  }
  const getContactInfo = () =>{
    global.socket.off(`get_contact_info_${userD.id}`).on(`get_contact_info_${userD.id}`, async ({res}) => {
      console.log("getContactInfo-res",res);
      if(res.message || Array.isArray(res)) {
        await storeData("contact_info",null);
        updateContactInfo(null);
        _updateFetchContact(true)
        return
      }
      console.log("getContactInfo-arra",res);
      let data = res;
      let groupArray = [];
      if (data.sent_requests) {
        data.sent_requests.forEach(el => {
          el.type = 'pending';
          groupArray.push(el);
        });
      }

      if (data.contacts) {
        let sortedContactArray = data.contacts.sort((x, y) => {
          let a = x.user.first_name.toLowerCase();
          let b = y.user.first_name.toLowerCase();
          return a === b ? 0 : a > b ? 1 : -1;
        });

        sortedContactArray.forEach(el => {
          el.type = 'contact';
          groupArray.push(el);
        });

        data.sorted_contacts = groupArray;
      }
      await storeData("contact_info",data);
      updateContactInfo({...data});
      _updateFetchContact(true)
    });
    global.socket.emit('get_contact_info', {token: global.token }, data => {
    });
  }
  const getAllGroups = () => {
    global.socket.off(`get_all_groups_${userD.id}`).on(`get_all_groups_${userD.id}`, ({res}) => {
      if(res.message) return
      Array.isArray(res) ? res.sort((a, b) => a.name.localeCompare(b.name)) : null;
      if(Array.isArray(res)){
        updateGroupData(res);
        storeData('groups', res);
      }
    });
    
    global.socket.emit('get_all_groups', {token: global.token }, ({res}) => {});

    global.socket.off('get_all_groups_members').on('get_all_groups_members', async (data) => {
      global.socket.emit('get_all_groups', {token: global.token }, ({res}) => {});
      global.socket.emit('get_all_topics', {token: global.token }, ({res}) => {});
    });
  }

  React.useEffect(() => {
    checkCurrentVersion();
    getMsgNotification();
    let x = setInterval(()=>{
      if(!global.socket){
        return;
      }
      clearInterval(x);
      getSocialData();
      getAllTopics();
      getAllGroups()
      getContactInfo()
    })
    GoogleSignin.configure({
      webClientId: '470433460061-5aookol460l1qt77r02doc9u8ic3ab1h.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  return (
    <Container backgroundColor={Colors.white} flex={1} paddingHorizontal={4} paddingTop={6}>
      <TouchWrap
        onPress={() => {
          props.navigation.closeDrawer();
          updateResult({});
          props.navigation.navigate('Profile');
        }}>
        <Container marginBottom={4} direction="row" verticalAlignment="center">
          <Container marginRight={1.3}>
            {/*userD.photo === null ? <LocalAvatar size={8} /> : <Avatar url={userD.photo} backgroundColor={Colors.primary} size={8} />*/}
            {userD.photo ? <Avatar url={userD.photo} backgroundColor={Colors.primary} size={8} /> : <LocalAvatar size={8} />}
          </Container>

          <Container marginLeft={3}>
            <H2 fontSize={10}>
              {userD.first_name} {userD.last_name}
            </H2>
            <P fontSize={7}>{userD && userD.location && userD.location != "0" ? userD.location : null}</P>
          </Container>
        </Container>
      </TouchWrap>

      <ScrollView>
      {route.map((el, i) => (
        <Container key={i}>
          <TouchWrap
            onPress={() => {
              console.log("<<||>>>")
              props.navigation.navigate(el.name);
            }}>
            <Container
              direction="row"
              verticalAlignment="center"
              borderRadius={5}
              paddingHorizontal={4}
              paddingVertical={1.5}
              backgroundColor={i === props.state.index ? Colors.primary : null}>
              {i === 0 ? (
                  <CustomIcon name={drawerRouteIcon[i]} size={scaleFont(15)} color={Colors.black} />
                ) : i === 1 ? (
                  <Fontisto name="wallet" size={scaleFont(15)} />
                ) : (
                  <Feather Icon name={drawerRouteIcon[i]} size={scaleFont(15)} color={Colors.black} />
                )}
              <SizedBox width={5} />
              <H2 fontSize={9} color={i === props.state.index ? Colors.white : Colors.greyBase900}>
                {el.name === 'ReferEarn'
                  ? 'Refer & Earn'
                  : el.name === 'Herconomy'
                  ? 'Herconomy'
                  : el.name === 'GiftSomeone'
                  ? 'Gift Someone'
                  : el.name === 'Privacy'
                  ? 'Privacy'
                  : el.name === 'Applications'
                  ? 'My Applications'
                  : el.name === 'Resources'
                  ? 'Learning'
                  : el.name}
              </H2>
            </Container>
          </TouchWrap>
          <SizedBox height={1} />
        </Container>
      ))}

      <Container height={0.1} backgroundColor={Colors.greyBase900} marginTop={2} marginBottom={2} />

      <TouchWrap onPress={logout}>
        <Container borderRadius={5} paddingHorizontal={4} paddingVertical={1.5} direction="row" verticalAlignment="center">
          <Feather Icon name="log-out" size={scaleFont(20)} color={Colors.black} />
          <SizedBox width={5} />
          <H2 fontSize={9} color={Colors.greyBase900}>
            Logout
          </H2>
        </Container>
      </TouchWrap>
      <SizedBox height={0.5} />
      {!_subscriptionStatus.sub_status || (_subscriptionStatus.plan && _subscriptionStatus.plan.name !== 'ags_gold_50000') ? (
        <Button
          title="Upgrade"
          onPress={() => props.navigation.navigate('Upgrade', !_subscriptionStatus.sub_status ? {tabs: [4, 6]} : {tabs: [6]})}
        />
      ) : null}
      </ScrollView>
      <SizedBox height={2}/>
    </Container>
  );
};
