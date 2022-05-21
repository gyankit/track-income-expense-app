import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, TextInput, Button, StyleSheet, useColorScheme } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createTable } from '../helper/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = ({ navigation }) => {

    const [darkMode, setDarkMode] = useState(useColorScheme() === 'dark');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notice, setNotice] = useState('');

    const backgroundStyle = {
        flex: 1,
        backgroundColor: darkMode ? Colors.darker : Colors.lighter
    };
    const textStyle = {
        color: darkMode ? Colors.lighter : Colors.darker,
    };

    const getPhoneNumber = async () => {
        try {
            setNotice('');
            if (phoneNumber.length !== 10) {
                throw new Error('Enter 10 Digit Phone Number');
            }
            phoneNumber.split('').forEach(val => {
                if ([',', '.', '-', ' '].includes(val)) {
                    throw new Error('Invalid Phone Number');
                }
            });
            await createTable(phoneNumber);
            await AsyncStorage.setItem('tableName', phoneNumber);
            navigation.dispatch(
                StackActions.replace('Home')
            );
        } catch (error) {
            setNotice(error.message)
        }
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View style={styles.mainContainer}>
                    <Text style={[styles.title, textStyle]}>Welcome</Text>
                    <Text style={[styles.subTitle, textStyle]}>Enter your Mobile Number</Text>
                    <Text style={styles.notice}>{notice}</Text>
                    <View style={styles.phoneNumberView}>
                        <TextInput
                            style={styles.inputTextStyle}
                            value={phoneNumber}
                            onChangeText={(value) => setPhoneNumber(value)}
                            autoFocus={true}
                            maxLength={10}
                            keyboardType='numeric'
                            textAlign='center'
                            textContentType='telephoneNumber'
                        />
                    </View>
                    <View style={styles.btnView}>
                        <Button
                            title="Submit"
                            onPress={() => getPhoneNumber()
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        paddingBottom: 10
    },
    subTitle: {
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 10
    },
    notice: {
        textAlign: 'center',
        color: '#f52020',
        marginBottom: 5
    },
    phoneNumberView: {
        height: 50,
        width: 250,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    inputTextStyle: {
        color: '#000000',
        fontSize: 20
    },
    btnView: {
        marginHorizontal: 50,
        marginVertical: 30
    }
});

export default Auth;