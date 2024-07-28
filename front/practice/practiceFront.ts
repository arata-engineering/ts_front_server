(() => {
    if (!location.search.length && !location.href.endsWith("?")) {
      const redirectPageParams: URLSearchParams = new URLSearchParams({key: "zaiko"});
      location.replace(`${location.href}?${redirectPageParams.toString()}`);
    }
})();