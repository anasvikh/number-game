import { useNavigationContainerRef } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, Pressable, StyleSheet } from 'react-native';
import { MonoText } from '../components/StyledText';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';


export default function Menu({ navigation }: RootTabScreenProps<'Root'>) {

  const startGame = () => {
    console.log('start');
    navigation.navigate('Game');
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#330867', '#30cfd0']}
        style={styles.background}
      />
      <Pressable onPress={startGame}>
        <MonoText style={styles.title}>start game</MonoText>
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
    color: '#ffffff'
  },
});
