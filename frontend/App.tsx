import React from "react";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox, Button } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SplashScreen from "./Components/SplashScreen";
import CryptoAuth from "./Components/CryptoAuth";
import RecentTransactions from "./Components/RecentTransactions/RecentTransactions";
import Assets from "./Components/Assets/Assets";
import Transfer from "./Components/Transfer/Transfer";
import Profile from "./Components/Profile/Profile";
import Header from "./Components/Header";
import NFTAssets from "./Components/NFT/NFTAssets";
import Chat from "./Components/Chat/Chat";
import ChatModal from "./Components/Chat/ChatModal";
import { createStore } from "redux";
import { Provider } from "react-redux";
import NodeView from "./views/NodeView";
import RedServerView from "./views/RedServerView";
import BlueServerView from "./views/BlueServerView";
import YellowServerView from "./views/YellowServerView";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCreditCard,
  faCoins,
  faUser,
  faPaperPlane,
  faRocket,
  faCircle,
  faCompass,
  faDotCircle,
  faUserCircle,
  faCommentAlt,
  faComment,
  faCommentSlash,
  faCommentMedical,
  faCommentDots,
  faCommentsDollar
} from "@fortawesome/free-solid-svg-icons";

const initialState = {
  action: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    default:
      return state;
  }
};

const store = createStore(reducer);

LogBox.ignoreAllLogs();

// const Activecolor =
function Home(): JSX.Element {
  return (
    <Tab.Navigator
      shifting={false}
      activeColor="#5C26FF"
      barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Server"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCommentsDollar} color={color} size={32}/>
          ),
        }}
        component={Server}
      />
    </Tab.Navigator>
  );
}

function Server(): JSX.Element {
  return(
    <Provider store={store}>
      <ServerStack.Navigator>
        <ServerStack.Screen
          name="Node"
          component={NodeView}
          options={{ headerShown: false }}/>
        <ServerStack.Screen
          name="RedServer"
          component={Chat}/>
        <ServerStack.Screen
          name="Profile"
          component={Profile}/>
      </ServerStack.Navigator>
    </Provider>
  )
}

function ChatServer(): JSX.Element {
  return(
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="RedServerScreen"
        component={Chat}/>
    </ChatStack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const ServerStack = createStackNavigator();
const ChatStack = createStackNavigator();


function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "Server":
      return "Server";
    case "Profile":
      return "Profile";
    case "Node":
      return "Node";
  }
}

function App(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={CryptoAuth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={Home}
          // Hiding header for Navigation Drawer
          options={{ headerTitle: (props) => <Header /> }}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;