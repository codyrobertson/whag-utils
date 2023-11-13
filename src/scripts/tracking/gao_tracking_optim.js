// This function reports a conversion to Google Analytics
const gtag_report_conversion = (url) => {
    const callback = () => {
      if (url) {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-11161763320/f2AlCPLGzeYYEPj7q8op',
        'event_callback': callback
    });
    return false;
  }
  
  // This function initializes Google Analytics and Google Tag Manager
  window.onload = () => {
      console.log("Window loaded. Initializing Google Analytics and Google Tag Manager...");
  
      // Google Tag Manager initialization
      ((w,d,s,l,i) => {
          console.log("Initializing Google Tag Manager...");
          w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
          const f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          console.log("Google Tag Manager initialized.");
      })(window,document,'script','dataLayer','GTM-KK9R4V5');
  
      // Google tag (gtag.js) initialization
      (() => {
          console.log("Initializing Google tag...");
          const script = document.createElement('script');
          script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DSSHY4WKD2';
          script.async = true;
          document.head.appendChild(script);
  
          window.dataLayer = window.dataLayer || [];
          const gtag = () => {dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DSSHY4WKD2');
          console.log("Google tag initialized.");
      })();
  };
  
  // This function initializes event handlers when the DOM is fully loaded
  window.addEventListener('DOMContentLoaded', () => {
      console.log("DOM loaded. Initializing event handlers...");
      const formElement = document.querySelector('#Join-Whag-Form-Block');
      const multiSelectElement = document.querySelector('#multiSelectId');
      let referrerElement = document.querySelector('[data-referrer]');
  
      // This function handles referrer data
      const handleReferrerData = () => {
          console.log("Handling referrer data...");
          if (!referrerElement) {
              referrerElement = document.createElement('div');
              referrerElement.style.display = 'none';
              referrerElement.setAttribute('data-referrer', '');
              referrerElement.setAttribute('data-referrer-page', '');
              document.body.appendChild(referrerElement);
          }
          referrerElement.setAttribute("data-referrer", document.referrer);
          referrerElement.setAttribute("data-referrer-page", new URL(document.referrer).pathname);
          console.log("Referrer data handled. Referrer: ", document.referrer, " Referrer Page: ", new URL(document.referrer).pathname);
      }
  
      // This function handles form submission
      const handleFormSubmission = () => {
          console.log("Form submission handled.");
          gtag_report_conversion();
      }
  
      // This function handles click events
      document.body.addEventListener('click', (event) => {
          console.log("Handling click event...");
          const category = event.target.getAttribute('data-card-category') || event.target.getAttribute('data-event-category');
          const action = event.target.getAttribute('data-card-action') || event.target.getAttribute('data-event-action');
          let label = event.target.getAttribute('data-card-label') || event.target.getAttribute('data-event-label');
          let url = event.target.getAttribute('data-card-url');
          if (event.target.tagName === 'A') {
              label = event.target.textContent;
              url = event.target.href;
          }
          if (category) {
              window.ga && ga('send', 'event', category, action, label, { 'page': url });
              console.log("Click event handled. Category: ", category, " Action: ", action, " Label: ", label, " URL: ", url);
          }
      });
  
      // This function handles form submission events
      if (formElement) {
          formElement.addEventListener('submit', (event) => {
              console.log("Handling form submission event...");
              const category = event.target.getAttribute('data-form-category');
              const action = event.target.getAttribute('data-form-action');
              const label = event.target.getAttribute('data-form-label');
              if (category) {
                  window.ga && ga('send', 'event', category, action, label);
                  console.log("Form submission event handled. Category: ", category, " Action: ", action, " Label: ", label);
              }
          });
      }
  
      handleReferrerData();
      handleFormSubmission();
      console.log("Initialization complete.");
  });
  
