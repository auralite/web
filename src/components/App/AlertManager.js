import { useState } from 'react'
import AlertContext from '../../context/alerts'
import Alert from './Alert'
import { TransitionGroup } from 'react-transition-group'

const AlertManager = ({ children }) => {
	const [alerts, setAlerts] = useState([])

	return (
		<>
			<AlertContext.Provider value={{ alerts, setAlerts }}>{children}</AlertContext.Provider>
			{alerts && (
				<div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
					<TransitionGroup component={null}>
						{alerts.map(({ title, body }, i) => (
							<Alert key={i} title={title} body={body} />
						))}
					</TransitionGroup>
				</div>
			)}
		</>
	)
}

export default AlertManager
