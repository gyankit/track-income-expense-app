import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

const NavBar = (props) => {
    const [open, setOpen] = useState(false);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const textColor = {
        color: props.isDarkMode ? 'white' : 'black'
    }

    const boxShadow = {
        borderRadius: 5,
        elevation: 2,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: props.isDarkMode ? 'black' : '#bbedea',
    }

    return (
        <View>
            <TouchableOpacity
                style={[styles.btn, boxShadow]}
                activeOpacity={0.5}
                onPress={() => setOpen(true)}
            >
                <Text style={[styles.text, textColor]}>
                    {`${months[props.date.getMonth()]} ${props.date.getDate()}, ${props.date.getFullYear()}`}
                </Text>
                <Image
                    style={styles.image}
                    source={require('../icons/calendar.png')}
                />
            </TouchableOpacity>
            <DatePicker
                modal
                mode="date"
                open={open}
                date={props.date}
                maximumDate={props.currentDate}
                minimumDate={new Date("2022-05-01")}
                onConfirm={(newDate) => {
                    setOpen(false)
                    props.setDate(newDate)
                    props.changeData(newDate)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 15,
        margin: 5,
        height: 35,
    },
    image: {
        width: 20,
        height: 20
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
    }
});


export default NavBar;