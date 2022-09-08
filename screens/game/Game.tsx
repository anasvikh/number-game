import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Vibration } from 'react-native';
import { View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import Actions from './components/Actions';
import { NumberItem } from './components/NumberItem';

export default function Game({ navigation }: RootTabScreenProps<'Game'>) {

  const getInitialArray = (length: number) => {
    var existing: { top: number, left: number }[] = [];
    const x = [...Array(length + 1).keys()]
      .slice(1)
      .map((value, i) => {
        let isGoodPair = false;
        let top: number;
        let left: number;
        do {
          top = getRndInteger(100, windowHeight - 30);
          left = getRndInteger(10, windowWidth - 50);
          let badElement = existing.find(el => Math.abs(el.top - top) < 36 && Math.abs(el.left - left) < 36);
          if (!badElement) {
            existing.push({ top, left })
            isGoodPair = true;
          }
        } while (!isGoodPair);

        return {
          value,
          top: top,
          left: left,
          fontSize: getRndInteger(20, 34),
          opacity: getRnd(0.7, 1),
          zIndex: length - value
        }
      });
    return x;
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const size = 5;
  const [startDate, setStartDate] = useState(new Date());
  const [numbers, setNumbers] = useState(getInitialArray(size));
  const [needToShowHint, setHint] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [navigation]);

  const onPressNumber = (value: number) => {
    if (numbers[0]?.value !== value) {
      Vibration.vibrate(80);
      return;
    };
    setHint(false);
    if (numbers.length > 1) {
      setNumbers([...numbers.slice(1)]);
    } else {
      const endDate = new Date();
      const result = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
      navigation.navigate({ name: 'Results', params: { result } });
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E1069', '#30cfd0']}
        // colors={['#2A1069', '#23949F']}
        style={styles.background}
      />
      <Actions
        currentNumber={numbers?.[0]?.value}
        startDate={startDate}
        showTips={() => setHint(true)}></Actions>
      {numbers.map((item, i) =>
        <NumberItem
          item={item}
          key={item.value}
          isShowHint={needToShowHint && numbers[0]?.value === item.value}
          onPress={onPressNumber} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

function getRnd(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}