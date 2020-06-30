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

	profile() {
		return this.client.get('/api/user').then((res) => res.data)
	}

	timeline() {
		return this.client.get('/api/timeline').then((res) => res.data)
	}

	notifications() {
		return this.client.get('/api/notifications').then((res) => res.data)
	}

	post({ post, reply_to }) {
		return this.client.post('/api/posts', { content: post, reply_to }).then((res) => res.data)
	}

	markNotificationRead({ id }) {
		return this.client.post(`/api/notifications/${id}/read`).then((res) => res.data)
	}
}

export default new Client()
