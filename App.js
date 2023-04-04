import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Modal, Button, Dimensions, ScrollView, NativeModules, TouchableOpacity, SafeAreaView } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { getStatusBarHeight } from "react-native-safearea-height";








const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default function App() {
  
  const modalVisible = useSharedValue('none')
  const modalY = useSharedValue(-deviceHeight)
  const position = useSharedValue(-1);

  const handleToggleMenu = () => {
    modalY.value = modalY.value === 0 ? -deviceHeight : 0  
    modalVisible.value = modalVisible.value === 'none' ? 'flex' : 'none'
  }
 
  const changeDisplay = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(modalY.value, {duration: 300}),
          
        },
      ],
      display: modalVisible.value ,
    };
  })

  return (
    <View style={{ flex: 1,zIndex: 21,  
      elevation: 21, backgroundColor: '#f9f9f9'}}>
          <StatusBar style="dark" />   

      {/* Esse é o header */}    
      <View style={{
        backgroundColor: '#fff', 
        flexDirection: 'row', 
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        zIndex: 21,
        elevation: 21,
        height: getStatusBarHeight() + 60,
        paddingBottom: 16,
        paddingHorizontal: 16,
      }}>
        <TouchableOpacity title="Open Menu" onPress={handleToggleMenu}><Text>Menu</Text></TouchableOpacity>
        <Text>SMARTMK</Text>
        <Text></Text>
      </View>

     
     
      {/* Esse é o menu */}
      <Animated.View style={[styles.modal, changeDisplay]}>
      <ScrollView 
      style={{padding: 24,  paddingBottom: 24, zIndex: 20, elevation: 20,}} 
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' , paddingBottom: 48}}
        showsVerticalScrollIndicator={false}
        snapToStart={true}
      >
          <View style={styles.modalContainer}>
          {Array.from(Array(9).keys()).map((item, index) => {
            return (
              <View key={`1${index}`} style={styles.modalItem}>
                <Text key={index}>Item {item}</Text>
              </View>
            )
          })}
          </View>
          <View style={{ margin: 50 }}>
            <Text style={{color: '#000', textAlign: 'center', marginBottom: 8}}>Modal</Text>
            <Button title="Close Menu" onPress={handleToggleMenu} />
          </View>
          <View style={styles.modalContainer}>
          {Array.from(Array(6).keys()).map((item, index) => {
            return (
              <View key={`2${index}`} style={styles.modalItem}>
                <Text key={index}>Item {item}</Text>
              </View>
            )
          })}
          </View>
        </ScrollView>
      </Animated.View> 


      {/* Esse é o conteúdo */}
      <View style={{ zIndex: 21,
        elevation: 21,  backgroundColor: '#222'}}>
        <Text>Children</Text>
      </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    zIndex: 1,
    elevation: 1,
    position: 'relative',
    display: 'none',
    // top: 3,
    
    // flex: 1,
    // left: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight,
    width: deviceWidth,
  },
  modalContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalItem: {
    backgroundColor: '#000',
    color: '#fff',
    height: 100,
    width: 100,
    borderRadius: 8,
  }
});
