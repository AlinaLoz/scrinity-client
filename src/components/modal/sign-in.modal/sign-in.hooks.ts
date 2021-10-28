import { requestConfirmCode } from '@api/auth.service';
import { getFirstResponseError } from '@helpers/message.helper';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type TUseRequestNewCodeReturn = [
	boolean,
	string,
	Dispatch<SetStateAction<string>>,
	(phone: string, cb: () => void) => void,
];
export const useRequestNewCode = (): TUseRequestNewCodeReturn => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');
	
	const cb = useCallback(async (phone: string, cb: () => void) => {
		try {
			setIsLoading(true);
			// debugger.
			console.log('phone', phone.length);
			await requestConfirmCode(phone);
			cb();
		} catch (err) {
			setError(getFirstResponseError(err));
		}
		setIsLoading(false);
	}, []);
	return [isLoading, error, setError, cb];
};

export const useVerifyNewCode = () => {

};
