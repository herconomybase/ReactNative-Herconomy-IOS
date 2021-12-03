import React, {useEffect, useState} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Page, Container, TouchWrap, SizedBox, scaleFont} from 'simple-react-native-components';
import {H1, H2, P} from '../../../components/component';
import Colors from '../../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeTabScreens} from '../../../helpers/route';
import {ToastLong} from '../../../helpers/utils';
import OneSignal from 'react-native-onesignal';
import {NewMessageSocket} from '../../../helpers/sockets';
import {apiFunctions} from '../../../helpers/api';
import {useFocusEffect} from '@react-navigation/native';
import {getData, storeData} from '../../../helpers/functions';
import Feeds from './feeds/feeds';
import Topics from './topics/topic';
import Groups from './groups/group';
import Notify from './notify';
import IAP from 'react-native-iap';
import { FONTSIZE } from '../../../helpers/constants';


const Home = props => {
  const {user, token,msg_senders} = useStoreState(state => ({
    user: state.userDetails.user,
    token: state.userDetails.token,
    msg_senders : state.community.msg_senders
  }));

  const {_updateUser, _updateSubscriptionStatus} = useStoreActions(actions => ({
    _updateUser: actions.userDetails.updateUser,
    _updateSubscriptionStatus: actions.userDetails.updateSubscriptionStatus,
  }));
  

  const [isLoading,setLoading] = useState(true);
  const [account,setAccount] = useState({});
  const [notification,setNotificaitions] = useState(0);
  const [senders,setSenders] = useState([]);
  const [dismisedQue,setDismissedQue] = useState([]);
  const [iceBreakerQuestion, setIceBreakerQuestion] = React.useState([]);
  const {updateTotNotification,updateSenders} = useStoreActions(action=>({
    updateTotNotification : action.notification.updateTotNotification,
    updateSenders : action.community.updateSenders
  }));
  const [current,setCurrent] = useState("Feed");
  const [que,setQue] = useState([]);
  const [notify_id,setNotify] = useState(null); 
  const onReceived = async (notification) => {
    console.log("onReceived")
    getSenders();
  };

  const getSenders = () => {
    global.socket.off(`new_message_${user.id}`).on(`new_message_${user.id}`,  ({res}) =>{
      console.log("new_message_",res);
      updateSenders(res);
    });
  }

  const onOpened = openResult => {
    if ((openResult && openResult.notification && openResult.notification.payload 
      && openResult.notification.payload.additionalData && 
      openResult.notification.payload.additionalData.load) && (
        openResult.notification.payload.additionalData.load === "You have a contact request" ||
        openResult.notification.payload.additionalData.load === "sent you a message"
      )
    ){
      return props.navigation.navigate("Chat");
    }
    if (openResult && openResult.notification && openResult.notification.payload 
        && openResult.notification.payload.additionalData && 
        openResult.notification.payload.additionalData.load
      ) {
        setNotify(openResult.notification.payload.additionalData.load)
      }
  };

  const onIds = device => {
    console.log({device});

    let fd = {
      notification_id: device.userId,
    };
    console.log({fd});
    updateNotificationId(fd);
  };

  const updateNotificationId = async fd => {
    await apiFunctions.update_user_notificationID(user.id, token, fd).then(data => {
      try {
        if (data !== false) {
          console.log(data);
          _updateUser(data);
          storeData("user",data)
        }
      } catch (error) {
        console.log('Error', error);
      }
    });
  };

  const checkSubscription = async () => {
    try {
      const res = await apiFunctions.subscriptionStatus(token);
      // console.log(res);
      _updateSubscriptionStatus(res);
    } catch (error) {
      console.log(error);
    }
  };



  const checkSubscriptionStatus = () => {
    IAP.initConnection()
      .catch(() => {
      })
      .then(() => {
      });
    IAP.getPurchaseHistory()
      .catch(err => {
        console.log("getPurchaseHistory",err)
      })
      .then(res => {
        console.log("checkSubscription",res)
        if (res) {
          if (res.length > 0) {
            const receipt = res[res.length - 1].transactionReceipt;
            if (receipt) {
              sendReceipt(res[res.length - 1]);
            }
          }
        }
      });
  };

  const sendReceipt = async purchase => {
    let fd = {
      receipt: purchase.transactionReceipt,
    };
    await apiFunctions
      .sendReceipt(token, fd)
      .then(async res => {
        if (res) {
          if (res.sub_status === true) {
            await IAP.finishTransactionIOS(purchase.transactionId);
          }
        }
      })
      .catch(err => {
      });
  };


  const getNotifications = async () => {
    try{
      let res = await apiFunctions.getNotifications(token,user.id,1);
      updateTotNotification(res.results.no_of_unseen);
    }catch(error){

    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if(!notify_id){
        getNotifications();
        checkSubscription();
        checkSubscriptionStatus()
      }
      // eslint-disable-next-line
      return ()=>{
        getData("source").then((source)=>{
          source && source.cancel()
        })  
    }
    }, []),
  );

  function myiOSPromptCallback(permission) {
    // do something with permission value
  }

  const getQuestions = async () =>{
    try{
      let res = await apiFunctions.getQuestions(token);
      let dismissed = await getData('dismissed');
      setDismissedQue(dismissed || []);
      setQue(res);
    }catch(error){  
    }
  }

  const loadIceBreakers = () => {
    apiFunctions
      .icebreakers(token)
      .then(res => {
        setIceBreakerQuestion([...res]);
      })
      .catch(err => {});
  };

  useEffect(()=>{
    console.log("load-useEffect")
    OneSignal.init('966e14a3-0f0a-4c35-8eb3-0e12324b3795', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    if(!notify_id){
      updateNotificationId({});
      loadIceBreakers();
      getQuestions() 
    }
  },[])
  

  return (
      <React.Fragment>
          {
            notify_id ? (
              <Notify props={props} notification_id={notify_id} setNotify={setNotify}/>
            )  : (
              <Page backgroundColor={Colors.white} barColor={Colors.black} barIconColor="dark-content">
              {/* ANCHOR - HEADER */}
              <Container paddingHorizontal={6} paddingTop={6} backgroundColor={Colors.white} direction="row" horizontalAlignment="space-between">
                <TouchWrap paddingRight={2} paddingBottom={2} paddingTop={2} onPress={() => props.navigation.openDrawer()}>
                  <Feather Icon name="menu" size={scaleFont(FONTSIZE.icon)} color={Colors.primary} />
                </TouchWrap>
  
                <Container direction="row">
                  <TouchWrap paddingLeft={2} paddingBottom={2} paddingTop={2} onPress={() => props.navigation.navigate('Search')}>
                    <Feather Icon name="search" size={scaleFont(FONTSIZE.icon)} color={Colors.primary} />
                  </TouchWrap>
                  <TouchWrap paddingLeft={2} paddingBottom={2} paddingTop={2} onPress={() => {
                    updateSenders(null);
                    props.navigation.navigate('Chat')
                  }}>
                    <Feather Icon name="send" size={scaleFont(FONTSIZE.icon)} color={Colors.primary} />
                    {
                      msg_senders && msg_senders.toString() ? (
                        <Container position="absolute" 
                          backgroundColor={"red"}
                          borderRadius={50}
                          padding={1}
                          width={msg_senders.toString().length > 2 ? 8 : 5.5}
                          marginTop={-1}
                          marginLeft={3}
                          horizontalAlignment="center"
                          verticalAlignment="center"
                        >
                          <H1 color={Colors.white} fontSize={4}>{
                            msg_senders.toString().length > 2 ? '99+' : msg_senders
                          }</H1>
                        </Container>
                      ) : null
                    }
                  </TouchWrap>
                </Container>
              </Container>
              {/* <SizedBox height={3} /> */}
              <Container backgroundColor={Colors.white} flex={1}>
                  <Topics />
                {
                  <Container paddingBottom={2} direction="row" 
                    backgroundColor={Colors.white} 
                    paddingHorizontal={6} 
                    horizontalAlignment="space-between"
                  >
                    {["Feed","Groups"].map((el, i) => (
                      <TouchWrap
                        widthPercent="50%"
                        key={i}
                        onPress={() => {
                          setCurrent(el);
                        }}>
                        <Container
                          borderBottomWidth={el === current ? 3 : 5}
                          borderColor={el === current ? Colors.primary : Colors.white}
                          horizontalAlignment="center"
                        >
                          <H1 fontSize={FONTSIZE.semiBig} color={el === current ? Colors.primary : Colors.text}>
                            {el}
                          </H1>
                        </Container>
                      </TouchWrap>
                    ))}
                  </Container>
                }
                {
                  current === "Feed" ? (
                    <Feeds page={current} 
                      iceBreakerQuestion={iceBreakerQuestion} 
                      setIceBreakerQuestion={setIceBreakerQuestion}
                      dismisedQue={dismisedQue}
                      setDismissedQue={setDismissedQue}
                      que={que}
                      setQue={setQue}
                    />
                  )  : (
                    <Groups page={current} />
                  )
                }
              </Container>
            </Page>
            )
          }
      </React.Fragment>
  );
};

export default Home;
