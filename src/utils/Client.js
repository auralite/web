import axios from 'axios'
import Cookies from 'js-cookie'

class Client {
	constructor() {
		this.clientId = process.env.AURALITE_ID
		this.clientSecret = process.env.AURALITE_SECRET
		this.apiToken = Cookies.get('auralite_token')

		this.client = axios.create({
			baseURL: process.env.NEXT_PUBLIC_AURALITE_URL,
			headers: {
				Accept: 'application/json',
				...(this.apiToken ? { Authorization: `Bearer ${this.apiToken}` } : {}),
			},
		})
	}

	login({ email, password }) {
		return this.client
			.post('/oauth/token', {
				grant_type: 'password',
				client_id: this.clientId,
				client_secret: this.clientSecret,
				username: email,
				password,
				scope: '*',
			})
			.then((res) => res.data)
	}

	user() {
		return this.client.get('/api/user').then((res) => res.data)
	}

	profile({ handle }) {
		return this.client.get(`/api/profiles/${handle}`).then((res) => res.data)
	}

	updateProfile({ bio, avatar }) {
		return this.client.post('/api/profile/update', { bio, avatar }).then((res) => res.data)
	}

	timeline() {
		return this.client.get('/api/timeline').then((res) => res.data)
	}

	notifications() {
		return this.client.get('/api/notifications').then((res) => res.data)
	}

	post({ postId }) {
		return this.client.get(`/api/posts/${postId}`).then((res) => res.data)
	}

	createPost({ post, reply_to, privacy }) {
		return this.client.post('/api/posts', { content: post, reply_to, privacy }).then((res) => res.data)
	}

	deletePost({ postId }) {
		return this.client.delete(`/api/posts/${postId}`).then((res) => res.data)
	}

	markNotificationRead({ id }) {
		return this.client.post(`/api/notifications/${id}/read`).then((res) => res.data)
	}

	async uploadFile({ file, progress = () => {} }) {
		const { data: response } = await this.client.post('/api/asset-upload', { content_type: file.type })

		let headers = response.headers

		if ('Host' in headers) delete headers.Host

		return axios
			.put(response.url, file, {
				headers,
				onUploadProgress: (progressEvent) => progress(progressEvent.loaded / progressEvent.total),
			})
			.then(({ data: response }) => {
				response.extension = file.name.split('.').pop()

				return response
			})
	}
}

export default new Client()
