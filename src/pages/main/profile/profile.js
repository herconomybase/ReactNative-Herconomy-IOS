import React, {useEffect,useState} from 'react';
import {AppPageBack, H1, H2, P, Button} from '../../../components/component';
import {FeedBox} from '../home/feeds/feeds';
import {Page, Container, TouchWrap, SizedBox, scaleFont, Rounded, ImageWrap, Avatar, ScrollArea} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AboutMe from './aboutMe';
import MyPost from './myPost';
import {ProfileTabMenu} from '../../../components/menus';
import {ProfileTabScreen} from '../../../helpers/route';
import {apiFunctions} from '../../../helpers/api';
import {useFocusEffect} from '@react-navigation/native';
import {Linking} from 'react-native';
import {getData, storeData} from '../../../helpers/functions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ReloadContactInfo } from '../../../helpers/global_sockets';
import { RequestMessages } from '../../../helpers/sockets';
import { ToastShort } from '../../../helpers/utils';
import { FONTSIZE } from '../../../helpers/constants';

const socials = [
  require('../../../../assets/img/icons/Facebook.png'),
  require('../../../../assets/img/icons/LinkedIn.png'),
  //require('../../../../assets/img/icons/Gmail.png'),
  require('../../../../assets/img/icons/Twitter.png'),
];

