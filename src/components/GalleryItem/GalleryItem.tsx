import React from "react"
import { Image, TouchableOpacity } from "react-native"
import { Card, CardItem, Thumbnail, Text, Left, Body, Icon, View } from "native-base"
import CentralServerProvider from "../../provider/CentralServerProvider"
import ImageSlider from "react-native-image-slider"
import styles from "./GalleryItemStyles"

type myProps = {
	image: any
}
type myStates = {
	favorite: boolean
	imageLinks: string[]
}

export default class GalleryItem extends React.Component<myProps, myStates> {
	_isMounted: boolean = false
	constructor(props) {
		super(props)
		this.state = {
			favorite: false,
			imageLinks: []
		}
	}

	componentDidMount = () => {
		this._isMounted = true
		this.setImageLinks()
	}

	componentWillUnmount = () => {
		this._isMounted = false
	}

	favoriteImage = async () => {
		const { id } = this.props.image
		this.setState({favorite: !this.state.favorite})
		try {
			const result = await CentralServerProvider.setFavoriteImage(id)
			if (result.data === "unfavorited") {
				this.setState({favorite: false})
			} else if (result.data === "favorited") {
				this.setState({favorite: true})
			}
		} catch (error) {
			this.setState({favorite: !this.state.favorite})
		}
	}

	favoriteAlbum = async () => {
		const { id } = this.props.image
		this.setState({favorite: !this.state.favorite})
		try {
			const result = await CentralServerProvider.setFavoriteAlbum(id)
			if (result.data === "unfavorited") {
				this.setState({favorite: false})
			} else if (result.data === "favorited") {
				this.setState({favorite: true})
			}
		} catch (error) {
			this.setState({favorite: !this.state.favorite})
		}
	}

	setImageLinks = () => {
		const { images, is_album } = this.props.image
		let links: string[] = []
		if (!is_album)
			return
		for (const imageInfo in images) {
			if (images.hasOwnProperty(imageInfo)) {
				const element = images[imageInfo];
				if (element.type !== "video/mp4")
					links.push(element.link)
			}
		}
		if (this._isMounted) {
			this.setState({imageLinks: links})
		}
	}

	renderImages = () => {
		const { is_album, width } = this.props.image
		if (is_album && this.state.imageLinks.length > 1) {
			return (
				<ImageSlider
					images={this.state.imageLinks}
					customSlide={({ index, item, style, width }) => (
						<View key={index} style={style}>
							<Image source={{ uri: item }} style={[styles.bodyImage, {height: width}]} />
						</View>
					)}
				/>
			)
		} else {
			let getDimension: number = (this.props.image.images[0]["height"] / this.props.image.images[0]["width"]) * 350
			return (
				<Image
					style={[styles.bodyImage, {height: getDimension}]}
					source={{ uri: this.state.imageLinks[0]}}
				/>
			)
		}
	}

	render() {
    const { favorite, imageLinks } = this.state
		const { account_url, title, views, is_album } = this.props.image
		if (imageLinks.length === 0)
			return (<></>)
		return (
			<View>
				<Card>
					<CardItem style={styles.headerCardItem} header>
						<Left>
							<Thumbnail small source={{uri: `https://imgur.com/user/${account_url}/avatar`}} />
							<Body>
								<Text>{account_url}</Text>
							</Body>
						</Left>
					</CardItem>
					<CardItem cardBody>
						{this.renderImages()}
					</CardItem>
					<CardItem>
						<View style={styles.footerCardItem}>
							<View style={styles.footerTitleContainer}>
								{title && (
									<Text style={styles.titleText}>{title}</Text>
								)}
							</View>
							<View style={styles.footerFavoriteContainer}>
								<TouchableOpacity onPress={() => {is_album ? this.favoriteAlbum() : this.favoriteImage()}}>
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