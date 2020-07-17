import Client from '../../../utils/Client'

export default (req, res) => {
	if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

	const { email, password, code } = req.body

	Client.register({ email, password, code })
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(error.response.status).json(error.response.data))
}
