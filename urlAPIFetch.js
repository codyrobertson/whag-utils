// Function to fetch data from the API and populate the data on the page
function fetchDataAndPopulate() {
    try {
        // Extract the URL from the query parameter
        var urlParams = new URLSearchParams(window.location.search);
        var inputURL = urlParams.get('pasteURLinput');

        // If no URL, exit the function
        if (!inputURL) throw 'No URL parameter found';

        // Decode the URL
        var decodedURL = decodeURIComponent(inputURL);

        // Fetch data from the API
        fetch(`https://jsonlink.io/api/extract?url=${decodedURL}`)
            .then(response => response.json())
            .then(data => {
                // Populate the data on the page
                populateData(data);
                populateForm(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } catch (error) {
        console.error(error);
        populateForm({
            url: null,
            title: null,
            description: null,
            images: null
        });
    }
}

// Function to populate the data
function populateData(responseData) {
    // Populate the data on the page
    document.querySelector('[data-link-meta-url]').textContent = responseData.url || '';
    document.querySelector('[data-mata-link-title]').textContent = responseData.title || '';
    document.querySelector('[data-mata-link-description]').textContent = responseData.description || '';
    if (responseData.images && responseData.images.length > 0) {
        document.querySelector('[data-meta-link-img]').setAttribute('src', responseData.images[0]);
    }
}

// Function to populate the form with hidden inputs
function populateForm(responseData) {
    console.log("Populating form with response data: ", responseData);
    const form = document.querySelector('[data-sysflow-query-form="pasteURLinput"]');
    if (form) {
        console.log("Form found. Appending hidden inputs.");
        appendHiddenInput(form, 'url', responseData.url);
        appendHiddenInput(form, 'title', responseData.title);
        appendHiddenInput(form, 'description', responseData.description);
        appendHiddenInput(form, 'image', responseData.images ? responseData.images[0] : null);
    } else {
        console.log("Form not found.");
    }
}

// Function to append hidden input to form
function appendHiddenInput(form, name, value) {
    console.log(`Appending hidden input to form. Name: ${name}, Value: ${value}`);
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value || '';
    form.appendChild(input);
}

// Call the function to fetch the data and populate the data on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded event fired. Calling fetchDataAndPopulate function.");
    fetchDataAndPopulate();
});
