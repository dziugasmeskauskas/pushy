import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import { Button } from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial'

export default class App extends React.Component {

  constructor() {
    super()

    this.state = {
      isEnabled: false,
      connected: false,
      device: null,
    }
  }

  componentDidMount () {
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values

      devices.forEach(device => {
        if (device.name === 'pushy') this.connect(device)
      })
      this.setState({ isEnabled })

      BluetoothSerial.on('bluetoothEnabled', () => this.alert('Bluetooth enabled'))
      BluetoothSerial.on('bluetoothDisabled', () => this.alert('Bluetooth disabled'))
      BluetoothSerial.on('error', (err) => this.alert(`Error: ${err.message}`))
      BluetoothSerial.on('connectionLost', () => {
        if (this.state.device) {
          this.alert(`Connection to device ${this.state.device.name} has been lost`)
        }
        this.setState({ connected: false })
      })
    })
  }

  alert (message) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  connect (device) {
    BluetoothSerial.connect(device.id)
      .then((res) => {
        this.alert(`Connected to ${device.name}`)
        this.setState({ device, connected: true })
      })
      .catch((err) => this.alert(err.message))
  }

  write (message) {
    BluetoothSerial.write(message)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.camera}><Text>Camera feed</Text></View>
        <View style={styles.column}>
          <TouchableOpacity style={[styles.arrow, styles.up]} onPress={this.write.bind(null, 'forward')}>
            <Image source={require("./img/up.png")}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.justifyBetween]}>
          <TouchableOpacity style={[styles.arrow, styles.bottom]} onPress={this.write.bind(null, 'left')}>
            <Image source={require("./img/left.png")}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.arrow, styles.bottom]} onPress={this.write.bind(null, 'right')}>
            <Image source={require("./img/right.png")}/>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <TouchableOpacity style={[styles.arrow, styles.bottom]} onPress={this.write.bind(null, 'backward')}>
            <Image source={require("./img/down.png")}/>
          </TouchableOpacity>
        </View>
      </View>
    )
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
})
