var data = getData('https://api.petfinder.com/v2/organizations?location=44118');


var data = getData('https://api.petfinder.com/v2/animals');












// connection function

function getData(url) {

    var key = 'O3aa1o0gGzt7MPGOpswgygDjeEWoVuYfRzMY9DNst3a7YBvMBh';
    var secret = 'dB4014srUTEDplW3izPO29cHUwl3p1h3FaZhn15x';

    // Call the API
    // This is a POST request, because we need the API to generate a new token for us
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {

        // Return the response as JSON
        return resp.json();

    }).then(function (data) {

        // Log the API data
        //console.log('token', data);

        // Return a second API call
        // This one uses the token we received for authentication
        return fetch(url, {
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    }).then(function (resp) {

        // Return the API response as JSON
        return resp.json();

    }).then(function (data) {

        response = data;
        console.log('response', data)

    }).catch(function (err) {

        // Log any errors
        console.log('something went wrong', err);

    });

    return data;

}