/* console.ignoredYellowBox = true;
console.disableYellowBox = true; */

import React from 'react';
import codePush from 'react-native-code-push';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation//stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StoreProvider} from 'easy-peasy';
import AppStore from './src/helpers/store';
import {RouteContext} from './src/helpers/routeContext';

import Splash from './src/pages/splash';

import OnboardOne from './src/pages/onBoard/onboard1';
import OnboardTwo from './src/pages/onBoard/onboard2';
import OnboardThree from './src/pages/onBoard/onboard3';
import OnboardFour from './src/pages/onBoard/onboard4';
import TermsAndConditions from './src/pages/onBoard/termsAndConditions';

import SignIn from './src/pages/auth/login';
import SignUp from './src/pages/auth/signup';

import Home from './src/pages/main/home/home';
import Post from './src/pages/main/post/post';

import Message from './src/pages/main//message/message';
import MessageSearch from './src/pages/main//message//messageSearch';
import MessageRequest from './src/pages/main/message/messageRequest';
import MessagePendingRequest from './src/pages/main/message/messagePendingRequest';

import FeedDetails from './src/pages/main/home/feeds/feedDetails';
import FeedActions from './src/pages/main/home/feeds/feedActions';

import {MainTabMenu, DrawerMenu} from './src/components/menus';
import Profile from './src/pages/main/profile/profile';
import ProfileEdit from './src/pages/main/profile/edit';
import JobEdit from './src/pages/main/profile/edit_job';

import Search from './src/pages/main/home/search';
import GroupDetails from './src/pages/main/home/groups/groupDetails';
import GroupEvents from './src/pages/main/home/groups/details/groupEvents';
import GroupSearch from './src/pages/main/home/groups/details/groupSearch';
import GroupAdmin from './src/pages/main/home/groups/details/groupAdmin';
import GroupRequests from './src/pages/main/home/groups/details/groupRequests';
import GroupInfo from './src/pages/main/home/groups/details/groupInfo';
import NewGroupPost from './src/pages/main/home/groups/newGroupPost';

import TopicDetails from './src/pages/main/home/topics/topicDetails';
import TopicDetailsPost from './src/pages/main/home/topics/topicDetailsPost';
import NewTopicPost from './src/pages/main/home/topics/newTopicPost';

import MessageChat from './src/pages/main/message/messageChat';
import GroupDetailsPost from './src/pages/main/home/groups/groupDetailsPost';
import FeedPost from './src/pages/main/home/feeds/feedPost';
import Policy from './src/pages/main/policy';
import Forgot from './src/pages/auth/forgot';
import Verify from './src/pages/auth/verify';

import Payments from './src/pages/payments/payments';
import Membership from './src/pages/payments/membership';
import Plan from './src/pages/payments/plan';
import Cards from './src/pages/payments/card';
import PaymentOption from './src/pages/payments/paymentOption';
import Checkout from './src/pages/payments/checkout';
import Webview from './src/pages/payments/webview';

import Opportunities from './src/pages/main/opportunities/opportunities';
import InvestDetails from './src/pages/main/opportunities/details/investDetails';
import OtherOppsDetails from './src/pages/main/opportunities/details/otheropps_details';
import Events from './src/pages/main/events/events';
import EventDetails from './src/pages/main/events/details/event_details';
import EventNotifier from './src/pages/main/events/details/event_notifier';

import EventCart from './src/pages/main/events/details/event_cart';
import ReferEarn from './src/pages/refer_and_earn/refer_earn';
import JoinReferralProgram from './src/pages/refer_and_earn/join_referral_program';
import ReferFriend from './src/pages/refer_and_earn/refer_friend';
import EarningsDashboard from './src/pages/refer_and_earn/earnings_dashboard';
import BuyUnits from './src/pages/main/opportunities/details/invest_details/buy_investment_units';
import InvestmentCart from './src/pages/main/opportunities/details/invest_details/investment_cart';
import InvestmentNotifier from './src/pages/main/opportunities/details/invest_details/investment_notifier';

import JobApplication from './src/pages/main/opportunities/details/invest_details/job_application';
import FundApplication from './src/pages/main/opportunities/details/invest_details/fund_application';

