import React from "react";
import { View, Image, BackHandler } from "react-native"
import { Content, Item, Input, Text, Button, Form, Label, Spinner, Toast } from "native-base"
import ImagePicker from "react-native-image-picker"
import styles from "./UploadStyles"

import HeaderComponent from "../../components/Header/HeaderComponent"
import CentralServerProvider from "../../provider/CentralServerProvider"

type myProps = {
	navigation: any
};
type myStates = {
	title: string
	description: string
	image: object
	loading: boolean
};

export default class Upload extends React.Component<myProps, myStates> {

	_didFocusSubscription
	_willBlurSubscription

	constructor(props) {
		super(props)
		this.state = {
			title: "",
			description: "",
			image: {},
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
	}

	componentWillUnmount = () => {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

	onBack = () => {
		this.props.navigation.navigate("Gallery")
    return true
	}

	pickImageHandler = async () => {
		await ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
			if (!res.error && !res.didCancel) {
				this.setState({ image: res });
			}
		});
	}

	postImage = async () => {
		try {
			const { image, title, description } = this.state
			if (!image)
				return
			this.setState({loading: true})
			await CentralServerProvider.uploadImage({ image, title, description })
			this.setState(
			{
				loading: false,
				title: "",
				description: "",
				image: {}
			});
			Toast.show({
				text: "Image uploaded successfully !",
				duration: 3000
			})
		} catch (error) {
			this.setState({loading: false});
			console.log(error);
		}
	}

	isUploadDisabled = () => {
		if ((Object.keys(this.state.image).length === 0))
			return true;
		else
			return false;
	}

	render() {
		return (
			<>
				<HeaderComponent
					title='Upload'
					rightAction={this.props.navigation.openDrawer}
					rightActionIcon='menu'
				/>
				<Content contentContainerStyle={styles.contentContainer}>
					<Form style={styles.formContainer}>
						<Item floatingLabel>
							<Label style={styles.inputLabel}>Title</Label>
							<Input
								style={styles.input}
								onChangeText={title => this.setState({ title })}
								value={this.state.title}
							/>
						</Item>
						<Item floatingLabel last>
							<Label style={styles.inputLabel}>Description</Label>
							<Input
								style={styles.input}
								onChangeText={description => this.setState({ description })}
								value={this.state.description}
							/>
						</Item>
					</Form>
					<View style={styles.container}>
						<View style={styles.placeholder}>
							<Image source={{ uri: this.state.image.uri }} style={styles.previewImage} />
						</View>
						<View style={styles.pickButton}>
							<Button
								block
								disabled={this.state.loading ? true : false}
								onPress={this.pickImageHandler}
							>
								<Text>Pick Image</Text>
							</Button>
						</View>
						{this.state.loading ?
							<Spinner size="large" />
						:
							<Button
								block
								disabled={this.isUploadDisabled()}
								style={styles.uploadButton}
								onPress={this.postImage}
							>
								<Text>Upload</Text>
							</Button>
						}
					</View>
				</Content>
			</>
		);
	}
}