const Profile = props => {
  const {userD, token} = useStoreState(state => ({
    userD: state.userDetails.user,
    token: state.userDetails.token,
  }));
  const [friends,setFriends] = useState([])
  const {_updateUser} = useStoreActions(actions => ({
    _updateUser: actions.userDetails.updateUser,
  }));

  const [socialLinks, setSocialLinks] = React.useState([
    {icon: socials[0], link: 'facebook_id'},
    {icon: socials[1], link: 'linkedin_id'},
    //{icon: socials[2], link: 'email'},
    {icon: socials[3], link: 'twitter_id'},
  ]);

  const socialClick = (index, type) => {
    let link =
      type === 'email'
        ? userD.email
        : type === 'linkedin_id'
        ? userD.linkedin_id
        : type === 'facebook_id'
        ? userD.facebook_id
        : type === 'twitter_id'
        ? userD.twitter_id
        : null;
    link ? Linking.openURL(link) : null;
  };

  const sendMessageRequest = async (item) => {
    try{
      ToastShort('Sending Chat Request . . .');
      let fd = {user_id: item.id,token : global.token};
      let contact = await getData("contact_info");
      let fdata = {
        user : item,
        type : "pending"
      }
      let data = {
        contacts: [],
        is_a_contact: false,
        is_a_request: false,
        messages : "",
        received_requests : [],
        sent_requests : [],
        un_read_messages : 0,
        user: userD,
        sorted_contacts : [fdata]
      }
      if(!contact){
        await storeData("contact_info",data);
        await RequestMessages(fd);
        ReloadContactInfo();
        return props.navigation.navigate('Chat');
      }
      contact.sorted_contacts = [...contact.sorted_contacts,fdata];
      await storeData("contact_info",contact);
      await RequestMessages(fd);
      ReloadContactInfo();
      props.navigation.navigate('Chat');
    }catch(error){
      console.log("err",error);
    }
  };
  const getFriends = async () => {
    try{
      let friends = await getData("contact_info");
      let friend_ids = friends && friends.sorted_contacts ? friends.sorted_contacts.map(item=>item.user.id) : []
      setFriends(friend_ids);
    }catch(err){
      console.log("err",err);
    }
  }

  useFocusEffect(() => {
    // getCurrentJobs();
    getFriends();
    if (global.socket) {
      global.socket.emit('get_user', data => {
        _updateUser(data);
      });
    }
  }, []);
  const [current,setCurrent] = React.useState("about");
  const about = props.route.params === undefined ? userD : props.route.params.member_info;
  return (
    <Page barIconColor="light-content" backgroundColor={Colors.primary}>
      <Container paddingHorizontal={6} paddingTop={6} direction="row" verticalAlignment="center">
        <TouchWrap paddingRight={5} paddingTop={1.5} paddingBottom={1.5} onPress={() => props.navigation.goBack()}>
          <Feather Icon name="chevron-left" size={scaleFont(25)} color="#fff" />
        </TouchWrap>
        <H1 fontSize={16} color="#fff">
          Profile
        </H1>
      </Container>

      <SizedBox height={8} />

      <Container backgroundColor={Colors.white} flex={1} borderTopLeftRadius={50} borderTopRightRadius={50}>
        <Container horizontalAlignment="center" flex={1}>
          <Rounded size={20} radius={5} marginTop={-7}>
            <ImageWrap
              backgroundColor="#efefef"
              borderRadius={10}
              elevation={5}
              url={props.route.params === undefined ? userD.photo : props.route.params.member_info.photo}
              height={15}
              // fit="contain"
              fit="cover"
            />
          </Rounded>
          <Container position="absolute" top={-4} right={15}>
            {props.route.params && props.route.params.member_info.id === userD.id ? (
              <TouchWrap paddingRight={1} onPress={() => props.navigation.navigate('ProfileEdit')}>
                <Container direction="row">
                  <Feather name="edit" size={scaleFont(15)} style={{color: 'white'}} />
                  <P fontSize={6} lineHeight={20} color="white">
                    Edit Profile
                  </P>
                </Container>
              </TouchWrap>
            ) : (
              props.route.params === undefined && (
                <TouchWrap paddingRight={1} onPress={() => props.navigation.navigate('ProfileEdit')}>
                  <Container direction="row">
                    <Feather name="edit" size={scaleFont(15)} style={{color: 'white'}} />
                    <P fontSize={6} lineHeight={20} color="white">
                      Edit Profile
                    </P>
                  </Container>
                </TouchWrap>
              )
            )}
          </Container>
          <SizedBox height={4} />
          <Container flex={1} widthPercent="100%" paddingHorizontal={6}>
            <ScrollArea flexGrow={1}>
              <Container horizontalAlignment="center">
                {/* ANCHOR - PROFILE NAME */}
                <SizedBox height={1} />
                <Container verticalAlignment="center" direction="row">
                  <H2 fontSize={FONTSIZE.page}>
                    {props.route.params === undefined ? userD.first_name : props.route.params.member_info.first_name}{' '}
                    {props.route.params === undefined ? userD.last_name : props.route.params.member_info.last_name}
                  </H2>
                  <SizedBox width={2} />
                </Container>
                <SizedBox height={0.5} />
                <Container direction="row">
                  <P fontSize={FONTSIZE.medium} color={Colors.greyBase900}>
                    {props.route.params === undefined ? userD.job_title : props.route.params.member_info.job_title}
                  </P>
                  <SizedBox width={1} />

                  {props.route.params === undefined ? (
                    <H2 fontSize={FONTSIZE.medium} bold>
                      {userD.company_name && `@ ${userD.company_name}`}
                    </H2>
                  ) : (
                    <H2 fontSize={FONTSIZE.medium} bold>
                      {props.route.params.member_info.company_name && `@ ${props.route.params.member_info.company_name}`}
                    </H2>
                  )}
                </Container>
                <SizedBox height={0.5} />

                {props.route.params === undefined &&
                  userD.location ? (
                      <Container verticalAlignment="center" direction="row">
                        <Feather name="map-pin" size={scaleFont(FONTSIZE.icon)} />
                        <SizedBox width={1} />
                        <H2 fontSize={FONTSIZE.medium}>{userD.location}</H2>
                      </Container>
                  ) : null}
                  {
                   props.route.params !== undefined && props.route.params.member_info.location !== '0' &&
                    props.route.params.member_info.location !== '' &&
                    props.route.params.member_info.location !== null && (
                      <Container verticalAlignment="center" direction="row">
                        <Feather name="map-pin" size={scaleFont(FONTSIZE.icon)} />
                        <SizedBox width={1} />
                        <H2 fontSize={FONTSIZE.medium}>{props.route.params.member_info.location}</H2>
                      </Container>
                    )
                  }

                <SizedBox width={3} />
                <H2 fontSize={11}>{props.route.params === undefined ? userD.nationality : props.route.params.member_info.nationality}</H2>
              </Container>
              {props.route.params && props.route.params.member_info && props.route.params.member_info.id !==  userD.id &&
                !friends.includes(props.route.params.member_info.id)
              ? (
                <TouchWrap
                  horizontalAlignment="center"
                  onPress={() => sendMessageRequest(props.route.params.member_info)}>
                  <Container
                    marginTop={2}
                    widthPercent="30%"
                    backgroundColor={Colors.primary}
                    horizontalAlignment="center"
                    padding={2}
                    borderRadius={5}>
                    <P color="white" fontSize={FONTSIZE.medium}>
                      Say Hello
                    </P>
                  </Container>
                </TouchWrap>
              ) : null}
              {props.route.params === undefined ? (
                <Container
                  horizontalAlignment="center"
                  verticalAlignment="center"
                  direction="row"
                  paddingVertical={1}
                  paddingBottom={2.5}
                  marginTop={2.5}
                  borderBottomWidth={1}
                  borderColor={Colors.line}>
                  {socialLinks.map((el, i) => (
                    <TouchWrap key={i} onPress={() => socialClick(i, el.link)}>
                      <Rounded backgroundColor="#ededed" size={6} marginRight={1.5} marginLeft={1.5}>
                        <ImageWrap source={el.icon} height={3.5} />
                      </Rounded>
                    </TouchWrap>
                  ))}
                </Container>
              ) : null }
              <Container
                horizontalAlignment="center"
                verticalAlignment="center"
                direction="row"
                paddingVertical={1}
                paddingBottom={2.5}
                marginTop={2.5}
                borderBottomWidth={1}
                borderColor={Colors.line}>
                <P textAlign="center" fontSize={10} lineHeight={20} color={Colors.greyBase600}>
                  {props.route.params === undefined ? userD.bio : props.route.params.member_info.bio}
                </P>
              </Container>
              <SizedBox height={4} />
              <Container direction="row" 
                horizontalAlignment="space-between"
              >
                <Container widthPercent="50%"
                  borderBottomWidth={current === "about" ? 3 : 0}
                  borderColor={Colors.primary}
                >
                  <TouchableOpacity onPress={()=>setCurrent("about")}>
                    <H1 
                      textAlign="center"
                      color={current === "about" ? Colors.primary : Colors.black}
                    >About Me</H1>
                  </TouchableOpacity>
                </Container>
                <Container widthPercent="50%"
                  borderBottomWidth={current === "posts" ? 3 : 0}
                  borderColor={Colors.primary}
                >
                  <TouchableOpacity onPress={()=>setCurrent("posts")}>
                    <H1 textAlign="center">Posts</H1>
                  </TouchableOpacity>
                </Container>
              </Container>
              {
                current === "about" ? (
                  <AboutMe about_me={about}/>
                ) : (
                  <MyPost about_me={about}/>
                )
              }
              <SizedBox height={5} />
            </ScrollArea>
          </Container>
        </Container>
      </Container>
    </Page>
  );
};

export default Profile;
