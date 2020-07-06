import { ScaledSheet } from "react-native-size-matters"
import commonColor from "../../theme/variables/commonColor"

const styles = ScaledSheet.create({
	viewContainer: {
		zIndex: 1
	},
	header: {
		height: "45@s",
		paddingTop: "5@s",
		paddingBottom: "5@s",
		backgroundColor: commonColor.darkPrimary,
		borderBottomWidth: 1,
		borderBottomColor: commonColor.listBorderColor,
	},
	leftHeader: {
		flex: 1,
	},
	bodyHeader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	titleHeader: {
		fontSize: "18@s",
		color: commonColor.inverseTextColor,
	},
	rightHeader: {
		marginRight: "5@s",
		flex: 1,
	},
	iconHeader: {
		fontSize: "30@s",
	},
})

export default styles
