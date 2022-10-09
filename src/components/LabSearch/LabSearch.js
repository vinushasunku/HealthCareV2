import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { Text, View, StyleSheet, TextInput, Image, FlatList, StatusBar, TouchableOpacity, Dimensions } from "react-native";
import {SearchBar,ListItem,Avatar} from "react-native-elements";
const { width } = Dimensions.get('screen');
import { styles } from "../constants/styles";
import Entypo  from 'react-native-vector-icons/Entypo'; 
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons'; 
import axiosInstance from "../../services/APIService";
import Spinner from 'react-native-loading-spinner-overlay';
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import {setLabId } from "../redux/slices/login";

const LabSearch = ({ navigation }) => {
    const [searchtext, setSearch] = React.useState('');
    const [filteredLabDataSource, setFilteredLabDataSource] = React.useState([]);
    const [filteredMedicianDataSource, setMedicianLabDataSource] = React.useState([]);
    const [masterLabDataSource, setMasterLabDataSource] = React.useState([]);
    const [masterDataSource, setMasterDataSource] = React.useState([]);
    const loginid = useAppSelector(state => state.loginId.loginId);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        const url = require('../../../assets/url.json');
        setLoading(true);
        axiosInstance.get(url.test+'?pageSize=10').then(response => {
         if( response != null &&response.data != null && response.data != undefined)
            {
              

                setMasterDataSource(response.data["summary"]);
                setFilteredLabDataSource(response.data["summary"]);
                console.log(response.data["summary"])
                setLoading(false)
            }
        }).catch(error =>{
            console.log(error);
            setLoading(false);
        })

        //setMasterDataSource(data);
        // const fileteredLabData = masterDataSource.filter(
        //     function (item) {
        //       const itemData = item.type
        //         ? item.type.toUpperCase()
        //         : ''.toUpperCase();
        //         const text="LAB";
        //       const textData = text.toUpperCase();
        //       return itemData.indexOf(textData) > -1;
        //   });
        //   const fileteredMedicianData = data.filter(
        //     function (item) {
        //       const itemData = item.type
        //         ? item.type.toUpperCase()
        //         : ''.toUpperCase();
        //         const text="Medician";
        //       const textData = text.toUpperCase();
        //       return itemData.indexOf(textData) > -1;
        //   });
        //setFilteredLabDataSource(fileteredLabData);
        // setMasterLabDataSource(fileteredLabData);
        // setMedicianLabDataSource(fileteredMedicianData)
     },[]);
      const searchFilterFunction = (text) => {
        if (text) {
          const newData = masterDataSource.filter(
            function (item) {
              const itemData = item.testName
                ? item.testName.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });

        //   const fileteredLabData = newData.filter(
        //     function (item) {
        //       const itemData = item.type
        //         ? item.type.toUpperCase()
        //         : ''.toUpperCase();
        //         const data="Lab";
        //       const textData = data.toUpperCase();
        //       return itemData.indexOf(textData) > -1;
        //   });
        //   const fileteredMadicianData = newData.filter(
        //     function (item) {
        //       const itemData = item.type
        //         ? item.type.toUpperCase()
        //         : ''.toUpperCase();
        //         const data="Medician";
        //       const textData = data.toUpperCase();
        //       return itemData.indexOf(textData) > -1;
        //   });
          setFilteredLabDataSource(newData);
          //setMedicianLabDataSource(fileteredMadicianData);
          setSearch(text);
        } else {
            setFilteredLabDataSource(masterDataSource);
        //   setFilteredLabDataSource(masterDataSource);
        //   setMedicianLabDataSource(fileteredMadicianData);
          setSearch(text);
        }
      };

     function selectLabTest(id){
           console.log(id)
           dispatch(setLabId(id));
           navigation.navigate('LabDetail')
     }
    function search() {
        return (
            <View style={styles.headerSearchStyle}>
                <View style={{ flex:1}}>
                <SearchBar
                    round
                    inputContainerStyle={{backgroundColor:'white',borderColor:"#2F4F4F",color:'#2F4F4F', borderWidth:1,borderBottomWidth:1, width:width-80}}
                    containerStyle={{backgroundColor:'white', borderBottomColor:'white', borderTopColor:'white',color:'#2F4F4F'}}
                    cancelIcon={false}
                    searchIcon={{size: 24}}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Search tests and  packages"
                    value={searchtext}
                    />
                </View>
            </View>
        )
    }

    function labList() {

        const renderItem = ({ item }) => {
            
            return (
                <View style={{ justifyContent: 'center', marginTop: 10.0}}>
                    <View style={{ flexDirection: 'row' , paddingLeft:10}}>
                        <View style={{borderWidth:1, borderColor:"#eee", alignItems:'center', marginLeft:10}}>
                          <Entypo name="lab-flask" size={30} color="#5fa8d2" style={{paddingTop:5}} />
                        </View>

                         <View>
                        <TouchableOpacity onPress={() => selectLabTest(item['testId'])}>
                            <View style={{flexDirection:'row'}}>
                            <View style={{paddingLeft:20, width:width/1.4}}>
                                <Text style={[stylessheet.textformat,stylessheet.textColor,stylessheet.headerfontsize]}>{item.testName}</Text>
                                {/* <Text style={{ color: 'gray', fontSize: 17.0 , marginTop: 10 - 7.0 }}>{type}</Text> */}
                                <Text style={[stylessheet.textformat, stylessheet.textColor]}>
                                   Total Tests - {item.numTests} 
                                </Text>
                              
                            </View>
                            <View>
                                <SimpleLineIcons name="arrow-right" size={10} color="black"  />
                            </View>
                            </View>

                        </TouchableOpacity>
                        
                        </View>


                    </View>

                    <View style={{   backgroundColor: "#DBDBDB",height: 0.80,marginTop: 10,marginHorizontal: 20, width:width-50}}>
                    </View>
                </View>
            )
        }

        return (
            <FlatList
                data={filteredLabDataSource}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10* 2.0 }}
            />
        )
    }
    function MedicianList() {
        const renderItem = ({ item }) => {
            return (
                <View style={{ justifyContent: 'center', marginTop: 10.0}}>
                    <View style={{ flexDirection: 'row' , paddingLeft:10}}>
                        <View style={{borderWidth:1, borderColor:"#eee", alignItems:'center', marginLeft:10}}>
                          <Entypo name="lab-flask" size={30} color="#5fa8d2" style={{paddingTop:5}} />
                        </View>

                         <View >
                        <TouchableOpacity onPress={() => navigation.navigate('LabDetail', { loginid:loginid})}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{paddingLeft:20,width:width/1.4}}>
                                    <Text style={[stylessheet.textformat, stylessheet.textColor,stylessheet.headerfontsize]}>{item.name}</Text>
                                    {/* <Text style={{ color: 'gray', fontSize: 17.0 , marginTop: 10 - 7.0 }}>{type}</Text> */}
                                    <Text style={[stylessheet.textformat, stylessheet.textColor]}>
                                    Total Tests - {item.totaltest} 
                                    </Text>
                                
                                </View>

                                <View>
                                <SimpleLineIcons name="arrow-right" size={10} color="black"  />
                                </View>
                            </View>

                        </TouchableOpacity>
                        
                        </View>


                    </View>

                    <View style={{   backgroundColor: "#DBDBDB",height: 0.80,marginTop: 10,marginHorizontal: 20, width:width-50}}>
                    </View>
                </View>
            )
        }

        return (
            <FlatList
                data={filteredMedicianDataSource}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
             
            />
        )
    }

    return (
        <SafeAreaView  style={{ flex: 1, }} backgroundColor="#F5F5F5">
            <Spinner
                visible={loading}
                textStyle={styles.spinnerTextStyle}
                />
        <StatusBar backgroundColor="#6979F8" />
         {/* <ScrollView nestedScrollEnabled={true} > */}
         <View style={{ flex: 1, backgroundColor: 'white', marginTop:10, marginLeft:10, marginRight:10 }}>
                {/* {header()} */}
                {search()}
                {/* <View style={{width:width-60,height:40,backgroundColor:'#ccccff', marginLeft:20,paddingLeft:10,paddingTop:10}}>
                   <Text style={[stylessheet.textformat, stylessheet.textColor,stylessheet.headerfontsize]}>{"Search In Medicines"}</Text>
                </View>
                {MedicianList()} */}
                <View style={{width:width-60,height:40,backgroundColor:'#ccccff', marginLeft:20, paddingTop:10,paddingLeft:10}}>
                   <Text style={[stylessheet.textformat, stylessheet.textColor,stylessheet.headerfontsize]}>{"In Lab Tests"}</Text>
                </View>
                {labList()}
              
            </View>

         {/* </ScrollView> */}

    </SafeAreaView>
    )
}


LabSearch.navigationOptions = {
    title: "Search medicines and lab tests",
    headerTintColor: 'black',
    headerTitleAlign: 'center',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor:'#F5F5F5'
        //fontFamily:'sharp-sans-bold, fallback-font, Arial, sans-serif'
        
    }
}


const stylessheet = StyleSheet.create({

    textformat:{
        fontSize:16,
        lineHeight:22,
        //letterSpacing:0,
        fontWeight:'500'
    },
    textColor:{
        color:'#333333'
    },
    headerfontsize:{
        fontSize:17,
        color:'black'
    }
});

export default LabSearch;