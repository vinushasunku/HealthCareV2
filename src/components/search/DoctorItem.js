import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, Dimensions,Button } from 'react-native';
const {height,width} =Dimensions.get('window');
import { ListItem,Avatar } from "react-native-elements";
import {TouchableOpacity} from 'react-native'
import styles from './styles'
const DoctorItem=({props})=>{
    return(
   
    <View style={styles.paddingView}>
        <View>
            <TouchableOpacity activeOpacity={1} style={{marginBottom:30}} >
                <ListItem bottomDivider style={{ width: width}}>
                  <Avatar source={{ uri: props.image}} style={styles.imageSize} rounded />
                    <TouchableOpacity>
                        <ListItem.Content>
                        <ListItem.Title style={{fontWeight:'bold'}}>{props.name}</ListItem.Title>
                        <ListItem.Subtitle style={{fontWeight:'300', paddingTop:5, fontSize:10}}>{props.title}</ListItem.Subtitle>
                        <ListItem.Subtitle style={{fontWeight:'300', paddingTop:5,fontSize:10}}>{props.experience} yrs of experience. overall</ListItem.Subtitle>
                        </ListItem.Content>
                    </TouchableOpacity>

                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider style={{ width: width}}>
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight:'bold'}}>{props.location} . <Text style={{fontWeight:'400', paddingTop:5,fontSize:15}}> {props.hospitalName}</Text></ListItem.Title>
                        <ListItem.Subtitle style={{fontWeight:'300', paddingTop:5, fontSize:10,paddingBottom:10}}>{props.fee} Consultation Fees</ListItem.Subtitle>
                         <View style={{flexDirection:"row"}}>
                         <TouchableOpacity  style={{backgroundColor:"#2196F3",width:150,height:40}}>
                            <Text style={{paddingTop:10,paddingLeft:10, color:"white"}}>Book Vedio consult</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={{backgroundColor:"#2196F3",width:150,height:40, marginLeft:20}}>
                            <Text style={{paddingTop:10,paddingLeft:10, color:"white"}}>Book Appointment</Text>
                        </TouchableOpacity>
                         </View>

                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>

        </View>


    </View>
    

    );
  };

  DoctorItem.navigationOptions = () => {
    return {
        header: () => null
    }
}

  export default DoctorItem;