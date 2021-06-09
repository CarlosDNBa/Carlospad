document.addEventListener('DOMContentLoaded', () => {

	const btn = document.getElementById('botao');
	const linkInput = document.getElementById('link');

	linkInput.focus();

	function redirect() {
		const newLocation = `${window.location.href}text.html?link=${linkInput.value}`;
		console.log(newLocation);
		window.location.href = newLocation;
	}

	function enter() {
		const input = document.getElementById('link');

		input.addEventListener("keyup", function (event) {

			if (event.keyCode === 13) {

				redirect();
			}
		});
	}

	btn.addEventListener('click', redirect);
	linkInput.addEventListener('keypress', enter);
});