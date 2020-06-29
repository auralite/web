import Client from '../../../utils/Client'

export default (req, res) => {
	if (req.method !== 'POST') return

	const { email, password } = req.body

	Client.login({ email, password })
		.then((response) => res.status(200).json(response.data))
		.catch((error) => res.status(error.response.status).json(error.response.data))
}
