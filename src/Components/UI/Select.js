import ReactSelect from 'react-select';
import './Select.css';

const Select = (props) => {
	const wrapperStyle = ['select-wrapper'];

	if (props.wrapperClass) wrapperStyle.push(props.wrapperClass);
	if (props.disabled) wrapperStyle.push('disabled-select-wrapper');
	if (props.hidden) wrapperStyle.push('wrapper-hidden');

	let options = props.options;

	if (props.sortOption !== undefined) {
		options.sort((a, b) => {
			if (props.sortOption) props.sortOption(a, b);
			return 0;
		});
	}

	return (
		<div className={wrapperStyle.join(' ')}>
			<ReactSelect
				id={props.id}
				value={props.value}
				options={options}
				menuIsOpen={props.menuIsOpen}
				onChange={(value) => {
					props.onChange({
						fieldName: props.id,
						value: value,
						idAccessor: props.idAccessor,
					});
				}}
				isMulti={props.isMulti}
				required={props.required}
				isClearable={props.isClearable}
				className={`select-input ${props.className || ''}`}
				classNamePrefix={`select-input--internals ${
					props.classNamePrefix || ''
				}`}
				isDisabled={props.disabled}
				closeMenuOnSelect={props.closeMenuOnSelect}
				closeMenuOnScroll={props.closeMenuOnScroll}
				escapeClearsValue={props.escapeClearsValue}
				filterOption={props.filterOption}
				isLoading={props.isLoading}
				getOptionLabel={(option) => option[props.nameAccessor || 'name']}
				getOptionValue={(option) => option[props.idAccessor || 'id']}
				noOptionsMessage={() => 'Nincs megjeleníthető tartalom'}
				placeholder={'Válassz'}
			/>
			{props.children}
		</div>
	);
};

export default Select;
