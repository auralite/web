import { useContext } from 'react'
import AlertContext from '../context/alerts'

const useAlert = () => {
	const { alerts, setAlerts } = useContext(AlertContext)

	const createAlert = ({ title, body }) => setAlerts((alerts) => [...alerts, { title, body }])

	return { alerts, createAlert }
}

export default useAlert
