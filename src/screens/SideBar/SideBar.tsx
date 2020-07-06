import React from "react"
import {Image, TouchableOpacity} from "react-native"
import {Container, Content, List, ListItem, Icon, Text, View, Thumbnail} from "native-base"
import CentralServerProvider from "../../provider/CentralServerProvider"
import logo from "../../assets/images/react-native-logo.png"
import styles from "./SideBarStyles"

type myProps = {
	navigation: any
}

type myStates = {
	userInfo: any
}

export default class SideBar extends React.Component<myProps, myStates> {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: []
		}
	}

	componentDidMount = async () => {
		await this._getAccountInfo()
	}

	_navigate = (screen, params = {}) => {
		this.props.navigation.navigate({routeName: screen, params})
		this.props.navigation.closeDrawer()
	}

	_getAccountInfo = async () => {
		const result = await CentralServerProvider.getAccountBase()
		this.setState({
			userInfo: result.data
		})
	}

	_logOut = () => {
		this.props.navigation.navigate("AuthNavigator")
	}

	render() {
		const { userInfo } = this.state
		return (
			<Container style={styles.container}>
				<Content style={styles.content}>
					<Image source={logo} style={styles.imageContent} />
					<List style={styles.linksContainer}>
						<ListItem button iconLeft style={styles.link} onPress={() => this._navigate("Gallery")}>
							<Icon style={styles.linkIcon} name="photos" />
							<Text style={styles.linkText}>Gallery</Text>
						</ListItem>
						<ListItem button iconLeft style={styles.link} onPress={() => this._navigate("MyPosts")}>
							<Icon style={styles.linkIcon} name="images" />
							<Text style={styles.linkText}>My Posts</Text>
						</ListItem>
						<ListItem button iconLeft style={styles.link} onPress={() => this._navigate("FavoriteTabs")}>
							<Icon style={styles.linkIcon} name="heart" />
							<Text style={styles.linkText}>Favorites</Text>
						</ListItem>
						<ListItem button iconLeft style={styles.link} onPress={() => this._navigate("Upload")}>
							<Icon style={styles.linkIcon} name="cloud-upload" />
							<Text style={styles.linkText}>Upload Images</Text>
						</ListItem>
					</List>
				</Content>
				<View style={styles.logoutContainer}>
					<View style={styles.logoutButton}>
						<View style={styles.gridLogoutContainer}>
						<View style={styles.columnThumbnail}>
								<TouchableOpacity style={styles.buttonThumbnail} onPress={() => {}}>
									<Thumbnail
										style={styles.profilePic}
										source={{ uri: userInfo.avatar }}
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.columnAccount}>
								<TouchableOpacity style={styles.buttonLogout} onPress={() => this._logOut()}>
									<Text style={styles.logoutText}>Log out</Text>
									<Text note style={styles.userName}>{userInfo.url}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Container>
		)
	}
}
