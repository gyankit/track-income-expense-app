import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import List from './List';

const Income = (props) => {
    const [collapse, setCollapse] = useState(false);

    const backgroundStyle = {
        backgroundColor: props.isDarkMode ? 'black' : '#bbedea'
    };
    const textStyle = {
        color: !props.isDarkMode ? 'black' : 'white'
    };

    return (
        <View style={[styles.card, backgroundStyle]}>
            <View style={[styles.cardHeader, backgroundStyle]}>
                <View>
                    <Text style={[styles.cardTitle, textStyle]}>Income - <Text style={styles.cardTitleColor}>{
                        props.incomes?.reduce((sum, elm) => {
                            return sum + Number(elm.amount)
                        }, 0)
                    }</Text></Text>
                </View>
                {
                    props.incomes?.length !== 0
                    &&
                    <View style={styles.cardBtn}>
                        <View style={styles.icon}>
                            {
                                props.date?.getFullYear() === props.currentDate?.getFullYear()
                                &&
                                props.date?.getMonth() === props.currentDate?.getMonth()
                                &&
                                props.date?.getDate() === props.currentDate?.getDate()
                                &&
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => props.deleteData(props.incomes[0].id, props.incomes[0].amount, 'Income')}
                                >
                                    <Image
                                        style={styles.image}
                                        source={require('../icons/delete.png')}
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.icon}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => setCollapse(!collapse)}
                            >
                                {
                                    collapse
                                        ?
                                        <Image
                                            style={styles.image}
                                            source={require('../icons/down-arrow.png')}
                                        />
                                        :
                                        <Image
                                            style={styles.image}
                                            source={require('../icons/right-arrow.png')}
                                        />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
            <View style={styles.cardBody}>
                {
                    collapse &&
                    props.incomes?.map((elm, key) => {
                        return <List
                            key={key}
                            data={elm}
                            type={true} />
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 5,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        borderRadius: 5
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: 40,
        borderRadius: 5,
        backgroundColor: '#000000'
    },
    cardBody: {
        marginBottom: 5
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: '#ffffff'
    },
    cardTitleColor: {
        color: '#069c36'
    },
    cardBtn: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 20,
        height: 20
    }
})

export default Income;