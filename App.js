/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Alert, Button, Platform, SafeAreaView, View } from 'react-native';
import { launchImageLibraryAsync, launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

async function requestPerms () {
  const permsAndroid = [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  ];

  const permsIOS = [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.MICROPHONE,
    PERMISSIONS.IOS.PHOTO_LIBRARY
  ];

  const perms = Platform.select({
    android: permsAndroid,
    ios: permsIOS
  });

  const request = await requestMultiple(perms);

  return !Object.keys(request).find(perm => request[perm] !== 'granted');;
}

function App () {
  const photoLibrary = React.useCallback(async () => {
    const picture = await launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      mediaTypes: MediaTypeOptions.Images
    });

    console.log(picture);
  }, []);

  const camera = React.useCallback(async () => {
    const picture = await launchCameraAsync({
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images
    });

    console.log(picture);
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!(await requestPerms())) {
        Alert.alert(
          'Requires permissions',
          'The app requires your permissions.'
        );
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignContent: 'center', justifyContent: 'center', padding: 20 }}>
      <View style={{ marginBottom: 10 }}>
        <Button title="Photo Library" onPress={photoLibrary} />
      </View>
      <Button title="Camera" onPress={camera} />
    </SafeAreaView>
  );
}

export default App;