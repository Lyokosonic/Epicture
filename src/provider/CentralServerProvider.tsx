import { authorize } from "react-native-app-auth"
import axios from "axios"
import accounts from "./Accounts"

const _RestServerBaseURL: string = "https://api.imgur.com/3"
const _RestServerBaseOAuth2URL: string = "https://api.imgur.com/oauth2/"

const _RestServerBaseAccountURL: string = _RestServerBaseURL + "/account"
const _RestServerBaseCommentURL: string = _RestServerBaseURL + "/comment"
const _RestServerBaseAlbumURL: string = _RestServerBaseURL + "/album"
const _RestServerBaseGalleryURL: string = _RestServerBaseURL + "/gallery"
const _RestServerBaseImageURL: string = _RestServerBaseURL + "/image"

const _RestServerBaseAuthURL: string = _RestServerBaseOAuth2URL + "/authorize"
const _RestServerBaseTokenURL: string = _RestServerBaseOAuth2URL + "/token"

let _accessToken;
let _refreshToken;
let _expirationDate;
let _username;
let _id;

export default class CentralServerProvider {

	static _getClient = (pseudo: string) => {
		let clientId: string = ""
		let clientSecret: string = ""

		for (const elem in accounts) {
			if (accounts.hasOwnProperty(elem)) {
				const element = accounts[elem];
				if (pseudo.toUpperCase() === elem.toUpperCase()) {
						clientId = element.client_id
						clientSecret = element.client_secret
				}
			}
		}
		return { clientId, clientSecret }
	}

	static authenticate = async (pseudo: string) => {
		const {clientId, clientSecret} = this._getClient(pseudo)
		const authConfig = {
			serviceConfiguration: {
				authorizationEndpoint: _RestServerBaseAuthURL,
				tokenEndpoint: _RestServerBaseTokenURL
			},
			redirectUrl: "com.epicture://oauth",
			clientId,
			clientSecret,
		}
		const result = await authorize(authConfig)
		_accessToken = result.accessToken
		_refreshToken = result.refreshToken
		_expirationDate = result.accessTokenExpirationDate
		_id = result.tokenAdditionalParameters.account_id
		_username = result.tokenAdditionalParameters.account_username
		console.log("Access Token: ",_accessToken);
	}

	static getAccountImages = async () => {
		const result = await axios.get(`${_RestServerBaseAccountURL}/me/images`, {
			headers: this._buildSecuredHeaderToken()
		})
		return result.data
	}

	static getImage = async (imageId: string) => {
		const result = await axios.get(`${_RestServerBaseAccountURL}/${_username}/image/${imageId}`, {
			headers: this._buildSecuredHeaderToken()
		})
		return result.data
	}

	static getFavoriteImages = async ({page, filterMode}) => {
		const result = await axios.get(
			`${_RestServerBaseAccountURL}/${_username}/favorites/${page}/${filterMode}`, {
				headers: this._buildSecuredHeaderToken()
			})
		return result.data
	}

	static getFavoriteGalleries = async ({page, filterMode}) => {
		const result = await axios.get(
			`${_RestServerBaseAccountURL}/${_username}/gallery_favorites/${page}/${filterMode}`, {
				headers: this._buildSecuredHeaderToken()
			})
		return result.data
	}

	static getGallery = async ({section, sort, window, page, showViral, showMature, albumPreviews}) => {
		const result = await axios.get(
			`${_RestServerBaseGalleryURL}/${section}/${sort}/${window}/${page}/?showViral=${showViral}&mature=${showMature}&album_previews=${albumPreviews}`, {
				headers: this._buildSecuredHeaderClientId()
			}
		)
		return result.data
	}

	static getGallerySearch = async ({sort, window, page}, search) => {
		const result = await axios.get(
			`${_RestServerBaseGalleryURL}/search/${sort}/${window}/${page}?q=${search}`, {
				headers: this._buildSecuredHeaderClientId()
			}
		)
		return result.data
	}

	static getAccountBase = async () => {
		const result = await axios.get(`${_RestServerBaseAccountURL}/${_username}`, {
			headers: this._buildSecuredHeaderClientId()
		})
		return result.data
	}

	static setFavoriteImage = async (imageId :string) => {
		const result = await axios.post(`${_RestServerBaseImageURL}/${imageId}/favorite`,
		{},
		{
			headers: this._buildSecuredHeaderToken()
		})
		return result.data
	}

	static setFavoriteAlbum = async (albumId :string) => {
		const result = await axios.post(`${_RestServerBaseAlbumURL}/${albumId}/favorite`,
		{},
		{
			headers: this._buildSecuredHeaderToken()
		})
		return result.data
	}

	static uploadImage = async ({image, title, description}) => {
		const result = await axios.post(`${_RestServerBaseURL}/upload`,
		{
			image: image.data,
			title,
			description
		},
		{
			headers: this._buildSecuredHeaderToken()
		})
		return result.data
	}

	static deleteImage = async ({deletehash}) => {
		const result = await axios.delete(`${_RestServerBaseAccountURL}/${_username}/image/${deletehash}`,
		{
			headers: this._buildSecuredHeaderToken()
		})
		return result.data
	}

	static deleteAlbum = async ({deletehash}) => {
		const result = await axios.delete(`${_RestServerBaseAccountURL}/${_username}/album/${deletehash}`,
		{
			headers: this._buildSecuredHeaderToken()
		})
		return result.data
	}

	static getUsername = () => {
		return _username
	}

	static _buildSecuredHeaderToken = () => {
		return {
			"Content-Type": "application/json",
			Authorization: "Bearer " + _accessToken
		}
	}

	static _buildSecuredHeaderClientId = () => {
		return {
			"Content-Type": "application/json",
			Authorization: "Client-ID " + this._getClient(_username).clientId
		}
	}
}