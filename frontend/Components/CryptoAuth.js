import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Button, Paragraph, Dialog, Portal, Provider, ActivityIndicator } from "react-native-paper";
import { useMoralis } from "react-moralis";
import { Ionicons } from "@expo/vector-icons";
import { useWalletConnect } from "../WalletConnect";

const {width, height} = Dimensions.get('screen');
const Background = ['#EEEEEE', '#EEEEEE', '#EEEEEE', '#EEEEEE', '#EEEEEE',];
const Screen = [
  {
    "Title": "Connect Your Wallet",
    "Feature": "",
    "Image": "https://Image.flaticon.com/icons/png/256/3571/3571572.png"
  },
  {
    "Title": "Find Your Community",
    "Feature": "",
    "Image": "https://cdn-icons.flaticon.com/png/512/4127/premium/4127852.png?token=exp=1643657291~hmac=d347a6e47a2a6eb543cc662600b96726"
  },
  {
    "Title": "Chat with Token Holders",
    "Feature": "",
    "Image": "https://cdn-icons-png.flaticon.com/512/4127/4127787.png"
  },
  {
    "Title": "Discover Projects",
    "Feature": "",
    "Image": "https://cdn-icons-png.flaticon.com/512/4935/4935359.png"
  },
  {
    "Title": "Welcome to Nodal",
    "Feature": "",
    "Image": "https://www.meme-arsenal.com/memes/8c0c25686350812960648355c41ae7d1.jpg"
  }
]

const LoginScreen = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const inputRange = Screen.map((_, i) => i * width);
  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: Background,
  })

const connector = useWalletConnect();

const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
} = useMoralis();


  const [ setVisible ] = React.useState(false);

  const handleCryptoLogin = () => {
    authenticate({ connector })
      .then(() => {
        if (authError) {
          setErrortext(authError.message);
          setVisible(true);
        } else {
          if (isAuthenticated) {
            navigation.replace("DrawerNavigationRoutes");
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    isAuthenticated && navigation.replace("DrawerNavigationRoutes");
  }, [isAuthenticated]);

  return (
    <Provider>
        <Animated.View
          style={[StyleSheet.absoluteFillObject, {
            backgroundColor
          }]}
        />



      <Animated.FlatList
        data={Screen}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        style={{paddingBottom: height * .25}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        keyExtractor={item => item.key}
        pagingEnabled
        horizontal
        renderItem={({item, index}) => {
          return <View style={{width, justifyContent: 'center', height: '100%'}}>
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Image source={{uri: item.Image}} style={{width: width - 64, height: width * 2, top: 48, resizeMode: 'contain'}}/>
            </View>


            <View style={{paddingLeft: 32, bottom: 30}}>
              <Text style={{alignItems: 'center', color: '#000', fontWeight: '800', fontSize: 28, paddingBottom: 10, paddingLeft: 20,}} numberOfLines={1} adjustsFontSizeToFit>{item.Title}</Text>
              <Text style={{alignItems: 'center', color: '#000', fontWeight: '400', fontSize: 16}}>{item.Feature}</Text>
            </View>
          </View>
        }}
      />
      

        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 32}}>
          {Screen.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 1],
              extrapolate: 'clamp',
              justifyContent: "center"
            })
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 1],
              extrapolate: 'clamp',
              justifyContent: "center"
            })
            return <Animated.View
              style={{
                backgroundColor: '#5C26FF',
                borderRadius: 8,
                height: 16,
                margin: 4,
                opacity,
                justifyContent: "center",
                transform: [{
                  scale
                }],
                width: 16,
              }}
            />
          })}
        </View>
        <TouchableOpacity
          style={Format.buttonFormat}
          activeOpacity={0.5}
          onPress={handleCryptoLogin}
        >
          <Ionicons
            color="#FFFFFF"
            name="lock-open"
            size={32}
            style={{ marginTop: 14 }}
          />
        </TouchableOpacity>
    </Provider>
  );
};

export default LoginScreen;

const Format = StyleSheet.create({
  buttonFormat: {
    alignItems: "center",
    backgroundColor: "#5C26FF",
    borderRadius: 16,
    height: 64,
    marginBottom: 130,
    marginLeft: 64,
    marginRight: 64,
  },
});
