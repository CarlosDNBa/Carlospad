document.addEventListener('DOMContentLoaded', () => {
	let textarea = document.getElementById('textarea');
	textarea.focus();

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const link = urlParams.get('link');

	const api = 'https://e5estga55h.execute-api.us-east-1.amazonaws.com'

	fetch(`${api}/load`, {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ 'link': link })
	})
		.then(res => res.json())
		.then((res) => {
			console.log(res);
			if (res.data) {
				textarea.textContent = res.data;
			}
		});

	function doneTyping() {
		const text = textarea.value;

		fetch(`${api}/save`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ link: link, text: text })
		});
	}

	let typingTimer;
	let doneTypingInterval = 500;

	textarea.addEventListener('keyup', () => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(doneTyping, doneTypingInterval);
	});

	textarea.addEventListener('keydown', () => {
		clearTimeout(typingTimer);
	});
});