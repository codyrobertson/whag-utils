document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById('wf-form-hero-url-input');
    var input = document.getElementById('paste-url-input');
    var submitButton = document.getElementById('verify-url-submit');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        var inputValue = input.value;
        if (inputValue) {
            window.location.href = "/join?url=" + encodeURIComponent(inputValue);
        }
    });
});
