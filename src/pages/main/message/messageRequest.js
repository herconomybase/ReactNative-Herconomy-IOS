import React, {useState,useEffect} from 'react';
import {AppPageTitle, H1, H2, P, LocalAvatar, AppPageBack} from '../../../components/component';
import {Container, Page, TouchWrap, scaleFont, SizedBox, InputWrap, Avatar} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import {FlatList, ActivityIndicator} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {apiFunctions} from '../../../helpers/api';
import {ToastShort} from '../../../helpers/utils';
import {useNavigation} from '@react-navigation/native';
import {AcceptMessages, RejectMessages} from '../../../helpers/sockets';
import {FullImageModal} from '../../../components/image_modal';
import { getData, storeData } from '../../../helpers/functions';
import {ReloadContactInfo} from '../../../helpers/global_sockets';

const MessageBox = ({item, contactList, setShow, setCurrentImage, updateResult,index,userD}) => {
  const navigation = useNavigation();
  const [loadingAccept, setLoadingAccept] = React.useState(false);
  const [loadingDecline, setLoadingDecline] = React.useState(false);

  const acceptMessageRequest = async () => {
    let fd = {user_id: item.user.id,token : global.token};
    let data = {
      unread_message: 0,
      last_message: 
      {
        message_id: `1b3fde35-2f38-4374-ac8d-bbc2e7c860bc|6284da70-3049-4f65-a439-0a7018397f59-${Math.random()}`, 
        body: "", file: null
      },
      user: item.user,
      type: "contact"
    }
    let contact = await getData("contact_info");
    contact.received_requests.splice(index,1);
    contact.sorted_contacts = [...contact.sorted_contacts,data];
    await storeData("contact_info",contact);
    setLoadingAccept(true);
    await AcceptMessages(fd);
    setLoadingAccept(false);
    ReloadContactInfo();
    if (contactList.length < 2) {
      navigation.goBack();
    }
  };

  const rejectMessageRequest = async () => {
    setLoadingDecline(true);
    let fd = {user_id: item.user.id,token : global.token};
    await RejectMessages(fd);
    let contact = await getData("contact_info");
    contact.received_requests.splice(index,1);
    await storeData("contact_info",contact);
    setLoadingDecline(false);
    if (contactList.length < 2) {
      navigation.goBack();
    }
  };

  return (
    <Container borderColor={Colors.primary} borderBottomWidth={1} paddingBottom={2}>
      <Container direction="row" marginTop={2} verticalAlignment="center">
        <>
          {item.user.photo ? (
            <TouchWrap
              onPress={() => {
                setShow(true);
                setCurrentImage(item.user.photo);
              }}>
              <Avatar size={9} backgroundColor="#dfdfdf" url={item.user.photo} />
            </TouchWrap>
          ) : (
            <TouchWrap
              onPress={() => {
                setShow(true);
                setCurrentImage(item.user.photo);
              }}>
              <LocalAvatar size={9} />
            </TouchWrap>
          )}

          <Container marginLeft={4} flex={1}>
            <TouchWrap
              onPress={() => {
                updateResult(item.user);
                navigation.navigate('Profile', {
                  member_info: item.user,
                });
              }}>
              <H2 fontSize={12}>
                {item.user.first_name} {item.user.last_name}
              </H2>
            </TouchWrap>
          </Container>
        </>
      </Container>
      <Container marginTop={2}>
        <P>Hi {userD.first_name}, I'd like to connect. Please accept my chat request. Thank you!</P>
      </Container>
      <Container direction="row" marginTop={2} verticalAlignment="center" horizontalAlignment="flex-end">
        {!loadingAccept ? (
          <TouchWrap padding={2} backgroundColor={Colors.primary} onPress={acceptMessageRequest}>
            <H1 fontSize={9} color={Colors.white}>
              Accept
            </H1>
          </TouchWrap>
        ) : (
          <TouchWrap padding={2} backgroundColor={Colors.primary}>
            <ActivityIndicator size="small" color="#fff" />
          </TouchWrap>
        )}

        <SizedBox width={2} />

        {!loadingDecline ? (
          <TouchWrap padding={2} backgroundColor={Colors.button} onPress={rejectMessageRequest}>
            <H1 fontSize={9} color={Colors.white}>
              Decline
            </H1>
          </TouchWrap>
        ) : (
          <TouchWrap padding={2} backgroundColor={Colors.primary}>
            <ActivityIndicator size="small" color="#fff" />
          </TouchWrap>
        )}
      </Container>
    </Container>
  );
};

const MessageRequest = props => {
  const {userD, allContacts} = useStoreState(state => ({
    userD: state.userDetails.user,
    allContacts: state.allContacts,
  }));

  const updateResult = useStoreActions(action => action.resultModel.updateResult);

  const [show, setShow] = useState(false);
  const [current_image, setCurrentImage] = useState(null);
  const [all_contacts,setContact] = useState(null);
  const getAllContacts = async () => {
    let info = await getData("contact_info");
    setContact(info);
  }
  useEffect(()=>{
    getAllContacts();
  })

  return (
    <AppPageBack {...props} title="Message Request">
      <Container marginTop={2}>
        {show && <FullImageModal setShow={setShow} image={current_image} />}
        {
          all_contacts ? (
            <FlatList
              data={all_contacts.received_requests}
              extraData={all_contacts}
              renderItem={({item,index}) => {
                return (
                  <MessageBox
                    key={index}
                    index={index}
                    item={item}
                    contactList={all_contacts.received_requests}
                    updateResult={updateResult}
                    setShow={setShow}
                    setCurrentImage={setCurrentImage}
                    show={show}
                    userD={userD}
                  />
                );
              }}
              keyExtractor={item => item.user.id.toString()}
            />
          ) : null
        }
      </Container>
    </AppPageBack>
  );
};

export default MessageRequest;
