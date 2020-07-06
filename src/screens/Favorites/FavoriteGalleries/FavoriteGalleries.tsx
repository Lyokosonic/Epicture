import React from "react";
import { Picker, FlatList, RefreshControl, View } from "react-native";
import { Spinner } from "native-base"
import styles from "./FavoriteGalleriesStyles"

import FavoriteItem from "../../../components/FavoriteItem/FavoriteItem"
import CentralServerProvider from "../../../provider/CentralServerProvider"

type myProps = {
	navigation: any
}
type myStates = {
	showPicker: boolean
	filterMode: string
	page: string
	favoriteGalleries: any
	isFetching: boolean
	loading: boolean
}

export default class FavoriteGalleries extends React.Component<myProps, myStates> {
	constructor(props) {
		super(props)
		this.state = {
			showPicker: false,
			filterMode: "newest",
			page: "0",
			favoriteGalleries: [],
			isFetching: false,
			loading: true
		}
	}

	componentDidMount = async () => {
		await this.getFavoriteGalleries()
  }

	onFilterChange = async (value: string) => {
		this.setState({filterMode: value, showPicker: false}, async () => {
			await this.getFavoriteGalleries()
		})
	}

	onPickerChangeDisp = () => {
		this.setState({showPicker: !this.state.showPicker})
	}

	onRefresh = async () => {
    this.setState({isFetching: true}, async () => {
			await this.getFavoriteGalleries()
		})
    this.setState({isFetching: false})
  }

	getFavoriteGalleries = async () => {
		const { page, filterMode } = this.state
		const result = await CentralServerProvider.getFavoriteGalleries({page, filterMode})
		this.setState({favoriteGalleries: result.data, loading: false})
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
						data={this.state.favoriteGalleries}
						renderItem={({ item }) => <FavoriteItem image={item} isGallery={true} />}
						keyExtractor={item => item.id}
						refreshControl={<RefreshControl refreshing={this.state.isFetching} onRefresh={this.onRefresh} />}
					/>
				}
			</>
		)
	}
}