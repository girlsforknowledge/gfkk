// SHARED SETTINGS: This file is the helper used by every page. // starts a note, not an action.

const GFK = {
  // WHATSAPP NUMBER: Country code + number, digits only. This controls the form. Also update the separate wa.me links and printed numbers in all HTML pages.
  whatsapp: '41763584349'
};
// START-UP: Set up the page once its HTML is ready.
function init(){
  // Find the phone-menu button and the list of links.
  const menu=document.querySelector('.menu-btn'), links=document.querySelector('.nav-links');
  // Clicking the phone-menu button adds/removes the open class. CSS uses that class to show/hide links. aria-expanded tells assistive tools whether the menu is open.
  menu?.addEventListener('click',()=>{links?.classList.toggle('open');menu.setAttribute('aria-expanded',links?.classList.contains('open')?'true':'false')});
  // On screens 980 pixels wide or smaller, tap Our Work to open its list. Keep this number in step with the CSS breakpoint.
  const dd=document.querySelector('.dropdown-toggle'); dd?.addEventListener('click',(e)=>{if(window.innerWidth<=980){e.preventDefault();dd.parentElement.classList.toggle('open')}});
  // Find the contact form. Its data-whatsapp-form marker connects it to this helper.
  document.querySelectorAll('form[data-whatsapp-form]').forEach(form=>{
    // Run these steps when the visitor presses the form button.
    form.addEventListener('submit',(e)=>{
      // Stop a normal page submission, then collect the name and message fields.
      e.preventDefault(); const fd=new FormData(form);
      // Build the WhatsApp message. ${...} inserts the typed name/message; \n starts a new line.
      const text=`Hello, my name is ${fd.get('name')}.\n${fd.get('message')}`;
      // Open WhatsApp with a ready-to-send message. encodeURIComponent makes spaces and special characters safe in the link. The visitor must still press Send there.
      window.open(`https://wa.me/${GFK.whatsapp}?text=${encodeURIComponent(text)}`,'_blank','noopener');
    })
  });
}
// Wait until the page building blocks exist before running init.
document.addEventListener('DOMContentLoaded',init);
