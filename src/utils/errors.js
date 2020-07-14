export const handleValidationErrors = (error, setErrors, message = 'Something went wrong. Please try again later.') => {
	if (error.response.status !== 422) return alert(message)

	setErrors(error.response.data.errors)
}
