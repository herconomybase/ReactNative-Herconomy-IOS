import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';
import {Text, View, ActivityIndicator} from 'react-native';

const PaystackUrl = payload =>
  payload.plan_id
    ? {
        html: `
          <!DOCTYPE html>
          <html lang="en">
              <body style="background-color:'blue'; height:100vh; ">

              <script src="https://js.paystack.co/v1/inline.js"></script>


            <script type="text/javascript">
            payWithPaystack();
              function payWithPaystack(){
                var handler = PaystackPop.setup({
                  key: "${payload.key}",
                  email:"${payload.email}",
                  amount: "${payload.amount}",
                  currency: "NGN",
                  ref: "${
                    payload.reference_id
                  }", // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                  firstname: "${payload.firstname}",
                  lastname: "${payload.lastname}",
                  plan : "${payload.plan_id}",
                  // label: "Optional string that replaces customer email"
                  metadata: {
                     custom_fields: [
                        {
                            display_name: "Mobile Number",
                            variable_name: "mobile_number",
                            value: "+2348012345678"
                        }
                     ]
                  },
                  callback: function(response){
                    window.ReactNativeWebView.postMessage(JSON.stringify(response))
                  },
                  onClose: function(data){
                    window.ReactNativeWebView.postMessage(JSON.stringify({message: "USER_CANCELLED"}))
                  }
                });
                handler.openIframe();
              }
            </script>
              </body>
      `,
      }
    : {
        html: `
          <!DOCTYPE html>
          <html lang="en">
              <body style="background-color:'blue'; height:100vh; ">

              <script src="https://js.paystack.co/v1/inline.js"></script>


            <script type="text/javascript">
            payWithPaystack();
              function payWithPaystack(){
                var handler = PaystackPop.setup({
                  key: "${payload.key}",
                  email:"${payload.email}",
                  amount: "${payload.amount}",
                  currency: "NGN",
                  ref: "${
                    payload.reference_id
                  }", // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                  firstname: "${payload.firstname}",
                  lastname: "${payload.lastname}",
                  // label: "Optional string that replaces customer email"
                  metadata: {
                     custom_fields: [
                        {
                            display_name: "Mobile Number",
                            variable_name: "mobile_number",
                            value: "+2348012345678"
                        }
                     ]
                  },
                  callback: function(response){
                    window.ReactNativeWebView.postMessage(JSON.stringify(response))
                  },
                  onClose: function(data){
                    window.ReactNativeWebView.postMessage(JSON.stringify({message: "USER_CANCELLED"}))
                  }
                });
                handler.openIframe();
              }
            </script>
              </body>
      `,
      };

export const ModalWebView = ({transactionHandler, payload, showModal, setShowModal}) => {
  let paystackView = PaystackUrl(payload);
  let MyWebView = null;
  const [isLoading, setLoading] = useState(true);
  return (
    <View style={{flex: 1}}>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={false}
        style={{flex: 1}}
        onRequestClose={() => {
          setShowModal(false);
          setLoading(true);
        }}
        onHardwareBackPress={() => {
          setShowModal(false);
          setLoading(true);
        }}>
        <WebView
          injectedJavaScript={
            "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
          }
          scalesPageToFit={true}
          javaScriptEnabled={true}
          javaScriptEnabledAndroid={true}
          originWhitelist={['*']}
          ref={webView => (MyWebView = webView)}
          source={paystackView}
          automaticallyAdjustContentInsets={true}
          onMessage={e => transactionHandler(e.nativeEvent.data)}
          //onNavigationStateChange={this.handleWebViewNavigationStateChange}
          onLoadStart={false}
          onLoadEnd={false}
          style={{flex: 1}}
        />
        {/* {this.state.true && (
            <View>
              <ActivityIndicator
                size="large"
                color={this.props.ActivityIndicatorColor}
              />
            </View>
          )} */}
      </Modal>
    </View>
  );
};
