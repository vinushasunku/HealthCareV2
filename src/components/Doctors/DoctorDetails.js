import { View,Dimensions,FlatList,Text,TouchableOpacity } from 'react-native';
import doctor from '../../../assets/doctors.json'
import styles from '../search/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ListItem,Avatar } from "react-native-elements";
import TimeSlots from './TimeSlots'
const {height,width} =Dimensions.get('window');
const doctorDetail=doctor[0];

const DoctorDetail=({ navigation }) =>{
    function doctorInfo() {
            return(
      <View>
          <View style={{width:750,backgroundColor:'#4B0082',paddingBottom:10}}>
          <TouchableOpacity  style={{height:55, paddingLeft:10, paddingTop:10}}>
                                 <Ionicons name="md-arrow-back-circle" size={45} color="white"  /> 
            </TouchableOpacity>

          </View>

        <View>
                <ListItem bottomDivider style={{ width: width}}>
                    <Avatar source={{ uri: doctorDetail.image}} style={styles.imageSize} rounded />
                    <ListItem.Content>
                    <ListItem.Title style={{fontWeight:'bold'}}>{doctorDetail.name}</ListItem.Title>
                    <ListItem.Subtitle style={{fontWeight:'300', paddingTop:5, fontSize:10}}>{doctorDetail.title}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{fontWeight:'300', paddingTop:5,fontSize:10}}>{doctorDetail.experience} yrs of experience. overall</ListItem.Subtitle>
                    {/* <ListItem.Experience>{props.experience}</ListItem.Experience> */}
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider style={{ width: width }}>
                    <ListItem.Content>
                        <View style={{flexDirection:"row" ,backgroundColor:"#e5cce5", width:width-30,height:55}}>
                                <Text style={{paddingTop:18, paddingLeft:10}}>
                                    Vedio Consultation
                                </Text>
                                <Text style={{paddingTop:18, paddingLeft:160}}>
                                    Rs 500 fee
                                </Text>
                        </View>
                        <View style={{borderColor:'#eee',borderWidth:1,width:width-30}}>
                        <TimeSlots />
                        </View>
                        
                    </ListItem.Content>

                </ListItem>

                <ListItem bottomDivider style={{ width: width }}>
                    <ListItem.Content>
                        <View style={{flexDirection:"row" ,backgroundColor:"#e5cce5", width:width-30,height:55}}>
                                <Text style={{paddingTop:18, paddingLeft:10}}>
                                    In-Clinic Appointment
                                </Text>
                                <Text style={{paddingTop:18, paddingLeft:140}}>
                                    Rs 500 fee
                                </Text>
                        </View>
                        <View style={{borderColor:'#eee',borderWidth:1,width:width-30, paddingLeft:10}}>
                          <Text style={{fontWeight:'bold', paddingTop:5}}>hospitalName</Text>
                          <Text style={{fontWeight:'300',paddingTop:5}}>Location</Text>
                          <Text style={{fontWeight:'300',paddingTop:5}}>max 30 min wait</Text>
                        </View>                        
                    </ListItem.Content>

                </ListItem>

        </View>



    </View>
    );
    }
       return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {DoctorDetail()}
        </View>
       );
  };

  DoctorDetail.navigationOptions = {
    title: '',
    headerTitleStyle: {marginLeft: -10 * 2.0,fontSize: 20 },
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    }
}
  export default DoctorDetail;

