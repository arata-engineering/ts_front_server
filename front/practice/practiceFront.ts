(() => {
    if (!location.search.length && !location.href.endsWith("?")) {
      const redirectPageParams: URLSearchParams = new URLSearchParams({key: "zaiko"});
      location.replace(`${location.href}?${redirectPageParams.toString()}`);
    }
})();

const containerElementOfJquery: JQuery<HTMLElement> = $(".container");
const containerElement = containerElementOfJquery.get(0);
(containerElement as HTMLElement).textContent = "aaaa";