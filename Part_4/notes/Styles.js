import { StyleSheet } from "react-native"

//A stylesheet to make our app beautiful
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "red"
    },
    header: {
      alignSelf: "center",
      backgroundColor: 'blue'
    },
    notes: {
      flex: 1,
      backgroundColor: 'yellow',
      fontWeight: 'bold',
      fontSize: 30
    },
    button: {
      height: 100,
      color: "#000"
    }
});

export default styles;
