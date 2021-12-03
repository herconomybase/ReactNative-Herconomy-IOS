import React, {useState, useEffect} from 'react';
import {FlatList, Modal} from 'react-native';
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
import {H1, H2, P, LocalAvatar} from '../../../components/component';
import {useStoreActions} from 'easy-peasy';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import { useNavigation } from '@react-navigation/core';

const MemberBox = ({navigation, member}) => {
  const updateResult = useStoreActions(action => action.resultModel.updateResult);
  return (
    <TouchWrap
      onPress={() => {
        updateResult(member);
        navigation.navigate('Profile', {
          member_info: member,
        });
      }}>
      <Container borderColor={Colors.line} borderTopWidth={1}>
        <Container paddingVertical={1} direction="row" key={member.id}>
          <Container padding={2} widthPercent="25%">
            {member.photo === null ? <LocalAvatar size={16} /> : <Avatar size={16} url={member.photo} backgroundColor={Colors.primary} />}
          </Container>
            <Container borderBottomWidth={0.1} borderBottomColor={Colors.line} marginBottom={1}>
              <H1>
                {member.first_name} {member.last_name}
              </H1>
              {member.profession && member.profession.length > 0 ? (
                <>
                  <P color={Colors.otherText}>{member.profession}</P>
                  <SizedBox height={0.4} />
                </>
              ) : null}
              {member.location && member.location !== '0' && member.location !== '' && member.location.length > 0 ? (
              <Container direction="row">
                <Container paddingTop={0.5}>
                  <Feather name="map-pin" size={scaleFont(10)} color={Colors.black} />
                </Container>
                <SizedBox width={1} />
                <P color={Colors.otherText}>{member.location}</P>
              </Container>
            ) : null}
            </Container>
        </Container>
      </Container>
    </TouchWrap>
  );
};

const PostLikes = (props) => {
    const navigation = useNavigation();
    const [membersHolder, setMembersHolder] = useState([]);
    const [members, setMembers] = useState([]);
    useEffect(() => {
      let post_likes = props.route.params;
      setMembersHolder(post_likes);
      setMembers(post_likes);
    }, []); 

  const searchValue = value => {
    let filtered_members = membersHolder.filter(member => {
      return (
        member.first_name && member.first_name.toLowerCase().includes(value.toLowerCase()) ||
        member.last_name && member.last_name.toLowerCase().includes(value.toLowerCase()) ||
        member.profession && member.profession.toLowerCase().includes(value.toLowerCase()) ||
        member.location && member.location.toLowerCase().includes(value.toLowerCase())
      );
    });
    value.length === 0 ? setMembers(membersHolder) : setMembers(filtered_members);
  };
  return (
        <Page backgroundColor={Colors.primary} flex={1}>
        <Container paddingHorizontal={6} paddingTop={6} backgroundColor={Colors.primary} direction="row">
            <TouchWrap paddingRight={2} paddingBottom={2} paddingTop={2} onPress={() => props.navigation.goBack()}>
                <Feather Icon name="chevron-left" size={scaleFont(25)} color="#fff" />
            </TouchWrap>
            <Container backgroundColor={Colors.primary} paddingHorizontal={6} paddingTop={0.5} paddingBottom={3}>
                <H1 fontSize={20} color={Colors.whiteBase}>
                    {members.length} {members.length > 1 ? `Likes` : `Like`}
                </H1>
            </Container>
        </Container>
    <Container
      flex={1}
      paddingHorizontal={6}
      backgroundColor={Colors.white}
      marginTop={2}
      borderTopLeftRadius={50}
      borderTopRightRadius={50}>
      <SizedBox height={2} />
        <Container flex={1} backgroundColor={Colors.white}>
            <Container direction="row" width="100%" marginHorizontal={6} marginTop={2}>
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
                    width={75}
                />
            </Container>
                <SizedBox height={0.5} />
                <Container padding={2}>
                    <Container paddingRight={2}>
                        <FlatList
                            data={members}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item, index}) => <MemberBox 
                            key={index}
                            member={item} navigation={navigation} 
                            index={index}
                        />}
                            showsVerticalScrollIndicator={false}
                            
                        />
                    </Container>
                </Container>
            </Container>
      </Container>
    </Page>
  );
};

export default PostLikes;
