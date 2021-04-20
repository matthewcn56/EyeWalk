import { StyleSheet, Platform } from "react-native";
import { Dimensions } from "react-native";

//global styling variables
var scrollheight;

if (Platform.OS === "ios") {
  scrollheight = "100%";
} else {
  scrollheight = null;
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    height: windowHeight,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#b3d0ff",
    padding: 20,
    borderRadius: 20,
  },

  profileImage: {
    height: 250,
    width: 250,
  },

  spacedRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: windowHeight / 60,
    marginBottom: windowHeight / 60,
  },

  input: {
    width: "50%",
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },

  inputPrompt: {
    width: "30%",
  },
});
