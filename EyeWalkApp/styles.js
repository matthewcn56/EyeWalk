import { StyleSheet, Platform } from "react-native";
import { Dimensions } from "react-native";

//global styling variables
var scrollheight;

//TODO: Make dynamic styling using windowWidth, windowHeight!

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
    margin: 15,
  },

  profileImage: {
    height: windowWidth / 6,
    width: windowWidth / 6,
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
  map: {
    height: (windowHeight * 3) / 4,
    width: windowWidth,
  },
});
