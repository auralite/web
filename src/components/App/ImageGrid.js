import { Controlled as Zoom } from 'react-medium-image-zoom'
import { useState } from 'react'

const ImageGrid = ({ images, onRemove }) => {
	let chunkedImages = []

	const [isZoomed, setIsZoomed] = useState(false)

	switch (images.length) {
		case 1:
		case 2:
			chunkedImages = images.map((image) => [image])
			break

		case 3:
			chunkedImages = [[images[0]], [images[1], images[2]]]
			break

		case 3:
			chunkedImages = [[images[0]], [images[1], images[2]]]
			break

		case 4:
			chunkedImages = [
				[images[0], images[1]],
				[images[2], images[3]],
			]
			break
	}

	return (
		<div className="w-auto border rounded-lg relative bg-gray-100 mb-4 shadow-inset overflow-hidden">
			<div className="overflow-hidden">
				<div className="block w-full relative" style={{ paddingBottom: '56.25%' }}>
					<div className="absolute top-0 left-0 w-full h-full">
						<div className="h-full flex">
							{chunkedImages.map((images, key) => (
								<div key={key} className="flex flex-col justify-center">
									{images.map((image, key) => (
										<div key={key} className={`relative w-full ${images.length > 1 ? 'h-1/2' : 'h-full'}`}>
											<Zoom wrapStyle={{ height: '100%' }} isZoomed={isZoomed} onZoomChange={(zoomState) => setIsZoomed(zoomState)}>
												<img className={`${isZoomed ? 'object-contain' : 'object-cover'} w-full h-full`} src={image[0]} alt="" />
											</Zoom>
											{onRemove && (
												<button onClick={() => onRemove(image)} className="shadow cursor-pointer absolute top-0 right-0 p-1 sm:p-2 mr-1 sm:mr-2 mt-1 sm:mt-2 rounded-full bg-gray-600">
													<svg className="h-4 w-4 sm:h-6 sm:w-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
													</svg>
												</button>
											)}
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ImageGrid
