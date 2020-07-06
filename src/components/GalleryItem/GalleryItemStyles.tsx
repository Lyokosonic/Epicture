import { ScaledSheet } from "react-native-size-matters"
import commonColor from "../../theme/variables/commonColor"

const styles = ScaledSheet.create({
	headerCardItem: {
		height: "50@s",
		backgroundColor: commonColor.cardDefaultBg,
	},
	bodyImage: {
		flex: 1,
		resizeMode: "contain",
		backgroundColor: "#E8E8E8",
	},
	footerCardItem: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end"
	},
	footerTitleContainer: {
		flex: 1
	},
	titleText: {
		fontWeight: "bold"
	},
	footerFavoriteContainer: {
		marginRight: "8@s",
		marginLeft: "5@s",
		justifyContent: "center",
		alignItems: "center"
	},
	footerViewsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	eyeIcon: {
		marginRight: "3@s"
	}
})

export default styles
