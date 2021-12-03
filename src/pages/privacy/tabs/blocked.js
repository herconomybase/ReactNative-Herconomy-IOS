import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Container, TouchWrap, SizedBox, scaleFont, Rounded, ImageWrap, InputWrap} from 'simple-react-native-components';
import Colors from '../../../helpers/colors';
import {H1, P, H2} from '../../../components/component';
import {FlatList} from 'react-native';
import {BlockedCard} from '../../../components/blocked_card';
import {apiFunctions} from '../../../helpers/api';
import {ToastShort, ToastLong} from '../../../helpers/utils';
import {useStoreState} from 'easy-peasy';
import {useFocusEffect} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const BlockedResource = ({navigation, route, onPress}) => {
  const {token, user} = useStoreState(state => ({
    token: state.userDetails.token,
    user: state.userDetails.user,
  }));

  const [data, setData] = useState([]);
  const [holdBlocked, setHoldBlocked] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetched blocked users
    getBlockedUsers();
    // populate data on Screen
    // implement unblock user
    // eslint-disable-next-line
  }, []);

  const getBlockedUsers = async () => {
    setLoading(true);
    await apiFunctions
      .getBlockedUsers(token)
      .then(res => {
        console.log({res});
        // add data to this
        setData(res);
        setHoldBlocked(res);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        ToastLong('Network Error, try again later');
      });
  };

  const handlePress = async id => {
    // alert(id);
    let fd = {
      user_id: id,
    };
    // console.log({fd});

    await apiFunctions
      .unblockUser(token, fd)
      .then(res => {
        console.log({res});
        if (res.is_blocked === false) {
          getBlockedUsers();
          ToastShort(`${res.username} unblocked`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.log({data});

  return (
    <Container backgroundColor={Colors.white} flex={1}>
      <Container direction="row" width="100%" marginHorizontal={6} marginTop={2}>
        <InputWrap
          placeholder="Search"
          backgroundColor="#fff"
          flex={1}
          elevation={10}
          paddingTop={2}
          paddingLeft={5}
          borderRadius={50}
          width={65}
          onChangeText={value => {
            value === '' ? setData(data) : setData(filter_members);

            console.log({value});
            let filter_members = holdBlocked.filter(member => {
              return (
                (member.first_name && member.first_name.toLowerCase().includes(value.toLowerCase())) ||
                (member.last_name && member.last_name.toLowerCase().includes(value.toLowerCase())) ||
                (member.username && member.username.toLowerCase().includes(value.toLowerCase()))
              );
            });
            value.length === 0 ? setData(holdBlocked) : setData(filter_members);
          }}
        />
        <TouchWrap verticalAlignment="center" paddingHorizontal={3}>
          <Feather Icon name="search" size={scaleFont(25)} color={Colors.primary} />
        </TouchWrap>
      </Container>

      <SizedBox height={5} />
      {loading && <ActivityIndicator size="small" color="#000" />}
      {data.length === 0 && (
        <Container verticalAlignment="center" horizontalAlignment="center" paddingHorizontal={4}>
          <P color={Colors.fadedText} fontSize={10}>
            You have no blocked users
          </P>
        </Container>
      )}
      <FlatList
        data={data}
        extraData={data}
        keyExtractor={data => data.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <BlockedCard data={item} count={data.length} index={index} onPress={() => handlePress(item.id)} />}
      />
    </Container>
  );
};

export default BlockedResource;
