import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleVisuals, setArticleVisuals] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleVisuals.fontFamilyOption.value,
					'--font-size': articleVisuals.fontSizeOption.value,
					'--font-color': articleVisuals.fontColor.value,
					'--container-width': articleVisuals.contentWidth.value,
					'--bg-color': articleVisuals.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setData={setArticleVisuals} />
			<Article />
		</main>
	);
};
