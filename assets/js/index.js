document.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('botao');
    const linkInput = document.getElementById('link');

    linkInput.focus();

    function redirecionar() {
        const newLocation = `${window.location.href}text.html?link=${linkInput.value}`;
        console.log(newLocation);
        window.location.href = newLocation;
    }

    function enter() {
        const input = document.getElementById('link');

        input.addEventListener("keyup", function(event) {

            if (event.keyCode === 13) {

                redirecionar();
            }
        });
    }

    btn.addEventListener('click', redirecionar);
    linkInput.addEventListener('keypress', enter);
});