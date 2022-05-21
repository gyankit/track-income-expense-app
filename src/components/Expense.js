import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import List from './List';

const Expense = (props) => {
	const [collapse, setCollapse] = useState(true);

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
					<Text style={[styles.cardTitle, textStyle]}>Expense - <Text style={styles.cardTitleColor}>{
						props.expenses?.reduce((sum, elm) => {
							return sum + Number(elm.amount)
						}, 0)
					}</Text></Text>
				</View>
				{
					props.expenses?.length !== 0 &&
					<View style={styles.cardBtn}>
						<View style={styles.icon}>
							{
								props.currentDate?.getFullYear() === props.date?.getFullYear()
								&&
								props.currentDate?.getMonth() === props.date?.getMonth()
								&&
								props.currentDate?.getDate() === props.date?.getDate()
								&&
								<TouchableOpacity
									activeOpacity={0.5}
									onPress={() => props.deleteData(props.expenses[0].id, props.expenses[0].amount, 'Expense')}
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
					props.expenses?.map((elm, key) => {
						return <List
							key={key}
							data={elm}
							type={false} />
					})
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		marginBottom: 75,
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
		color: '#f52020'
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


export default Expense;