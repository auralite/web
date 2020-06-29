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
}

export default new Client()
