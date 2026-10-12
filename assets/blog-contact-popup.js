/* Opens the contact form in a popup on blog pages instead of sending visitors to the homepage. */
(function () {
  var FORM = 'https://forms.zohopublic.in/vinaytoshniwal/form/HTMLContactForm/formperma/Z1BxD8WsmCXHX8NbrPj9zc7BeeRCnSCgSDCmo4YnZjU';
  var css = '.bcp{position:fixed;inset:0;z-index:2000;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(5,12,24,.78)}' +
    '.bcp.open{display:flex}' +
    '.bcp__box{position:relative;width:100%;max-width:520px;max-height:92vh;overflow:auto;background:#0d1b2e;border:1px solid rgba(212,175,55,.35);border-radius:16px;padding:44px 16px 16px}' +
    '.bcp__x{position:absolute;top:6px;right:10px;background:none;border:0;color:#fff;font-size:28px;line-height:1;cursor:pointer;padding:6px}' +
    '.bcp__box iframe{width:100%;height:560px;border:0;border-radius:12px;background:#fff;display:block}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var m = document.createElement('div');
  m.className = 'bcp';
  m.setAttribute('role', 'dialog');
  m.setAttribute('aria-modal', 'true');
  m.setAttribute('aria-label', 'Contact form');
  m.innerHTML = '<div class="bcp__box"><button class="bcp__x" type="button" aria-label="Close">&times;</button><iframe title="Contact form" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>';
  document.body.appendChild(m);
  var frame = m.querySelector('iframe');

  function open() {
    if (!frame.src) frame.src = FORM;
    m.classList.add('open');
    try { if (window.gtag) gtag('event', 'contact_form_open', { page_path: location.pathname }); } catch (e) {}
  }
  function close() { m.classList.remove('open'); }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t.closest) return;
    var a = t.closest('a[href$="#contact"]');
    if (a && a.textContent.replace(/\s+/g, ' ').trim() === 'Get Help Now') { e.preventDefault(); open(); return; }
    if (t === m || t.closest('.bcp__x')) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  window.addEventListener('message', function (ev) {
    try {
      if (!/forms\.zohopublic\.in$/.test(new URL(ev.origin).host)) return;
      if (ev.source !== frame.contentWindow) return;
      var s = typeof ev.data === 'string' ? ev.data : JSON.stringify(ev.data);
      if (s && s.indexOf('zf_submitform') > -1 && window.gtag) gtag('event', 'generate_lead', { form: 'blog_contact' });
    } catch (x) {}
  });
})();
