import { StyleSheet} from 'react-native';
import { Dimensions} from 'react-native';
const {height,width} =Dimensions.get('window');
export default StyleSheet.create({
    SearchMainView:{
        backgroundColor:"white",
        padding:15
      }, 
      SearchMainSafeArea:{
        backgroundColor:"#eee",
        flex:1,
        width:width,
        // marginLeft:30
      },
      searchBarView:{
        marginTop:15,
        flexDirection:'row'
      },
      textInputContainer:{
        backgroundColor:"#eeee",
        borderRadius:50,
        flexDirection:"row",
        alignItems:"center",
      },
      textInputView:{
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 20,
        paddingLeft:120,
        width: width-20,
        marginLeft:10,
        marginRight:10
      },
      textInput:{
        backgroundColor: '#fff', 
        paddingHorizontal: 20, 
        paddingLeft:10,
        width: width-20,
      },
      searchBarView:{
        backgroundColor: '#eeee', 
        paddingHorizontal: 20, 
        paddingLeft:10,
        width: width,
        paddingTop:10
      },
      paddingView:{
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        
      },
      imageSize:{
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black"
      },
      bottomNavigationView: {
        backgroundColor: '#fff',
        width: width,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
      }

})