import Client from '../../../utils/Client'

export default (req, res) => {
	if (req.method !== 'POST') return

	const { email, password } = req.body

	Client.login({ email, password })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(error.response.status).json(error.response.data))
}
