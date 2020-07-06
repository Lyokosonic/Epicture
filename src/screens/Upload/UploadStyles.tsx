import { ScaledSheet } from "react-native-size-matters"
import commonColor from "../../theme/variables/commonColor"

const styles = ScaledSheet.create({
	contentContainer: {
		flex: 1
	},
	formContainer: {
		marginBottom: "25@s"
	},
	inputLabel: {
		fontSize: "16@s",
		color: commonColor.inputColorPlaceholder
	},
	input: {
		color: commonColor.textColor
	},
	container: {
		alignItems: "center"
	},
	placeholder: {
		borderWidth: 1,
		borderColor: commonColor.segmentBorderColorMain,
		backgroundColor: "#eee",
		width: "85%",
		height: "200@s"
	},
	pickButton: {
		margin: "8@s",
		marginBottom: "16@s",
	},
	previewImage: {
		width: "100%",
		height: "100%",
		resizeMode:"contain"
	},
	uploadButton: {
		width: "90%",
		alignSelf: "center",
	}
})

export default styles
