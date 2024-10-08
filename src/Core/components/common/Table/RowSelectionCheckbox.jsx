import { forwardRef, useEffect, useRef } from 'react';
import { Checkbox } from '../FormControl/CheckboxFieldControl';

const IndeterminateCheckbox = forwardRef(({ indeterminate, onChange: handleChange, disabled, ...props }, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return <Checkbox ref={resolvedRef} disabled={disabled} onChange={handleChange} {...props} />;
});

export default IndeterminateCheckbox;
