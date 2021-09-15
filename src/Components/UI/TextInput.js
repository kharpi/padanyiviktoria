import * as React from 'react';
import InputLabel from './InputLabel';
import './InputField.css';

const isValidNumber = (value, maxNumber, minNumber) => {
	const numValue = Number(value);
	if (isNaN(numValue) && value !== '') {
		return false;
	} else {
		if (maxNumber && numValue > maxNumber) return false;
		if (minNumber && numValue < minNumber) return false;
		return true;
	}
};

export const TextInput = (props) => {
	let label = InputLabel(props);
	let wrapperStyle = ['wrapper'];

	if (props.className) wrapperStyle.push(props.className);
	if (props.hidden) wrapperStyle.push('wrapper-hidden');

	let inputStyle = ['common-input', 'text-input'],
		labelStyle = ['input-label'];

	if (props.inlineLabel) labelStyle.push('inline-label');

	return (
		<div className={wrapperStyle.join(' ')}>
			{label}
			<input
				className={inputStyle.join(' ')}
				id={props.id}
				type={props.type}
				value={props.value}
				required={props.required}
				disabled={props.disabled}
				maxLength={props.maxLength}
				minLength={props.minLength}
				autoFocus={props.autoFocus}
				placeholder={props.placeholder}
				autoComplete={
					props.autoComplete ||
					(props.isFloat && props.isNumeric ? 'off' : 'on')
				}
				min={props.minNumber}
				max={props.maxNumber}
				onBlur={(e) => {
					if (props.onBlur)
						props.onBlur({
							fieldName: props.id,
							value: e.currentTarget.value,
						});
				}}
				onChange={(e) => {
					if (
						props.isNumeric &&
						isValidNumber(e.target.value, props.maxNumber, props.minNumber)
					) {
						props.onChange({
							fieldName: props.id,
							value: e.target.value,
						});
					} else if (!props.isNumeric) {
						props.onChange({
							fieldName: props.id,
							value: e.target.value,
						});
					}
					return;
				}}
			/>
			{props.description ? (
				<p className='input-description'>{props.description}</p>
			) : null}
			{props.warningText ? (
				<p className='input-warning'>{props.warningText}</p>
			) : null}
		</div>
	);
};
