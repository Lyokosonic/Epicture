import React from "react"
import { Image, TouchableOpacity } from "react-native"
import { Card, CardItem, Thumbnail, Text, Left, Body, Icon, Right, View } from "native-base"
import ImageSlider from "react-native-image-slider"
import CentralServerProvider from "../../provider/CentralServerProvider"
import styles from "./FavoriteStyles"

type myProps = {
  image: any
  isGallery: boolean
}
type myStates = {
  isGallery: boolean
  getImageLinks: string[]
  favorite: boolean
  myUsername: string
}

export default class FavoriteItem extends React.Component<myProps, myStates> {
  _isMounted: boolean = false
	constructor(props) {
		super(props)
		this.state = {
      isGallery: this.props.isGallery,
      getImageLinks: [],
      myUsername: CentralServerProvider.getUsername(),
			favorite: this.props.image.favorite
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
		const { images } = this.props.image
    const { isGallery } = this.state
    let links: string[] = []
		if (!isGallery)
			return
		for (const imageInfo in images) {
			if (images.hasOwnProperty(imageInfo)) {
				const element = images[imageInfo];
				if (element.type !== "video/mp4")
					links.push(element.link)
			}
		}
		if (this._isMounted) {
			this.setState({getImageLinks: links})
		}
	}

  renderImages = () => {
    const { link, width, height } = this.props.image
    const { isGallery } = this.props
		if (isGallery) {
			return (
        <ImageSlider
          images={this.state.getImageLinks}
          customSlide={({ index, item, style, width }) => (
            <View key={index} style={style}>
              <Image source={{ uri: item }} style={[styles.bodyImage, {height: width}]} />
            </View>
          )}
        />
			)
		} else {
			let getDimension: number = (height / width) * 350
			return (
				<Image
					style={[styles.bodyImage, {height: getDimension}]}
					source={{uri: link}}
				/>
			)
		}
	}

	render() {
		const { favorite, myUsername, isGallery } = this.state
    const { title, views, account_url, is_album } = this.props.image
    if (is_album && !isGallery)
      return (<></>)
		return (
			<View>
				<Card>
					<CardItem style={styles.headerCardItem} header>
            <Left>
              <Thumbnail
                small
                source={{uri: `https://imgur.com/user/${!isGallery ? myUsername : account_url}/avatar`}}
              />
              <Body>
                <Text>{!isGallery ? myUsername : account_url}</Text>
              </Body>
            </Left>
					</CardItem>
					<CardItem cardBody>
						{this.renderImages()}
					</CardItem>
					<CardItem>
						<View style={styles.footerCardItem}>
							<View style={styles.footerTitleContainer}>
								{(title !== "") && (
									<Text style={styles.titleText}>{title}</Text>
                )}
							</View>
							<View style={styles.footerFavoriteContainer}>
								<TouchableOpacity onPress={() => {isGallery ? this.favoriteAlbum() : this.favoriteImage()}}>
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