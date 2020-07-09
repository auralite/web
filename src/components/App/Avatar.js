import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { indigo } from '@tailwindcss/ui/colors'
import Client from '../../utils/Client'
import Skeleton from 'react-loading-skeleton'
import useTailwind from '../../hooks/tailwind'

const base64 = (str) => {
	if (typeof window !== 'undefined') return btoa(str)

	return Buffer.from(str).toString('base64')
}

const Avatar = ({ src, isUpdating, onChange, className, sizeClasses }) => {
	const [width, height] = useTailwind(sizeClasses, ['width', 'height'])
	const [file, setFile] = useState(null)
	const [progress, setProgress] = useState(0)
	const [avatarUrl, setAvatarUrl] = useState(src)

	useEffect(() => {
		setAvatarUrl(src?.startsWith('https://auralite.s3.eu-west-2.amazonaws.com/') ? `https://images.auralite.io/avatars/fit/${parseFloat(width.split('rem')[0]) * 24}/${parseFloat(height.split('rem')[0]) * 24}/sm/0/${base64('s3://auralite/' + src.split('https://auralite.s3.eu-west-2.amazonaws.com/', 2)[1])}` : src)
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
			setAvatarUrl(URL.createObjectURL(file))

			setProgress(0)
		}, 1000)
	}, [progress])

	return (
		<div className={`group ${sizeClasses} rounded-full relative ${className ?? ''}`}>
			{avatarUrl ? (
				avatarUrl?.startsWith('https://images.auralite.io/') ? (
					<figure className={`${sizeClasses} rounded-full overflow-hidden`}>
						<picture loading="lazy" className="w-full h-full">
							<source type="image/webp" srcSet={`${avatarUrl}.webp`} />
							<source type={`image/${avatarUrl.split('.').pop() === 'png' ? 'png' : 'jpeg'}`} srcSet={avatarUrl} />
							<img loading="lazy" src={avatarUrl} alt="" width={parseFloat(width.split('rem')[0]) * 16} height={parseFloat(height.split('rem')[0]) * 16} />
						</picture>
					</figure>
				) : (
					<img loading="lazy" className={`${sizeClasses} rounded-full overflow-hidden`} src={avatarUrl} alt="" width={parseFloat(width.split('rem')[0]) * 16} height={parseFloat(height.split('rem')[0]) * 16} />
				)
			) : (
				<Skeleton circle={true} width={width} height={height} style={{ display: 'block' }} />
			)}
			{isUpdating && (
				<>
					<div className={`absolute opacity-0 group-hover:opacity-100 inset-0 bg-indigo-300 bg-opacity-75 ${sizeClasses} rounded-full flex items-center justify-center transition-opacity duration-200 ease-in-out`}>
						<svg className="text-indigo-50 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
						</svg>
					</div>
					<CircularProgressbar className={`absolute inset-0 ${sizeClasses}`} value={progress} styles={buildStyles({ trailColor: 'transparent', pathColor: indigo[500] })} />
					<label className="absolute inset-0 cursor-pointer">
						<input type="file" className="hidden" onChange={(event) => setFile(event.target.files[0])} accept="image/jpeg,image/png" />
					</label>
				</>
			)}
		</div>
	)
}

export default Avatar
