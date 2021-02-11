// import React, { useState } from 'react';
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
// import * as firebase from 'firebase';
// import {
//     StyleSheet,
//     View,
//     ActivityIndicator,
//     Button,
//     Clipboard,
//     Image,
//     Share,
//     LogBox,
//     StatusBar,
// } from 'react-native';
// import { Text, IconButton, TextInput, FAB } from 'react-native-paper';
// import Header from './layout/Header';
// import { v4 as uuidv4 } from 'uuid';

// const firebaseConfig = {
//     apiKey: 'AIzaSyBtgSqXRCiFMd0c_AtSX7-8xUIjd3C_71s',
//     authDomain: 'hw3-storage.firebaseapp.com',
//     databaseURL: 'https://hw3-storage.firebaseio.com',
//     storageBucket: 'hw3-storage.appspot.com',
//     messagingSenderId: '9793394157',
// };

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// // Turn off Firebase timer related warnings
// LogBox.ignoreAllLogs(true);

// export default class NotesAdd extends React.Component {
//     state = {
//         title: '',
//         description: '',
//         image: null,
//         uploading: false
//     };

//     async componentDidMount() {
//         await Permissions.askAsync(Permissions.CAMERA_ROLL);
//         await Permissions.askAsync(Permissions.CAMERA);
//     }


//     onSaveNote = () => {
//         this.props.navigation.state.params.addNote(
//             {
//                 id: uuidv4(),
//                 Name: this.state.title,
//                 Description: this.state.description,
//                 Img: this.state.image
//             }
//         )
//         this.props.navigation.goBack()
//     }

//     render() {
//         let { image } = this.state;

//         return (
//             <>
//                 <Header titleText='Add a New Note' />
//                 <IconButton
//                     icon="close"
//                     size={25}
//                     color='white'
//                     onPress={() => this.props.navigation.goBack()}
//                     style={styles.iconButton}
//                 />

//                 <View style={styles.container}>
//                     <TextInput
//                         label="Add Note Title here"
//                         value={this.state.title}
//                         mode='outlined'
//                         onChangeText={(text) => { this.setState({ title: text }) }}
//                         style={styles.title}
//                     />
//                     <TextInput
//                         label="Add Note Description"
//                         value={this.state.description}
//                         onChangeText={(text) => { this.setState({ description: text }) }}
//                         mode="flat"
//                         multiline={true}
//                         style={styles.text}
//                         scrollEnabled={true}
//                         returnKeyLabel='done'
//                         blurOnSubmit={true}
//                     />
//                     <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>

//                         <Button
//                             onPress={this._pickImage}
//                             title="Pick an image from camera roll"
//                         />
//                         <Text></Text>
//                         <Button onPress={this._takePhoto} title="Take a photo" />

//                         {this._maybeRenderImage()}
//                         {this._maybeRenderUploadingOverlay()}

//                         <StatusBar barStyle="default" />
//                     </View>
//                     <FAB
//                         style={styles.fab}
//                         small
//                         icon="check"
//                         disabled={this.state.title === '' || this.state.image === null ? true : false}
//                         onPress={this.onSaveNote}
//                     />
//                 </View>
//             </>
//         );
//     }

//     // Helper overlay functions
//     _maybeRenderUploadingOverlay = () => {
//         if (this.state.uploading) {
//             return (
//                 <View
//                     style={[
//                         StyleSheet.absoluteFill,
//                         {
//                             backgroundColor: 'rgba(0,0,0,0.4)',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                         },
//                     ]}>
//                     <ActivityIndicator color="#fff" animating size="large" />
//                 </View>
//             );
//         }
//     };

//     _maybeRenderImage = () => {
//         let { image } = this.state;
//         if (!image) {
//             return;
//         }

//         return (
//             <View
//                 style={{
//                     marginTop: 30,
//                     width: 250,
//                     borderRadius: 3,
//                     elevation: 2,
//                 }}>
//                 <View
//                     style={{
//                         borderTopRightRadius: 3,
//                         borderTopLeftRadius: 3,
//                         shadowColor: 'rgba(0,0,0,1)',
//                         shadowOpacity: 0.2,
//                         shadowOffset: { width: 4, height: 4 },
//                         shadowRadius: 5,
//                         overflow: 'hidden',
//                     }}>
//                     <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
//                 </View>
//             </View>
//         );
//     };

//     _takePhoto = async () => {
//         let pickerResult = await ImagePicker.launchCameraAsync({
//             allowsEditing: true,
//             aspect: [4, 3],
//         });

//         this._handleImagePicked(pickerResult);
//     };

//     _pickImage = async () => {
//         let pickerResult = await ImagePicker.launchImageLibraryAsync({
//             allowsEditing: true,
//             aspect: [4, 3],
//         });

//         this._handleImagePicked(pickerResult);
//     };

//     _handleImagePicked = async pickerResult => {
//         try {
//             this.setState({ uploading: true });

//             if (!pickerResult.cancelled) {
//                 const uploadUrl = await uploadImageAsync(pickerResult.uri);
//                 this.setState({ image: uploadUrl });
//             }
//         } catch (e) {
//             console.log(e);
//             alert('Upload failed, sorry :(');
//         } finally {
//             this.setState({ uploading: false });
//         }
//     };
//     // Helper overlay functions
// }


// async function uploadImageAsync(uri) {
//     // Why are we using XMLHttpRequest? See:
//     // https://github.com/expo/expo/issues/2402#issuecomment-443726662
//     const blob = await new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.onload = function () {
//             resolve(xhr.response);
//         };
//         xhr.onerror = function (e) {
//             console.log(e);
//             reject(new TypeError('Network request failed'));
//         };
//         xhr.responseType = 'blob';
//         xhr.open('GET', uri, true);
//         xhr.send(null);
//     });

//     const ref = firebase
//         .storage()
//         .ref()
//         .child(uuidv4());
//     const snapshot = await ref.put(blob);

//     // We're done with the blob, close and release it
//     blob.close();

//     return await snapshot.ref.getDownloadURL();
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingVertical: 20,
//         paddingHorizontal: 10
//     },
//     iconButton: {
//         elevation: 100,
//         backgroundColor: '#219653',
//         position: 'absolute',
//         right: 0,
//         top: 25,
//         margin: 10
//     },
//     titleContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 16
//     },
//     text: {
//         height: 75,
//         fontSize: 16
//     },
//     fab: {
//         position: 'absolute',
//         margin: 20,
//         right: 0,
//         bottom: 0,
//         backgroundColor: '#219653'
//     }

// })
