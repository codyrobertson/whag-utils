window.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('[class^="truncate-"], [class*=" truncate-"]');
    const re = /truncate-(\d+)/;

    elements.forEach(element => {
      const matches = element.className.match(re);
      if (matches) {
        const limit = parseInt(matches[1], 10);
        if (!isNaN(limit) && element.textContent.length > limit) {
          element.textContent = `${element.textContent.substring(0, limit)}...`;
        }
      }
    });
  });
