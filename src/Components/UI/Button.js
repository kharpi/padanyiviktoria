import * as React from 'react';
import './Button.css';

export const Button = (props) => {
	const getButton = () => {
		let classString = `button`;
		if (props.small) classString += ` button__small`;
		if (props.textButton) classString += ` button__text-type`;
		if (props.linkButton) classString += ` button__link-button`;
		if (props.fullWidth) classString += ` button__full-width`;
		if (props.altColor) classString += ` button__alt-color`;
		if (props.isWide) classString += ` button__wide-button`;
		if (props.className) classString += ` ${props.className}`;

		return (
			<button
				type={props.type}
				onClick={props.onClick}
				disabled={props.disabled}
				className={classString}
			>
				{props.children}
			</button>
		);
	};

	if (props.hasContainer) {
		let containerClasses = ['button-wrapper'];
		if (props.align) containerClasses.push(`button-wrapper--${props.align}`);

		return <div className={containerClasses.join(' ')}>{getButton()}</div>;
	}

	return getButton();
};

export default Button;
