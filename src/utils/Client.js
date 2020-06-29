import axios from 'axios'

class Client {
	constructor() {
		this.clientId = process.env.AURALITE_ID
		this.clientSecret = process.env.AURALITE_SECRET

		this.client = axios.create({
			baseURL: process.env.AURALITE_URL,
			headers: {
				Accept: 'application/json',
			},
		})
	}

	login({ email, password }) {
		return this.client.post('/oauth/token', {
			grant_type: 'password',
			client_id: this.clientId,
			client_secret: this.clientSecret,
			username: email,
			password,
			scope: '*',
		})
	}
}

export default new Client()
