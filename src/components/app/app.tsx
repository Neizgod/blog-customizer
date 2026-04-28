import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [cssArticle, setCssArticle] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': cssArticle.fontFamilyOption.value,
					'--font-size': cssArticle.fontSizeOption.value,
					'--font-color': cssArticle.fontColor.value,
					'--container-width': cssArticle.contentWidth.value,
					'--bg-color': cssArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setData={setCssArticle} />
			<Article />
		</main>
	);
};
