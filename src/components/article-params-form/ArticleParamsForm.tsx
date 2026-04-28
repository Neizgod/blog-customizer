import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleParamsFormProps,
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setData } = props;
	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] = useState<boolean>(false);

	const handleChange =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			setFormData((prev) => ({ ...prev, [field]: option }));
		};

	return (
		<>
			<ArrowButton
				isOpen={formState}
				onClick={() => {
					setFormState((formState) => !formState);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formState,
				})}>
				<form className={styles.form}>
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
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setFormData(defaultArticleState)
								setData(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={() => {
								setData(formData);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