import Applications from './src/pages/applications/applications';
import Welcome from './src/pages/auth/welcome';
import Account from './src/pages/account';
import Affinity from './src/pages/affinity/affinity';
import AffinityDetails from './src/pages/affinity/affinity_details';
import HowItWorks from './src/pages/affinity/tabs/how_it_works';
import DiscountInfo from './src/pages/affinity/tabs/discount_info';
import GiftSomeone from './src/pages/gift_someone/gift_someone';
import BuyGift from './src/pages/gift_someone/buy_gift';
import GiftPayNow from './src/pages/gift_someone/gift_pay_now';
import Recipients from './src/pages/gift_someone/recipients';
import Resources from './src/pages/resources/resources';
import ResourceDetails from './src/pages/resources/resource_details';
import ShowResource from './src/pages/resources/show';
import Settings from './src/pages/settings/Settings';
import ResetPwd from './src/pages/settings/reset';
import BlockedResource from './src/pages/settings/blocked';
import Notification from './src/pages/notification/notification';
import CustomPush from './src/pages/notification/custom_push';
import ContactUs from './src/pages/contact/contact';
import {Upgrade} from './src/pages/main/upgrade';
import {AddGroupEvent} from './src/pages/main/home/groups/details/add_group_events';
import {SetNotification} from './src/pages/settings/set_notification';
import PostLikes from './src/pages/main/home/post_likes';
import Toast, { BaseToast } from 'react-native-toast-message';
import Colors from './src/helpers/colors';
import Logo from './assets/img/agsLogo_dark.png';
import { socketConnection } from './src/helpers/sockets';

//Savings new screens
import Savings from './src/pages/main/savings/savings';
import { Wallet } from './src/pages/main/savings/wallet';
import Notify from './src/pages/main/home/notify';
import { Transactions } from './src/pages/main/savings/transactions';
import { Plans } from './src/pages/main/savings/plans';
import { Performance } from './src/pages/main/savings/performance';
import { GoalName } from './src/pages/main/savings/goal_name';
import { ReviewPlan } from './src/pages/main/savings/review_plan';
import { SinglePlan } from './src/pages/main/savings/single_plan';
import { PlanSettings } from './src/pages/main/savings/plan_settings';
import { TransactionDetails } from './src/pages/main/savings/transaction_details';
import { AccountSearch } from './src/pages/main/savings/account_search';


let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};


const OnboardStack = createStackNavigator();
const OnboardStackScreens = () => (
  <OnboardStack.Navigator headerMode={null} screenOptions={{...TransitionPresets.SlideFromRightIOS}} initialRouteName="SignIn">
    <OnboardStack.Screen name="OnboardTwo" component={OnboardTwo} />
    <OnboardStack.Screen name="OnboardThree" component={OnboardThree} />
    <OnboardStack.Screen name="OnboardFour" component={OnboardFour} />
    <OnboardStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
  </OnboardStack.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator headerMode={null} screenOptions={{...TransitionPresets.SlideFromRightIOS}} initialRouteName="Welcome">
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="Forgot" component={Forgot} />
    <AuthStack.Screen name="Verify" component={Verify} />
    <AppStack.Screen name="Policy" component={Policy} />
    <AppStack.Screen name="Welcome" component={Welcome} />
  </AuthStack.Navigator>
);

const LoginStack = createStackNavigator();
const LoginStackScreens = () => (
  <LoginStack.Navigator headerMode={null} screenOptions={{...TransitionPresets.SlideFromRightIOS}} initialRouteName="SignIn">
    <LoginStack.Screen name="SignIn" component={SignIn} />
    <LoginStack.Screen name="SignUp" component={SignUp} />
    <LoginStack.Screen name="Forgot" component={Forgot} />
    <LoginStack.Screen name="Verify" component={Verify} />
    <LoginStack.Screen name="Policy" component={Policy} />
    <LoginStack.Screen name="Welcome" component={Welcome} />
  </LoginStack.Navigator>
);

const TabStack = createBottomTabNavigator();
const TabStackScreen = () => (
  <TabStack.Navigator tabBar={props => <MainTabMenu {...props} />} initialRouteName="Home">
    <TabStack.Screen name="Home" component={Home} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <TabStack.Screen name="Savings" component={Savings}
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <TabStack.Screen name="Add" component={Post} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          },
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <TabStack.Screen name="Oppo" component={Opportunities} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          },
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <TabStack.Screen name="Notifications" component={Notification} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          },
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />

  </TabStack.Navigator>
);

