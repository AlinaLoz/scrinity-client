import React from 'react';

interface ICodeProps {
	onNext: () => void;
	onPrev: () => void;
}
export const Code: React.FC<ICodeProps> = ({ onNext, onPrev }) => {
	
	return (
		<div>
			Code
			<button onClick={onPrev}>Prev</button>
			<button onClick={onNext}>Next</button>
		</div>
	);
};
