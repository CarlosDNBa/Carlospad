document.addEventListener('DOMContentLoaded', () => {
    let textarea = document.getElementById('textarea');
    textarea.focus();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const link = urlParams.get('link');

    const api = {
        load: {
            local: 'http://localhost:3000/load',
            deployed: 'https://s40paiuyae.execute-api.us-east-1.amazonaws.com/master/load',
        },

        save: {
            local: 'http://localhost:3000/save',
            deployed: 'https://s40paiuyae.execute-api.us-east-1.amazonaws.com/master/save',
        },
    }

    fetch(api.load.deployed, {
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
        const reqBody = JSON.stringify({ link: link, text: text });

        fetch(api.save.deployed, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: reqBody
        });
    }

    let typingTimer;
    let doneTypingInterval = 1500;

    textarea.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    textarea.addEventListener('keydown', () => {
        clearTimeout(typingTimer);
    });
});