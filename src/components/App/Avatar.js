import { useState, useEffect, memo } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Client from '../../utils/Client'
import Skeleton from 'react-loading-skeleton'
import useTailwind from '../../hooks/tailwind'
import { UploadSolid } from './Icon'

const Avatar = ({ src, className = '', sizeClasses, lazy, children }) => {
	const [width, height] = useTailwind(sizeClasses, ['width', 'height'])
	const [avatarUrl, setAvatarUrl] = useState(useCDN(src, width, height))

	useEffect(() => {
		setAvatarUrl(useCDN(src, width, height))
	}, [src])

	return (
		<div className={`group ${sizeClasses} rounded-full relative ${className}`}>
			{avatarUrl ? <img loading={lazy ? 'lazy' : 'auto'} className={`${sizeClasses} rounded-full overflow-hidden`} src={avatarUrl} alt="" width={parseFloat(width.split('rem')[0]) * 16} height={parseFloat(height.split('rem')[0]) * 16} /> : <Skeleton circle={true} width={width} height={height} style={{ display: 'block', position: 'relative', zIndex: 1 }} />}
			{children}
		</div>
	)
}

export const UploadableAvatar = ({ shouldAllowUploads = true, onChange, src, ...props }) => {
	const [file, setFile] = useState(null)
	const [source, setSource] = useState(src)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		setSource(src)
	}, [src])

	useEffect(() => {
		if (!file) return

		Client.uploadFile({ file, progress: (progress) => setProgress(Math.round(progress * 100)) })
			.catch(() => alert('Something went wrong when uploading your profile pic'))
			.then((response) => onChange(`${response.key}.${response.extension}`))
	}, [file])

	useEffect(() => {
		if (progress !== 100) return

		setTimeout(() => {
			setSource(URL.createObjectURL(file))

			setProgress(0)
		}, 1000)
	}, [progress])

	return (
		<Avatar src={source} {...props}>
			{shouldAllowUploads && (
				<>
					<div className={`absolute opacity-0 group-hover:opacity-100 inset-0 bg-indigo-300${source ? ' bg-opacity-75' : ''} ${props.sizeClasses} rounded-full flex items-center justify-center transition-opacity duration-200 ease-in-out z-10 pointer-events-none`}>
						<UploadSolid className="text-indigo-50 w-6 h-6" />
					</div>
					<CircularProgressbar className={`absolute inset-0 ${props.sizeClasses} z-10`} value={progress} styles={buildStyles({ trailColor: 'transparent', pathColor: '#6875f5' })} />
					<label className="absolute inset-0 cursor-pointer z-20">
						<input type="file" className="hidden" onChange={(event) => setFile(event.target.files[0])} accept="image/jpeg,image/png" />
					</label>
				</>
			)}
		</Avatar>
	)
}

const useCDN = (src, width, height) => {
	if (!src?.startsWith('https://auralite.s3.eu-west-2.amazonaws.com/')) return src

	return `https://ik.imagekit.io/auralite/tr:w-${parseFloat(width.split('rem')[0]) * 24},h-${parseFloat(height.split('rem')[0]) * 24}/${src.split('https://auralite.s3.eu-west-2.amazonaws.com/', 2)[1]}`
}

export default memo(Avatar)
