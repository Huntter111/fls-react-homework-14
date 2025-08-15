import Loader from '@/components/Loader'

const CenteredLoader = () => {
	return (
		<div className="flex justify-center h-[60vh]">
			<div className="flex flex-col gap-4 items-center justify-center">
				<Loader />
				Триває завантаження...
			</div>
		</div>
	)
}

export default CenteredLoader
