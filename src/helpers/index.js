export const onClear = (clearValue) => {
	clearValue('')
}
export const getDate = (dateValue) => {
	const date = new Date(dateValue)

	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minute = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')

	const fullDate = `${day}/${month}/${year}`
	const fullTime = `${hours}:${minute}:${seconds}`
	return { fullDate, fullTime }
}
