import React from "react"
import {Button, Text, Content, Item, Label, Input, Icon, Spinner} from "native-base"
import styles from "./LoginStyles"

import HeaderComponent from "../../components/Header/HeaderComponent"
import CentralServerProvider from "../../provider/CentralServerProvider"

type myProps = {
	navigation: any
};
type myStates = {
	name: string
	loading: boolean
	loginError: boolean
};

export default class Login extends React.Component<myProps, myStates> {
	constructor(props) {
		super(props)
		this.state = {
			name: "Namachi",
			loading: false,
			loginError: false
		}
	}

	public auth = async () => {
		try {
			this.setState({loading: true})
			await CentralServerProvider.authenticate(this.state.name)
			this.setState({loading: false})
			this.props.navigation.navigate("DrawerNavigator")
		} catch (error) {
			this.setState({loading: false, loginError: true})
		}
	}

	render() {
		return (
			<>
				<HeaderComponent title="Login" />
				<Content contentContainerStyle={styles.contentContainer}>
					<Item floatingLabel last>
						<Icon style={styles.itemIcon} name="person" />
						<Label style={styles.itemLabel}>Pseudo</Label>
						<Input
							style={styles.input}
							onChangeText={name => {
								this.setState({name})
							}}
							value={this.state.name}
						/>
					</Item>
					{this.state.loginError && <Text style={styles.usernameError}>Invalid username</Text>}
					{!this.state.loading ?
						<Button style={styles.loginButton} onPress={() => this.auth()}>
							<Text style={styles.loginButtonText}>Login</Text>
						</Button>
					:
						<Spinner style={styles.spinner} size="large" color="green" />
					}
				</Content>
			</>
		)
	}
}
