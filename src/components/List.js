import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const List = (props) => {

    const textColor = {
        color: props.type ? '#069c36' : '#f52020'
    }

    const boxShadow = {
        borderRadius: 3,
        elevation: 2,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: props.type ? '#069c36' : '#f52020',
    }

    return (
        <View style={[styles.mainContainer, boxShadow]}>
            <View>
                <Text style={textColor}>{new Date(props.data.id).toLocaleDateString('en-GB')}</Text>
                <Text style={textColor}>{new Date(props.data.id).toLocaleTimeString()}</Text>
            </View>
            <View>
                <Text style={textColor}>{props.data.category}</Text>
                <Text style={textColor}>{props.data.remark}</Text>
            </View>
            <View>
                <Text style={textColor}>Rs. {props.data.amount}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 1,
        marginBottom: 3,
        paddingVertical: 5,
        paddingHorizontal: 8,
        height: 55
    }
})

export default List;