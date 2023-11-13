// Function to fetch data from the API and populate the data on the page
const fetchDataAndPopulate = async () => {
    try {
        // Extract the URL from the query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const inputURL = urlParams.get('pasteURLinput');

        // If no URL, exit the function
        if (!inputURL) throw 'No URL parameter found';

        // Decode the URL
        const decodedURL = decodeURIComponent(inputURL);

        // Fetch data from the API
        const response = await fetch(`https://jsonlink.io/api/extract?url=${decodedURL}`);
        const data = await response.json();

        // Populate the data on the page
        populateData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        populateData({
            url: null,
            title: null,
            description: null,
            images: null
        });
    }
}

// Function to populate the data
const populateData = (responseData) => {
    // Populate the data on the page
    document.querySelector('[data-link-meta-url]').textContent = responseData.url || '';
    document.querySelector('[data-mata-link-title]').textContent = responseData.title || '';
    document.querySelector('[data-mata-link-description]').textContent = responseData.description || '';
    if (responseData.images && responseData.images.length > 0) {
        document.querySelector('[data-meta-link-img]').setAttribute('src', responseData.images[0]);
    }
}

// Call the function to fetch the data and populate the data on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded event fired. Calling fetchDataAndPopulate function.");
    fetchDataAndPopulate();
});
