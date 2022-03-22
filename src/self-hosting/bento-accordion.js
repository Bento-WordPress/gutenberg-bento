import { defineElement } from '@bentoproject/accordion';

// Just so webpack generates a separate stylesheet for us to enqueue in WP.
import '@bentoproject/accordion/styles.css';

if (
	document.readyState === 'complete' ||
	document.readyState === 'interactive'
) {
	defineElement();
}

document.addEventListener('DOMContentLoaded', () => defineElement());
