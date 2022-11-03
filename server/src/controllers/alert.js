const { model } = require('mongoose');
const fetch = require('node-fetch');
require('dotenv').config()

module.exports =  async function (message, emails) {

    console.log('emails :', emails)

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer pk_prod_E6MZG2J6FG4N6BN2KP0QYVN4695C'
        },
        body: JSON.stringify({
            "message": {
                "content": {
                    "body": message,
                    "title": "Alert from ZEC"
                },
                "to": {
                    "email": emails,
                    "phone_number": "+263775632443"
                },
                "routing": {
                    "method": "all",
                    "channels": ["email", "phone"]
                }
            }
        })
    };

    fetch('https://api.courier.com/send', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

}
