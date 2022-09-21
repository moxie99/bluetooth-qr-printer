import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';

import React from 'react';

const App = () => {
  const [address, setAddress] = React.useState([]);
  function getListOfPairedBluetooth() {
    try {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        rsp => {
          console.log(rsp.devices);

          // [{address: 'printerUniqueAddress', name: 'printerDeviceName'}];
          setAddress(rsp?.devices);
        },
      );
    } catch (error) {}
  }
  if (this.state.isConnectedToPrinter) {
    this.startPrinting();
  } else {
    // you can see that we are passing the unique printer address below
    BluetoothManager.connect(address.address).then(
      async s => {
        this.state.isConnectedToPrinter = true;
        this.startPrinting();
      },
      e => {
        this.state.isConnectedToPrinter = false;
        alert('Error occurred, please try again .... ');
      },
    );
  }
  function startPrinting() {
    let qrCodeContent = 'Hi,I am the QrCode Content, thanks for scanning';

    // you can adjust width, height, etc.. to your need
    // Inside qrcode : [{...}] --> you can adjust 'x' , 'y' you move the qrcode in respective direction
    // Inside qrcode : [{...}] --> you can adjust 'width' to increase the size of the qr code
    let options = {
      width: 40,
      height: 30,
      gap: 20,
      direction: BluetoothTscPrinter.DIRECTION.FORWARD,
      reference: [0, 0],
      tear: BluetoothTscPrinter.TEAR.ON,
      sound: 0,
      qrcode: [
        {
          x: 20,
          y: 20,
          level: BluetoothTscPrinter.EEC.LEVEL_L,
          width: 6,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          code: qrCodeContent == undefined ? '' : qrCodeContent,
        },
      ],
    };

    BluetoothTscPrinter.printLabel(options).then(
      () => {
        console.log('Printing Successfull ....');
      },
      err => {
        console.log('Printing Failed ....');
      },
    );
  }

  // just pass the address of the printer which you like to unpair
  // BluetoothManager.connect(address).then(
  //   s => {
  //     //success here
  //   },
  //   err => {
  //     //error here
  //   },
  // );
  return (
    <SafeAreaView
      style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            width: 400,
            height: 100,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: '700', fontSize: 20, color: 'white'}}>
            Print
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
