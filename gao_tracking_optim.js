
    window.onload = function() {
        // Google Tag Manager
        (function(w,d,s,l,i){
            w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KK9R4V5');

        // Google tag (gtag.js)
        (function() {
            var script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DSSHY4WKD2';
            script.async = true;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DSSHY4WKD2');
        })();
    };
</script>

<!-- Google Tag Manger, GA4, Google Optimize Chad Code--> 
<script defer>
    window.addEventListener('DOMContentLoaded', function() {
        // Cache DOM elements to avoid repetitive queries
        var formElement = document.querySelector('#yourFormId');
        var multiSelectElement = document.querySelector('#multiSelectId');
        var referrerElement = document.querySelector('[data-referrer]');

        // Function to handle referrer data
        function handleReferrerData() {
            if (!referrerElement) {
                referrerElement = document.createElement('div');
                referrerElement.style.display = 'none';
                referrerElement.setAttribute('data-referrer', '');
                referrerElement.setAttribute('data-referrer-page', '');
                document.body.appendChild(referrerElement);
            }
            referrerElement.setAttribute("data-referrer", document.referrer);
            referrerElement.setAttribute("data-referrer-page", new URL(document.referrer).pathname);
        }

        // Function to handle form submission
        function handleFormSubmission() {
            if (multiSelectElement) {
                var selectedOptions = Array.from(multiSelectElement.selectedOptions).map(function(option) {
                    return option.value;
                }).join(', ');
                window.ga && ga('send', 'event', 'user_acquisition', 'form_submission', 'how_user_found_out', selectedOptions);
            }
        }

        // Event delegation for click events
        document.body.addEventListener('click', function(event) {
            var category = event.target.getAttribute('data-card-category') || event.target.getAttribute('data-event-category');
            var action = event.target.getAttribute('data-card-action') || event.target.getAttribute('data-event-action');
            var label = event.target.getAttribute('data-card-label') || event.target.getAttribute('data-event-label');
            var url = event.target.getAttribute('data-card-url');
            if (category) {
                window.ga && ga('send', 'event', category, action, label, { 'page': url });
            }
        });

        // Event delegation for form submission events
        if (formElement) {
            formElement.addEventListener('submit', function(event) {
                var category = event.target.getAttribute('data-form-category');
                var action = event.target.getAttribute('data-form-action');
                var label = event.target.getAttribute('data-form-label');
                if (category) {
                    window.ga && ga('send', 'event', category, action, label);
                }
            });
        }

        // Invoke the functions
        handleReferrerData();
        handleFormSubmission();
    });
