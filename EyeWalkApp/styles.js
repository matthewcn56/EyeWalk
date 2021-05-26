import { StyleSheet, Platform } from "react-native";
import { Dimensions } from "react-native";

//global styling variables
var scrollheight;
const themedBlue = "#0D5371";

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
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    height: windowHeight,
  },
  signInText : {
    fontSize: 35,
    fontWeight: "bold",
    color: "yellow"
  },

  button: {
    alignItems: "center",
    width: '67%',
    backgroundColor: "#0D5371",
    padding: 20,
    borderRadius: 20,
    margin: 10,
  },

  rectangle:{
    height: 300, 
    width: 500,
    backgroundColor: '#0D5371',
    top: '-10%',
    
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
    height: windowWidth / 4,
    width: windowWidth / 4,
    top: '-2%'
  },

  profileScreenImage:{
    height: windowWidth / 3,
    width: windowWidth / 3,
    top: '-20%'
  },

  spacedRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
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

  modalWindow: {
    display: "flex",
    borderRadius: 20,
    padding: windowWidth / 40,
    backgroundColor: "white",
    flexDirection: "column",
    alignContent: "space-between",
    alignItems: "flex-end",
    textAlign: "left",
  },

  configWindow: {
    position: "absolute",
    bottom: windowHeight / 6,
    right: 0,
  },

  mapLegendWindow: {
    position: "absolute",
    left: 0,
    top: windowHeight / 4,
  },

  configButton: {
    position: "absolute",
    right: windowWidth / 25,
    bottom: windowHeight / 5,
  },

  mapLegendButton: {
    position: "absolute",
    left: windowWidth / 50,
    top: windowHeight / 8,
  },
  exitButton: {
    textAlign: "right",
  },

  configText: {},
});
