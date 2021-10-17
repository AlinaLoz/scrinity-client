import React from 'react';
import { ICompany } from "@interfaces/companies.interfaces";
import styles from './welcome.module.scss';

interface IWelcomeProps {
	onNext: (data: boolean) => void;
	company: ICompany,
}

export const Welcome: React.FC<IWelcomeProps> = ({ onNext, company }) => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.projectName}>Project z</h1>
			<div className={styles.popup}>
				<div className={styles.company}>
					<img src="" alt={`company ${company.id}`} />
					<div>
						<p>{company.name}</p>
						<p>{company.managerTitle}</p>
					</div>
				</div>
				<button onClick={() => onNext(true)}>Оставить положительный отзыв</button>
				<button onClick={() => onNext(false)}>Отсавить отрицательный отзыв</button>
			</div>
		</div>
	);
};
