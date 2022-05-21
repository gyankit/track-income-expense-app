import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, ToastAndroid, useColorScheme } from 'react-native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NavBar from '../components/NavBar';
import Income from '../components/Income';
import Expense from '../components/Expense';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getTable, getByDate, getAmount, getOne, deleteEntry } from '../helper/Database';

const Home = ({ navigation, route }) => {

    const isDarkMode = useColorScheme() === 'dark';
    const currentDate = new Date();
    const id = route.params?.id || false;
    const [tableName, setTableName] = useState(undefined);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [yearlyIncome, setYearlyIncome] = useState(0);
    const [yearlyExpense, setYearlyExpense] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    const [date, setDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));

    const backgroundStyle = {
        flex: 1,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    }

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const getData = async (tbl, cd) => {
        setIncomes(await getByDate(tbl, 'Income', cd.getTime()));
        setExpenses(await getByDate(tbl, 'Expense', cd.getTime()));
    }

    const getMonthlyData = async (tbl, cd) => {
        setMonthlyIncome(await getAmount(tbl, 'Income', cd.getTime()));
        setMonthlyExpense(await getAmount(tbl, 'Expense', cd.getTime()));
    }

    const getYearlyData = async (tbl, cd) => {
        setYearlyIncome(await getAmount(tbl, 'Income', cd.getTime(), 12));
        setYearlyExpense(await getAmount(tbl, 'Expense', cd.getTime(), 12));
    }

    const getTotalData = async (tbl) => {
        setTotalIncome(await getAmount(tbl, 'Income'));
        setTotalExpense(await getAmount(tbl, 'Expense'));
    }

    const changeData = async (cd) => {
        await getData(tableName, cd);
        await getMonthlyData(tableName, cd);
        await getYearlyData(tableName, new Date(cd.getFullYear(), 0));
        await getTotalData(tableName, cd);
    }

    const deleteData = async (id, amount, type) => {
        await deleteEntry(tableName, id);
        if (type === 'Income') {
            incomes.shift();
            setIncomes(incomes);
            setMonthlyIncome(monthlyIncome - Number(amount));
            setYearlyIncome(yearlyIncome - Number(amount));
            setTotalIncome(totalIncome - Number(amount));
        } else {
            expenses.shift();
            setExpenses(expenses);
            setMonthlyExpense(monthlyExpense - Number(amount));
            setYearlyExpense(yearlyExpense - Number(amount));
            setTotalExpense(totalExpense - Number(amount));
        }
        showToast(`${type} Deleted`);
    }

    const addData = async (id) => {
        const data = await getOne(tableName, id);
        const newDate = new Date(id);
        switch (data.type) {
            case 'Income':
                if (
                    newDate.getDate() === date.getDate() && newDate.getMonth() === date.getMonth() && newDate.getFullYear() === date.getFullYear()
                ) {
                    incomes.unshift(data);
                    setIncomes(incomes);
                    setMonthlyIncome(monthlyIncome + Number(data.amount));
                    setYearlyIncome(yearlyIncome + Number(data.amount));
                    setTotalIncome(totalIncome + Number(data.amount));
                } else if (
                    newDate.getMonth() === date.getMonth() && newDate.getFullYear() === date.getFullYear()
                ) {
                    setMonthlyIncome(monthlyIncome + Number(data.amount));
                    setYearlyIncome(yearlyIncome + Number(data.amount));
                    setTotalIncome(totalIncome + Number(data.amount));
                } else if (
                    newDate.getFullYear() === date.getFullYear()
                ) {
                    setYearlyIncome(yearlyIncome + Number(data.amount));
                    setTotalIncome(totalIncome + Number(data.amount));
                } else {
                    setIncomes([]);
                    setMonthlyIncome(0);
                    setYearlyIncome(0);
                    setTotalIncome(0);
                }
                break;
            case 'Expense':
                if (
                    newDate.getDate() === date.getDate() && newDate.getMonth() === date.getMonth() && newDate.getFullYear() === date.getFullYear()
                ) {
                    expenses.unshift(data);
                    setExpenses(expenses);
                    setMonthlyExpense(monthlyExpense + Number(data.amount));
                    setYearlyExpense(yearlyExpense + Number(data.amount));
                    setTotalExpense(totalExpense + Number(data.amount));
                } else if (
                    newDate.getMonth() === date.getMonth() && newDate.getFullYear() === date.getFullYear()
                ) {
                    setMonthlyExpense(monthlyExpense + Number(data.amount));
                    setYearlyExpense(yearlyExpense + Number(data.amount));
                    setTotalExpense(totalExpense + Number(data.amount));
                } else if (
                    newDate.getFullYear() === date.getFullYear()
                ) {
                    setYearlyExpense(yearlyExpense + Number(data.amount));
                    setTotalExpense(totalExpense + Number(data.amount));
                } else {
                    setExpenses([]);
                    setMonthlyExpense(0);
                    setYearlyExpense(0);
                    setTotalExpense(0);
                }
                break;
            default:
                setIncomes([]);
                setExpenses([]);
                setMonthlyIncome(0);
                setMonthlyExpense(0);
                setYearlyIncome(0);
                setYearlyExpense(0);
                setTotalIncome(0);
                setTotalExpense(0);

        }
        showToast(`New ${data.type} Added`);
    }

    const getTableName = async () => {
        let tblName = await AsyncStorage.getItem('tableName');
        if (tblName === undefined || tblName === null) {
            const data = await getTable();
            tblName = data?.item(0)?.tbl_name;
        }
        return tblName;
    }

    const loadData = async () => {
        if (tableName === undefined || tableName === null) {
            const tblName = await getTableName();
            if (tblName === undefined || tblName === null) {
                navigation.dispatch(
                    StackActions.replace('Auth')
                );
            } else {
                setTableName(tblName);
                await getData(tblName, date);
                await getMonthlyData(tblName, date);
                await getYearlyData(tblName, new Date(date.getFullYear(), 0));
                await getTotalData(tblName, date);
            }
        }
    }

    useEffect(() => {
        if (id) {
            addData(id);
        } else {
            loadData();
        }
    }, [id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Header
                openForm={() => { navigation.navigate('Form') }}
            />,
        })
    })

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <NavBar
                    isDarkMode={isDarkMode}
                    currentDate={currentDate}
                    date={date}
                    setDate={(newDate) => setDate(newDate)}
                    changeData={changeData}
                />
                <View>
                    <Income
                        isDarkMode={isDarkMode}
                        currentDate={currentDate}
                        date={date}
                        incomes={incomes}
                        deleteData={deleteData}
                    />
                    <Expense
                        isDarkMode={isDarkMode}
                        currentDate={currentDate}
                        date={date}
                        expenses={expenses}
                        deleteData={deleteData}
                    />
                </View>
            </ScrollView>
            <Footer
                isDarkMode={isDarkMode}
                monthlyIncome={monthlyIncome}
                monthlyExpense={monthlyExpense}
                yearlyIncome={yearlyIncome}
                yearlyExpense={yearlyExpense}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
            />
        </SafeAreaView>
    )
}

export default Home;