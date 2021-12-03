import React from 'react';
import {Container, SizedBox, TouchWrap} from 'simple-react-native-components';
import {P} from '../components/component';
import DatePicker from 'react-native-date-picker';
import Colors from '../helpers/colors';
import {Alert} from 'react-native';

export const ProfileDatePicker = ({setPlaceholder, setHolder, setShow, value, placeholder, isDOB}) => {
  return (
    <Container position="absolute" backgroundColor={Colors.whiteBase} marginTop={20} padding={6} left={7}>
      <DatePicker date={placeholder} onDateChange={value => setPlaceholder(new Date(value))} mode="date" />
      <Container direction="row" marginTop={5} horizontalAlignment="flex-end" widthPercent="98%">
        <TouchWrap
          borderBottomWidth={0.3}
          borderBottomColor={Colors.line}
          onPress={() => {
            setHolder(value ? new Date(value) : new Date());
            setShow(false);
          }}>
          <P fontSize={10}>Cancel</P>
        </TouchWrap>
        <SizedBox width={5} />
        <TouchWrap
          borderBottomWidth={0.3}
          borderBottomColor={Colors.line}
          onPress={() => {
            if (isDOB && new Date(placeholder).getTime() > new Date().getTime()) {
              setHolder(new Date());
              return Alert.alert("Sorry! You can't select a future date");
            }
            setHolder(new Date(placeholder));
            setShow(false);
          }}>
          <P fontSize={10}>Select</P>
        </TouchWrap>
      </Container>
    </Container>
  );
};
