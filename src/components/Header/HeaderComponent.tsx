import React from "react"
import { Header, Body, Title, Left, Right, Icon, Button, View } from "native-base"
import styles from "./HeaderComponentStyles"
import PropsTypes from "prop-types"

type myProps = {
	title: string
	rightAction: any
	rightActionIcon: string
	leftAction: any
	leftActionIcon: string
}
type myStates = {}

export default class HeaderComponent extends React.Component<myProps, myStates> {
	render() {
		const { title, rightAction, rightActionIcon, leftAction, leftActionIcon } = this.props;
		return (
			<View style={styles.viewContainer}>
				<Header style={styles.header}>
					<Left style={styles.leftHeader}>
						{leftAction && (
							<Button transparent onPress={() => leftAction()}>
								<Icon name={leftActionIcon} style={styles.iconHeader} />
							</Button>
						)}
					</Left>
					<Body style={styles.bodyHeader}>
						<Title style={styles.titleHeader}>{title}</Title>
					</Body>
					<Right style={styles.rightHeader}>
						{rightAction && (
							<Button transparent onPress={() => rightAction()}>
								<Icon name={rightActionIcon} style={styles.iconHeader} />
							</Button>
						)}
					</Right>
				</Header>
			</View>
		)
	}
}

HeaderComponent.propTypes = {
	title: PropsTypes.string.isRequired,
	rightAction: PropsTypes.func,
	rightActionIcon: PropsTypes.string,
	leftAction: PropsTypes.func,
	leftActionIcon: PropsTypes.string
}
