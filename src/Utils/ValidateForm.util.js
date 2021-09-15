export const validateFormData = (form, file_list) => {
	const error_message = [];
	for (const T of Object.values(form)) {
		const field = T;

		field.warningText = '';

		if ('textType' in field) {
			if (field.required === true) {
				if (field.disabled !== true && field.hidden !== true) {
					if (field.value === '') {
						field.warningText = 'Töltsd ki a mezőt!';
						return { form, ok: 0 };
					} else if (field.value.length < 3) {
						field.warningText = 'Túl rövid!';
						return { form, ok: 0 };
					}
				}
			}
		}

		if ('selectType' in field) {
			!field.value && error_message.push('Select is invalid!');
		}
	}
	if (file_list?.length) {
		const files_size = file_list.map((f) => f.size).reduce((a, c) => a + c);
		if (files_size >= 15 * 1000 * 1000)
			error_message.push('File size is too large!');
	}
	return { form, ok: 1 };
};
