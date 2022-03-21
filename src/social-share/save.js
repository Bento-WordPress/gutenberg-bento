/**
 * External Components
 */
import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes: { facebook, twitter, email } }) => {
	return (
		<div {...useBlockProps.save()}>
			{email && (
				<bento-social-share
					type="email"
					aria-label="Share via Email"
				></bento-social-share>
			)}
			{facebook && (
				<bento-social-share
					type="facebook"
					aria-label="Share via Facebook"
				></bento-social-share>
			)}
			{twitter && (
				<bento-social-share
					type="twitter"
					aria-label="Share via Twitter"
				></bento-social-share>
			)}
		</div>
	);
};

export default Save;
