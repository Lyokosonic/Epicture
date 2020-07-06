import React from "react";
import { Picker, FlatList, RefreshControl, View } from "react-native";
import { Spinner } from "native-base"
import styles from "./FavoriteImagesStyles"

import FavoriteItem from "../../../components/FavoriteItem/FavoriteItem"
import CentralServerProvider from "../../../provider/CentralServerProvider"

type myProps = {
	navigation: any
}
type myStates = {
	showPicker: boolean
	filterMode: string
	page: string
	favoriteImages: any
	isFetching: boolean
	loading: boolean
}

export default class FavoriteImages extends React.Component<myProps, myStates> {
	constructor(props) {
		super(props)
		this.state = {
			showPicker: false,
			filterMode: "newest",
			page: "0",
			favoriteImages: [],
			isFetching: false,
			loading: true
		}
	}

	componentDidMount = async () => {
		await this.getFavoriteImages()
  }

	onFilterChange = async (value: string) => {
		this.setState({filterMode: value, showPicker: false}, async () => {
			await this.getFavoriteImages()
		})
	}

	onPickerChangeDisp = () => {
		this.setState({showPicker: !this.state.showPicker})
	}

	onRefresh = async () => {
    this.setState({isFetching: true}, async () => {
			await this.getFavoriteImages()
		})
    this.setState({isFetching: false})
  }

	getFavoriteImages = async () => {
		const { page, filterMode } = this.state
		const result = await CentralServerProvider.getFavoriteImages({page, filterMode})
		this.setState({favoriteImages: result.data, loading: false})
	}

	render() {
		return (
			<>
				{this.state.showPicker && (
					<Picker
						selectedValue={this.state.filterMode}
						onValueChange={itemValue => this.onFilterChange(itemValue)}
						mode="dropdown"
					>
						<Picker.Item label="Newest" value="newest" />
						<Picker.Item label="Oldest" value="oldest" />
					</Picker>
				)}
				{this.state.loading ?
					<View style={styles.spinner}>
						<Spinner />
					</View>
				:
					<FlatList
						data={this.state.favoriteImages}
						renderItem={({ item }) => <FavoriteItem image={item} isGallery={false} />}
						keyExtractor={item => item.id}
						refreshControl={<RefreshControl refreshing={this.state.isFetching} onRefresh={this.onRefresh} />}
					/>
				}
			</>
		)
	}
}