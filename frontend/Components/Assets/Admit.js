import React, { useEffect, useState, Component } from "react";
import {
  useMoralis,
} from "react-moralis";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
} from "react-native";
import NativeBalance from "./NativeBalance";



export default function Admit() {
  const { Moralis } = useMoralis();
  const { walletAddress } = useMoralisDapp();

  const getAvaxBalance = async () => {
    const params =  { address: walletAddress };
    const result = await Moralis.Cloud.run("getAvaxBalance", params);
    console.log(result);
  }

  
  // const nativeName = useMemo(() => getNativeByChain(options?.chain || chainId), [options, chainId]);
  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
        <View style={styles.viewContainer}>
          <View style={styles.button}>
        <Button
          title="Get AVAX Balance"
          color="white"
          disabledStyle={{
            borderWidth: 2,
            borderColor: "#00F",
          }}
          onPress={getAvaxBalance}
          loadingProps={{ animating: true }}></Button>
      </View>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  chainText: {
    fontSize: 15,
    color: "#414a4c",
    paddingTop: 20,
    paddingHorizontal: 5,
    fontWeight: "600",
  },
  button: {
    width: 200,
    backgroundColor: "red",
    borderRadius: 15,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "black",
    fontWeight: "600",
    fontSize: 35,
  },
  viewContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 10,
  },
});