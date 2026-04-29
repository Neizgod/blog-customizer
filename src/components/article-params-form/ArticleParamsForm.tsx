import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

interface ArticleParamsFormProps {
	setData: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setData } = props;
	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState);
	const [isFormOpen, setFormState] = useState<boolean>(false);
	const aside = useRef<HTMLElement>(null);

	const handleChange =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			setFormData((prev) => ({ ...prev, [field]: option }));
		};

	useEffect(() => {
		if (!isFormOpen) {
			return;
		}

		const handleClick = (event: MouseEvent) => {
			if (aside.current && !aside.current.contains(event.target as Node))
				setFormState(false);
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setFormState(false);
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setFormState((formState) => !formState);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={aside}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setData(formData);
					}}
					onReset={() => {
						setFormData(defaultArticleState);
						setData(defaultArticleState);
					}}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formData.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formData.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formData.fontColor}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formData.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formData.contentWidth}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
