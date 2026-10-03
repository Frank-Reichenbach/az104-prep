// Apply the saved or system theme before first paint to avoid a flash.
// Preference values: 'light', 'dark', or none (follow the system).
(function () {
  var pref;
  try { pref = localStorage.getItem('az104-theme'); } catch (e) {}
  if (pref !== 'light' && pref !== 'dark') pref = 'system';
  var dark = pref === 'dark' || (pref === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  var root = document.documentElement;
  root.dataset.theme = dark ? 'dark' : 'light';
  root.dataset.themePref = pref;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = dark ? '#0f1a22' : '#f0f4f6';
})();
