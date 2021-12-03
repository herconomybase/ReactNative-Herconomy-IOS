import React, {useEffect, useState} from 'react';
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
import {H1, LocalAvatar, P} from '../components/component';
import {useStoreState} from 'easy-peasy';
import Colors from '../helpers/colors';
import {apiFunctions} from '../helpers/api';
import {useStoreActions} from 'easy-peasy';
import {ToastLong} from '../helpers/utils';
import { useNavigation } from '@react-navigation/core';
import { getData, storeData } from '../helpers/functions';

const UsersList = () => {
  const {token, user} = useStoreState(state => ({
    token: state.userDetails.token,
    user: state.userDetails.user,
  }));
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [for_display, setForDisplay] = useState([]);
  const updateResult = useStoreActions(action => action.resultModel.updateResult);
  const navigation = useNavigation();

  const getAllMembers = async () => {
    let members = await getData("member-images");
    if(members && members.length){
        setLoading(false);
        setMembers(members.splice(0,5));
    }
    apiFunctions.getUsersWithImages(token).then(res => {
        storeData("member-images",res);
        setMembers(res.splice(0,5));
        setLoading(false);
    }).catch(err => {
        setLoading(false);
    });
}

useEffect(()=>{
    getAllMembers();
},[]);;

  return (
        <Container 
            borderBottomWidth={1}
            borderColor={Colors.line}
            paddingBottom={2}
        >
            <Container paddingLeft={5}
                marginTop={3}
            >
                <H1>Members</H1>
            </Container>
        <Container direction="row" verticalAlignment="center" paddingHorizontal={6}>
          <Container flex={1} direction="row">
            {!loading ? (
              members.map((member, index) => {
                return (
                  <TouchWrap
                    onPress={() => {
                      updateResult(member);
                      navigation.navigate('Profile', {
                        member_info: member,
                      });
                    }}
                    key={index}>
                    <Container marginRight={1.3}>
                      {member && member.photo ? (
                        <Avatar url={member.photo} backgroundColor={Colors.primary} size={8} />
                      ) : (
                        <LocalAvatar size={8} />
                      )}
                    </Container>
                  </TouchWrap>
                );
              })
            ) : (
              <Container>
                <P>Loading ...</P>
              </Container>
            )}
            {!loading && members.length > 0 ? (
              <Container paddingTop={2}>
                <TouchWrap
                  onPress={() => {
                    navigation.navigate('Search');
                  }}>
                  <Container borderBottomWidth={1} borderColor={Colors.line}>
                    <P fontSize={5}>View members</P>
                  </Container>
                </TouchWrap>
              </Container>
            ) : null}
          </Container>
          <SizedBox height={7} />
        </Container>
    </Container>
  );
};

export default UsersList;
