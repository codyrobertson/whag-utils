document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with the data-text-replace attribute set to true
    const replaceElements = document.querySelectorAll('[data-text-replace="true"]');

    // Check the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const hasParams = urlParams.toString();

    // Function to toggle display based on condition
    const toggleDisplay = (element, condition) => {
        if (condition) {
            element.style.display = 'block';
            element.classList.remove('Hidden');
        } else {
            element.style.display = 'none';
            element.classList.add('Hidden');
        }
    };

    // Iterate over each element
    replaceElements.forEach(element => {
        // Get the value of data-text-replace-event attribute
        const event = element.getAttribute('data-text-replace-event');

        // Logic for ref-form
        if (event === 'ref-form') {
            toggleDisplay(element, hasParams);
        }

        // Logic for ref-nav
        if (event === 'ref-nav') {
            toggleDisplay(element, !hasParams);
        }
    });
});
