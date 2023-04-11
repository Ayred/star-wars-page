export default ({ app }, inject) => {
  inject('helpers', {
    formatDate(date) {
      if (!date) return null;

      var [year, month, day] = date.substr(0, 10).split('-');
      return `${month}/${day}/${year}`;
    },
    getIdFromUrl(url) {
      const index = url.endsWith('/') ? 1 : 0;
      return url.split('/').reverse()[index];
    },
  });
};
