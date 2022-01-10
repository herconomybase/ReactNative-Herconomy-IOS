import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import IonMenu from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Entypo';
import IonSearch from 'react-native-vector-icons/FontAwesome';
import IonMessage from 'react-native-vector-icons/Feather';
import IonNotification from 'react-native-vector-icons/Feather';
import IonOpportunities from 'react-native-vector-icons/FontAwesome';
import IonAdd from 'react-native-vector-icons/Ionicons';
import IonSavings from 'react-native-vector-icons/Fontisto';
import Orientation from 'react-native-orientation';
import swipecircle  from 'react-native-vector-icons/FontAwesome';
import {storeData, getData} from '../../../helpers/functions';




const Modaltour = () => {

  const [modalVisible, setModalVisible] = useState(true);
  const [modalnumber, setModalnumber] = useState(0);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalnumber2, setModalnumber2] = useState(0);


  console.log(Orientation.getInitialOrientation);
 useEffect(() => {
        Orientation.lockToPortrait()
 },[])


 

  return (
    <View>
      {modalnumber === 0 && <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.imagebackground}>
          <ImageBackground
             source={require('../../../../assets/img/tourscreen.png')}
            style={styles.imagetour}
             imageStyle={{tintColor: 'rgba(51, 51, 22,0.7)'}}
            >
          <View style={styles.welcometour}>

                 

             <View style={styles.loginwelcome}>
               <View style={styles.welcometour1}>
               <Image
                  
                  source={require('../../../../assets/img/tourwelcome1.png')}
                   style={styles.welcometourimage}

                  />
               </View>
             
             
              <View style={styles.imageheadingwelcome}>
                {/* <View style={styles.logo1cover}>
                  <IonMenu name="menu" size={20} />
                </View> */}
                <Text style={styles.imageheadingtexttop}> Welcome aboard!</Text>

                <Text style={styles.imageheadingtextmiddle}> Let's get started.</Text>
              </View>

              <View style={styles.line}></View>

              <View style={styles.modalText}>
                <Text style={styles.modaltextStylewelcome1}>
                Thank you for downloading the Herconomy app. 
                </Text>
                <Text style={styles.modaltextStylewelcome2}>
                Let's guide you through the many products and services you 
                can enjoy on this app.
                </Text>
                <Text style={styles.modaltextStylewelcome3}>
                You can skip this guide by clicking the skip button.
                </Text>
              </View>
              <View style={styles.modalbuttonwelcome}>
              <Pressable
                  style={styles.buttonGotItwelcome}
                  onPress={() => {
                    Orientation.unlockAllOrientations();
                    setModalVisible(false)
                    storeData('tourscreen', false)

                  }}>
                  <Text style={styles.buttonGotItTextwelcome}>Skip</Text>
                </Pressable>
                <Pressable
                  style={styles.buttonGotItwelcome}
                  onPress={() => {
                    setModalnumber(1);
                    // setModalVisible(false)
                  }}>
                  <Text style={styles.buttonGotItTextwelcome}>Next</Text>
                </Pressable>
              </View>
            </View>


            </View>
          </ImageBackground>
        </View>
      </Modal>}
     {modalnumber === 1 && <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.imagebackground}>
          <ImageBackground
             source={require('../../../../assets/img/tourscreen.png')}
            style={styles.imagetour}
             imageStyle={{tintColor: 'rgba(51, 51, 22,0.7)'}}
            >  
                 <View style={styles.logo1covermenu}>
                  <IonMenu name="menu" size={20} color={'#F9B404'} />
                </View>
            <View style={styles.login2}>
              <View
                style={{
                  marginLeft: '5%',
                  marginTop: 5,
                }}>
                <Ionicons name="arrow-bold-up" size={20} />
              </View>
              <View style={styles.imageheading}>
                <View style={styles.logo1cover}>
                  <IonMenu name="menu" size={20} />
                </View>
                <Text style={styles.imageheadingtext}> Menu</Text>
              </View>

              <View style={styles.modalText}>
                <Text style={styles.modaltextStyle2}>
                  Tap here to see menu features
                </Text>
              </View>
              <View style={styles.modalbutton}>
              <Pressable
                  style={styles.buttonskip}
                  onPress={() => {
                    Orientation.unlockAllOrientations();
                    setModalVisible(false)
                    storeData('tourscreen', false)

                  }}>
                  <Text style={styles.buttonskipText}>Skip</Text>
                </Pressable>
                <Pressable
                  style={styles.buttonGotIt}
                  onPress={() => {
                    setModalnumber(2);
                    // setModalVisible(false)
                  }}>
                  <Text style={styles.buttonGotItText}>Got It</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Modal>}
      {modalnumber === 2 && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.imagebackground}>
            <ImageBackground
               source={require('../../../../assets/img/tourscreen.png')}
              style={styles.imagetour}
              imageStyle={{tintColor: 'rgba(51, 51, 22,0.7)'}}>
                 <View style={styles.logo1coversearch}>
                  <IonSearch name="search" size={20} color={'#F9B404'} />
                </View>
              <View style={styles.login2}>
                <View
                  style={{
                    marginLeft: '83%',
                    marginTop: 5,
                  }}>
                  <Ionicons name="arrow-bold-up" size={20} />
                </View>
                <View style={styles.imageheading}>
                  <View style={styles.logo1cover}>
                    <IonSearch name="search" size={15} />
                  </View>
                  <Text style={styles.imageheadingtext}> Search</Text>
                </View>

                <View style={styles.modalText}>
                  <Text style={styles.modaltextStyle2}>
                    Tap here to search for contacts
                  </Text>
                </View>
                <View style={styles.modalbutton}>
                <Pressable
                  style={styles.buttonskip}
                  onPress={() => {
                    Orientation.unlockAllOrientations();
                    setModalVisible(false)
                    storeData('tourscreen', false)

                  }}>
                  <Text style={styles.buttonskipText}>Skip</Text>
                </Pressable>
                  <Pressable
                    style={styles.buttonGotIt}
                    onPress={() => {
                      setModalnumber(3);
                      // setModalVisible(false)
                    }}>
                    <Text style={styles.buttonGotItText}>Got It</Text>
                  </Pressable>
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      )}
      {modalnumber === 3 && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.imagebackground}>
            <ImageBackground
               source={require('../../../../assets/img/tourscreen.png')}
              style={styles.imagetour}
              imageStyle={{tintColor: 'rgba(51, 51, 22,0.7)'}}>
                <View style={styles.logo1covermessage}>
                  <IonMessage name="send" size={20} color={'#F9B404'} />
                </View>
              <View style={styles.login2}>
                <View
                  style={{
                    marginLeft: '90%',
                    marginTop: 5,
                  }}>
                  <Ionicons name="arrow-bold-up" size={20} />
                </View>
                <View style={styles.imageheading}>
                  <View style={styles.logo1cover}>
                    <IonMessage name="send" size={15} />
                  </View>
                  <Text style={styles.imageheadingtext}> Message</Text>
                </View>

                <View style={styles.modalText}>
                  <Text style={styles.modaltextStyle2}>
                    Tap here to make a post
                  </Text>
                </View>
                <View style={styles.modalbutton}>
                <Pressable
                  style={styles.buttonskip}
                  onPress={() => {
                    Orientation.unlockAllOrientations();
                    setModalVisible(false)
                    storeData('tourscreen', false)

                  }}>
                  <Text style={styles.buttonskipText}>Skip</Text>
                </Pressable>
                  <Pressable
                    style={styles.buttonGotIt}
                    onPress={() => {
                        setModalVisible2(true)
                        setModalnumber2(4);
                       
                       setModalVisible(false)
                    }}>
                    <Text style={styles.buttonGotItText}>Got It</Text>
                  </Pressable>
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      )}
      {modalnumber2 === 4 && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible(!modalVisible2);
          }}>
          <View style={styles.imagebackground}>
            <ImageBackground
               source={require('../../../../assets/img/tourscreen.png')}
              style={styles.imagetourbottom}
              imageStyle={{tintColor: 'rgba(51, 51, 22,0.7)'}}>
              <View style={styles.login2}>
                <View style={styles.direction}></View>
                <View style={styles.imageheading}>
                  <View style={styles.logo1cover}>
                    <IonNotification name="bell" size={15} />
                  </View>
                  <Text style={styles.imageheadingtext}> Notifications</Text>
                </View>

                <View style={styles.modalText}>
                  <Text style={styles.modaltextStyle2}>
                    Tap here to get latest updates
                  </Text>
                </View>
                <View style={styles.modalbutton}>
                <Pressable
                  style={styles.buttonskip}
                  onPress={() => {
                    Orientation.unlockAllOrientations();
                    setModalVisible2(false)
                    storeData('tourscreen', false)

                  }}>
                  <Text style={styles.buttonskipText}>Skip</Text>
                </Pressable>
                  <Pressable
                    style={styles.buttonGotIt}
                    onPress={() => {
                      setModalnumber2(5);
                      // setModalVisible(false)
                    }}>
                    <Text style={styles.buttonGotItText}>Got It</Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    marginLeft: '90%',
                    marginTop: '5%',
                  }}>
                  <Ionicons name="arrow-bold-down" size={20} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      )}
      {modalnumber2 === 5 && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible(!modalVisible2);
          }}>
          <View style={styles.imagebackground}>
            <ImageBackground
               source={require('../../../../assets/img/tourscreen.png')}
              style={styles.imagetourbottom}
              imageStyle={{tintColor: 'rgba(51, 51, 22,0.7)'}}>
              <View style={styles.login2}>
                <View style={styles.direction}></View>
                <View style={styles.imageheading}>
                  <View style={styles.logo1cover}>
                    <IonOpportunities name="shopping-bag" size={15} />
                  </View>
                  <Text style={styles.imageheadingtext}> Opportunities</Text>
                </View>

                <View style={styles.modalText}>
                  <Text style={styles.modaltextStyle2}>
                    Tap here to explore our goodies
                  </Text>
                </View>
                <View style={styles.modalbutton}>
                <Pressable
                  style={styles.buttonskip}
                  onPress={() => {
                    Orientation.unlockAllOrientations();
                    setModalVisible2(false)
                    storeData('tourscreen', false)

                  }}>
                  <Text style={styles.buttonskipText}>Skip</Text>
                </Pressable>
                  <Pressable
                    style={styles.buttonGotIt}
                    onPress={() => {
                      setModalnumber2(6);
                      // setModalVisible(false)
                    }}>
                    <Text style={styles.buttonGotItText}>Got It</Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    marginLeft: '70%',
                    marginTop: '5%',
                  }}>
                  <Ionicons name="arrow-bold-down" size={20} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      )}
      {modalnumber2 === 6 && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible(!modalVisible2);
          }}>
          <View style={styles.imagebackground}>
            <ImageBackground
               source={require('../../../../assets/img/tourscreen.png')}
              style={styles.imagetourbottom}
              imageStyle={{tintColor: 'rgba(51, 51, 22,0.7)'}}>
              <View style={styles.login2}>
                <View style={styles.direction}></View>
                <View style={styles.imageheading}>
                  <View style={styles.logo1cover}>
                    <IonAdd name="add-circle-outline" size={15} />
                  </View>
                  <Text style={styles.imageheadingtext}> Add </Text>
                </View>

                <View style={styles.modalText}>
                  <Text style={styles.modaltextStyle2}>
                    Tap here to make a post
                  </Text>
                </View>
                <View style={styles.modalbutton}>
                <Pressable
                  style={styles.buttonskip}
                  onPress={() => {
                    Orientation.unlockAllOrientations();
                    setModalVisible2(false)
                    storeData('tourscreen', false)

                  }}>
                  <Text style={styles.buttonskipText}>Skip</Text>
                </Pressable>
                  <Pressable
                    style={styles.buttonGotIt}
                    onPress={() => {
                      setModalnumber2(7);
                      // setModalVisible(false)
                    }}>
                    <Text style={styles.buttonGotItText}>Got It</Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    marginLeft: '47%',
                    marginTop: '5%',
                  }}>
                  <Ionicons name="arrow-bold-down" size={20} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      )}
      {modalnumber2 === 7 && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible(!modalVisible2);
          }}>
          <View style={styles.imagebackground}>
            <ImageBackground
               source={require('../../../../assets/img/tourscreen.png')}
              style={styles.imagetourbottom}
              imageStyle={{tintColor: 'rgba(51, 51, 22,0.7)'}}>
              <View style={styles.login2}>
                <View style={styles.direction}></View>
                <View style={styles.imageheading}>
                  <View style={styles.logo1cover}>
                    <IonSavings name="wallet" size={14} />
                  </View>
                  <Text style={styles.imageheadingtext}> Savings</Text>
                </View>

                <View style={styles.modalText}>
                  <Text style={styles.modaltextStyle2}>
                    Tap here to save to Wallet 
                  </Text>
                </View>
                <View style={styles.modalbutton}>
                <Pressable
                  style={styles.buttonskip}
                  onPress={() => {
                    Orientation.unlockAllOrientations();
                    setModalVisible2(false)
                    storeData('tourscreen', false)

                  }}>
                  <Text style={styles.buttonskipText}>Skip</Text>
                </Pressable>
                  <Pressable
                    style={styles.buttonGotIt}
                    onPress={() => {
                      setModalnumber(1);
                       setModalVisible2(false)
                       storeData('tourscreen', false)

                    }}>
                    <Text style={styles.buttonGotItText}>Got It</Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    marginLeft: '25%',
                    marginTop: '5%',
                  }}>
                  <Ionicons name="arrow-bold-down" size={20} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Modaltour;


