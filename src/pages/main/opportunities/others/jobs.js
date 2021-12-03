import React, {useState, useEffect} from 'react';
import {Container, TouchWrap, SizedBox} from 'simple-react-native-components';
import Colors from '../../../../helpers/colors';
import {H1, P, H2, ImageCardHolder} from '../../../../components/component';
// import Card from '../../../../components/card';
import {FlatList} from 'react-native';
import Card from '../../../../components/card';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {ActivityIndicator} from 'react-native';
import {apiFunctions} from '../../../../helpers/api';
import {storeData, getData} from '../../../../helpers/functions';
import {ToastLong, ToastShort} from '../../../../helpers/utils';

const Jobs = ({navigation,route}) => {
  const {token,retry} = useStoreState(state => ({
    token: state.userDetails.token,
    retry : state.retryModel.retry
  }));
  const {updateFunc,updateRetry} = useStoreActions(action=>(
    {
      updateFunc : action.retryModel.updateFunc,
      updateRetry : action.retryModel.updateRetry
    }
  ));

  const {updateOthHolder,updateOthOpps} = useStoreActions(actions => ({
    updateOthHolder : actions.otherOpps.updateOthHolder,
    updateOthOpps : actions.otherOpps.updateOthOpps
  }));
  const {other_opps} = useStoreState(state => ({
    other_opps : state.otherOpps.other_opps
  }));

  const jobs = other_opps ? other_opps.filter(item=>{
    return item.category === "job" ||  item.category === "jobs"
  }) : [];

  const getJobs = async () => {
    try {
      setLoading(true);
      updateRetry(false);
      updateFunc(getJobs);
      let jobs = await apiFunctions.getJobs(token);
      updateOthHolder(jobs || []);
      updateOthOpps(jobs || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      updateFunc(getJobs);
      updateRetry(true);
    }
  };

  const [isLoading,setLoading] = useState(false);
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      getJobs();
    });
  },[navigation]);
    return(
      <Container>
      <SizedBox height={3} />
      {
        isLoading && jobs.length === 0 ? (
          <ImageCardHolder />
        ) : null
      }
      <FlatList 
        data={jobs} 
        extraData={jobs} 
        keyExtractor={item => item.id} 
        renderItem={({item, index}) => <Card tabName="jobs" data={item} navigation={navigation} navigate_to="OtherOppsDetails" 
          tabName="jobs"
        />} 
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={getJobs}
      />
      {
      jobs.length === 0 && isLoading === false && (
        <Container paddingHorizontal={4} paddingHorizontal={4} horizontalAlignment="center" verticalAlignment="center"> 
          <H1>No jobs found</H1>
        </Container>
      )
    }
  </Container>
    )
}
export default Jobs;