const DrawerStack = createDrawerNavigator();
const DrawerStackScreen = () => {
  return (
    <DrawerStack.Navigator drawerContent={props => <DrawerMenu {...props} />}>
      <DrawerStack.Screen name="Home" component={TabStackScreen} />
      {/* <DrawerStack.Screen name="Upgrade" component={Payments} /> */}
      <DrawerStack.Screen name="Savings" component={Savings} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      />
      <DrawerStack.Screen name="Transactions" component={Transactions} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      />
      <DrawerStack.Screen name="Applications" component={Applications} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      />
      <DrawerStack.Screen name="Resources" component={Resources} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      />
      <DrawerStack.Screen name="Affinity" component={Affinity} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      />
      <DrawerStack.Screen name="Events" component={Events} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      />
      <DrawerStack.Screen name="GiftSomeone" component={GiftSomeone} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      />
      <DrawerStack.Screen name="ReferEarn" component={ReferEarn} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      />
      <DrawerStack.Screen name="Support" component={ContactUs} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      />
      <DrawerStack.Screen name="Settings" component={Settings} 
          listeners={{
            state : () =>{
              global.cancel && global.cancel()
            }
          }}
      /> 

      {/* <DrawerStack.Screen name="Home" component={TabStackScreen} />
      <DrawerStack.Screen name="ReferEarn" component={ReferEarn} /> */}

      {/** Savings Features */}
      {/* <DrawerStack.Screen name="Events" component={Events} />
      <DrawerStack.Screen name="Transactions" component={Transactions} />

      <DrawerStack.Screen name="Applications" component={Applications} />
      <DrawerStack.Screen name="Herconomy" component={Affinity} />
      <DrawerStack.Screen name="GiftSomeone" component={GiftSomeone} />
      <DrawerStack.Screen name="Resources" component={Resources} />
      <DrawerStack.Screen name="Settings" component={Settings} options={{unmountOnBlur: true}} /> */}
      {/* <DrawerStack.Screen name="Notifications" component={Notification} /> */}
      {/* <DrawerStack.Screen name="Support" component={ContactUs} /> */}
    </DrawerStack.Navigator>
  );
};

