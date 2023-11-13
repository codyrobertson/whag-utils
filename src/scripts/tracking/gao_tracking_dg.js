window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DSSHY4WKD2");

// Function to send custom events to GA
function sendCustomEventToGA(event_category, eventAction) {
  gtag("event", eventAction, { event_category });
}

// Function to track form appearance in the viewport
function trackFormAppearance(formId) {
  sendCustomEventToGA("Form Appearance", "dg-form-view_" + formId);
}

document.addEventListener("DOMContentLoaded", function () {
  // Tracking link clicks
  const aTags = document.querySelectorAll("a");
  aTags.forEach((aTag) => {
    aTag.addEventListener("click", function () {
      const linkText = aTag.getAttribute("href") || "#";
      sendCustomEventToGA("Link Click", "dg-click_" + linkText);
    });
  });

  // Tracking form submissions
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function () {
      const formId = form.id || "Form";
      sendCustomEventToGA("Form Submission", "dg-submit_" + formId);
    });
  });

  // Intersection Observer to track form appearance
  const formObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const formId = entry.target.id || "Form";
        trackFormAppearance(formId);
        // Stop observing once the form appears to avoid multiple triggers
        observer.unobserve(entry.target);
      }
    });
  });

  const formsToObserve = document.querySelectorAll("form");
  formsToObserve.forEach((form) => {
    formObserver.observe(form);
  });
});
