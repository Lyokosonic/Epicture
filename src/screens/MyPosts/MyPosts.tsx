import React from 'react';
import { FlatList, BackHandler, Alert, RefreshControl, View } from "react-native"
import { Spinner } from "native-base"
import SearchBar from "react-native-dynamic-search-bar"
import styles from "./MyPostsStyles"

import CentralServerProvider from "../../provider/CentralServerProvider"
import HeaderComponent from "../../components/Header/HeaderComponent"
import PostItem from "../../components/PostItem/PostItem"

type myProps = {
	navigation: any
}

type myStates = {
	images: any
	imagesBackup: any
	showSearchBar: boolean
	search: string
	isFetching: boolean
	loading: boolean
}

export default class MyPosts extends React.Component<myProps, myStates> {
	_didFocusSubscription
	_willBlurSubscription

	constructor(props) {
		super(props)
		this.state = {
			images: [],
			imagesBackup: [],
			showSearchBar: false,
			search: "",
			isFetching: false,
			loading: true
		}
		this._didFocusSubscription = props.navigation.addListener("didFocus", payload =>
			BackHandler.addEventListener("hardwareBackPress", this.onBack)
		);
	}

	componentDidMount = async () => {
		await this.getMyPosts()
		this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
			BackHandler.removeEventListener('hardwareBackPress', this.onBack)
		);
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
			this.props.navigation.navigate("Gallery")
		}
		return true
	}

	getMyPosts = async () => {
		const result = await CentralServerProvider.getAccountImages()
		this.setState({
			images: result.data,
			imagesBackup: result.data,
			loading: false
		})
		this.filterList(this.state.search)
	}

	onRefresh = async () => {
		this.setState({isFetching: true})
		await this.getMyPosts()
		this.setState({isFetching: false})
	}

	filterList = (text) => {
    const newData = this.state.imagesBackup.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      images: newData,
      search: text
    });
	}

	render() {
		const { images, showSearchBar, isFetching } = this.state;
		return (
			<>
				<HeaderComponent
					title="My Posts"
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
							data={images}
							renderItem={({ item }) => <PostItem image={item} />}
							keyExtractor={item => item.id}
							refreshControl={<RefreshControl refreshing={isFetching} onRefresh={this.onRefresh} />}
						/>
					}
			</>
		);
	}
}
