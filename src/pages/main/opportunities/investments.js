import React, {useState, useEffect} from 'react';
import {Container, ScrollArea, Avatar, SizedBox, ImageWrap, TouchWrap, InputWrap} from 'simple-react-native-components';
import Colors from '../../../helpers/colors';
import {H1, H2, ImageCardHolder, P} from '../../../components/component';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';
import Card from '../../../components/card';
import {apiFunctions} from '../../../helpers/api';
import {storeData, getData} from '../../../helpers/functions';

import {useStoreState, useStoreActions} from 'easy-peasy';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import {ToastShort, ToastLong} from '../../../helpers/utils';
import {ActivityIndicator} from 'react-native';

const Investment = ({navigation, route}) => {
  const {token, retry} = useStoreState(state => ({
    user: state.userDetails.user,
    token: state.userDetails.token,
    retry: state.retryModel.retry,
  }));
  const {updateFunc, updateRetry} = useStoreActions(action => ({
    updateFunc: action.retryModel.updateFunc,
    updateRetry: action.retryModel.updateRetry,
  }));

  // console.log({user});
  // const getInvestmentCategories = async token => {
  //   try {
  //     setCatLoading(true);
  //     let res = await apiFunctions.getInvestmentCategories(token);
  //     console.log({res});
  //     res = res.map(categ => categ.toLowerCase());
  //     res = [...new Set(res)];
  //
  //     // storeData('investmentCategories', res);
  //     setCategory(res);
  //     setCatLoading(false);
  //   } catch (error) {
  //     setCatLoading(false);
  //     ToastShort(error.msg);
  //   }
  // };

  const getInvestmentCategories = async () => {
    try {
      setCatLoading(true);
      let res = await apiFunctions.getInvestmentCategories(token);
      res = res.map(categ => categ.toLowerCase());
      res = [...new Set(res)];
      setCategory(res);
      setCatLoading(false);
    } catch (error) {
      setCatLoading(false);
      ToastShort(error.msg);
    }
  };

  // const fetchCategoryData = async () => {
  //   let categoryData = await getData('investmentCategories');
  //   if (categoryData) {
  //     categoryData = categoryData.map(categ => categ.toLowerCase());
  //     categoryData = [...new Set(categoryData)];
  //     console.log('storedcategories', categoryData);
  //     setCategory(categoryData);
  //     setCatLoading(false);
  //   }
  // };

  // const getInvestment = async token => {
  //   try {
  //     setInvestLoading(true);
  //     let res = await apiFunctions.getInvestment(token);
  //     // storeData('investments', res);
  //     setInvestment(res);
  //     setFilteredInvest(res);
  //     setInvestLoading(false);
  //   } catch (error) {
  //     setInvestLoading(false);
  //     ToastShort(error.msg);
  //   }
  // };
  const getInvestment = async () => {
    try {
      setInvestLoading(true);
      if (retry) {
        getInvestmentCategories();
      }
      updateRetry(false);
      updateFunc(getInvestment);
      let res = await apiFunctions.getInvestment(token);
      setInvestment(res);
      setFilteredInvest(res);
      setInvestLoading(false);
    } catch (error) {
      updateFunc(getInvestment);
      updateRetry(true);
      setInvestLoading(false);
      ToastShort(error.msg);
    }
  };

  const fetchInvestments = async () => {
    let investments = await getData('investments');
    if (investments) {
      setInvestment(investments);
      setFilteredInvest(investments);
      setInvestLoading(false);
    }
  };

  const [investments, setInvestment] = useState([]);
  const [filtered_investments, setFilteredInvest] = useState([]);
  const [is_invest_loading, setInvestLoading] = useState(true);
  const [categories, setCategory] = useState([]);
  const [is_cat_loading, setCatLoading] = useState(true);
  const [filter_by, setFilter] = useState(' ');

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getInvestmentCategories(token);
  //     getInvestment(token);
  //     fetchCategoryData();
  //     fetchInvestments();
  //   });
  //
  //
  //   return unsubscribe;
  //   // eslint-disable-next-line
  // }, [navigation]);

  useEffect(() => {
    getInvestmentCategories();
    getInvestment();
    // eslint-disable-next-line
  }, []);
  return (
    <Container flex={1} paddingHorizontal={6} backgroundColor={Colors.white}>
      <Container width="100%" marginHorizontal={6}>
        <InputWrap
          placeholder="search"
        backgroundColor="#fff"
          elevation={10}
          height={5}
          textAlignVertical="center"
            paddingLeft={5}
          borderRadius={50}
          onChangeText={value => {
            let filtered_investments = investments.filter(investment => {
              return investment.title.toLowerCase().includes(value.toLowerCase());
            });
            value.length === 0 ? setFilteredInvest(investments) : setFilteredInvest(filtered_investments);
          }}
        />
      </Container>
      <SizedBox height={1} />
      <Container>
        <ScrollView horizontal={true}>
          <Container direction="row" verticalAlignment="center" horizontalAlignment="space-between" padding={3} marginRight={10}>
            {is_cat_loading === false ? (
              categories.map((categ, index) => (
                <TouchWrap
                  key={index}
                  onPress={() => {
                    let filtered_investments = investments.filter(investment => {
                      return investment.investment_type.toLowerCase() === categ.toLowerCase();
                    });
                    setFilteredInvest(filtered_investments);
                    setFilter(categ);
                  }}>
                  <P>
                    {' '}
                    <Text style={{color: `${filter_by === categ ? Colors.primary : Colors.black}`}}>
                      {categ.charAt(0).toUpperCase()}
                      {categ.slice(1)}
                    </Text>{' '}
                    {index !== categories.length - 1 && '|'}
                  </P>
                </TouchWrap>
              ))
            ) : (
              <>
                {/* <ActivityIndicator size="large" color={Colors.primary} /> */}
              </>
            )}
          </Container>
        </ScrollView>
      </Container>
      <SizedBox height={1} />
      <Container marginBottom={15}>
        {is_invest_loading === false && filtered_investments.length === 0 && !retry ? (
          <Container horizontalAlignment="center" verticalAlignment="center">
            <H1>No investments found</H1>
          </Container>
        ) : null}
        {
          filtered_investments.length === 0 && is_invest_loading ? (
            <ImageCardHolder />
          ) : null
        }
        {filtered_investments.length > 0 && (
          <FlatList
            data={filtered_investments}
            extraData={filtered_investments}
            keyExtractor={filtered_investments => filtered_investments.id.toString()}
            renderItem={({item, index}) => <Card navigation={navigation} data={item} navigate_to="InvestDetails" isInvestment={true} />}
            showsVerticalScrollIndicator={false}
            refreshing={is_invest_loading}
            onRefresh={() => {
              getInvestmentCategories();
              getInvestment();
            }}
          />
        )}
      </Container>
    </Container>
  );
};

export default Investment;
