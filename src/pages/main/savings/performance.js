import React, { useRef } from 'react';
import { Container,ImageWrap,Page,scaleFont,SizedBox, TouchWrap } from "simple-react-native-components";
import { H1,P,H2, Button, CheckBok ,TransferMoney,
    TransferPlan,
    FundWallet,
    Warning
} from '../../../components/component';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../helpers/colors';
import { ScrollView } from 'react-native-gesture-handler';
import numeral from 'numeral';
import {Picker} from '@react-native-picker/picker';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { Dimensions } from 'react-native';


export const Performance = (props) => {

    const [show,setShow] = React.useState(false);
    const [send_plan,setSendPlan] = React.useState(false);
    const [action,setAction] = React.useState("Transfer");
    const [warning,setWarning] = React.useState(false);
    const [current,setCurrent] = React.useState('Goals');
    const pickerRef = useRef();
    return(
        <Page backgroundColor={Colors.primary} >
        <Container paddingHorizontal={6} paddingTop={6} backgroundColor={Colors.primary} direction="row">
            <TouchWrap paddingRight={2} paddingBottom={2} paddingTop={2} onPress={() => props.navigation.goBack()}>
                <Feather Icon name="chevron-left" size={scaleFont(25)} color="#fff" />
            </TouchWrap>
          <Container backgroundColor={Colors.primary} paddingHorizontal={6} 
              paddingTop={0.5} paddingBottom={3}
              widthPercent="80%"
              horizontalAlignment="center"
          >
              <H1 fontSize={18} color={Colors.whiteBase}>
                  Performance
              </H1>
          </Container>
        </Container>
        <Container flex={1} backgroundColor={Colors.white} marginTop={2} borderTopLeftRadius={50} 
          borderTopRightRadius={50}
          paddingHorizontal={3}
        >
          <SizedBox height={3}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Container 
                    verticalAlignment="center"
                    backgroundColor={Colors.lightYellow}
                    paddingVertical={5}
                    borderRadius={10}
                    marginTop={2}
                >
                    <Container>
                        <H1 textAlign="center" fontSize={5}>Performance</H1>
                        <H1 textAlign="center"
                            fontSize={15}
                        >&#8358;{numeral(2000000).format("0,0.00")}</H1>
                    </Container>
                    <Container marginTop={5}
                        marginBottom={3}
                        direction="row"
                        horizontalAlignment="space-evenly"
                    >
                        <Container direction="row"
                            verticalAlignment="center"
                        >
                            <P fontSize={5}>Savings</P> 
                            <SizedBox width={0.8} />
                            <Feather name={"play"} 
                                size={8}
                                color={Colors.primary}
                            />
                            <SizedBox width={0.8} />
                            <H1
                            fontSize={5}
                        >&#8358;{numeral(2000000).format("0,0.00")}</H1>
                        </Container>

                        <Container direction="row"
                            verticalAlignment="center"
                        >
                            <P fontSize={5}>Returns</P> 
                            <SizedBox width={0.8} />
                            <Feather name={"play"} 
                                size={8}
                                color={Colors.primary}
                            />
                            <SizedBox width={0.8} />
                            <H1
                            fontSize={5}
                        >&#8358;{numeral(1000000).format("0,0.00")}</H1>
                        </Container>
                    </Container>
                    <Container paddingHorizontal={3}>
                        <Container>
                            <P fontSize={5}>Sort by</P>
                        </Container>
                    </Container>
                    <LineChart
                        data={{
                        labels: ["S", "M", "T", "W", "T", "F","S"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }
                        ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        withDots={false}
                        withInnerLines={false}
                        chartConfig={{
                        backgroundColor: Colors.greyBase300,
                        backgroundGradientFrom: Colors.lightYellow,
                        backgroundGradientTo: Colors.lightYellow,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 0) => Colors.primary,
                        labelColor: (opacity = 1) => Colors.black,
                        // style: {
                        //     borderRadius: 16
                        // },
                        // propsForDots: {
                        //     //r: "6",
                        //     //strokeWidth: "0",
                        //     //stroke: "#ffa726"
                        // }
                        }}
                        withVerticalLines={false}
                        withHorizontalLines={false}
                        bezier
                        style={{
                        marginVertical: 8,
                        //borderRadius: 16
                        }}
                    />
                </Container>
            </ScrollView>
        </Container>
      </Page>
    )
}