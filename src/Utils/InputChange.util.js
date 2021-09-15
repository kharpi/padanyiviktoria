import { cloneDeep } from 'lodash';

export const changeHandler = (oldForm, fieldName, value) => {
	let form = cloneDeep(oldForm);
	form[fieldName].value = value;
	return form;
};

export const setOptions = (oldForm, fieldName, options) => {
	let form = cloneDeep(oldForm);
	form[fieldName].options = options;
	return form;
};

export const setRequired = (oldForm, fieldName, options) => {
	let form = cloneDeep(oldForm);
	form[fieldName].required = options;
	return form;
};
