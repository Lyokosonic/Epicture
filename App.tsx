import React from "react"
import Setup from "./src/boot/Setup"
import SplashScreen from "react-native-splash-screen"

export default class App extends React.Component {

	componentDidMount() {
		SplashScreen.hide()
	}

	render() {
		return <Setup />
	}
}
