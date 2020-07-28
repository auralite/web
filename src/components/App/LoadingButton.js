const { AnimatedLoading } = require('./Icon')

const LoadingButton = ({ loading, disabled, loadingClasses, disabledClasses, activeClasses, wrapperClasses, children, className, onClick }, props) => (
	<button onClick={loading || disabled ? (e) => e.preventDefault() : onClick} className={`relative ${className} ${loading ? loadingClasses : ''} ${disabled ? disabledClasses : ''} ${!loading && !disabled ? activeClasses : ''}`} {...props}>
		{loading && (
			<span className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<AnimatedLoading className="mx-auto w-8 h-auto" />
			</span>
		)}
		<span className={wrapperClasses + (loading ? ' invisible' : '')}>{children}</span>
	</button>
)

export default LoadingButton
