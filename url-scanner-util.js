document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('pasteURLinput-2');
    const dropdown = document.querySelector('.url-scanner');
    const spinnerElements = Array.from(document.querySelectorAll('.spinner'));
    const linkScannerRows = Array.from(document.querySelectorAll('.link-scanner-row'));
    const checkCounter = document.querySelector('.body-text');
    let count = 1;
    let interval;

    const ANIMATION_ENTRANCE = 350; // Tweak this value for entrance animation
    const ROW_DELAY = 350; // Tweak this value for delay between rows

    function isValidURL(string) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(string);
    }

    function updateCounter() {
        if (count <= 6) {
            checkCounter.textContent = `In ${count}/6 Checks`;
            count++;
            requestAnimationFrame(updateCounter);
        } else {
            clearInterval(interval);
            spinnerElements[0].style.display = 'none';
            linkScannerRows[0].querySelector('.check').classList.remove('check-hide');
            animateOtherRows();
        }
    }

    function animateOtherRows() {
        linkScannerRows.slice(1).forEach((row, index) => {
            setTimeout(() => {
                const textElement = row.querySelector('.body-text.c-t-neutral-60');
                const spinner = row.querySelector('.spinner');
                const check = row.querySelector('.check');
                let dots = '';
                let dotInterval = setInterval(() => {
                    dots = dots.length < 3 ? dots + '.' : '';
                    textElement.textContent = textElement.textContent.replace(/\.*$/, dots);
                }, ANIMATION_ENTRANCE / 3);
                setTimeout(() => {
                    clearInterval(dotInterval);
                    spinner.style.display = 'none';
                    check.classList.remove('check-hide');
                    textElement.textContent = 'Done';
                }, ANIMATION_ENTRANCE);
            }, ROW_DELAY * (index + 1));
        });
    }

    inputField.addEventListener('input', function() {
        if (isValidURL(inputField.value)) {
            dropdown.classList.remove('dropdown-inactive');
            interval = setInterval(updateCounter, ANIMATION_ENTRANCE / 6);
        } else {
            dropdown.classList.add('dropdown-inactive');
        }
    });

    document.addEventListener('click', function(event) {
        if (!inputField.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add('dropdown-inactive');
        }
    });

    inputField.addEventListener('blur', function() {
        if (!isValidURL(inputField.value)) {
            dropdown.classList.add('dropdown-inactive');
        }
    });
});
