<script defer>
    document.addEventListener("DOMContentLoaded", function() {
        const inputField = document.getElementById('paste-url-input');
        const dropdown = document.querySelector('.url-scanner');
        const spinnerElements = document.querySelectorAll('.spinner');
        const linkScannerRows = document.querySelectorAll('.link-scanner-row');
        const checkCounter = document.getElementById('data-label');
        let count = 1;
        let rafId;

        const ANIMATION_ENTRANCE = 350;
        const ROW_DELAY = 350;

        function isValidURL(string) {
            const pattern = new RegExp(
                '^(https?:\\/\\/)' + 
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
                '((\\d{1,3}\\.){3}\\d{1,3}))' + 
                '(\\:\\d+)?' + 
                '(\\/[-a-z\\d%_.~+]*)*' + 
                '(\\?[;&a-z\\d%_.~+=-]*)?' + 
                '(\\#[-a-z\\d_]*)?$', 'i'
            );

            const dotAfterProtocol = /https?:\/\/(www\.)?.*\..+/;
            return !!pattern.test(string) && dotAfterProtocol.test(string);
        }

        function updateCounter() {
            if (count <= 6) {
                checkCounter.textContent = `In ${count}/6 Checks`;
                count++;
                rafId = requestAnimationFrame(updateCounter);
            } else {
                cancelAnimationFrame(rafId);
                spinnerElements[0].style.display = 'none';
                linkScannerRows[0].querySelector('.check').classList.remove('check-hide');
                animateOtherRows();
            }
        }

        function animateOtherRows() {
            linkScannerRows.forEach((row, index) => {
                if (index !== 0) {
                    const delay = ROW_DELAY * index;
                    setTimeout(() => {
                        const textElement = row.querySelector('data-label');
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
                    }, delay);
                }
            });
        }

        function handleInput() {
            if (isValidURL(inputField.value)) {
                dropdown.classList.remove('dropdown-inactive');
                rafId = requestAnimationFrame(updateCounter);
            } else {
                dropdown.classList.add('dropdown-inactive');
                cancelAnimationFrame(rafId);
            }
        }

        inputField.addEventListener('input', handleInput);
        inputField.addEventListener('paste', handleInput);

        document.body.addEventListener('click', function(event) {
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
</script>
