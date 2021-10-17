import React from 'react';

interface IFormProps {
	onNext: () => void;
	onPrev: () => void;
}
export const Form: React.FC<IFormProps> = ({ onNext, onPrev }) => {
	return (
		<div>
			Form
			<button onClick={onPrev}>Prev</button>
			<button onClick={onNext}>Next</button>
		</div>
	);
};
