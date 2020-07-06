import React from 'react';
import { FlatList, BackHandler, Alert, RefreshControl, View } from "react-native"
import { Spinner } from "native-base"
import SearchBar from "react-native-dynamic-search-bar"
import styles from "./GalleryStyles"

import CentralServerProvider from "../../provider/CentralServerProvider"
import HeaderComponent from "../../components/Header/HeaderComponent"
import GalleryItem from "../../components/GalleryItem/GalleryItem"

type myProps = {
	navigation: any
}

type myStates = {
	gallery: any
	params: any
	showSearchBar: boolean
	search: string
	typingTimeOut: any
	isFetching: boolean
	loading: boolean
}

export default class Gallery extends React.Component<myProps, myStates> {
	_didFocusSubscription
	_willBlurSubscription

	constructor(props) {
		super(props)
		this.state = {
			gallery: [],
			params: {
				section: "hot",
				sort: "viral",
				window: "day",
				page: "0",
				showViral: true,
				showMature: false,
				albumPreviews: false,
				search: ""
			},
			showSearchBar: false,
			search: "",
			typingTimeOut: 0,
			isFetching: false,
			loading: false
		}
		this._didFocusSubscription = props.navigation.addListener("didFocus", payload =>
			BackHandler.addEventListener("hardwareBackPress", this.onBack)
		);
	}

	componentDidMount = async () => {
		this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
			BackHandler.removeEventListener('hardwareBackPress', this.onBack)
		);
		await this.getGallery()
	}

	componentWillUnmount = () => {
		this._didFocusSubscription && this._didFocusSubscription.remove();
		this._willBlurSubscription && this._willBlurSubscription.remove();
	}

	displaySearchBar = () => {
		this.setState({showSearchBar: !this.state.showSearchBar})
	}

	onBack = () => {
		if (this.state.showSearchBar) {
			this.setState({showSearchBar: false})
		} else {
			Alert.alert("Quit", "Are you sure you want to quit?", [
				{
					text: "Cancel",
					onPress: () => {},
					style: "cancel"
				},
				{
					text: "Yes",
					onPress: () => {BackHandler.exitApp()},
				}
			], {
				cancelable: true
			})
		}
		return true
	}

	getGallery = async () => {
		const { params } = this.state
		this.setState({loading: true});
		const result = await CentralServerProvider.getGallery(params)
		this.setState({
			gallery: result.data,
			loading: false
		})
	}

	getGallerySearch = async (search) => {
		const { params } = this.state
		this.setState({loading: true});
		const result = await CentralServerProvider.getGallerySearch(params, search)
		this.setState({
			gallery: result.data,
			loading: false
		})
	}

	onRefresh = async () => {
		this.setState({isFetching: true})
		await this.getGallery()
		this.setState({isFetching: false})
	}

	filterList = (search) => {
		const { typingTimeOut } = this.state
		if (typingTimeOut)
			clearTimeout(typingTimeOut)
		if (search === "") {
			this.setState({search: ""}, async () => {
					await this.getGallery();
			})
			return
		}
		this.setState({typingTimeOut: setTimeout(async () => {
			await this.getGallerySearch(search)
		}, 1700)})
	}

	render() {
		const { gallery, showSearchBar, isFetching } = this.state;
		return (
			<>
				<HeaderComponent
					title="Gallery"
					rightAction={this.props.navigation.openDrawer}
					rightActionIcon="menu"
					leftAction={this.displaySearchBar}
					leftActionIcon="search"
				/>
					{showSearchBar && (
						<SearchBar
							onPressToFocus
							autoFocus={false}
							placeholder="Search here"
							onPressCancel={() => {
								this.filterList("");
							}}
							onChangeText={search => {
								this.filterList(search);
							}}
							onPress={() => console.log("onPress")}
						/>
					)}
					{this.state.loading ?
						<View style={styles.spinner}>
							<Spinner />
						</View>
					:
						<FlatList
							data={gallery}
							renderItem={({ item }) => <GalleryItem image={item} />}
							keyExtractor={item => item.id}
							refreshControl={<RefreshControl refreshing={isFetching} onRefresh={this.onRefresh} />}
						/>
					}
			</>
		);
	}
}
