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

  reportButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6161",
    padding: 20,
    width: "100%",
    height: "100%",
  },

  reportButtonText: {
    color: "#000000",
  },

  profileImage: {
    height: windowWidth / 6,
    width: windowWidth / 6,
  },

  spacedRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
    display: "flex",
    //height: (windowHeight * 65) / 100,
    height: "100%",
    // width: windowWidth,
  },
  configWindow: {
    display: "flex",
    marginTop: windowHeight / 2,
    marginLeft: windowWidth / 4,
    borderRadius: 20,
    padding: windowWidth / 40,
    backgroundColor: "white",
    flexDirection: "column",
    alignContent: "flex-end",
  },
  configButton: {
    position: "absolute",
    right: windowWidth / 25,
    bottom: windowHeight / 5,
  },
  exitButton: {
    textAlign: "right",
  },

  configText: {},
});
