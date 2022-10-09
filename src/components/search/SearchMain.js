import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Image, FlatList, StatusBar, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import {SearchBar,CheckBox} from "react-native-elements";
import SearchHealthBar from './SearchHealthBar'
import DoctorDetail from '../Doctors/DoctorDetails'
import BottomTabs from '../BottomNavigation/BottomTabs'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ListItem,Avatar } from "react-native-elements";
const { width } = Dimensions.get('screen');
import { styles } from "../constants/styles";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const SearchMain = ({ navigation }) => {
    const [searchtext, setSearch] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState([]);
    const [masterDataSource, setMasterDataSource] = React.useState([]);
    const doctorsList = [
        {
            id: '1',
            name: 'Dr.Ronan Peiterson',
            yearsOfExperience: 8,
            rating: 4.9,
            reviews: 135,
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
        },
        {
            id: '2',
            name: 'Dr.Brayden Trump',
            yearsOfExperience: 10,
            rating: 4.7,
            reviews: 235,
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
        },
        {
            id: '3',
            name: 'Dr.Appollonia Ellison',
            yearsOfExperience: 7,
            rating: 4.8,
            reviews: 70,
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
        },
        {
            id: '4',
            name: 'Dr.Beatriz Watson',
            yearsOfExperience: 5,
            rating: 5.0,
            reviews: 50,
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
        },
        {
            id: '5',
            name: 'Dr.Diego Williams',
            yearsOfExperience: 15,
            rating: 4.9,
            reviews: 512,
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
        },
        {
            id: '6',
            name: 'Dr.Shira Gates',
            yearsOfExperience: 4,
            rating: 4.4,
            reviews: 15,
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
        },
        {
            id: '7',
            name: 'Dr.Antonia Warner',
            yearsOfExperience: 7,
            rating: 4.6,
            reviews: 99,
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
        },
        {
            id: '8',
            name: 'Dr.Linnea Bezos',
            yearsOfExperience: 2,
            rating: 4.5,
            reviews: 9,
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
        },
    ];

    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //       .then((response) => response.json())
    //       .then((responseJson) => {
    //         setFilteredDataSource(doctorsList);
    //         setMasterDataSource(doctorsList);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }, []);

    React.useEffect(() => {
        setFilteredDataSource(doctorsList);
        setMasterDataSource(doctorsList);
     },[]);
      const searchFilterFunction = (text) => {
        if (text) {
          const newData = masterDataSource.filter(
            function (item) {
              const itemData = item.name
                ? item.name.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };
    function header() {
        return <View style={styles.headerContainerStyle}>
            <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate('BottomTabs')} />
            <Text style={{ fontSize: 20.0, marginLeft: 10 * 2.0 }}>{"Search Doctors"}</Text>
        </View>
    }

    function search() {
        return (
            <View style={styles.headerSearchStyle}>
                <View style={{ flex: 1 }}>

                <SearchBar
                    round
                    inputContainerStyle={{backgroundColor: "white",borderRadius: 10,borderColor: 'white',borderWidth: 1}}
                    containerStyle={{backgroundColor: "white",borderRadius: 0,border: 'white',borderWidth: 0}}
                    cancelIcon={false}
                    searchIcon={{size: 24}}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder=""
                    value={searchtext}
                    />
                </View>
            </View>
        )
    }

    function doctors() {

        const renderItem = ({ item }) => {
            return (
                <View style={{ justifyContent: 'center', marginTop: 15.0, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.doctorImageContainerStyle}>
                           <Avatar source={{ uri: item.image}} style={{height: 109.0, width: 109.0, borderRadius: 75.0,
                                    overflow: 'hidden'}} rounded />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('DoctorProfile', {
                            image: item.image,
                            name: item.name,
                            type: "",
                            experience: item.yearsOfExperience,
                            rating: item.rating,
                        })}>
                            <View>
                                <Text style={{ fontSize: 16.0 }}>{item.name}</Text>
                                {/* <Text style={{ color: 'gray', fontSize: 17.0 , marginTop: 10 - 7.0 }}>{type}</Text> */}
                                <Text style={{ fontSize: 16.0, marginTop: 10- 7.0 }}>
                                    {item.yearsOfExperience} Years Experience
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10- 7.0 }}>
                                    <FontAwesome name="star" size={20} color="#CDDC39" />
                                    <Text style={{ fontSize: 16.0 , marginLeft: 10, marginRight: 10 * 2.0 }}>
                                        {item.rating}
                                    </Text>
                                    <MaterialIcons name="rate-review" size={24} color="gray" />
                                    <Text style={{ fontSize: 16.0 , marginLeft: 10 }}>
                                        {item.reviews} Reviews
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <View style={styles.bookContainerStyle}>
                        <TouchableOpacity onPress={() => navigation.navigate('TimeSlots', {
                            image: item.image,
                            name: item.name,
                            type: "",
                            experience: item.yearsOfExperience,
                            rating: item.rating,
                        })}>
                            <View style={styles.buttonBookingStyle}>
                                <Text style={{  color: '#FFFFFF' }}>Book Video Consult</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('TimeSlots', {
                            image: item.image,
                            name: item.name,
                            type: "",
                            experience: item.yearsOfExperience,
                            rating: item.rating,
                        })}>
                            <View style={styles.buttonBookingStyle}>
                                <Text style={{  color: '#FFFFFF' }}>Book Appointment</Text>
                            </View>
                        </TouchableOpacity>
                    </View>



                    <View style={styles.dividerStyle}>
                    </View>
                </View>
            )
        }

        return (
            <FlatList
                data={filteredDataSource}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10* 2.0 }}
            />
        )
    }

    return(
        <SafeAreaView  style={{ flex: 1, }} backgroundColor="rgba(0,0,0,0)">
            <StatusBar backgroundColor="#6979F8" />
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {header()}
                    {search()}
                    {doctors()}
                </View>
        </SafeAreaView>

    );
    
}



SearchMain.navigationOptions = () => {
    // return {
    //     header: () => null
    // }
}

export default SearchMain;