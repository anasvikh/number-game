import { useNavigationContainerRef } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, Pressable, StyleSheet } from 'react-native';
import { MonoText } from '../components/StyledText';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';


export default function Results({ navigation, route }: RootTabScreenProps<'Results'>) {

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#330867', '#30cfd0']}
        style={styles.background}
      />
      <MonoText style={[styles.title]}>congratulations!</MonoText>
      <MonoText style={[styles.title, styles.text]}>your time: {route?.params?.result}s</MonoText>
      <Pressable onPress={() => navigation.navigate('Root')}>
        <MonoText style={styles.title}>main menu</MonoText>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Game')}>
        <MonoText style={styles.title}>repeat game</MonoText>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    margin: '3%'
  },
  text: {
    margin: 0,
    marginBottom: '40%'
  },
});
