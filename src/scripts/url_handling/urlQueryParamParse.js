const parseQuery = (query) => {
    const params = (query.charAt(0) === '?' ? query.slice(1) : query).split('&');
    return params.reduce((acc, param) => {
        const [key, value] = param.split('=');
        return { ...acc, [key]: decodeURIComponent(value) };
    }, {});
}

const appendQueryToForms = (query) => {
    const forms = document.querySelectorAll("[data-sysflow-query-form]");
    if (forms.length) {
        const parsedQuery = parseQuery(query);
        forms.forEach(form => {
            const queryKey = form.dataset.sysflowQueryForm;
            const queryValue = parsedQuery[queryKey];
            if (queryValue) {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = queryKey;
                input.value = queryValue;
                form.appendChild(input);
            }
        });
    }
}

appendQueryToForms(window.location.search);
