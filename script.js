window.onload = function() {
    // Define user ID and auth token (could be dynamically fetched or stored in session/local storage)
    const uId = '101288742115400909221';
    const auth = 'QB9iIpve0clmPFlclxQv8blO36gNWY0Iqgr55ojkiB5vQMdoLuRCg6yabm617JyBPlZcjafQy3GLmQm3Wcv3NR44jYxLxyev6G5A';

    // Make the POST request to fetch the user data
    fetch('https://api.jawaheradmin.xyz/fetchUserData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'okhttp/4.10.0'
        },
        body: `uId=${uId}&auth=${auth}`
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        // Check if the response contains user data
        if (data && data.name && data.diamonds !== undefined) {
            // Get the name and diamonds from the response
            const name = data.name.toUpperCase();  // Convert name to uppercase
            const diamonds = data.diamonds;  // Get the diamonds value

            // Display the profile information (use the actual name fetched from the response)
            document.getElementById('profile-details').innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Diamonds:</strong> ${diamonds} 💎</p>
            `;
        } else {
            // Handle the case where there is no user data
            document.getElementById('profile-details').innerHTML = '<p>Error fetching profile data.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('profile-details').innerHTML = '<p>Error fetching profile data.</p>';
    });
};
