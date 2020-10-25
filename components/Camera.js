import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export class Camera extends Component {
  pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1 //1 means highest quality
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test/${data.uri.split('.')[1]}`
        };
        this.onUpload(newFile);
      }
    } else {
      Alert.alert('You need to give permissions');
    }
  };

  pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test/${data.uri.split('.')[1]}`
        };
        this.onUpload(newFile);
      }
    } else {
      Alert.alert('You need to give permissions');
    }
  };

  onUpload = async (image) => {
    // Do what ever you need with the image.
    console.log(image);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.pickFromGallery} style={styles.button}>
          <Text style={styles.text}>Select From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pickFromCamera} style={styles.button}>
          <Text style={styles.text}>Select From Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  button: {
    backgroundColor: '#85B8E3',
    padding: 10,
    borderRadius: 15,
    margin: 5,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
});

export default Camera;