// {modalnumber === 0 && <Modal
//   animationType="fade"
//   transparent={true}
//   visible={modalVisible}
//   onRequestClose={() => {
//     setModalVisible(!modalVisible);
//   }}>
//   <View style={styles.imagebackground}>
//     <ImageBackground
//        source={require('../../../../assets/img/tourscreen.png')}
//       style={styles.imagetour}
//        imageStyle={{tintColor: 'rgba(51, 51, 22,0.5)'}}
//       >
//       <View style={styles.loginwelcome}>
//         <View
//           style={{
//             marginLeft: '5%',
//             marginTop: 5,
//           }}>
//           {/* <Ionicons name="arrow-bold-up" size={20} /> */}
//         </View>
//         <View style={styles.imageheadingwelcome}>
//           {/* <View style={styles.logo1cover}>
//             <IonMenu name="menu" size={20} />
//           </View> */}
//           <Text style={styles.imageheadingtexttop}> welcome onboard!</Text>

//           <Text style={styles.imageheadingtextmiddle}> Let's get started.</Text>
//         </View>

//         <View style={styles.modalText}>
//           <Text style={styles.modaltextStyle3}>
//           Thank you for downloading the Herconomy app. Let's guide you through the many products and services you 
//           can enjoy on this app.
//           </Text>
//           <Text style={styles.modaltextStyle4}>
//           You can skip this guid by clicking the skip button.
//           </Text>
//         </View>
//         <View style={styles.modalbutton}>
//         <Pressable
//             style={styles.buttonskip}
//             onPress={() => {
//               Orientation.unlockAllOrientations();
//               setModalVisible(false)
//             }}>
//             <Text style={styles.buttonskipText}>Skip</Text>
//           </Pressable>
//           <Pressable
//             style={styles.buttonGotIt}
//             onPress={() => {
//               setModalnumber(1);
//               // setModalVisible(false)
//             }}>
//             <Text style={styles.buttonGotItText}>Got It</Text>
//           </Pressable>
//         </View>
//       </View>
//     </ImageBackground>
//   </View>
// </Modal>}