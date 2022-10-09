import React, {Component,useState,useRef, createRef} from 'react';
import {StyleSheet, View, FlatList,ActivityIndicator,Dimensions,Text,TouchableOpacity} from 'react-native';
import {SearchBar,CheckBox} from "react-native-elements";
import doctor from '../../../assets/doctors.json'
import DoctorItem from './DoctorItem';
import styles from './styles'
const {height,width} =Dimensions.get('window');
import { BottomSheet } from 'react-native-btr';
import { RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import BottomTabs from '../BottomNavigation/BottomTabs'
// import CheckBox from 'react-native-check-box';
export default class SearchHealthBar extends React.Component {
    
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      selectedId: -1,
      data: [],
      filteredData: [],
      sortOption:[{
           label:"Consultation Benefits",
           id:"Consultation_Benefits",
           value:false
      },
      {
        label:"Patient Recommendation",
        id:"Patient_Recommendation",
        value:false
      }],
      filterOption:["Consultation Benefits","Patient Recommendation"],
      visiblitySheet:false,
      male:false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    //this.setConsultationBenefits=this.setConsultationBenefits.bind(this);
  }

  toggleBottomNavigationView = () => {
    this.setState({ visiblitySheet:!this.state.visiblitySheet})
  };

  updateSortdate=(id)=>{

    const newState = this.state.sortOption.map(obj => {
        if (id==='Consultation_Benefits' && obj.id==='Consultation_Benefits') {
          return {...obj, value:!obj.value};
        }
        else if(id === 'Patient_Recommendation' && obj.id==='Patient_Recommendation')
        {
            return {...obj, value:!obj.value };
        }
  
        return obj;
      });
      console.log('id',newState)
      this.setState({sortOption:newState})
  }
  setConsultationBenefits= (id) =>{
     this.updateSortdate(id)
    // this.state.sortOption.map((item,index)=>{
    //     if(id==='Consultation_Benefits' && item.id==='Consultation_Benefits')
    //     {
    //        this.setState({sortOption:[{label:item.label,id:item.id,value:!item.value},this.state.sortOption[1]]})
    //     }
    //     else if(id === 'Patient_Recommendation' && item.id==='Patient_Recommendation')
    //     {
    //        this.setState({sortOption:[this.state.sortOption[0],{label:item.label,id:item.id,value:!item.value}]})
    //     }
    // })
  }
  componentDidMount= () => {
    const customData = require('../../../assets/doctors.json');
    this.setState({ data:customData})
  }
  
  search = (searchText) => {
    this.setState({searchText: searchText});

    let filteredData = this.state.data.filter(function (item) {
      return item.Title.includes(searchText);
    });

    this.setState({filteredData: filteredData});
  };
 setmale=()=>{
    this.setState({ male:!this.state.male})
 }
  render() {
    return (
      <View>
        <View style={styles.searchBarView}>
        <SearchBar
          inputContainerStyle={styles.textInputContainer}
          round={true}
          lightTheme={true}
          placeholder="Search..."
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={this.search}
          value={this.state.searchText}
        />
        </View>
        <View style={[styles.paddingView,{flexDirection:"row"}]}>
            <TouchableOpacity  style={{height:55, paddingLeft:10, paddingTop:20, backgroundColor:"#E0E0E0", width:100, borderRadius:30}}
            onPress = {()=>this.search('Vedio')}
            >
                    <Text>vedio</Text>
            </TouchableOpacity> 
            <TouchableOpacity  style={{height:55, paddingLeft:10, paddingTop:20, backgroundColor:"#E0E0E0", width:100, borderRadius:30}}
            onPress={this.toggleBottomNavigationView}
            >
                    <Text> Filter</Text>
            </TouchableOpacity> 
        </View>
        <View style={styles.paddingView}>
            <FlatList
              data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data}
              keyExtractor={(item) => `item-${item.id}`}
              renderItem={({item})=><DoctorItem props={item}/>}
             ItemSeparatorComponent={() => <View style={styles.separator}/>}
            />
        </View>
        <BottomSheet
          visible={this.state.visiblitySheet}
          onBackButtonPress={this.toggleBottomNavigationView}
          onBackdropPress={this.toggleBottomNavigationView}
        >
        <View style={styles.bottomNavigationView}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderBottomColor:'#F8F8F8',
                }}>
                <Text
                style={{
                  textAlign: 'center',
                  padding: 20,
                  fontSize: 20,
                  backgroundColor:'#F8F8F8',
                  width:width
                }}>
                 {'Sort & Filter'}
              </Text>
            </View>
            <View styles={{paddingTop:10,width:width}}>
                <Text style={{fontWeight:'bold' }}>
                    Sort By
                </Text>
            </View>
            <View>
                {
                    
                    this.state.sortOption.map((item,index)=>(                       
                        <CheckBox  key={item.id}
                        title={item.label}
                        iconRight
                        containerStyle={{width:width, backgroundColor :"#fff",borderColor:"#fff"}}
                        style={{paddingTop:10}}
                        checked={item.value}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        onPress = {()=>this.setConsultationBenefits(item.id)}
                     />

                    ))
                }

            </View>
        </View>
        </BottomSheet>
      </View>



    );
  }
}

function header() {
    return <View style={styles.headerContainerStyle}>
        <BottomTabs />
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate('BottomTabs')} />
        <Text>{"Profile"}</Text>
    </View>
}




