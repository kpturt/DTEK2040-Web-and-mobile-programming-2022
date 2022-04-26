import { StyleSheet } from "react-native"

//A stylesheet to make our app beautiful
const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FFD8CB"
    },
    header: {
      paddingTop: 10,
      alignSelf: "center",
      //backgroundColor: '#f4f1de'
    },
    notes: {
      flex: 1,
      margin: 10,
      padding: 20,
      backgroundColor: 'white',
      fontWeight: 'bold',
      fontSize: 30
    },
    input: {
      textAlign: "center",
      height: 40,
      paddingLeft: 50,
      paddingRight: 50,
      margin: 10,
      backgroundColor: '#FFE9E3',
    },
    buttonArea: {
      paddingLeft: 100,
      paddingRight: 100,
      height: 50,
      //color: "#000"
    },
    //does not work because of limitations
    buttonStyle: {
      color: 'black'
    }
});

export default styles;
