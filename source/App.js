import React, { Component } from "react";
import { View } from "react-native";
// import the firebase third party lib
import firebase from "firebase";
// Custom Components to be used in the app

// Import our LoginForm component to be displayed on the screen
import Header from "./components/common/Header";
import CustomButton from "./components/common/CustomButton";
import CardSection from "./components/common/CardSection";
import Card from "./components/common/Card";
import Spinner from "./components/common/Spinner";
import LoginForm from "./components/LoginForm";  
class App extends Component {
state = { loggedIn: null };
// Life cycle method to init the firebase
componentWillMount() {
firebase.initializeApp({ apiKey: "AIzaSyB-SRnBfPY9Lbm4AFxsY0bDbFCGbn0Uhaw",
    authDomain: "rnapp-auth-class-anwar.firebaseapp.com",
    databaseURL: "https://rnapp-auth-class-anwar.firebaseio.com",
    projectId: "rnapp-auth-class-anwar",
    storageBucket: "rnapp-auth-class-anwar.appspot.com",
    messagingSenderId: "832143672882"
});

//Handle the Application when it's logged in or logged out
firebase.auth().onAuthStateChanged(user => {
if (user) {
this.setState({ loggedIn: true });
} else {
this.setState({ loggedIn: false });
}
});
}

renderContent() {
switch (this.state.loggedIn) {
case true:
return (
<Card>
<CardSection>
<CustomButton onPress={() => firebase.auth().signOut()}>
Logout
</CustomButton>
</CardSection>
</Card>
);
case false:
return <LoginForm />;
default:
return <Spinner size="large" />;
}
}
render() {
return (
<View>
<Header headerText="Authentication"/>
{this.renderContent()}
{/* 
Before the renderContent Handling
<LoginForm /> */}
</View>
);
}
}

export default App;
