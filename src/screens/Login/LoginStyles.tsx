import { ScaledSheet } from "react-native-size-matters"
import commonColor from "../../theme/variables/commonColor"

const styles = ScaledSheet.create({
	contentContainer: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: commonColor.brandSidebar
	},
	itemIcon: {
		fontSize: "30@s",
		marginRight: "7@s",
		marginLeft: "8@s",
		color: commonColor.inverseTextColor
	},
	itemLabel: {
		marginLeft: "15@s",
		fontSize: "16@s",
		color: commonColor.inputColorPlaceholder
	},
	input: {
		color: commonColor.inverseTextColor
	},
	usernameError: {
		marginTop: "5@s",
		marginLeft: "10@s",
		color: commonColor.brandDanger
	},
	loginButton: {
		width: "90%",
		height: "40@s",
		alignSelf: "center",
		justifyContent: "center",
		marginTop: "40@s",
	},
	loginButtonText: {
		fontSize: "15@s",
		fontWeight: "bold",
		color: commonColor.inverseTextColor
	},
	spinner: {
		marginTop: "40@s"
	}
})

export default styles
