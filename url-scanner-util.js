
    // Event listener for when the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", function() {
        // Get the input field, dropdown, spinner elements, and link scanner rows
        const inputField = document.getElementById('paste-url-input');
        const dropdown = document.querySelector('.url-scanner');
        const spinnerElements = document.querySelectorAll('.spinner');
        const linkScannerRows = document.querySelectorAll('.link-scanner-row');

        // Constants for animation timings
        const ANIMATION_ENTRANCE = 400;
        const ROW_DELAY = 650;

        // Function to validate URL
        function isValidURL(string) {
            // Regular expression for URL validation
            const pattern = new RegExp(
                '^(https?:\\/\\/)' + 
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
                '((\\d{1,3}\\.){3}\\d{1,3}))' + 
                '(\\:\\d+)?' + 
                '(\\/[-a-z\\d%_.~+]*)*' + 
                '(\\?[;&a-z\\d%_.~+=-]*)?' + 
                '(\\#[-a-z\\d_]*)?$', 'i'
            );

            // Regular expression to check for a dot after the protocol
            const dotAfterProtocol = /https?:\/\/(www\.)?.*\..+/;
            // Return true if the string matches both regular expressions
            return !!pattern.test(string) && dotAfterProtocol.test(string);
        }

        // Function to animate other rows
        function animateOtherRows() {
            // For each row, if it's not the first one, animate it
            linkScannerRows.forEach((row, index) => {
                if (index !== 0) {
                    const delay = ROW_DELAY * index;
                    setTimeout(() => {
                        const textElement = row.querySelector('data-label');
                        const spinner = row.querySelector('.spinner');
                        let dots = '';
                        // Create an interval to add dots to the text
                        let dotInterval = setInterval(() => {
                            dots = dots.length < 3 ? dots + '.' : '';
                            textElement.textContent = textElement.textContent.replace(/\.*$/, dots);
                        }, ANIMATION_ENTRANCE / 3);
                        // After the entrance animation, clear the interval and set the text to 'Done'
                        setTimeout(() => {
                            clearInterval(dotInterval);
                            textElement.textContent = 'Done';
                        }, ANIMATION_ENTRANCE);
                    }, delay);
                }
            });
        }

        // Function to handle input
        function handleInput() {
            // If the input is a valid URL, remove the 'dropdown-inactive' class and animate other rows
            if (isValidURL(inputField.value)) {
                dropdown.classList.remove('dropdown-inactive');
                animateOtherRows();
            } else {
                // If the input is not a valid URL, add the 'dropdown-inactive' class
                dropdown.classList.add('dropdown-inactive');
            }
        }

        // Add event listeners for 'input' and 'paste' events on the input field
        inputField.addEventListener('input', handleInput);
        inputField.addEventListener('paste', handleInput);

        // Add an event listener for 'click' events on the body
        document.body.addEventListener('click', function(event) {
            // If the click event target is not the input field or the dropdown, add the 'dropdown-inactive' class
            if (!inputField.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.add('dropdown-inactive');
            }
        });

        // Add an event listener for 'blur' events on the input field
        inputField.addEventListener('blur', function() {
            // If the input is not a valid URL, add the 'dropdown-inactive' class
            if (!isValidURL(inputField.value)) {
                dropdown.classList.add('dropdown-inactive');
            }
        });
    });



