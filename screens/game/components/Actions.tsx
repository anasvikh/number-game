import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MonoText } from '../../../components/StyledText';
import BulbSvg from '../../../svg/BulbSvg';

export default function Actions({ currentNumber, showTips }: any) {

  return (
    <View style={styles.actions}>
      <MonoText style={styles.text}>{'0:47'}</MonoText>
      <MonoText style={styles.text}>{currentNumber.toString()}</MonoText>
      <Pressable
        onPress={() => showTips()}
        hitSlop={35}>
        <BulbSvg style={{ width: 26, height: 26, fill: 'red' }} />
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
