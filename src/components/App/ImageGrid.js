import { Controlled as Zoom } from 'react-medium-image-zoom'
import { useState, useMemo, useEffect } from 'react'
import Client from '../../utils/Client'
import { base64 } from '../../utils/encoding'

const ImageGrid = ({ imageRows, onImageRemove, onUpload, imageCount, isUpload }) => (
	<div className="w-auto border rounded-lg relative bg-gray-100 mb-4 shadow-inset overflow-hidden">
		<div className="overflow-hidden">
			<div className="block w-full relative" style={{ paddingBottom: '56.25%' }}>
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="h-full flex">
						{imageRows.map((images, key) => (
							<div key={key} className="flex flex-col justify-center">
								{images.map((image, i) => (isUpload ? <ImageUpload key={image.id} image={image} onRemove={onImageRemove} imageCount={imageCount} onKey={(key) => onUpload(image.id, key)} /> : <Image key={i} image={image} imageCount={imageCount} />))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	</div>
)

const ImageUpload = ({ image, imageCount, onRemove, onKey }) => {
	const [isZoomed, setIsZoomed] = useState(false)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		if (image.key) return

		Client.uploadFile({
			file: image.file,
			progress: (progress) => setProgress(Math.round(progress * 100)),
		})
			.catch(() => alert('Something went wrong when uploading your image'))
			.then((response) => {
				setTimeout(() => setProgress(0), 1000)

				onKey(`${response.key}.${response.extension}`)
			})
	}, [image])

	return (
		<div className={`relative w-full ${imageCount > 1 ? 'h-1/2' : 'h-full'}`}>
			<div className="absolute top-0 inset-x-0 h-2 bg-indigo-500 z-20" style={{ width: `${progress}%` }} />
			<Zoom wrapStyle={{ height: '100%' }} isZoomed={isZoomed} onZoomChange={(zoomState) => setIsZoomed(zoomState)}>
				<img className={`${isZoomed ? 'object-contain' : 'object-cover'} w-full h-full`} src={image.localUrl} alt="" />
			</Zoom>
			{onRemove && (
				<button onClick={() => onRemove(image.id)} className="shadow cursor-pointer absolute top-0 right-0 p-1 sm:p-2 mr-1 sm:mr-2 mt-1 sm:mt-2 rounded-full bg-gray-600">
					<svg className="h-4 w-4 sm:h-6 sm:w-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			)}
		</div>
	)
}

const Image = ({ image, imageCount }) => {
	const [isZoomed, setIsZoomed] = useState(false)
	const src = useMemo(() => {
		return image?.startsWith('https://auralite.s3.eu-west-2.amazonaws.com/') ? `https://images.auralite.io/media/${base64('s3://auralite/' + image.split('https://auralite.s3.eu-west-2.amazonaws.com/', 2)[1])}` : image
	}, [image])

	return (
		<div className={`relative w-full ${imageCount > 1 ? 'h-1/2' : 'h-full'}`}>
			<Zoom wrapStyle={{ height: '100%' }} isZoomed={isZoomed} onZoomChange={(zoomState) => setIsZoomed(zoomState)}>
				<figure className={`w-full h-full`}>
					<picture loading="lazy" className={`${isZoomed ? 'object-contain' : 'object-cover'} w-full h-full`}>
						<source type="image/webp" srcSet={`${src}.webp`} />
						<source type={`image/${src.split('.').pop() === 'png' ? 'png' : 'jpeg'}`} srcSet={src} />
						<img loading="lazy" src={src} alt="" className={`${isZoomed ? 'object-contain' : 'object-cover'} w-full h-full`} />
					</picture>
				</figure>
			</Zoom>
		</div>
	)
}

const chunkImages = (images) =>
	useMemo(() => {
		if (!images) return []

		switch (images.length) {
			case 1:
			case 2:
				return images.map((image) => [image])

			case 3:
				return [[images[0]], [images[1], images[2]]]

			case 4:
				return [
					[images[0], images[1]],
					[images[2], images[3]],
				]
		}
	}, [images])

export const useImageGrid = (images = null, forceImages = false) => {
	if (!images && !forceImages) return useWithUploads()

	return { imageRows: chunkImages(images), imageCount: images?.length ?? 0, isUpload: false }
}

const useWithUploads = () => {
	const [images, setImages] = useState([])

	const [uploadImages, setUploadImages] = useState({})

	const onImageAdd = (files) => {
		if (images.length >= 4) return

		const id = Math.random().toString(36).substring(7)

		setImages((images) => images.concat([...files].map((file) => ({ id, localUrl: URL.createObjectURL(file), file }))))
	}

	const onImageRemove = (id) => {
		setImages((images) => images.filter((image) => image.id !== id))

		setUploadImages((state) => {
			delete state[id]

			return state
		})
	}

	const onUpload = (id, key) => {
		setUploadImages((state) => {
			state[id] = key

			return state
		})
	}

	return { uploaderSettings: { onChange: (event) => onImageAdd(event.target.files) }, gridSettings: { imageRows: chunkImages(images), onImageRemove, onUpload, imageCount: images.length, isUpload: true }, showGrid: images.length > 0, hasPendingImages: images.length != Object.keys(uploadImages).length, images: Object.values(uploadImages) }
}

export default ImageGrid
