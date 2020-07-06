import { ScaledSheet } from "react-native-size-matters"
import commonColor from "../../theme/variables/commonColor"

const styles = ScaledSheet.create({
  container: {
    backgroundColor: commonColor.brandSidebar,
    flex: 1
  },
  content: {
    flex: 1
  },
  imageContent: {
    height: "120@s",
    width: "auto",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  linksContainer: {
    marginTop: "10@s",
  },
  link: {
    height: "35@s",
    marginBottom: "10@s",
    borderBottomWidth: "1@s",
    borderBottomColor: "transparent"
  },
  linkIcon: {
    color: commonColor.inverseTextColor,
    fontSize: "25@s"
  },
  linkText: {
    color: commonColor.inverseTextColor,
    fontSize: "16@s",
    paddingLeft: "10@s"
  },
  logoutContainer: {
    padding: "13@s"
  },
  logoutButton: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: commonColor.inverseTextColor,
    paddingTop: "15@s"
  },
  gridLogoutContainer: {
    flexDirection: "row",
    flex: 1,
  },
  columnAccount: {
    flexDirection: "row",
    flex: 1,
    flexGrow: 2,
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  buttonLogout: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
  },
  logoutText: {
    fontSize: "14@s",
    fontWeight: "bold",
    color: commonColor.inverseTextColor
  },
  userName: {
    fontSize: "14@s",
    paddingTop: "5@s",
    color: commonColor.inverseTextColor
  },
  columnThumbnail: {
    flex: 1,
    flexDirection: "column"
  },
  buttonThumbnail: {
    alignSelf: "flex-start"
  },
  profilePic: {
    width: "50@s",
    height: "50@s",
    borderRadius: "30@s"
  }
})

export default styles
