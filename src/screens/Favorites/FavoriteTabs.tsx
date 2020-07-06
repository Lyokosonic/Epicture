import React from "react"
import { BackHandler } from "react-native"
import { Tabs, Tab, TabHeading, Icon, Text } from "native-base"

import HeaderComponent from "../../components/Header/HeaderComponent"
import FavoriteImages from "./FavoriteImages/FavoritesImages"
import FavoriteGalleries from "./FavoriteGalleries/FavoriteGalleries"
import styles from "./FavoriteTabsStyles"

type myProps = {
	navigation: any
}
type myStates = {

}

export default class FavoriteTabs extends React.Component<myProps, myStates> {
  _didFocusSubscription
  _willBlurSubscription

  constructor(props) {
    super(props)
    this.state = {
    }
    this._didFocusSubscription = props.navigation.addListener("didFocus", payload =>
      BackHandler.addEventListener("hardwareBackPress", this.onBack)
    );
  }

  componentDidMount = () => {
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

  render() {
    return (
      <>
        <HeaderComponent
          title="Favorites"
          rightAction={this.props.navigation.openDrawer}
          rightActionIcon="menu"
        />
        <Tabs tabBarPosition="bottom" locked={true} initialPage={0}>
          <Tab
            heading={
              <TabHeading style={styles.tabContainer}>
                <Icon style={styles.tabIcon} name="image" />
              </TabHeading>
            }>
              <FavoriteImages navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.tabContainer}>
                <Icon style={styles.tabIcon} name="images" />
              </TabHeading>
            }>
              <FavoriteGalleries navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </>
    )
  }
}
