import React from 'react';
import { StyleSheet } from 'react-native';
import { MonoText } from '../../../components/StyledText';
import i18n from '../../../i18n/i18n';

export default function Timer({ time }: any) {
    const padTo2Digits = (num: number) => {
        return num.toString().padStart(2, '0');
    }

    const convertMsToTime = (milliseconds: number) => {
        let seconds = Math.floor(milliseconds / 1000);
        //let minutes = Math.floor(seconds / 60);

        //milliseconds = milliseconds % 1000;
        //seconds = seconds % 60;
        //minutes = minutes % 60;

        return `${seconds}`;
    }

    return (
        <MonoText style={styles.text}>{convertMsToTime(time)}{i18n.t('second')}</MonoText>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        color: 'white',
        lineHeight: 28,
        width: 80,
    }
});
