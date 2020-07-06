import React from "react"
import { Image, TouchableOpacity, Alert } from "react-native"
import {
	Card,
	CardItem,
	Thumbnail,
	Text,
	Left,
	Body,
	Icon,
	Right,
	View,
	Toast,
	Spinner } from "native-base"
import CentralServerProvider from "../../provider/CentralServerProvider"
import styles from "./PostItemStyles"

type myProps = {
	image: any
}
type myStates = {
	favorite: boolean
	imageInfo: any
	username: string
	deleted: boolean,
	loadingDel: boolean
}

export default class PostItem extends React.Component<myProps, myStates> {
	constructor(props) {
		super(props)
		this.state = {
			imageInfo: [],
			favorite: false,
			username: CentralServerProvider.getUsername(),
			deleted: false,
			loadingDel: false
		}
	}

	componentDidMount = async () => {
		await this.imageInfo()
	}

	imageInfo = async () => {
		const { id } = this.props.image
		const result = await CentralServerProvider.getImage(id)
		this.setState({
			imageInfo: result.data,
			favorite: result.data.favorite
		})
	}

	favoriteImage = async () => {
		const { id } = this.props.image
		this.setState({favorite: !this.state.favorite})
		const result = await CentralServerProvider.setFavoriteImage(id)
		if (result.data === "unfavorited") {
			this.setState({favorite: false})
		} else if (result.data === "favorited") {
			this.setState({favorite: true})
		}
	}

	askDeleteImage = () => {
		Alert.alert("Delete", "Are you sure you want to delete the picture?", [
			{
				text: "Cancel",
				onPress: () => {},
				style: "cancel"
			},
			{
				text: "Yes",
				onPress: () => {this.deleteImage()},
			}
		], {
			cancelable: true
		})
	}

	deleteImage = async () => {
		try {
			const { deletehash } = this.props.image
			this.setState({loadingDel: true})
			await CentralServerProvider.deleteImage({deletehash})
			this.setState({deleted: true, loadingDel: false})
			Toast.show({
				text: "Image deleted successfully !",
				duration: 3000
			})
		} catch (error) {
			this.setState({loadingDel: false})
			console.log(error);
		}
	}

	render() {
		const { favorite, username, deleted, loadingDel } = this.state
		const { title, link, views } = this.state.imageInfo
		const { width, height } = this.props.image
		let getDimension: number = (height / width) * 350
		if (deleted === true)
			return (<></>)
		return (
			<View>
				<Card>
					<CardItem style={styles.headerCardItem} header>
						<Left>
							<Thumbnail small source={{uri: `https://imgur.com/user/${username}/avatar`}} />
							<Body>
								<Text>{username}</Text>
							</Body>
						</Left>
						<Right>
						<TouchableOpacity onPress ={() => this.askDeleteImage()}>
							{!loadingDel ?
								<Icon name="trash" />
							:
								<Spinner size="small" />
							}
						</TouchableOpacity>
						</Right>
					</CardItem>
					<CardItem cardBody>
						<Image
							style={[styles.bodyImage, {height: getDimension}]}
							source={{uri: link}}
						/>
					</CardItem>
					<CardItem>
						<View style={styles.footerCardItem}>
							<View style={styles.footerTitleContainer}>
								{title && (
									<Text style={styles.titleText}>{title}</Text>
								)}
							</View>
							<View style={styles.footerFavoriteContainer}>
								<TouchableOpacity onPress={() => this.favoriteImage()}>
									{favorite ?
										<Icon name="heart" style={{color: "red"}} />
									:
										<Icon name="heart-empty" />
									}
								</TouchableOpacity>
							</View>
							<View style={styles.footerViewsContainer}>
								<Icon name="eye" style={styles.eyeIcon} />
								<Text>{views}</Text>
							</View>
						</View>
					</CardItem>
				</Card>
			</View>
	  );
	}
}