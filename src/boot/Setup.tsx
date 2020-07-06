import React from "react"
import { StyleProvider } from "native-base"

import App from "../App"
import variables from "../theme/variables/commonColor"
import getTheme from "../theme/components"

export default class Setup extends React.Component {
	render() {
		return (
			<StyleProvider style={getTheme(variables)}>
				<App />
			</StyleProvider>
		)
	}
}
