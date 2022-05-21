import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ openForm }) => {

    return (
        <View style={styles.iconBtn}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={openForm}
            >
                <Image
                    style={styles.image}
                    source={require('../icons/plus.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 20,
        height: 20
    }
})

export default Header;