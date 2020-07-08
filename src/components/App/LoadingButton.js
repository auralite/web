const LoadingButton = ({ loading, disabled, loadingClasses, disabledClasses, activeClasses, wrapperClasses, children, className, onClick }, props) => (
	<button onClick={loading || disabled ? (e) => e.preventDefault() : onClick} className={`relative ${className} ${loading ? loadingClasses : ''} ${disabled ? disabledClasses : ''} ${!loading && !disabled ? activeClasses : ''}`} {...props}>
		{loading && (
			<span className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mx-auto block" style={{ width: '32px' }}>
					<circle cx="15" cy="15" r="11.9857">
						<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />
						<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
					</circle>
					<circle cx="60" cy="15" r="12.0143" fillOpacity="0.3">
						<animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite" />
						<animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" />
					</circle>
					<circle cx="105" cy="15" r="11.9857">
						<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />
						<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
					</circle>
				</svg>
			</span>
		)}
		<span className={wrapperClasses + (loading ? ' invisible' : '')}>{children}</span>
	</button>
)

export default LoadingButton
