import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, Text, View, TextInput, Button, TouchableOpacity, Image, ToastAndroid, useColorScheme, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { addEntry } from '../helper/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = ({ navigation }) => {

    const currentDate = new Date();
    const isDarkMode = useColorScheme() === 'dark';
    const [date, setDate] = useState(currentDate);
    const [open, setOpen] = useState(false);
    const [notice, setNotice] = useState('');
    const [type, setType] = useState('Expense');
    const [category, setCategory] = useState('Personal');
    const [amount, setAmount] = useState('');
    const [remark, setRemark] = useState('');

    const backgroundStyle = {
        flex: 1,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    }
    const borderColor = {
        borderColor: isDarkMode ? 'white' : 'black'
    }
    const textColor = {
        color: isDarkMode ? 'white' : 'black'
    }

    const boxShadow = {
        borderRadius: 5,
        elevation: 2,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: isDarkMode ? 'black' : '#bbedea',
    }

    const formSubmit = async () => {
        setNotice('');
        try {
            const tableName = await AsyncStorage.getItem('tableName');
            if (tableName === undefined) {
                throw new Error('Error Occur');
            }
            if (amount === '0' || amount === '')
                throw new Error('Amount is Zero');
            const data = {
                "id": date.getTime(),
                "amount": amount,
                "type": type,
                "category": category,
                "remark": remark
            }
            const result = await addEntry(tableName, data);
            if (result !== 1) {
                throw new Error('Error Occur');
            } else {
                navigation.navigate('Home', { id: date.getTime() })
            }
        } catch (error) {
            setNotice(error.message);
        }
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View style={styles.mainCotainer}>
                    <View>
                        <TouchableOpacity
                            style={[styles.dateInputView, boxShadow]}
                            activeOpacity={0.5}
                            onPress={() => setOpen(true)}
                        >
                            <Text style={[styles.dateText, textColor]}>{date.toLocaleString()}</Text>
                            <Image
                                style={styles.image}
                                source={require('../icons/calendar.png')}
                            />
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            mode="datetime"
                            maximumDate={currentDate}
                            minimumDate={new Date("2022-05-01")}
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={[styles.label, textColor]}>Type</Text>
                        <View style={[styles.selectField, borderColor]}>
                            <Picker
                                selectedValue={type}
                                onValueChange={(e, i) => setType(e)}
                            >
                                <Picker.Item label="Expense" value="Expense" />
                                <Picker.Item label="Income" value="Income" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={[styles.label, textColor]}>Category</Text>
                        <View style={[styles.selectField, borderColor]}>
                            <Picker
                                selectedValue={category}
                                onValueChange={(e, i) => setCategory(e)}
                            >
                                <Picker.Item label="Personal" value="Personal" />
                                <Picker.Item label="Rent" value="Rent" />
                                <Picker.Item label="Food" value="Food" />
                                <Picker.Item label="Drink" value="Drink" />
                                <Picker.Item label="Shoping" value="Shoping" />
                                <Picker.Item label="Travel" value="Travel" />
                                <Picker.Item label="Bill Payment" value="Bill Payment" />
                                <Picker.Item
                                    label="Investment" value="Investment" />
                                <Picker.Item
                                    label="Salary" value="Salary" />
                            </Picker>
                        </View>
                        <View style={styles.inputView}>
                            <Text style={[styles.label, textColor]}>Amount</Text>
                            <TextInput
                                style={[styles.inputField, borderColor]}
                                value={amount}
                                keyboardType='numeric'
                                onChangeText={(value) => setAmount(value)}
                                placeholder='Amount'
                            />
                        </View >
                        <View style={styles.inputView}>
                            <Text style={[styles.label, textColor]}>Remark / Comment</Text>
                            <TextInput
                                style={[styles.inputField, borderColor]}
                                value={remark}
                                onChangeText={(value) => setRemark(value)}
                                placeholder='Remark'
                            />
                        </View>
                        <Text style={styles.notice}>{notice}</Text>
                    </View>
                    <View style={styles.submitBtn}>
                        <Button
                            onPress={() => formSubmit()}
                            title='Save'
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    mainCotainer: {
        padding: 20
    },
    notice: {
        marginTop: 8,
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },
    inputView: {
        marginVertical: 5
    },
    dateText: {
        fontSize: 16,
        fontWeight: "600",
    },
    dateInputView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        padding: 5
    },
    image: {
        width: 20,
        height: 20
    },
    label: {
        marginBottom: 5
    },
    inputField: {
        borderWidth: 1,
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 5
    },
    selectField: {
        borderWidth: 1,
        height: 60,
        borderRadius: 5
    },
    submitBtn: {
        marginTop: 12,
        marginHorizontal: 40
    }
})

export default Form;