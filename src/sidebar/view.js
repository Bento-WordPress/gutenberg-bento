window.addEventListener(
	'load',
	async () => {
		await window.customElements.whenDefined('bento-sidebar');

		const sidebars = document.querySelectorAll('bento-sidebar');
		for (const sidebar of sidebars) {
			const api = await sidebar.getApi();

			// set up button actions
			document.querySelector(`#${sidebar.dataset.openerId}`).onclick =
				() => api.open();
		}
	},
	false
);