const AppStack = createStackNavigator();
const AppStackScreens = () => (
  <AppStack.Navigator headerMode="none" screenOptions={{...TransitionPresets.SlideFromRightIOS}} initialRouteName="Home"
    screenL
  >
    <AppStack.Screen name="Home" component={DrawerStackScreen} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="FeedDetails" component={FeedDetails} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="FeedActions" component={FeedActions} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />

    <AppStack.Screen name="Membership" component={Membership} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Plan" component={Plan} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="PaymentOption" component={PaymentOption} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Checkout" component={Checkout} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Webview" component={Webview} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Cards" component={Cards} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />

    <AppStack.Screen name="Profile" component={Profile} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="ProfileEdit" component={ProfileEdit} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="JobEdit" component={JobEdit} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="FeedPost" component={FeedPost} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="PostLikes" component={PostLikes} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="GroupDetails" component={GroupDetails} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="GroupDetailsPost" component={GroupDetailsPost} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="GroupEvents" component={GroupEvents} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="GroupSearch" component={GroupSearch} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="GroupAdmin" component={GroupAdmin} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="GroupRequests" component={GroupRequests} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="GroupInfo" component={GroupInfo} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="NewGroupPost" component={NewGroupPost} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />

    <AppStack.Screen name="TopicsDetails" component={TopicDetails} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="TopicDetailsPost" component={TopicDetailsPost} 
      listeners={{
        state : () =>{
          global.cancel && global.cancel()
        }
      }}
    />
    <AppStack.Screen name="NewTopicPost" component={NewTopicPost} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />

    <AppStack.Screen name="Search" component={Search} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />

    <AppStack.Screen name="MessageSearch" component={MessageSearch} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="MessageRequest" component={MessageRequest} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="MessagePendingRequest" component={MessagePendingRequest} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="MessageChat" component={MessageChat} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Chat" component={Message} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />

    <AppStack.Screen name="InvestDetails" component={InvestDetails} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="OtherOppsDetails" component={OtherOppsDetails} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="EventDetails" component={EventDetails} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="EventCart" component={EventCart} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="EventNotifier" component={EventNotifier} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="JoinReferralProgram" component={JoinReferralProgram} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="ReferFriend" component={ReferFriend} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="EarningsDashboard" component={EarningsDashboard} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="BuyUnits" component={BuyUnits} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="InvestmentCart" component={InvestmentCart} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="InvestmentNotifier" component={InvestmentNotifier} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />

    <AppStack.Screen name="JobApplication" component={JobApplication} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="FundApplication" component={FundApplication} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Upgrade" component={Payments} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="AffinityDetails" component={AffinityDetails} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="DiscountInfo" component={DiscountInfo} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="HowItWorks" component={HowItWorks} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="BuyGift" component={BuyGift} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Recipients" component={Recipients} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="GiftPayNow" component={GiftPayNow} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="ResourceDetails" component={ResourceDetails} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="ShowResource" component={ShowResource} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="ResetPwd" component={ResetPwd} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Account" component={Account} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="BlockedResource" component={BlockedResource} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="CustomPush" component={CustomPush} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="AppUpgrade" component={Upgrade} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="AddGroupEvent" component={AddGroupEvent} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="SetNotification" component={SetNotification}
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />


    {/* //Saving Features */}
    <AppStack.Screen name="Wallet" component={Wallet} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Notify" component={Notify} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Transactions" component={Transactions} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Plans" component={Plans} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="Performance" component={Performance} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="GoalName" component={GoalName} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="ReviewPlan" component={ReviewPlan} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="SinglePlan" component={SinglePlan} 
        listeners={{
          state : () =>{
            global.cancel && global.cancel()
          }
        }}
    />
    <AppStack.Screen name="PlanSettings" component={PlanSettings} 
      listeners={{
        state : () =>{
          global.cancel && global.cancel()
        }
      }}
    />
    <AppStack.Screen name="AccountSearch" component={AccountSearch} 
      listeners={{
        state : () =>{
          global.cancel && global.cancel()
        }
      }}
    />
    <AppStack.Screen name="TransactionDetails" component={TransactionDetails} 
      listeners={{
        state : () =>{
          global.cancel && global.cancel()
        }
      }}
    />
  </AppStack.Navigator>
);

const App = () => {
  const [currentState, setCurrentState] = React.useState(React.useContext(RouteContext).initState);
  const toastConfig = {
    success : ({ text1,text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: Colors.button}}
        contentContainerStyle={{ paddingHorizontal: 15,marginBottom : 8,marginTop:8}}
        text1Style={{
          fontSize: 15,
          fontWeight: 'semibold'
        }}
        text1Style={{
          fontSize : 18
        }}
        text2Style={{
          fontSize : 15
        }}
        text1={text1}
        text2={text2}
        leadingIcon={Logo}
        leadingIconStyle={{
          height : 50,
          width : 50,
          marginLeft:10
        }}
      />
    ),
    error: ({ text1,text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: 'red' }}
        contentContainerStyle={{ paddingHorizontal: 15,marginBottom : 8}}
        text1Style={{
          fontSize: 15,
          fontWeight: 'semibold'
        }}
        text1Style={{
          fontSize : 18
        }}
        text2Style={{
          fontSize : 15
        }}
        text1={text1}
        text2={text2}
        leadingIcon={Logo}
        leadingIconStyle={{
          height : 50,
          width : 50,
          marginLeft:10
        }}

      />
    )
  };

  const codePushDownloadDidProgress = progress => {
    // console.log(progress.receivedBytes + ' of ' + progress.totalBytes + ' received.');
  };

  
  React.useEffect(()=>{
    socketConnection();
  },[])

  return (
    <StoreProvider store={AppStore}>
      <RouteContext.Provider value={{currentState, setCurrentState}}>
        <NavigationContainer>
          {currentState === 'splash' ? (
            <Splash />
          ) : currentState === 'walkthrough' ? (
            <OnboardOne />
          ) : currentState === 'onboard' ? (
            <OnboardStackScreens />
          ) : currentState === 'auth' ? (
            <AuthStackScreens />
          ) : currentState === 'login' ? (
            <LoginStackScreens />
          ) : (
            <AppStackScreens />
          )}
        </NavigationContainer>
      </RouteContext.Provider>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </StoreProvider>
  );
};

// let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
export default codePush(codePushOptions)(App);
// export default App;
