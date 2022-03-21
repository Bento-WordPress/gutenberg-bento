import classnames from 'classnames';
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { content, minFontSize, maxFontSize, height, textAlign } = attributes;

	const className = classnames({
		[`has-text-align-${textAlign}`]: textAlign,
	});

	return (
		<bento-fit-text
			{...useBlockProps.save({
				className,
				style: { height },
			})}
			min-font-size={parseInt(minFontSize.replace('px', ''), 10)}
			max-font-size={parseInt(maxFontSize.replace('px', ''), 10)}
		>
			<RichText.Content value={content} />
		</bento-fit-text>
	);
}
