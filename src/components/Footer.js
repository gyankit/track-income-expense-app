import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = (props) => {

    const textStyle = {
        color: !props.isDarkMode ? 'black' : 'white',
    };

    const boxShadow = {
        backgroundColor: props.isDarkMode ? 'black' : '#bbedea',
    }

    return (
        <View style={[styles.footer, boxShadow]}>
            <View style={styles.columns}>
                <Text></Text>
                <Text style={[styles.label, textStyle]}>
                    Income
                </Text>
                <Text style={[styles.label, textStyle]}>
                    Expense
                </Text>
            </View>
            <View style={styles.columns}>
                <Text style={[styles.label, textStyle]}>
                    Monthly
                </Text>
                <Text style={styles.income}>
                    {props.monthlyIncome}
                </Text>
                <Text style={styles.expenses}>
                    {props.monthlyExpense}
                </Text>
            </View>
            <View style={styles.columns}>
                <Text style={[styles.label, textStyle]}>
                    Yearly
                </Text>
                <Text style={styles.income}>
                    {props.yearlyIncome}
                </Text>
                <Text style={styles.expenses}>
                    {props.yearlyExpense}
                </Text>
            </View>
            <View style={styles.columns}>
                <Text style={[styles.label, textStyle]}>
                    Over All
                </Text>
                <Text style={styles.income}>
                    {props.totalIncome}
                </Text>
                <Text style={styles.expenses}>
                    {props.totalExpense}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 70,
        bottom: 0,
        position: 'absolute',
        marginTop: 5,
        flex: 1,
        flexDirection: "row",
    },
    columns: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: "500",
    },
    income: {
        fontSize: 18,
        fontWeight: "500",
        color: "#069c36",
    },
    expenses: {
        fontSize: 18,
        fontWeight: "500",
        color: "#f52020",
    }
});

export default Footer;

{/* <View>
    <Text style={[styles.label, textStyle]}>Total Income</Text>
    <Text style={styles.income}>Rs. {totalIncome}</Text>
</View>
<View>
    <Text style={[styles.label, textStyle]}>Total Expense</Text>
    <Text style={styles.expenses}>Rs. {totalExpense}</Text>
</View> */}

// const styles = StyleSheet.create({
//     footer: {
//         flex: 1,
//         flexDirection: "row",
//         width: '100%',
//         height: 50,
//         bottom: 0,
//         position: 'absolute',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         marginTop: 5
//     },
//     label: {
//         fontSize: 20,
//         fontWeight: "600",
//         textAlign: 'center'
//     },
//     income: {
//         fontSize: 18,
//         fontWeight: "500",
//         color: "#069c36",
//         textAlign: 'center'
//     },
//     expenses: {
//         fontSize: 18,
//         fontWeight: "500",
//         color: "#f52020",
//         textAlign: 'center'
//     }
// });