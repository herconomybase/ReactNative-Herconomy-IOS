import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'rgb(255,0,0)',
  },

  imagetour: {
    width: '100%',
    height: '100%',

    justifyContent: 'flex-start',
  },
  imagetourbottom: {
    width: '100%',
    height: '90%',

    justifyContent: 'flex-end',
  },
  logo1: {
    width: 37,
    height: 37,

    backgroundColor: '#F9B404',
  },
  logo2: {
    width: 11,
    height: 11,
  },

  logo2cover: {
    width: 87,
    height: 87,
    backgroundColor: '#F9B404',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  logo1cover: {
    width: 23,
    height: 23,
    backgroundColor: '#F9B404',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 31,
  },
  imageheading: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 5,
  },
  imageheadingwelcome:{
    width: '100%',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 5, 
  },
  imageheadingtexttop: {
    // width:'100%',
    marginLeft:'5%',
    color: '#F9B404',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom:'4%',
  },
  imageheadingtextmiddle: {
    // width:'100%',
    // marginBottom:'5%',
    marginLeft:'5%',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
     marginBottom:'5%',
  },

  line:{
    width: '30%',
    height:'0.3%',
    marginLeft:'7%',
    // marginBottom:'5%',
    backgroundColor:'#e7f0f3',

  },
  
  imageheadingtext: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
  },
  modalheading: {
    fontSize: 19,
    fontWeight: 'bold',
  },

  login2: {
    width: Dimensions.get('screen').width - 20,
    marginHorizontal: 10,
    borderRadius: 30,
    // marginTop: '10%',
    height: 184,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    zIndex: 100,
  },


  welcometour1:{
    marginTop:'15%',
    marginLeft:'15%',
        width: '70%',
        height: '40%',
        // backgroundColor:'#F9B404',
       },

  welcometourimage:{
    resizeMode: 'contain',

// marginTop:'15%',
// marginLeft:'15%',
width: '100%',
    height: '100%',
// //     backgroundColor:'#F9B404',
  
  },


  loginwelcome: {
     width: Dimensions.get('screen').width ,
    height: '100%',
    // marginHorizontal: 10,
    borderRadius: 30,
    // marginTop: '50%',
    // height: 250,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    zIndex: 100,
  },

  logo1covermenu:{
    marginTop:'10%',
    marginLeft:'2%',
    width: 38,
    height: 33,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  logo1coversearch:{
    marginTop:'10%',
    marginLeft:'79%',
    width: 38,
    height: 33,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  
  },

  logo1covermessage:{
    marginTop:'10%',
    marginLeft:'88%',
    width: 38,
    height: 33,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  
  },

  modaltextStylewelcome1: {
    color: '#000000',
    fontSize: 15,
    marginTop:'5%',
    marginLeft: '5%',
     marginBottom: 2,
  },
  modaltextStylewelcome2: {
    color: '#000000',
    fontSize: 15,
    // marginTop:'5%',
    marginLeft: '5%',
    //  marginBottom: 10,
  },
  modaltextStylewelcome3: {
    color: '#000000',
    fontSize: 15,
     marginTop:'5%',
    marginLeft: '5%',
    marginBottom: 10,
  },




  modaltextStyle3: {
    color: '#000000',
    fontSize: 15,
    marginTop:'5%',
    marginLeft: 31,
     marginBottom: 10,
  },
  modaltextStyle4: {
    color: '#000000',
    fontSize: 15,
    // marginTop:'%',
    marginLeft: 31,
    marginBottom: 10,
  },

  imagebackground: {
    width: Dimensions.get('screen').width,
    height: '100%',
    alignItems: 'flex-end',
  },

  modaltextStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 20,
  },
  modaltextStyle2: {
    color: '#000000',
    fontSize: 15,
    marginLeft: 31,
    marginBottom: 15,
  },

  modalbuttonwelcome: {
    // width: Dimensions.get('screen').width-40,
    width:'90%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // marginHorizontal:'5%',
      marginLeft:'3%',
     marginRight:'5%',
    marginTop:'10%',
    // backgroundColor:'blue',


    // marginLeft: 35,
  },
  buttonGotItwelcome: {
    alignItems: 'center',
    width: 80,
    height: 35,
    color: '#ffffff',
    backgroundColor: '#F9B404',
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonGotItTextwelcome: {
    paddingTop: 5,
    color: '#000000',
    fontSize: 18,
  },


  modalbutton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',

    marginLeft: 35,
  },

  modalText: {
    flexDirection: 'column',
    alignItems: 'flex-start',

    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonskip: {
    alignItems: 'center',
    color: '#000000',
    width: 60,
    height: 25,
    fontSize: 15,

    borderWidth: 2,
    borderColor: '#20232a',
    borderRadius: 10,
  },
  buttonskipText: {
    alignItems: 'flex-end',
    color: '#000000',
    fontSize: 12,
    paddingTop: 3,
  },
  buttonGotIt: {
    alignItems: 'center',
    width: 60,
    height: 25,
    color: '#ffffff',
    backgroundColor: '#F9B404',
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonGotItText: {
    paddingTop: 5,
    color: '#000000',
    fontSize: 12,
  },
  direction: {
    backgroundColor: '#F9B404',
    marginLeft: 350,
    marginTop: 5,
  },
  modalbackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
  },
});

export default styles;
