import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

export default class App extends React.Component {

  constructor() {
    super()
    this.manager = new BleManager()

  }




  render() {
    return (
      <View style={styles.container}>
        <View style={styles.camera}><Text>Camera feed</Text></View>
        <View style={styles.column}>
          <TouchableOpacity style={[styles.arrow, styles.up]} onPress={()=>{alert("Up")}}>
            <Image source={require("./img/up.png")}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.justifyBetween]}>
          <TouchableOpacity style={[styles.arrow, styles.bottom]} onPress={()=>{alert("left")}}>
            <Image source={require("./img/left.png")}/>
          </TouchableOpacity>
          <Button
            onPress={()=>{alert('connect')}}
            title="Connect"
          />
          <TouchableOpacity style={[styles.arrow, styles.bottom]} onPress={()=>{alert("right")}}>
            <Image source={require("./img/right.png")}/>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <TouchableOpacity style={[styles.arrow, styles.bottom]} onPress={()=>{alert("down")}}>
            <Image source={require("./img/down.png")}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 'auto'
  },
  column: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  justifyBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  camera: {
    height:'80%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


const left = () => {

}

