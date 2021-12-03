import React, {useState, useEffect} from 'react';
import {AppPageBack, H1, H2, P, Input, Button, Dropdown, ListWrapGeneral, CheckBox2, LocalAvatar} from '../../../components/component';
import {FeedBox} from '../home/feeds/feeds';
import {Page, Container, SizedBox, ScrollArea, TouchWrap, TextWrap, Avatar, scaleFont} from 'simple-react-native-components';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, Keyboard, Modal, ScrollView} from 'react-native';
import moment from 'moment';
//import DateTimePicker from '@react-native-community/datetimepicker';
import {ToastShort} from '../../../helpers/utils';
import {storeData} from '../../../helpers/functions';
import NationalityList from '../../../doc/nationality';
import SectorList from '../../../doc/sectors';
import Interest from '../../../doc/interest';
import {apiFunctions} from '../../../helpers/api';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import {IOSDatePicker} from '../../../components/ios_date_picker';
import {ProfileDatePicker} from '../../../components/profile_date_picker';

const Label = props => (
  <>
    <H2 color={Colors.greyBase900} fontSize={10}>
      {props.name}
    </H2>
    <SizedBox height={0.5} />
  </>
);

const JobEdit = props => {
  const {userD, token} = useStoreState(state => ({
    userD: state.userDetails.user,
    token: state.userDetails.token,
  }));

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [profession, setProfession] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [job_location, setJobLocation] = useState('');
  const [job_start_date, setJobStartDate] = useState(new Date());
  const [job_end_date, setJobEndDate] = useState(new Date());
  const [job_id, setJobId] = useState('');
  const [showJobStartDate, setShowJobStartDate] = React.useState(false);
  const [showJobEndDate, setShowJobEndDate] = React.useState(false);
  const [mode, setMode] = useState('date');

  const {_updateUser} = useStoreActions(actions => ({
    _updateUser: actions.userDetails.updateUser,
  }));

  const submit = async () => {
    console.log('submiting');
    try {
      Keyboard.dismiss();
      setLoading(true);
      let fd2 = {};

      let jobStartDate = job_start_date ? moment(job_start_date).format('YYYY-MM-DD') : null;
      let jobEndDate = job_end_date ? moment(job_end_date).format('YYYY-MM-DD') : null;
      if (job.end_date === 'Present') {
        fd2 = {
          company: company_name,
          location: job_location,
          occupation: profession,
          start_date: jobStartDate,
          current_job_id: job_id,
        };
      } else {
        fd2 = {
          company: company_name,
          location: job_location,
          occupation: profession,
          start_date: jobStartDate,
          end_date: jobEndDate,
          current_job_id: job_id,
        };
      }

      // console.log('fd2', fd2);
      // console.log('<<<<userjoblenght>>>.', userD.job.length);
      if (company_name.length && job_location.length && profession.length && jobStartDate.length) {
        // console.warn('updating job');
        // console.log({fd2});
        await apiFunctions.editCurrentJob(userD.id, token, fd2).then(async data => {
          try {
            setLoading(false);
            if (data !== false) {
              console.log('<<<RESPONSE>>>', data);
              // await _updateUser(data);
              // await storeData('user', data);
              ToastShort('Updated Successfully');
              // props.navigation.goBack();
            } else {
              ToastShort('Unable to update. Please try again later');
            }
          } catch (err) {
            console.log('Error>>', err);
            //     setLoading(false);
            //     ToastShort('Unable to update. Please try again later');
          }
        });
      }

      // await apiFunctions.update_user(userD.id, token, fd).then(async data => {
      //   console.log('Data>>', data);
      //   try {
      //     setLoading(false);
      //     if (data !== false) {
      //       await _updateUser(data);
      //       await storeData('user', data);
      //       ToastShort('Updated Successfully');
      //       props.navigation.goBack();
      //     } else {
      //       ToastShort('Unable to update. Please try again later');
      //     }
      //   } catch (error) {
      //     console.log('Error>>', error);
      //     setLoading(false);
      //     ToastShort('Unable to update. Please try again later');
      //   }
      // }
      // );
    } catch (error) {
      console.log('Error>>>', error);
      setLoading(false);
      ToastShort('Unable to update. Please try again later');
    }
  };

  const showDatepicker = arg => {
    if (arg === 'jobStartDate') {
      setDate(job_start_date);
      setShowJobStartDate(true);
    }
    if (arg === 'jobEndDate') {
      setDate(job_end_date);
      setShowJobEndDate(true);
    }
    setMode('date');
  };

  // const onChangeJobStartDate = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShowStartDate(Platform.OS === 'ios');
  //   setStartDate(moment(currentDate).format('YYYY-MM-DD'));
  // };

  // console.log(userD);
  const {job} = props.route.params;
  console.log({job});

  useEffect(() => {
    setCompanyName(job.company);
    setProfession(job.user.profession);
    setJobLocation(job.location);
    setJobId(job.id);
    setJobStartDate(new Date(job.start_date));
    setJobEndDate(new Date(job.end_date));

    // eslint-disable-next-line
  }, []);

  return (
    <AppPageBack title="Edit Job" {...props}>
      <Container flex={1} marginTop={4}>
        <ScrollArea>
          <SizedBox height={3} />

          {/* ANCHOR - Professional */}

          <H1 fontSize={16}>Professional</H1>
          <SizedBox height={2} />

          <Container marginBottom={1}>
            <Label name="Employer" />
            <Input placeholder="" value={company_name} onChangeText={text => setCompanyName(text)} />
          </Container>

          <Container marginBottom={1}>
            <Label name="Profession" />
            <Input placeholder="" value={profession} onChangeText={text => setProfession(text)} />
          </Container>

          <Container marginBottom={1}>
            <Label name="Job Location" />
            <Input placeholder="" value={job_location} onChangeText={text => setJobLocation(text)} />
          </Container>

          <Container marginBottom={1}>
            <Label name="Start Date" />
            <Dropdown
              placeholder="Select Start Date"
              backgroundColor="#fff"
              value={moment(job_start_date).format('YYYY-MM-DD')}
              onPress={() => showDatepicker('jobStartDate')}
            />
          </Container>

          {job.end_date === 'Present' ? null : (
            <Container marginBottom={1}>
              <Label name="End Date" />
              <Dropdown
                placeholder="Select End Date"
                backgroundColor="#fff"
                value={moment(job_end_date).format('YYYY-MM-DD')}
                onPress={() => showDatepicker('jobEndDate')}
              />
            </Container>
          )}

          {/* ANCHOR - Education */}

          <Button title="Update" onPress={submit} loading={loading} />
          <SizedBox height={2} />
          <SafeAreaView />
        </ScrollArea>
      </Container>

      {showJobStartDate && (
        <IOSDatePicker
          setPlaceholder={setDate}
          setHolder={setJobStartDate}
          setShow={setShowJobStartDate}
          value={job_start_date}
          placeholder={date}
        />
      )}
      {showJobEndDate && (
        <IOSDatePicker
          setPlaceholder={setDate}
          setHolder={setJobEndDate}
          setShow={setShowJobEndDate}
          value={job_end_date}
          placeholder={date}
        />
      )}
    </AppPageBack>
  );
};

export default JobEdit;
