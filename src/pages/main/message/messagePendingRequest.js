import React, {useState} from 'react';
import {AppPageTitle, H1, H2, P, LocalAvatar, AppPageBack} from '../../../components/component';
import {Container, Page, TouchWrap, scaleFont, SizedBox, InputWrap, Avatar} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import {FlatList, ActivityIndicator} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {apiFunctions} from '../../../helpers/api';
import {ToastShort} from '../../../helpers/utils';
import {useNavigation} from '@react-navigation/native';
import {AcceptMessages, RejectMessages, DeleteRequest} from '../../../helpers/sockets';
import {FullImageModal} from '../../../components/image_modal';
import { getData, storeData } from '../../../helpers/functions';
import { ReloadContactInfo } from '../../../helpers/global_sockets';

const MessageBox = ({item, updateResult, setShow, setCurrentImage,index}) => {
  const navigation = useNavigation();
  const [loadingDecline, setLoadingDecline] = React.useState(false);

  const rejectMessageRequest = async () => {
    try{
      setLoadingDecline(true);
      let fd = {user_id: item.user.id};
      let contact = await getData("contact_info");
      contact.sorted_contacts.splice(index,1);
      await storeData("contact_info",contact);
      await DeleteRequest(fd);
      ToastShort('Pending request canceled');
      navigation.goBack();
    }catch(error){
      console.log("err",error);
      ToastShort("Network Error. Please try again")
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
                setCurrentImage(null);
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

      <Container direction="row" marginTop={2} verticalAlignment="center" horizontalAlignment="flex-end">
        <SizedBox width={2} />

        {!loadingDecline ? (
          <TouchWrap padding={2} backgroundColor="red" onPress={rejectMessageRequest} borderRadius={5}>
            <H1 fontSize={9} color={Colors.white}>
              Cancel
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

const MessagePendingRequest = props => {
  const {userD, allContacts} = useStoreState(state => ({
    userD: state.userDetails.user,
    allContacts: state.allContacts,
  }));
  const updateResult = useStoreActions(action => action.resultModel.updateResult);
  const [show, setShow] = useState(false);
  const [current_image, setCurrentImage] = useState(null);
  const {receiver,index} = props.route.params;
  console.log({receiver});

  return (
    <AppPageBack {...props} title="Message Request">
      <Container marginTop={2}>
        {show && <FullImageModal setShow={setShow} image={current_image} />}
        <MessageBox item={receiver} index={index} updateResult={updateResult} setShow={setShow} setCurrentImage={setCurrentImage} show={show} />
      </Container>
    </AppPageBack>
  );
};

export default MessagePendingRequest;
