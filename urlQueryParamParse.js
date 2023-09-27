(() => {
    class QueryParser {
        constructor(query) {
            this.query = [];
            if (query) {
                this.parse(query);
            }
        }

        parse(query) {
            const params = (query.charAt(0) === '?' ? query.slice(1) : query).split('&');
            params.forEach(param => {
                const [key, value] = param.split('=');
                this.set(key, decodeURIComponent(value));
            });
        }

        get(key) {
            const param = this.query.find(({ key: k }) => k === key);
            return param ? param.value : null;
        }

        set(key, value) {
            this.remove(key);
            this.query.push({ key, value });
        }

        remove(key) {
            this.query = this.query.filter(({ key: k }) => k !== key);
        }
    }

    const forms = document.querySelectorAll("[data-sysflow-query-form]");
    if (forms.length) {
        const queryParser = new QueryParser(window.location.search);
        forms.forEach(form => {
            const queryKey = form.dataset.sysflowQueryForm;
            const queryValue = queryParser.get(queryKey);
            if (queryValue) {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = queryKey;
                input.value = queryValue;
                form.appendChild(input);
            }
        });
    }
})();
