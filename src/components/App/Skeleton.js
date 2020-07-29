const Skeleton = ({ count = 1, width, wrapper: Wrapper, height, circle = false, style: customStyle = {}, className = '' }) => {
	const elements = []

	for (let i = 0; i < count; i++) {
		let style = {}

		if (width !== null) {
			style.width = width
		}

		if (height !== null) {
			style.height = height
		}

		elements.push(
			<span key={i} className={`animate-pulse bg-no-repeat inline-block w-full leading-px bg-gray-200 dark:bg-gray-700 ${circle ? 'rounded-full' : 'rounded'} ${className}`} style={{ ...style, ...customStyle }}>
				&zwnj;
			</span>
		)
	}

	return (
		<span>
			{Wrapper
				? elements.map((element, i) => (
						<Wrapper key={i}>
							{element}
							&zwnj;
						</Wrapper>
				  ))
				: elements}
		</span>
	)
}

export default Skeleton
