export const patientInputsFields = [
	{
		type: 'text',
		name: 'fullName',
		placeholder: 'Введіть ПІБ',
		label: 'ПІБ',
	},
	{
		type: 'date',
		name: 'birthDate',
		placeholder: 'Оберіть дату народження',
		label: 'Дата народження',
	},
	{
		type: 'text',
		name: 'gender',
		placeholder: 'Введіть стать (male/female)',
		label: 'Стать',
	},
	{
		type: 'tel',
		name: 'phone',
		placeholder: 'Введіть номер телефону',
		label: 'Телефон',
	},
	{
		type: 'email',
		name: 'email',
		placeholder: 'Введіть email',
		label: 'Email',
	},
	{
		type: 'text',
		name: 'address',
		placeholder: 'Введіть адресу',
		label: 'Адреса',
	},
	{
		type: 'text',
		name: 'notes',
		placeholder: 'Додаткові нотатки',
		label: 'Додаткові симптоми',
	},
]
export const emptyPatientData = {
	fullName: '',
	birthDate: '',
	gender: '',
	phone: '',
	email: '',
	address: '',
	notes: '',
}
