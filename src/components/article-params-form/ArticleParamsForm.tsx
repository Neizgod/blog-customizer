import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useReducer, useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [formState, setFormState] = useState(false);

	return (
		<>
			<ArrowButton
				isOpen={formState}
				onClick={() => {
					setFormState((formState) => !formState);
				}}
			/>
			<aside className={clsx(styles.container, { [styles.container_open]: formState })}>
				<form className={styles.form}>
					<Select title='Шрифт' options={fontFamilyOptions} selected={fontFamilyOptions[0]} />
					<RadioGroup title='Размер шрифта' name='Размер шрифта' options={fontSizeOptions} selected={fontSizeOptions[0]}/>
					<Select title='Цвет шрифта' options={fontColors} selected={fontColors[0]} />
					<Separator/>
					<Select title='Цвет фона' options={backgroundColors} selected={backgroundColors[0]} />
					<Select title='Ширина контента' options={contentWidthArr} selected={contentWidthArr[0]} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
