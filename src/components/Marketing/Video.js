const Video = ({ url }) => (
	<div className="relative rounded-lg z-1 overflow-hidden">
		<div className="relative p-0" style={{ paddingTop: '56.25%', margin: '-2px' }}>
			<iframe className="absolute h-full inset-0 w-full" src={url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
		</div>
	</div>
)

export const YouTube = ({ id }) => <Video url={`https://www.youtube-nocookie.com/embed/${id}?modestbranding=1&rel=0`} />

export default Video
