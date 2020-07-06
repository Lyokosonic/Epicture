import React from "react"
import { Root } from "native-base"
import { Dimensions } from "react-native";
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createDrawerNavigator } from "react-navigation-drawer"

import Login from "./screens/Login/Login";
import Gallery from "./screens/Gallery/Gallery"
import MyPosts from "./screens/MyPosts/MyPosts"
import FavoriteTabs from "./screens/Favorites/FavoriteTabs"
import Upload from "./screens/Upload/Upload"
import SideBar from "./screens/SideBar/SideBar"

const AuthNavigator = createStackNavigator(
	{
		Login: { screen: Login }
	},
	{
		initialRouteName: "Login",
		headerMode: "none"
	}
)

const GalleryNavigator = createStackNavigator(
	{
		Gallery: { screen: Gallery }
	},
	{
		initialRouteName: "Gallery",
		headerMode: "none"
	}
)

const MyPostsNavigator = createStackNavigator(
	{
		MyPosts: { screen: MyPosts }
	},
	{
		initialRouteName: "MyPosts",
		headerMode: "none"
	}
)

const FavoritesNavigator = createStackNavigator(
	{
		FavoriteTabs: { screen: FavoriteTabs }
	},
	{
		initialRouteName: "FavoriteTabs",
		headerMode: "none"
	}
)

const UploadNavigator = createStackNavigator(
	{
		Upload: { screen: Upload }
	},
	{
		initialRouteName: "Upload",
		headerMode: "none"
	}
)

const DrawerNavigator = createDrawerNavigator(
	{
		GalleryNavigator,
		MyPostsNavigator,
		UploadNavigator,
		FavoritesNavigator
	},
	{
		unmountInactiveRoutes: true,
		initialRouteName: "GalleryNavigator",
		drawerPosition: "right",
		drawerWidth: Dimensions.get("window").width / 1.35,
		contentComponent: (props) => <SideBar {...props} />
	}
)

const RootNavigator = createSwitchNavigator(
	{
		AuthNavigator,
		DrawerNavigator
	},
	{
		initialRouteName: "AuthNavigator"
	}
)

const RootContainer = createAppContainer(RootNavigator)

export default class App extends React.Component {
	render() {
		return (
			<Root>
				<RootContainer />
			</Root>
		)
	}
}
