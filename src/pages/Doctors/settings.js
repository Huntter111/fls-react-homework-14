export const doctorInputFields = [
	{
		type: 'text',
		name: 'fullName',
		placeholder: "Введіть повне ім'я",
		label: "Повне ім'я",
		require: 'require',
	},
	{
		type: 'text',
		name: 'specialty',
		placeholder: 'Введіть спеціальність',
		label: 'Спеціальність',
		require: 'require',
	},
	{
		type: 'email',
		name: 'email',
		placeholder: 'Введіть email',
		label: 'Електронна пошта',
		require: 'require',
	},
	{
		type: 'tel',
		name: 'phone',
		placeholder: 'Введіть номер телефону',
		label: 'Телефон',
		require: 'require',
	},
	{
		type: 'text',
		name: 'room',
		placeholder: 'Введіть номер кабінету',
		label: 'Кабінет',
		require: 'require',
	},
	{
		type: 'text',
		name: 'notes',
		placeholder: 'Додаткові нотатки',
		label: 'Нотатки',
	},
]
export const emptyDoctorData = {
	fullName: '',
	specialty: '',
	email: '',
	phone: '',
	room: '',
	notes: '',
}
