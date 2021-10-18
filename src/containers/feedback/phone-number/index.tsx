import React from 'react';

interface IPhoneNumberProps {
  onNext: () => void;
  onPrev: () => void;
}
export const PhoneNumber: React.FC<IPhoneNumberProps> = ({ onNext, onPrev }) => (
  <div>
    Phone number
    <button onClick={onPrev}>Prev</button>
    <button onClick={onNext}>Next</button>
  </div>
);
