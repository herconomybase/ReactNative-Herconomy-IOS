import React, {useState,useEffect} from 'react';
import {AppPageTitle, H1, H2, P, LocalAvatar, Button, BoxLoader} from '../../../components/component';
import {Container, Page, TouchWrap, scaleFont, SizedBox, InputWrap, Avatar, Rounded} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import {apiFunctions} from '../../../helpers/api';
import {ToastLong} from '../../../helpers/utils';
import {ActivityIndicator, FlatList} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { ReloadContactInfo } from '../../../helpers/global_sockets';
import { getData, storeData } from '../../../helpers/functions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FONTSIZE } from '../../../helpers/constants';

const MessageBox = ({item,index}) => {
  const navigation = useNavigation();
  return (
    <Container marginTop={3} key={index}>
      {item.type === 'contact' ? (
        <TouchableOpacity onPress={ async () => {
          if(!item || !item.user || !item.user.id) return
          let msgs = await getData(`msg_${item.user.id}`);
          msgs = msgs && msgs.length > 0 ? [...msgs,...item.unread_message] : item.unread_message;
          await storeData(`msg_${item.user.id}`,msgs)
          navigation.navigate('MessageChat', item.user)
        }}>
          <Container direction="row" verticalAlignment="center">
            {item.user.photo ? <Avatar size={9} backgroundColor="#dfdfdf" url={item.user.photo} /> : <LocalAvatar size={9} />}
            <Container marginLeft={4} flex={1}>
            <Container direction="row">
              <H1 fontSize={12}>
                {item.user.first_name} {item.user.last_name}
              </H1>
                <SizedBox width={1} />
                {
                  item.user.status ? (
                    <Avatar backgroundColor={Colors.primary} 
                      size={1.5}
                    />
                  ) : (
                    <Avatar backgroundColor={Colors.lightGrey} 
                      size={1.5}
                    />
                  )
                }
              </Container>
              <P color={Colors.greyBase600} fontSize={8} numberOfLines={1}>
                {item.last_message.body}
              </P>
            </Container>

            {item && item.unread_message && item.unread_message.length > 0 ? (
              <Rounded size={5} backgroundColor={Colors.button}>
                <H2 color={Colors.buttonText} fontSize={5}>
                  {item.unread_message.length}
                </H2>
              </Rounded>
            ) : null}
          </Container>
        </TouchableOpacity>
      ) : (
        <TouchWrap onPress={() => navigation.navigate('MessagePendingRequest', {receiver: item,index : index})}>
          <Container direction="row" verticalAlignment="center">
            {item.user.photo ? <Avatar size={9} backgroundColor="#dfdfdf" url={item.user.photo} /> : <LocalAvatar size={9} />}

            <Container direction="row" verticalAlignment="center" horizontalAlignment="space-between" marginLeft={4} flex={1}>
              <H2 fontSize={FONTSIZE.medium}>
                {item.user.first_name} {item.user.last_name}
              </H2>

              <H1 fontSize={FONTSIZE.medium} color="red">
                Pending Request
              </H1>
            </Container>
          </Container>
        </TouchWrap>
      )}
    </Container>
  );
};

