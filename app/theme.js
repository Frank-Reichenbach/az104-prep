// Apply the saved or system theme before first paint to avoid a flash.
(function () {
  var theme;
  try { theme = localStorage.getItem('az104-theme'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
})();
