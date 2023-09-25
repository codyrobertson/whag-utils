// Function to fetch data from the API and populate the data on the page
function fetchDataAndPopulate() {
    // Extract the URL from the query parameter
    var urlParams = new URLSearchParams(window.location.search);
    var inputURL = urlParams.get('pasteURLinput'); // Changed from 'url' to 'pasteURLinput'

    // Decode the URL
    var decodedURL = decodeURIComponent(inputURL);

    // Fetch data from the API
    fetch(`https://jsonlink.io/api/extract?url=${decodedURL}`)
        .then(response => response.json())
        .then(data => {
            // Populate the data on the page
            populateData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to populate the data
function populateData(responseData) {
    // Check if the required elements exist on the page
    if (document.querySelector('[data-link-meta-url]') && document.querySelector('[data-mata-link-title]') && document.querySelector('[data-mata-link-description]') && document.querySelector('[data-meta-link-img]')) {
        // Populate the data on the page
        document.querySelector('[data-link-meta-url]').textContent = responseData.url || '';
        document.querySelector('[data-mata-link-title]').textContent = responseData.title || '';
        document.querySelector('[data-mata-link-description]').textContent = responseData.description || '';
        if (responseData.images && responseData.images.length > 0) {
            document.querySelector('[data-meta-link-img]').setAttribute('src', responseData.images[0]);
        }
    }
}

// Call the function to fetch the data and populate the data on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndPopulate();
});