const Message = props => {
  const [reload, setReload] = useState(true);
  const [subscription, setSubscription] = useState({});
  const {userD, subscriptionStatus, token,contact_info,fetch_contact} = useStoreState(state => ({
    userD: state.userDetails.user,
    subscriptionStatus: state.userDetails.subscriptionStatus,
    token: state.userDetails.token,
    contact_info : state.community.contact_info,
    fetch_contact : state.community.fetch_contact,
    seen_notifications : state.notification.seen_notifications
  }));
  // console.log({userD});
  const [loading,setLoading] = useState(true);
  const {updateResult,updateContactInfo,updateSeen} = useStoreActions(action=>(
    {
      updateResult : action.resultModel.updateResult,
      updateContactInfo : action.community.updateContactInfo,
      updateSeen : action.notification.updateSeen
    }
  ))
  const [allContacts, setAllContacts] = useState(null);
  const [show,setShow] = useState(false)
  const [contacts,setContacts] = useState([]);

  const notification_id = props.route && props.route.params ? 
  props.route.params.notification_id : null;
  const {_updateFetchContact} = useStoreActions(actions => ({
    _updateFetchContact : actions.community.updateFetchContact
  }));

  const getContacts = async () => {
    try{
      let res = await apiFunctions.getContacts(global.token);
        if(res.message || Array.isArray(res)) {
          await storeData("contact_info",null);
          updateContactInfo(null);
          _updateFetchContact(true)
          return
        }
        let data = res.data;
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
        setAllContacts(data);
        setContacts(data.sorted_contacts)
        setLoading(false);
        updateContactInfo({...data});
        _updateFetchContact(true)
    }catch(err){
    }
  }

  const loadContacts = async () => {
    try{
      let contact_info = await getData("contact_info");
      if(!contact_info) {
        setLoading(false);
        return
      };
      setAllContacts(contact_info);
      setContacts(contact_info.sorted_contacts)
      setLoading(false);
    }catch(err){
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadContacts()
      setTimeout(()=>{
        getContacts();
      },200)
      // eslint-disable-next-line
    }, []))
  
    useEffect(()=>{
      loadContacts();
    },[contact_info])
    useEffect(()=>{
    if(notification_id){
      apiFunctions.markAsSeen(token,notification_id);
    }
    apiFunctions.updateMsgNotification(token);
    if(notification_id  && seen_notifications && !seen_notifications.includes(notification_id)){
      global.tot_notifications = global.tot_notifications - 1;
      updateSeen([...seen_notifications,notification_id])
    }
    _updateFetchContact(false)
  },[])
  
  return (
    <>
      <Page barIconColor="light-content" backgroundColor={Colors.primary}>
        <Container 
          paddingHorizontal={6} 
          //paddingTop={6}
          marginTop={6}
          verticalAlignment="center"
          direction="row" horizontalAlignment="space-between" 

        >
          <TouchWrap paddingRight={2} paddingBottom={2} paddingTop={2} onPress={() => props.navigation.goBack()}>
            <Feather Icon name="chevron-left" size={scaleFont(FONTSIZE.menu)} color="#fff" />
          </TouchWrap>
          <H1 color="#fff" fontSize={FONTSIZE.big}>
            Messages
          </H1>
          {true ? (
            <TouchWrap paddingLeft={3} paddingBottom={3} onPress={() => props.navigation.navigate('MessageSearch', {allContacts})}>
              <Feather Icon name="plus" size={scaleFont(FONTSIZE.menu)} color="#fff" />
            </TouchWrap>
          ) : (
            <Feather Icon name="plus" size={scaleFont(FONTSIZE.menu)} color={Colors.primary} />
          )}
        </Container>
        <SizedBox height={5} />

        <Container backgroundColor={Colors.white} flex={1} paddingHorizontal={6} borderTopLeftRadius={50} borderTopRightRadius={50}>
          {fetch_contact || allContacts ? (
            <>
              {allContacts && !loading ? (
                <Container flex={1} backgroundColor={Colors.white} borderTopLeftRadius={20} borderTopRightRadius={20}>
                  <Container width={88} marginTop={-2} borderRadius={50}>
                    <InputWrap
                      placeholder="Search"
                      backgroundColor="#fff"
                      flex={1}
                      elevation={10}
                      paddingTop={2}
                      paddingBottom={2}
                      paddingLeft={5}
                      borderRadius={50}
                      onChangeText={(search)=>{
                        let filtered = allContacts && allContacts.sorted_contacts && Array.isArray(allContacts.sorted_contacts) ? allContacts.sorted_contacts.filter(contact=>{
                         return (contact.user && contact.user.first_name && contact.user.first_name.toLowerCase()
                          && contact.user.first_name.toLowerCase().includes(search.toLowerCase())
                          || contact.user && contact.user.first_name && 
                          contact.user.last_name.toLowerCase() &&
                          contact.user.last_name.toLowerCase().includes(search.toLowerCase()))
                        }) : []
                        search && search.trim() === "" ? setContacts(allContacts.sorted_contacts) 
                        : setContacts(filtered);
                      }}
                    />
                  </Container>
                  {/* ANCHOR - MESSAGE LIST */}
                  {(allContacts.received_requests && allContacts.received_requests.length > 0) || (allContacts.sorted_contacts && 
                  allContacts.sorted_contacts.length > 0)? (
                    <Container marginTop={0}>
                      <SizedBox height={5} />
                      {allContacts.received_requests.length > 0 ? (
                        <Container>
                          <TouchWrap onPress={() => props.navigation.navigate('MessageRequest', allContacts.received_requests)}>
                            <H2 color={Colors.links}>
                              {allContacts.received_requests.length} Message{' '}
                              {allContacts.received_requests.length > 1 ? 'Requests' : 'Request'}
                            </H2>
                          </TouchWrap>
                        </Container>
                      ) : null}
                      {
                        !fetch_contact ? <BoxLoader /> : null
                      }
                      <FlatList
                        data={contacts}
                        renderItem={({item,index}) => <MessageBox item={item} index={index} />}
                        keyExtractor={item => item.user.id}
                      />
                    </Container>
                  ) : (
                    <Container flex={1} verticalAlignment="center">
                      <H2 textAlign="center" fontSize={FONTSIZE.big}>
                        Click '+' above to search for a contact and start a conversation. They will need to accept your request to chat.
                      </H2>
                    </Container>
                  )}
                </Container>
              ) : null}
              {
                !allContacts && !fetch_contact ? (
                  <Container flex={1} verticalAlignment="center">
                    <H2 textAlign="center" fontSize={14}>
                      Click '+' above to search for a contact and start a conversation. They will need to accept your request to chat.
                    </H2>
                  </Container>
                  
                ) : null
              }
            </>
          ) : (
            <React.Fragment>
              {
                [..."12345"].map((item,index)=>(
                  <BoxLoader key={index} />
                ))
              }
            </React.Fragment>
          )}
        </Container>
      </Page>
    </>
  );
};

export default Message;
