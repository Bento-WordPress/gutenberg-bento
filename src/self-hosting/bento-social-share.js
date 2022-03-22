import { defineElement } from '@bentoproject/social-share';

// Just so webpack generates a separate stylesheet for us to enqueue in WP.
import '@bentoproject/social-share/styles.css';

if (
	document.readyState === 'complete' ||
	document.readyState === 'interactive'
) {
	defineElement();
}

document.addEventListener('DOMContentLoaded', () => defineElement());
