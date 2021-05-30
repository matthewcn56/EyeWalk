import { StyleSheet, Platform } from "react-native";
import { Dimensions } from "react-native";

//global styling variables
var scrollheight;
const themedBlue = "#0D5371";

const bodyFont = "Quicksand_500Medium";
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
    fontFamily: bodyFont,
  },
  navbar: {
    backgroundColor: themedBlue,
  },
  signInText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "yellow",
  },

  iconLogo: {
    height: windowWidth / 1.5,
    width: windowWidth / 1.5,
    top: "-8%",
    resizeMode: "contain",
  },
  googleLogo: {
    // flex: 1,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  googleLoginButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#db4a39",
    padding: 18,
    borderRadius: 10,
    margin: 8,
  },

  anonLoginButton: {
    alignItems: "center",
    width: "80%",
    backgroundColor: themedBlue,
    padding: 18,
    borderRadius: 10,
    margin: 8,
  },
  iconLogo: {
    height: windowWidth / 1.5,
    width: windowWidth / 1.5,
    top: "-8%",
    resizeMode: "contain",
  },

  homeButton: {
    alignItems: "center",
    width: "68%",
    backgroundColor: themedBlue,
    padding: 20,
    borderRadius: 10,
    margin: 8,
  },

  Button: {
    alignItems: "center",
    width: "68%",
    backgroundColor: themedBlue,
    padding: 20,
    borderRadius: 10,
    margin: 35,
    top: "-7%",
  },

  profileButton: {
    alignItems: "center",
    width: "-19%",
    backgroundColor: themedBlue,
    padding: 20,
    borderRadius: 10,
    margin: 10,
    top: "10%",
  },

  rectangle: {
    height: "32%",
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    backgroundColor: themedBlue,
    top: 0,
    position: "absolute",
    width: "100%",
  },

  lowerProfileRectangle: {
    marginTop: windowHeight / 2.5,
  },

  profileScroll: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    width: windowWidth,
    marginTop: windowHeight / 4,
  },
  containerscroll: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
  },

  routingButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    top: windowHeight / 10,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(196,196,196,0.5)",
    opacity: 50,
    padding: 20,
    width: "100%",
    height: windowHeight / 5,
    //zIndex: 3,
  },
  reportButton: {
    position: "absolute",
    right: windowWidth / 25,
    bottom: windowWidth / 2.4,
    borderRadius: 100,
    //display: "flex",
    //flexDirection: "row",
    //justifyContent: "center",
    // alignContent: "center",
    //alignItems: "center",
    backgroundColor: "#CA3E37",
    padding: 20,
  },

  reportButtonText: {
    color: "#000000",
  },

  profileImage: {
    height: windowWidth / 4,
    width: windowWidth / 4,
    top: "-2%",
  },

  profileScreenImage: {
    height: windowWidth / 3,
    width: windowWidth / 3,
    position: "absolute",
    bottom: "-25%",
    justifyContent: "center",
    alignItems: "center",
  },

  spacedRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  input: {
    width: "70%",
    borderWidth: 0.5,
    borderColor: "black",
    textAlign: "center",
    opacity: 50,
    padding: 7,
    borderRadius: 10,
    margin: 8,
    top: "-8%",
  },

  inputPrompt: {
    width: "50%",
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 16,
    top: "-15%",
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
  },

  map: {
    display: "flex",
    //height: (windowHeight * 65) / 100,
    height: "100%",
    width: windowWidth,
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
    top: windowHeight / 3,
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
    top: windowHeight / 3.2,
  },

  mapLegendButton: {
    position: "absolute",
    left: windowWidth / 25,
    top: windowHeight / 3.2,
  },
  exitButton: {
    textAlign: "right",
  },

  configText: {},
});
