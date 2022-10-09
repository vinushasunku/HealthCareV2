import { StyleSheet} from 'react-native';
import { Dimensions} from 'react-native';
const {height,width} =Dimensions.get('window');

export const  styles = StyleSheet.create({
  textformat:{
    fontSize:16,
    lineHeight:22,
    //letterSpacing:0,
    fontWeight:'500'
  },
    headerSearchStyle: {
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 10 * 2.0,
        alignItems: 'center',
        paddingVertical: 10,
        //marginHorizontal: 10 * 2.0,
        marginTop: 10,
        marginBottom: 10,
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: width,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
      },
    headerContainerStyle: {
        backgroundColor: 'rgba(68,114,152,0.99)',
        flexDirection: 'row',
        height: 40.0,
        paddingHorizontal: 10* 2.0,
        //marginBottom: 10,
        alignItems: 'center'
    },
    doctorImageContainerStyle: {
        height: 110.0,
        width: 110.0,
        borderRadius: 75.0,
        backgroundColor: 'white',
        borderColor: '#eee',
        borderWidth: 1.0,
        marginHorizontal: 10 * 2.0,
        marginTop: 10,
        marginBottom: 10 + 3.0,
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20.0,
        overflow: 'hidden',
    },
    doctorImageContainerTimeslotStyle: {
        borderRadius: 75.0,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1.0,
        marginHorizontal: 10 * 2.0,
        marginTop: 10,
        marginBottom: 10 + 3.0,
        shadowColor: '#6979F8',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20.0,
        overflow: 'hidden',
    },
    bookContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10 * 2.0,
    },
    buttonBookingStyle: {
        width: width / 2 - 30,
        borderColor: 'rgba(68,114,152,0.99)',
        borderWidth: 1.0,
        backgroundColor: 'rgba(68,114,152,0.99)',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    dividerStyle: {
        backgroundColor: "#DBDBDB",
        height: 0.80,
        marginTop: 10* 2.0,
        marginHorizontal: 10* 2.0
    },
    slotContainerStyle: {
        alignItems: 'center',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
        justifyContent: 'center',
        borderWidth: 1.0,
        marginRight: 12,
        height: 45.0,
        width: 100.0,
    },
    
    bookButtonStyle: {
        backgroundColor: "#6979F8",
        paddingVertical: 13,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    bookNowContainerStyle: {
        backgroundColor: 'white',
        height: 75.0,
        position: 'absolute', bottom: 0.0, width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    hours:{
        borderColor:"#eee", 
        backgroundColor:"#eee",
        marginLeft:10, 
        width:150,
        height:40,
        marginHorizontal: 10* 2.0, 
        marginTop: 10* 2.0,        
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginBottom:10
    },

    qualification:{
      borderColor:"#eee", 
      backgroundColor:"#eee",
      marginLeft:10, 
      width:100,
      height:40,
      //marginHorizontal: 10* 2.0, 
      marginTop: 20,        
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      marginBottom:10
  },

    textStyle:{
        fontSize: 16.0,
        // fontFamily: 'Arial'
    },
    textStyleDoctorprofile:{
      fontSize: 16.0,
      // fontFamily: 'Arial'
  },
    dateAndTimeContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10
    },
    headerFontSize: {
        fontSize:30,
        color:"#2F4F4F"
    },
    accountFontSize: {
        fontSize:15,
        color:"#2F4F4F",
        fontWeight:'600'
    },
    divider:{
        paddingLeft:10,
        borderBottomWidth:1, 
        borderBottomColor:"#eee",
        paddingTop:10,
        paddingBottom:10

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
       // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        width:80,
        padding: 10,
        elevation: 2,
        marginLeft:10
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#337ab7",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      buttoncolor:{
        color:'#f93'
      },
      textcolor:{
        color:'#2F4F4F'
      },
      fontHeader:{
        fontWeight:'bold'
      },
      buttonstylecss:{
        backgroundColor:'#316BBE',alignItems:'center',borderRadius:25
      }
})
export const textColor = {
    primary: '#6979F8',
    lightGray: '#DBDBDB',
    black:'#000000',
    white:'#FFFFFF'
}
const appStyle = { styles ,textColor};
export default appStyle;