import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MonoText } from '../../../components/StyledText';
import BulbSvg from '../../../svg/BulbSvg';
import Timer from './Timer';

export default function Actions({ currentNumber, startDate, showTips }: any) {

  const [time, setTime] = useState((new Date().getTime() - startDate.getTime()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(seconds => seconds + 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.actions}>
      <Timer time={time}></Timer>
      <MonoText style={styles.text}>{currentNumber?.toString()}</MonoText>
      <Pressable
        style={{ width: 80, alignItems: 'flex-end', display: 'flex' }}
        onPress={() => showTips()}
        hitSlop={35}>
        <BulbSvg style={{ width: 26, height: 26, fill: 'red',  }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    zIndex: 9999,
    padding: 10,
    marginTop: 30,
    borderBottomWidth: 1,
    borderColor: '#ffffff40',
  },
  text: {
    fontSize: 28,
    color: 'white',
    lineHeight: 28
  },

});
