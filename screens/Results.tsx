import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MonoText } from '../components/StyledText';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n/i18n';


export default function Results({ navigation, route }: RootTabScreenProps<'Results'>) {

  const repeatGame = () => {
    navigation.navigate('Root');
    navigation.navigate('Game');
  }

  const result = route?.params?.result;
  const [isBestScore, setIsBestScore] = useState(false);
  const [bestScore, setBestScore] = useState(0);


  useEffect(() => {
    Audio.Sound.createAsync(
      require('../assets/sounds/level-complete.wav'),
      { shouldPlay: true, isLooping: false }
    );

    const checkBestScore = async () => {
      const currentBestScore = await AsyncStorage.getItem('best_score') ?? 0;
      setBestScore(+currentBestScore);
      if (route?.params?.result < +currentBestScore) {
        setIsBestScore(true);
        AsyncStorage.setItem('best_score', result.toString());
      }
    }

    checkBestScore();

  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#330867', '#30cfd0']}
        style={styles.background}
      />
      <MonoText style={[styles.title]}>{i18n.t('congratulations')}!</MonoText>
      <MonoText style={[styles.title]}>{isBestScore ? i18n.t('newRecord') : i18n.t('yourTime')}: {route?.params?.result}{i18n.t('second')}</MonoText>
      {!isBestScore && <MonoText style={[styles.title]}>{i18n.t('bestResult')}: {bestScore}{i18n.t('second')}</MonoText>}
      <Pressable onPress={() => navigation.navigate('Root')}>
        <MonoText style={[styles.title, styles.margin]}>{i18n.t('menu')}</MonoText>
      </Pressable>
      <Pressable onPress={repeatGame}>
        <MonoText style={styles.title}>{i18n.t('repeatGame')}</MonoText>
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
  margin: {
    margin: 0,
    marginTop: '40%'
  },
});
