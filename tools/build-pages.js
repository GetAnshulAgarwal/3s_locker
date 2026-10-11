// Generates the 19 inner pages into public/ and refreshes the shared header/footer on public/index.html.
// Run: node tools/build-pages.js
const fs = require('fs');
const path = require('path');

const PUB = path.join(__dirname, '..', 'public');
const SITE = '3S Safe Storage Solutions';

const LOCKERS = [
  ['standard-lockers', 'Standard Lockers'],
  ['day-use-lockers', 'Day Use Lockers'],
  ['outdoor-lockers', 'Outdoor Lockers'],
  ['asset-management-lockers', 'Asset Management Lockers'],
  ['smart-package-rooms', 'Smart Package Rooms']
];
const INDUSTRY_NAV = [
  ['retail', 'Retail'], ['residential', 'Residential'], ['education', 'Educational Institutes'],
  ['workplaces', 'Workplaces'], ['libraries', 'Libraries'], ['government', 'Government'],
  ['healthcare', 'Healthcare'], ['fitness', 'Gyms & Fitness']
];

const amp = (s) => s.replace(/&(?!amp;)/g, '&amp;');


/* ---------- splash (intro) screen ---------- */
const HEAD_FLAGS = "<script>document.documentElement.className+=' js';try{if(!sessionStorage.getItem('3s_splash')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.className+=' splash-on'}catch(e){}</script>";
const SPLASH = () => `<div class="splash" id="splash" aria-hidden="true">
  <div class="splash-inner">
    <svg class="splash-mark" viewBox="0 0 100 100"><rect class="sp-draw" x="5" y="5" width="90" height="90" rx="10" fill="none" stroke="#00b3ff" stroke-width="5"/><line class="sp-draw" x1="50" y1="5" x2="50" y2="95" stroke="#00b3ff" stroke-width="4"/><line class="sp-draw" x1="5" y1="50" x2="95" y2="50" stroke="#00b3ff" stroke-width="4"/><g class="sp-lock"><path d="M40,46 v-9 a10,10 0 0 1 20,0 v9" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="31" y="45" width="38" height="32" rx="7" fill="#fff"/><circle cx="50" cy="58" r="4.5" fill="#081226"/><rect x="47.5" y="60" width="5" height="9" fill="#081226"/></g></svg>
    <div class="splash-3s">3S</div>
    <div class="splash-name">Safe Storage Solutions</div>
    <div class="splash-tag">We Secure Your Belongings</div>
    <div class="splash-bar"><span></span></div>
  </div>
</div><!--/splash-->`;

/* ---------- shared chrome ---------- */
const LOGO = (stroke, ink, dot) => `<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true"><rect x="5" y="5" width="90" height="90" rx="10" fill="none" stroke="${stroke}" stroke-width="7"/><line x1="50" y1="5" x2="50" y2="95" stroke="${stroke}" stroke-width="6"/><line x1="5" y1="50" x2="95" y2="50" stroke="${stroke}" stroke-width="6"/><path d="M40,46 v-9 a10,10 0 0 1 20,0 v9" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="31" y="45" width="38" height="32" rx="7" fill="${ink}"/><circle cx="50" cy="58" r="4.5" fill="${dot}"/><rect x="47.5" y="60" width="5" height="9" fill="${dot}"/></svg>`;

const header = () => `<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a href="/" class="brand" aria-label="${SITE} — Home">
      ${LOGO('#046bd2', '#21272a', '#fff')}
      <span class="brand-word"><span class="brand-3s">3S</span><span class="brand-name">Safe Storage Solutions</span></span>
    </a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button>
    <nav class="primary-nav" id="primary-nav">
      <ul>
        <li><a href="/about/" class="nav-link">About</a></li>
        <li><a href="/platform/" class="nav-link">Platform</a></li>
        <li class="has-drop">
          <button type="button" class="nav-link navtop" aria-expanded="false">Package Lockers <span class="caret"></span></button>
          <div class="drop">${LOCKERS.map(([s, n]) => `<a href="/package-lockers/${s}/">${amp(n)}</a>`).join('')}</div>
        </li>
        <li class="has-drop">
          <button type="button" class="nav-link navtop" aria-expanded="false">Industries <span class="caret"></span></button>
          <div class="drop">${INDUSTRY_NAV.map(([s, n]) => `<a href="/${s}/">${amp(n)}</a>`).join('')}</div>
        </li>
        <li><a href="/software/" class="nav-link">Software</a></li>
        <li><a href="/resources/" class="nav-link">Resources</a></li>
        <li><a href="/contact/" class="nav-link">Contact</a></li>
        <li class="nav-search"><input id="site-search" type="search" placeholder="Search…" autocomplete="off" aria-label="Search this site"></li>
      </ul>
      <a href="/get-quote/" class="btn btn-outline nav-ghost">Get a quote</a>
      <a href="/contact/" class="btn btn-primary">Book a demo</a>
    </nav>
  </div>
</header>`;

const footer = () => `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <p class="footer-name">${SITE}</p>
      <p>We Secure Your Belongings. Smart lockers designed, built and supported from Meerut, U.P.</p>
    </div>
    <div><h4>Solutions</h4>${INDUSTRY_NAV.map(([s, n]) => `<a href="/${s}/">${amp(n)}</a>`).join('')}</div>
    <div><h4>Products &amp; Software</h4>${LOCKERS.map(([s, n]) => `<a href="/package-lockers/${s}/">${amp(n)}</a>`).join('')}<a href="/software/">Locker Software</a></div>
    <div><h4>Company</h4><a href="/about/">About</a><a href="/platform/">Platform</a><a href="/resources/">Resources</a><a href="/contact/">Contact</a><a href="/get-quote/">Get a quote</a></div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p>&copy; <span id="year">2026</span> ${SITE}. All rights reserved.</p>
      <button type="button" class="to-top" id="to-top">Scroll to top ↑</button>
    </div>
    <div class="container copyright-note">
      <p>All content on this website, including text, photographs, graphics, videos, page layout and design, is the property of ${SITE} and is protected by copyright law. No part of it may be copied, reproduced, modified or distributed without prior written permission.</p>
    </div>
  </div>
</footer>`;

/* ---------- building blocks ---------- */
const reveal = 'reveal';
const IMG = (f, alt, cls = '') => `<img src="/assets/images/${f}" alt="${amp(alt)}" loading="lazy"${cls ? ` class="${cls}"` : ''}>`;
const hero = ({ crumbs, eyebrow, title, intro, ctas = true, badges = [], image }) => `
  <section class="page-hero">
    <div class="container${image ? ' page-hero-grid' : ''}">
      <div>
      ${eyebrow ? `<p class="eyebrow">${amp(eyebrow)}</p>` : ''}
      <h1>${amp(title)}</h1>
      <p class="hero-sub">${amp(intro)}</p>
      ${badges.length ? `<ul class="badges">${badges.map((b) => `<li>${amp(b)}</li>`).join('')}</ul>` : ''}
      ${ctas ? `<div class="hero-actions"><a href="/contact/" class="btn btn-light btn-lg">Book a demo</a><a href="/get-quote/" class="btn btn-outline-light btn-lg">Get a quote</a></div>` : ''}
      </div>
      ${image ? `<div class="page-hero-img">${IMG(image[0], image[1])}</div>` : ''}
    </div>
  </section>`;

const head = (eyebrow, title, sub) => `<div class="section-head"><p class="section-eyebrow ${reveal}">${amp(eyebrow)}</p><h2 class="section-title ${reveal}">${amp(title)}</h2>${sub ? `<p class="section-sub ${reveal}">${amp(sub)}</p>` : ''}</div>`;
const cards = (items, cols = 3) => `<div class="grid grid-${cols}">${items.map(([t, p, e]) => `<article class="card ${reveal}${e ? ' has-emoji' : ''}">${e ? `<div class="emoji-tile" aria-hidden="true">${e}</div>` : ''}<h3>${amp(t)}</h3><p>${amp(p)}</p></article>`).join('')}</div>`;
const fitCards = (items) => `<div class="grid grid-3">${items.map(([e, t, p]) => `<article class="card fit-card ${reveal}"><div class="emoji-icon" aria-hidden="true">${e}</div><div><h3>${amp(t)}</h3><p>${amp(p)}</p></div></article>`).join('')}</div>`;
const stepCards = (steps) => `<div class="grid grid-3">${steps.map(([t, p], i) => `<article class="card step-card2 ${reveal}"><span class="sq-num">${i + 1}</span><h3>${amp(t)}</h3><p>${amp(p)}</p></article>`).join('')}</div>`;
const section = (inner, cls = '', id = '') => `<section class="section ${cls}"${id ? ` id="${id}"` : ''}><div class="container">${inner}</div></section>`;
const checks = (arr) => `<ul class="checks">${arr.map((x) => `<li>${amp(x)}</li>`).join('')}</ul>`;
const faq = (items) => `<div class="faq-list">${items.map(([q, a]) => `<div class="faq-item ${reveal}"><h3>${amp(q)}</h3><p>${amp(a)}</p></div>`).join('')}</div>`;
const cta = (title = 'Ready to Get Started?', text = 'Book a short demo and we will scope the sizes, quantities and integrations for your space.') => `
  <section class="cta-band"><div class="container">
    <h2 class="${reveal}">${amp(title)}</h2><p class="${reveal}">${amp(text)}</p>
    <div class="hero-actions ${reveal}"><a href="/contact/" class="btn btn-light btn-lg">Book a demo</a><a href="mailto:3ssafestorage@gmail.com?subject=Demo%20request" class="btn btn-outline-light btn-lg">Email us</a></div>
  </div></section>`;
const split = (eyebrow, title, text, list, icon, flip = false, image = null) => `<section class="section"><div class="container split${flip ? ' flip' : ''}"><div class="${reveal}"><p class="section-eyebrow">${amp(eyebrow)}</p><h2 class="section-title">${amp(title)}</h2><p class="section-sub">${amp(text)}</p>${list ? checks(list) : ''}</div><div class="split-media ${reveal}">${image ? IMG(image[0], image[1]) : `<div class="ph" aria-hidden="true">${icon}</div>`}</div></section>`.replace('</div></section>', '</div></div></section>');

const ICON_LOCK = '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const ICON_CLOUD = '<svg viewBox="0 0 24 24"><path d="M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/></svg>';
const ICON_PHONE = '<svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>';
const ICON_SHIELD = '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>';
const ICON_GRID = '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16M3 12h18"/></svg>';

const CERTS = ['SOC 2', 'ISO 27001', 'ADA'];

/* ---------- page definitions ---------- */
const pages = [];
const add = (url, title, description, body) => pages.push({ url, title, description, body });

/* About */
add('/about/', 'About', 'About 3S Safe Storage Solutions — a Meerut-based maker of smart lockers.',
  hero({ crumbs: [['Home', '/'], ['About']], eyebrow: 'About 3S', image: ['workplace.jpg', 'Smart lockers in a busy office lobby'], title: 'Secure Storage, Built and Supported in Meerut', intro: '3S Safe Storage Solutions designs, manufactures and installs smart lockers and the software that runs them, so organizations can store, deliver and share belongings without staff in the loop.' }) +
  `<section class="stats"><div class="container stats-grid">
    <div class="${reveal}"><div class="stat-num">Meerut</div><div class="stat-label">Design &amp; Manufacturing</div></div>
    <div class="${reveal}"><div class="stat-num">24/7</div><div class="stat-label">Self-Service Access</div></div>
    <div class="${reveal}"><div class="stat-num">${CERTS.length}</div><div class="stat-label">Certifications: ${CERTS.join(', ')}</div></div>
    <div class="${reveal}"><div class="stat-num">iOS · Android</div><div class="stat-label">Mobile Access</div></div></div></section>` +
  split('Our Story', 'Why We Build Lockers', 'Shared spaces lose belongings, parcels pile up at reception desks and manual key systems fail under heavy footfall. We started 3S to solve that with lockers that are rugged, easy to use and sized for the way each site actually works.', ['Built from Mohkampur Industrial Estate, Meerut', 'Live installations in high-footfall locations such as Tripti Bhojnalya, Katra', 'Custom sizing instead of one-size-fits-all templates'], ICON_GRID, false, ['installation-katra.jpg', '3S smart lockers installed at Tripti Bhojnalya, Katra']) +
  section(head('Leadership', 'The people behind 3S.', 'You deal directly with the people who build and service your system.') +
    cards([['Abhishek Dhamija', 'Director. Leads sales, design consultation and every customer relationship.', '🧑‍💼'], ['Engineering & Production', 'Our workshop team fabricates, powder-coats and assembles every locker bank in-house.', '🏭'], ['Installation & Support', 'On-site installers and service technicians keep your lockers running after handover.', '🛠️']]), 'section-alt lk') +
  cta('Let’s Plan Your Locker System', 'A short demo is all it takes to scope the right setup for your organization.'));

/* Platform */
add('/platform/', 'Platform', 'The 3S smart locker platform: integrations, cloud, security and analytics.',
  hero({ crumbs: [['Home', '/'], ['Platform']], eyebrow: 'Platform', image: ['remote-support.jpg', 'Locker kiosk with live video support'], title: 'One Platform Behind Every Locker', intro: 'The 3S platform links locker hardware to a cloud dashboard and your existing systems, so access control, notifications and reporting work together from day one, whether you run one bank or many sites.', badges: CERTS }) +
  section(head('Integrations', 'Connects to the tools you already use.', 'Pre-built connectors and open APIs so lockers fit into existing workflows.') + cards([
    ['Access Control & ID Cards', 'Use RFID cards, staff IDs or student credentials to open lockers.', '🪪'],
    ['User Directory Sync', 'Keep users and permissions aligned with your HR, student or resident records.', '👥'],
    ['Payment Gateways', 'Charge for storage or deliveries with UPI and card payments.', '💳'],
    ['Facility & Mailroom Systems', 'Push locker events into facility management and parcel tracking tools.', '🏢'],
    ['Enterprise Single Sign-On', 'Let staff sign in with the corporate login they already use.', '🔑'],
    ['REST API', 'Build custom apps that reserve, open and monitor lockers remotely.', '🔌']]), 'lk') +
  section(head('Locker Operating Software', 'Run every locker from one place.', 'Our software handles package workflows, reservations and permissions across all your sites.') + cards([
    ['Custom Workflows', 'Define how items are deposited, collected, returned and escalated.', '🧩'],
    ['Hardware Flexible', 'Works with 3S lockers and can be adapted to compatible existing banks.', '🔧'],
    ['Multi-Site Control', 'Manage many locations, user groups and locker banks from one account.', '🌐']]), 'section-alt lk') +
  section(head('Cloud & Scale', 'Reliable in the cloud.', 'Hosted on trusted cloud infrastructure with backups and redundancy, so the lockers keep working when you need them.') + cards([
    ['Cloud Hosting', 'Deployed on major cloud providers with automatic backups.', '☁️'],
    ['Encrypted Data', 'Customer data is encrypted in transit and at rest.', '🔒'],
    ['Uptime Focus', 'Redundant services and monitoring reduce the impact of outages.', '📶']]), 'lk') +
  section(head('Real-Time Data', 'See every open, close and pickup.', 'Live dashboards and automatic reports give operators full visibility.') + cards([
    ['Live Dashboards', 'Check compartment status and activity as it happens.', '📊'],
    ['Event Notifications', 'Alert recipients and staff on drop-off, pickup and overdue items.', '🔔'],
    ['Remote Diagnostics', 'Spot lock or door issues early and fix them before users notice.', '🛰️'],
    ['Reports & Exports', 'Download audit trails and usage reports in bulk.', '🧾']], 4), 'section-alt lk') +
  split('White Label', 'Your brand on your lockers.', 'Match lockers, screens and the mobile app to your organization’s name, colors and tone.', ['Custom-branded locker finishes', 'Branded interface and notifications', 'Flexible application setup for your workflow'], ICON_CLOUD, false, ['touchscreen.jpg', 'Branded locker touchscreen with pick up and drop off options']).replace('<section class="section">', '<section class="section lk">') +
  `<section class="section section-dark lk" id="certifications"><div class="container split"><div class="${reveal}"><p class="section-eyebrow" style="color:var(--sky)">Compliance</p><h2 class="section-title" style="color:#fff">🏅 ${CERTS.join(' · ')}</h2><p class="section-sub">3S holds ${CERTS.join(', ')} certifications. Certificate details are available on request.</p>${checks(['Controlled access and monitoring', 'Audit logs for every locker event', 'Accessible designs meeting ADA requirements'])}<a href="/contact/" class="btn btn-light" style="margin-top:20px">Request certificates</a></div><div class="split-media ${reveal}"><div class="ph" aria-hidden="true">${ICON_SHIELD}</div></div></div></section>` +
  `<section class="section lk" id="mobile-app"><div class="container split flip"><div class="${reveal}"><p class="section-eyebrow">Mobile App</p><h2 class="section-title">3S app for iOS &amp; Android.</h2><p class="section-sub">Open lockers, get notified and pay from your phone.</p>${checks(['Mobile unlock and reservations', 'Push notifications for drop-offs and pickups', 'Locker finder', 'In-app payments'])}</div><div class="split-media ${reveal}">${IMG('app-unlock-portrait.jpg', 'Unlocking a locker from the phone app', 'portrait')}</div></div></section>` +
  cta('Discover the Platform', 'See the dashboard and the app working with real lockers.'));

/* Package lockers */
const lockerData = {
  'standard-lockers': ['Standard Lockers', 'Indoor smart locker banks that let tenants, employees, students and guests send, receive and store items on their own schedule. Each compartment has an electronic lock, opens with a PIN, QR code, ID card or the 3S app, and is tracked in the cloud, so parcels, documents and belongings stay safe without anyone at the desk.', 'Corporate mailrooms, apartment lobbies and order pickup points.',
    [['Security', 'Every compartment opens only for the right person, with a full log of each access.'], ['Ease of Use', 'Self-service drop-off and pickup in seconds, any time of day.'], ['Contactless Workflows', 'Fewer touchpoints and optional sanitizing add-ons for shared spaces.']]],
  'day-use-lockers': ['Day Use Lockers', 'Shared, on-demand lockers for short stays. Users take any free compartment, keep it for a few hours and release it when they leave, so a small bank serves far more people than assigned lockers. Access works with an ID card, PIN, QR code or the 3S app, with automatic release and optional pay-per-use.', 'Gyms, offices, campuses, food courts and attractions.',
    [['Flexible Assignment', 'Users pick any open locker and release it when they are done.'], ['Automatic Release', 'Timers and rules return lockers to the pool without staff action.'], ['Optional Payments', 'Charge per use or per hour where it makes sense.']]],
  'outdoor-lockers': ['Outdoor Lockers', 'Weather-resistant smart lockers for gates, entrances and open public areas. Powder-coated steel, sealed electronics and reinforced doors keep contents safe through sun, dust and rain, while 24/7 self-service access means pickups and drop-offs never depend on staff or opening hours.', 'Housing societies, campuses, retail frontages and pilgrim routes.',
    [['Built for Weather', 'Powder-coated steel and sealed components handle sun, dust and rain.'], ['Always Available', 'Self-service access outside office hours.'], ['Tamper Resistant', 'Reinforced doors and locks designed for unattended sites.']]],
  'asset-management-lockers': ['Asset Management Lockers', 'Controlled storage for the devices, keys and equipment your teams share. Each item is checked out against a named user, tracked in a live audit log and chased automatically if it is late. Compartments can charge laptops and handhelds, so equipment is ready when the next person needs it.', 'IT departments, workshops, hospitals and facilities teams.',
    [['Accountability', 'Every check-out is tied to a person and time stamp.'], ['Charging Options', 'Compartments can be fitted to charge laptops, tablets and handhelds.'], ['Overdue Alerts', 'Automatic reminders when items are not returned on time.']]],
  'smart-package-rooms': ['Smart Package Rooms', 'Convert a mail or parcel room into a secure, self-service space. Credentialed door access, parcel scanning and instant recipient alerts replace manual hand-offs, and every entry and pickup is logged. Ideal for sites that handle large volumes or bulky items alongside regular lockers.', 'Large residential societies, campuses and corporate parks.',
    [['Room-Level Control', 'Credentialed access to a controlled room instead of staffed hand-offs.'], ['Package Tracking', 'Log arrivals, notify recipients and record pickups.'], ['Scales With Volume', 'Handle parcel peaks without adding front-desk staff.']]]
};

const lockerSteps = {
  'standard-lockers': [['Drop Off', 'A courier or staff member scans the parcel and the system opens a compartment of the right size.'], ['Get Notified', 'The recipient is alerted by app, SMS or email with a PIN or QR code.'], ['Collect & Free Up', 'They collect in seconds, and the compartment returns to the pool for the next delivery.']],
  'day-use-lockers': [['Identify Yourself', 'Tap an ID card or badge, or use a PIN, QR code or the 3S app.'], ['Store or Grab', 'A free locker opens automatically for storing, and one tap retrieves your items later.'], ['Auto-Free', 'The locker returns to the shared pool after pickup, so many people can use the bank at once.']],
  'outdoor-lockers': [['Arrive Any Time', 'Users reach the weather-sealed kiosk at any hour, with no staff on site.'], ['Verify', 'A code, app or card confirms who they are and which compartment is theirs.'], ['Open & Go', 'The compartment opens, they take their item and the door locks shut again.']],
  'asset-management-lockers': [['Request', 'A user picks the device, key or tool they need from the screen or app.'], ['Check Out', 'The compartment opens, and the item is logged against their name and time.'], ['Return', 'They put it back, charging starts where fitted, and the record closes automatically.']],
  'smart-package-rooms': [['Enter With Credentials', 'Couriers and recipients get door access with a card, code or app.'], ['Log & Notify', 'Each parcel is scanned in and the recipient is told it has arrived.'], ['Pick Up', 'The recipient enters, collects the parcel and the pickup is recorded.']]
};
const lockerFit = {
  'standard-lockers': [['🏢', 'Corporate mailrooms', 'Staff collect parcels themselves instead of queuing at a desk.'], ['🏘️', 'Residential lobbies', 'Residents pick up deliveries at any hour, safely.'], ['🎓', 'Campus buildings', 'Hostel and department parcels handled without extra staff.'], ['🛍️', 'Retail pickup points', 'Online orders waiting for customers after closing time.'], ['💼', 'Co-working spaces', 'Members receive deliveries without involving reception.'], ['🏥', 'Hospitals & clinics', 'Documents and supplies moved securely between teams.']],
  'day-use-lockers': [['🏢', 'Workplaces & offices', 'Hot-desking and hybrid teams get secure day storage.'], ['🏭', 'Factories & labs', 'Stow personal items before entering controlled areas.'], ['🎓', 'Schools & colleges', 'Students grab a locker between classes and leave it free.'], ['🏋️', 'Gyms & fitness', 'Members store belongings for a visit and the locker frees itself.'], ['🍽️', 'Food courts & malls', 'Visitors leave bags safely while they shop or eat.'], ['🚉', 'Transit & public venues', 'Self-service bag storage for travellers and visitors.']],
  'outdoor-lockers': [['🏘️', 'Housing societies', 'Gate-side parcel pickup for residents round the clock.'], ['🎓', 'Campus entrances', 'Weather-ready lockers at hostels and gates.'], ['🏪', 'Shop fronts', 'Click-and-collect available even when the shop is shut.'], ['⛽', 'Fuel stations', 'Convenient pickup and drop points on busy routes.'], ['🛕', 'Pilgrim & tourist routes', 'Belongings stored safely while visitors travel on foot.'], ['🌳', 'Parks & public spaces', 'Rugged storage for places with no building around it.']],
  'asset-management-lockers': [['💻', 'IT departments', 'Laptops, tablets and phones issued and returned with a log.'], ['🔧', 'Workshops & tool rooms', 'Know who has which tool at any moment.'], ['🏥', 'Hospitals', 'Shared devices checked out by authorised staff only.'], ['🏢', 'Facilities teams', 'Keys and access cards controlled with an audit trail.'], ['🔬', 'Schools & labs', 'Equipment borrowed and returned without a register.'], ['🔑', 'Security & key control', 'Strict custody records for sensitive items.']],
  'smart-package-rooms': [['🏘️', 'Large societies', 'Bulk deliveries handled in one controlled room.'], ['🏢', 'Corporate parks', 'Central mail room with no staff at the counter.'], ['🎓', 'University hostels', 'Student parcels logged and collected on their schedule.'], ['🏨', 'Hotels', 'Guest deliveries and luggage managed securely.'], ['🏛️', 'Government buildings', 'Documents and parcels with full access records.'], ['📦', 'Warehouses & depots', 'Hand-offs between carriers and teams, logged.']]
};
const lockerFaq = {
  'standard-lockers': [['How do recipients open a locker?', 'With a PIN, QR code, ID card or the 3S app, depending on how you set the system up.'], ['Can we choose compartment sizes?', 'Yes. We configure the mix of sizes around your typical items.'], ['What if a parcel is not collected?', 'You set a time limit, and the system sends reminders and flags overdue items.'], ['Do you install it?', 'Yes. Our team installs on site and trains your staff.']],
  'day-use-lockers': [['How is day-use different from assigned lockers?', 'Day-use lockers are not owned by anyone. Users take any free locker and it releases when they finish.'], ['Do users need an app?', 'No. A badge, PIN or QR code works, and the app is an optional extra.'], ['Can many people use the lockers at once?', 'Yes. The software handles simultaneous users and frees each locker automatically.'], ['Can we charge for use?', 'Yes, with optional payment through UPI or card.']],
  'outdoor-lockers': [['Are they weatherproof?', 'Yes. Powder-coated steel and sealed components are built for sun, dust and rain.'], ['Do they need power?', 'They need a basic power and network connection. Ask us about options for your site.'], ['Are they safe unattended?', 'Reinforced doors, tamper-resistant locks and audit logs protect what is inside.'], ['Can customers use them at night?', 'Yes. They are available 24/7.']],
  'asset-management-lockers': [['Can lockers charge devices?', 'Compartments can be fitted with charging for laptops, tablets and handhelds.'], ['How is each check-out tracked?', 'Every open is tied to a user and a time stamp in the audit log.'], ['What about overdue items?', 'Automatic reminders go to the user and to the manager.'], ['Can access depend on role?', 'Yes. Permissions can be set per person or per team.']],
  'smart-package-rooms': [['How is a package room different from lockers?', 'It is a controlled room with logging and notifications, suited to large or bulky volumes.'], ['Can it work with lockers too?', 'Yes. Many sites combine a room for bulky items with lockers for small parcels.'], ['How is access controlled?', 'By card, code or app, with a record of every entry.'], ['Can recipients sign for items?', 'Yes. Pickup confirmations can be recorded in the software.']]
};
const timeline = (steps) => `<ol class="timeline">${steps.map(([t, p], i) => `<li class="${reveal}"><span class="tl-num">${i + 1}</span><h3>${amp(t)}</h3><p>${amp(p)}</p></li>`).join('')}</ol>`;
const lockerImg = { 'standard-lockers': 'lobby-dropoff.jpg', 'day-use-lockers': 'phone-unlock.jpg', 'outdoor-lockers': 'residential.jpg', 'asset-management-lockers': 'touchscreen.jpg', 'smart-package-rooms': 'courier-dropoff.jpg' };
const indHero = { retail: 'retail.jpg', residential: 'residential.jpg', education: 'education.jpg', workplaces: 'workplace.jpg', libraries: 'library.jpg', government: 'government.jpg', healthcare: 'healthcare.jpg', fitness: 'fitness.jpg' };
const indSide = { retail: 'phone-qr.jpg', residential: 'lobby-dropoff.jpg', education: 'phone-unlock.jpg', workplaces: 'scan-portrait.jpg', libraries: 'industries-trio.jpg', government: 'remote-support.jpg', healthcare: 'campus-medical.jpg', fitness: 'touchscreen.jpg' };
LOCKERS.forEach(([slug, name]) => {
  const [, intro, useCase, why] = lockerData[slug];
  add(`/package-lockers/${slug}/`, name, `${name} from 3S Safe Storage Solutions.`,
    hero({ crumbs: [['Home', '/'], ['Package Lockers'], [name]], eyebrow: 'Package Lockers', title: name, intro, badges: CERTS, image: [lockerImg[slug], `${name} installed in use`] }) +
    section(head('How It Works', 'Simple self-service, in three steps.', 'Every user follows the same easy flow, with nothing to install or learn.') + stepCards(lockerSteps[slug]), 'lk') +
    section(head(`Why 3S ${name}`, 'Secure, simple and always available.', `Ideal for: ${useCase}`) + cards(why.concat([['Cloud Dashboard', 'Live status, reports and user management from one screen.'], ['Integrations', 'Works with ID cards, user directories and payment gateways.'], ['Built to Last', 'Powder-coated steel with tamper-resistant locks.']]).map((c, i) => [c[0], c[1], ['🔐', '⚡', '🤝', '📊', '🧩', '🏗️'][i]])), 'section-alt lk') +
    section(head('Where They Fit', 'Made for the places people actually use.', 'Common places this solution is used.') + fitCards(lockerFit[slug]), 'lk') +
    section(head('Access Control Integrations', 'Connects to the systems you already have.', 'Use the credentials and directories you already have. No new cards, no duplicate records.') + `<ul class="badges badges-dark ${reveal}">${[['🪪', 'ID & access cards'], ['📲', 'Mobile / NFC credentials'], ['🔑', 'Single sign-on (SSO)'], ['🏋️', 'Membership & booking software'], ['💳', 'Payment gateways'], ['🔌', 'Open REST API']].map(([e, x]) => `<li>${e} ${amp(x)}</li>`).join('')}</ul>`, 'section-alt lk') +
    section(head('Enterprise-Grade', 'Built to run for years with little attention.', 'Low-maintenance hardware and software, backed by a local team.') + cards([
      ['Certified Security', 'SOC 2 and ISO 27001 certified, with ADA-accessible designs.', '🏅'],
      ['Power & Connectivity', 'Designed for a standard power supply and wired or wireless network connection.', '🔌'],
      ['Remote Management', 'Monitor status and push software updates over the air.', '📡'],
      ['User Provisioning', 'Sync users automatically through SSO and your identity provider.', '🧑‍💼'],
      ['Reports & Roles', 'Usage reports and role-based permissions for every team.', '📈'],
      ['Responsive Support', 'Our Meerut team provides installation, servicing and help when you need it.', '🎧']]), 'lk') +
    section(head('Included With Every System', 'Hardware, software and support, all in one.', 'Every deployment ships complete.') + cards([
      ['Hardware', 'Powder-coated steel construction, tamper-resistant locks, warranty and an optional maintenance contract.', '🔩'],
      ['Cloud Software', 'The 3S locker platform for access control, notifications and reporting.', '☁️'],
      ['Support', 'Responsive after-sales service from our Meerut team.', '🛟']]), 'section-alt lk') +
    section(head('FAQ', `${name}, answered.`) + faq(lockerFaq[slug]), 'lk lk-faq') +
    cta());
});

/* Industries */
const industries = {
  retail: ['Retail', 'Retail & E-commerce', 'Give shoppers a faster way to collect online orders, drop off returns and pick up after closing time. Smart lockers keep every order secured behind an electronic lock, notify customers the moment it is ready and cut counter queues, so staff can focus on selling.',
    [['Queues at the counter', 'Self-service pickup removes waiting for a staff member.'], ['Limited opening hours', 'Customers collect orders whenever it suits them.'], ['Missed deliveries', 'Orders wait securely until the customer arrives.'], ['Returns handling', 'Drop-off lockers simplify returns and exchanges.']],
    ['Click-and-collect pickup', 'Return drop-off points', 'Staff handover between shifts', 'Marketplace seller hand-offs'],
    [['How do customers open the locker?', 'They scan a QR code, enter a PIN or use the 3S app, depending on how you configure the system.'], ['Can lockers sit outside the store?', 'Yes. Outdoor lockers are weather-resistant and available around the clock.'], ['Can we notify customers automatically?', 'Yes. Customers get a notification as soon as their order is placed in a locker.'], ['What if an order is not collected?', 'Set a time limit and the system flags uncollected items for staff.'], ['Can we add payment on pickup?', 'Yes, with UPI or card payments through our payment gateway integration.']]],
  residential: ['Residential', 'Residential Complexes', 'End parcel chaos at the gate and the lobby. Couriers drop deliveries into secured compartments, residents are alerted instantly and collect at any hour with a PIN, QR code or the 3S app, while a full log settles every "where is my parcel?" question.',
    [['Package theft and loss', 'Parcels are locked away until the resident collects them.'], ['Front desk overload', 'Security and management stop handling every parcel by hand.'], ['After-hours deliveries', 'Couriers can drop off at any time of day.'], ['Resident disputes', 'A complete log shows when each parcel arrived and was collected.']],
    ['Parcel and courier lockers', 'Laundry and dry-cleaning drop-off', 'Shared equipment lending', 'Amenity and key hand-offs'],
    [['Do residents need an app?', 'They can use the 3S app or a PIN or QR code sent by message.'], ['Can multiple couriers use the system?', 'Yes. Couriers get drop-off access without seeing resident data.'], ['Are lockers available outdoors?', 'Yes, outdoor lockers suit gate houses and building entrances.'], ['How are residents notified?', 'Automatically, as soon as a parcel is dropped in a locker.'], ['Can it integrate with our society software?', 'We offer integrations and an API to connect resident records.']]],
  education: ['Educational Institutes', 'Educational Institutes', 'Handle student parcels, belongings and shared equipment without queues at the mailroom. Lockers open with campus ID cards or codes, work after hours and give departments a tracked way to hand over documents, devices and supplies.',
    [['Mailroom queues', 'Students collect parcels themselves, at any hour.'], ['After-hours access', 'Lockers stay open outside office hours.'], ['Lost items', 'Every handover is recorded against an ID.'], ['Department hand-offs', 'Documents and equipment move between offices securely.']],
    ['Student storage lockers', 'Library and book pickup', 'IT device lending', 'Hostel parcel delivery'],
    [['Can student ID cards open lockers?', 'Yes, RFID and campus ID credentials can be supported.'], ['Can lockers be installed outdoors?', 'Yes, with weather-resistant outdoor banks.'], ['What happens to uncollected items?', 'The system sends reminders and flags overdue items to staff.'], ['Can we manage several campuses?', 'Yes, from one dashboard.'], ['Are the lockers accessible?', 'Designs meet ADA requirements for accessible reach and operation.']]],
  workplaces: ['Workplaces', 'Workplaces & Corporate Offices', 'Replace manual key handling and busy mailroom desks with self-service lockers. Hot-desking staff get day storage, deliveries wait securely for their owners and shared equipment is signed out and returned with a clear record of who has what.',
    [['Hybrid work', 'Employees get a locker only on the days they are in.'], ['Mailroom workload', 'Staff stop sorting and handing out every parcel.'], ['Equipment tracking', 'Laptops and accessories are signed out and returned with a log.'], ['Visitor handling', 'Guests can leave belongings securely.']],
    ['Personal and hot-desk storage', 'Mailroom and parcel lockers', 'IT equipment lockers', 'Visitor and courier drop-off'],
    [['Can employees book a locker?', 'Yes, by app or the dashboard, with automatic release at end of day.'], ['Can it connect to our single sign-on?', 'Yes, with enterprise SSO.'], ['Can lockers charge devices?', 'Compartments can be fitted with charging options.'], ['Do you offer custom branding?', 'Yes, lockers and the app can carry your organization’s branding.'], ['How is installation done?', 'Our team installs on-site with minimal disruption.']]],
  libraries: ['Libraries', 'Libraries', 'Let members collect holds and return items whenever it suits them, not just in staffed hours. Lockers log every book, laptop or device in and out, ease pressure on the front desk and keep the library useful long after closing time.',
    [['Limited staffed hours', 'Members collect holds outside opening times.'], ['Returns backlog', 'Return lockers keep books flowing without a queue.'], ['Staff time', 'Staff spend less time on desk hand-offs.'], ['Tracking', 'Each item is logged on drop-off and pickup.']],
    ['Hold pickup lockers', 'After-hours return lockers', 'Device and equipment lending', 'Branch-to-branch transfers'],
    [['Can lockers connect to our library system?', 'We provide integrations and an API for catalog and member records.'], ['Can they be placed outside the building?', 'Yes, outdoor lockers are available.'], ['How do members open a locker?', 'Via library card, PIN, QR code or app.'], ['Can we use different locker sizes?', 'Yes, for books, laptops and larger items.'], ['Are they accessible?', 'Designs meet ADA accessibility requirements.']]],
  government: ['Government', 'Government Facilities', 'Secure, accountable storage for documents, equipment, evidence and parcels in public offices. Role-based access and a complete audit trail record every opening, while citizens can collect papers outside office hours without extra staff.',
    [['Chain of custody', 'Every access is logged to a named user.'], ['Controlled access', 'Role-based permissions limit who can open what.'], ['Public service hours', 'Citizens collect documents outside office hours.'], ['Compliance', 'Audit-ready reports support internal checks.']],
    ['Document pickup for citizens', 'Equipment and key control', 'Secure internal mail', 'Evidence or sample hand-offs'],
    [['Can we restrict access by role?', 'Yes, with role-based permissions.'], ['Is there an audit trail?', 'Every open and close is logged and exportable.'], ['Which certifications do you hold?', 'SOC 2, ISO 27001 and ADA; details on request.'], ['Can the system run on a private network?', 'Talk to us about deployment options for your security needs.'], ['Can it be white-labeled?', 'Yes, with your department’s branding.']]],
  healthcare: ['Healthcare', 'Healthcare Institutions', 'Move medications, samples, devices and staff belongings through lockers that only authorised people can open. Hand-offs between shifts become simple and traceable, and patients can collect prescriptions at convenient hours.',
    [['Hand-offs between shifts', 'Staff exchange items without waiting for each other.'], ['Medication security', 'Controlled compartments restrict access to authorized users.'], ['Patient pickup', 'Patients collect prescriptions at convenient hours.'], ['Equipment loss', 'Devices are checked out and returned with a log.']],
    ['Prescription pickup', 'Staff personal storage', 'Equipment and device lending', 'Sample and document transfer'],
    [['Can access be limited to authorized staff?', 'Yes, with role-based access and an audit log.'], ['Can lockers hold temperature-sensitive items?', 'Ask us about options for your requirements.'], ['Is patient data protected?', 'Data is encrypted and access is controlled and monitored.'], ['Are the lockers accessible?', 'Designs meet ADA requirements.'], ['Can we integrate with hospital systems?', 'We provide an API and integration options.']]],
  fitness: ['Gyms & Fitness', 'Gyms & Fitness Centres', 'Give members reliable day-use storage with no keys and no padlocks. Lockers open by PIN, QR code or app, release automatically when the visit ends and can carry your club\'s branding, so front-desk staff spend time on members, not lost keys.',
    [['Key and padlock hassle', 'Members use a PIN, QR code or app instead of keys.'], ['Lockers left in use', 'Automatic release frees lockers when sessions end.'], ['Staff time', 'Front-desk staff stop managing locker issues.'], ['Branding', 'Custom finishes reflect your club.']],
    ['Day-use member lockers', 'Rental lockers with payments', 'Towel and equipment lockers', 'Retail pickup for supplements and merchandise'],
    [['Can members pay per use?', 'Yes, with optional payments.'], ['Does the locker release automatically?', 'Yes, based on rules you set.'], ['Can staff see locker status?', 'Yes, on a live dashboard with diagnostics.'], ['Can we match our branding?', 'Yes, lockers and app can be branded.'], ['Can we manage several clubs?', 'Yes, from one account.']]]
};
const useMeta = {
  retail: [['🛒', 'Orders wait in a locker and customers collect any time.'], ['↩️', 'Customers drop returns without a queue at the counter.'], ['🔄', 'Hand over keys, cash boxes or stock between shifts.'], ['🤝', 'Third-party sellers hand items over securely.']],
  residential: [['📦', 'Couriers deliver, residents collect when it suits them.'], ['🧺', 'Drop and pick up laundry or dry cleaning at any hour.'], ['🛠️', 'Lend tools, sports gear and party items with a log.'], ['🔑', 'Guest keys and amenity passes handed over safely.']],
  education: [['🎒', 'Short-term or term-long storage for students.'], ['📚', 'Books and course material ready for collection.'], ['💻', 'Laptops and tablets lent out and returned with a record.'], ['🏠', 'Hostel parcels collected when it suits the student.']],
  workplaces: [['🗄️', 'Personal storage for hybrid and hot-desking teams.'], ['📬', 'Parcels wait securely until staff pick them up.'], ['🖥️', 'Laptops and accessories issued from a single point.'], ['🚚', 'Visitors and couriers leave items without roaming the office.']],
  libraries: [['📖', 'Reserved books ready for self-service collection.'], ['🌙', 'Members return items any hour of the day.'], ['🎧', 'Laptops, tablets and readers lent out safely.'], ['🚐', 'Items moved between branches with a clear trail.']],
  government: [['📄', 'Citizens collect certificates and papers after hours.'], ['🔐', 'Keys, devices and kits issued only to authorised staff.'], ['✉️', 'Documents passed between offices without a courier.'], ['🧪', 'Items handed over with a recorded chain of custody.']],
  healthcare: [['💊', 'Patients collect prescriptions at convenient hours.'], ['👩‍⚕️', 'Secure personal lockers for doctors, nurses and visitors.'], ['🩺', 'Shared devices checked out by authorised staff only.'], ['🧫', 'Samples and paperwork passed between teams securely.']],
  fitness: [['🏋️', 'Members take any free locker and it releases after the visit.'], ['💳', 'Charge for locker use with UPI or card payments.'], ['🧖', 'Towels and gear issued and returned from a locker.'], ['🥤', 'Supplements and merchandise ready for pickup.']]
};
INDUSTRY_NAV.forEach(([slug]) => {
  const [nav, title, intro, challenges, uses, faqs] = industries[slug];
  add(`/${slug}/`, nav, `Smart lockers for ${nav.toLowerCase()} by 3S Safe Storage Solutions.`,
    hero({ crumbs: [['Home', '/'], ['Industries'], [nav]], eyebrow: 'Industries', title: `Smart Lockers for ${title}`, intro, badges: CERTS, image: [indHero[slug], `Smart lockers in ${nav.toLowerCase()}`] }) +
    section(head('Challenges', `Common challenges in ${nav.toLowerCase()}.`, 'Where self-service lockers make the biggest difference.') + cards(challenges.map((c, i) => [c[0], c[1], ['⏳', '🌙', '🔍', '🔁'][i]]), 4), 'lk') +
    section(head('Use Cases', 'One platform for every need.', `The same locker software covers all of these in ${nav.toLowerCase()}.`) + fitCards(uses.map((u, i) => [useMeta[slug][i][0], u, useMeta[slug][i][1]])), 'section-alt lk') +
    section(head('Integrations', 'Works with what you already have.', 'No need to replace existing systems.') + cards([['ID & Access Cards', 'Reuse the credentials people already carry.', '🪪'], ['User Records', 'Sync users and permissions automatically.', '👥'], ['Payments', 'Add paid storage or pickup when needed.', '💳']]), 'lk') +
    section(head('Built for Real Conditions', `Designed for ${nav.toLowerCase()}.`, 'Features that keep daily operations smooth.') + cards([['Peak Volume', 'Handle busy periods without extra staff.', '📈'], ['Accessibility', 'ADA-compliant designs.', '♿'], ['Notifications', 'Automatic alerts on drop-off and pickup.', '🔔'], ['Audit Trail', 'Every access is logged.', '🧾'], ['Multi-Site', 'Manage all locations in one dashboard.', '🌐'], ['Remote Management', 'Diagnose and configure from anywhere.', '🛰️']]), 'section-alt lk') +
    section(head('Benefits', `Benefits for ${nav.toLowerCase()}.`) + `<div class="split"><div class="${reveal}">${checks(['Less manual handling for staff', 'Round-the-clock access for users', 'Better security and accountability', 'Lower operating costs', 'Scales as your needs grow', 'Local installation and support'])}</div><div class="split-media ${reveal}">${IMG(indSide[slug], `Smart locker use in ${nav.toLowerCase()}`)}</div></div>`, 'lk') +
    section(head('FAQ', `${nav}, answered.`) + faq(faqs), 'section-alt lk lk-faq') +
    cta());
});

/* Software */
add('/software/', 'Software', '3S locker and mailroom software for package receiving, tracking and workflows.',
  hero({ crumbs: [['Home', '/'], ['Software']], eyebrow: 'Software', image: ['scan-portrait.jpg', 'Scanning a QR code at a smart locker'], title: 'Locker & Mailroom Software', intro: 'Log, track and hand over packages and assets from any desktop, tablet or phone. Works with 3S lockers or on its own, and keeps a complete history of every item from arrival to pickup.' }) +
  section(head('Core Features', 'Everything needed to run receiving.', 'Simple for staff, transparent for recipients.') + cards([
    ['No Special Hardware', 'Run it from a phone, tablet or PC.', '📱'], ['Fast Intake', 'Log arrivals in seconds with scan or manual entry.', '⚡'], ['Chain of Custody', 'Signatures and audit trails for every handover.', '✍️'], ['Search & Filters', 'Find any package or asset instantly.', '🔎'], ['Custom Statuses', 'Define workflows that match your process.', '🏷️'], ['Instant History', 'See the full timeline of any item.', '🕘']]), 'lk') +
  section(head('High-Volume Receiving', 'Built for busy mailrooms.', 'Keep up with peaks without extra staff.') + cards([
    ['Bulk Intake', 'Log many items for one recipient at once.', '📦'], ['Sender Directory', 'Frequent senders are remembered automatically.', '📇'], ['Recipient Notes', 'Add handling instructions for special cases.', '📝'], ['Time Limits', 'Set rules and reminders per recipient.', '⏰']], 4), 'section-alt lk') +
  cta('See the Software in Action', 'A short demo shows receiving, workflows and tracking together.'));

/* Resources */
const DOCS = require('./docs-data');
const guides = DOCS.filter((d) => d.kind === 'guide');
const articles = DOCS.filter((d) => d.kind === 'article');
add('/resources/', 'Resources', 'Guides, catalogues and planning help for smart lockers.',
  hero({ crumbs: [['Home', '/'], ['Resources']], eyebrow: 'Resources', image: ['library.jpg', 'Smart lockers in a library'], title: 'Guides & Downloads', intro: 'Practical guides for planning, buying and running smart lockers in residential, campus, retail and workplace settings. Download the PDFs free or read them online.', ctas: false }) +
  section(head('Most Popular', 'Start here.', 'Free guides you can download as PDFs.') + `<div class="grid grid-3">${guides.map((d) => `<article class="card has-emoji ${reveal}"><div class="emoji-tile" aria-hidden="true">${d.emoji}</div><span class="tag">Guide · PDF</span><h3>${amp(d.title)}</h3><p>${amp(d.intro)}</p><p class="card-links"><a class="btn btn-primary btn-sm" href="/downloads/${d.slug}.pdf" download>⬇ Download PDF</a> <a class="link-arrow" href="/resources/${d.slug}/">Read online →</a></p></article>`).join('')}</div>`, 'lk') +
  section(head('More Reading', 'Latest articles.', 'Short reads on using lockers well.') + `<div class="grid grid-3">${articles.map((d) => `<article class="card has-emoji ${reveal}"><div class="emoji-tile" aria-hidden="true">${d.emoji}</div><h3>${amp(d.title)}</h3><p>${amp(d.intro)}</p><a class="link-arrow" href="/resources/${d.slug}/">Read article →</a></article>`).join('')}</div>`, 'section-alt lk') +
  cta('Need Something Specific?', 'Tell us what you are planning and we will send relevant material.'));

DOCS.forEach((d) => {
  add(`/resources/${d.slug}/`, d.title, d.intro,
    `<section class="page-hero"><div class="container"><div><p class="eyebrow">${d.kind === 'guide' ? 'Guide' : 'Article'}</p><h1>${amp(d.title)}</h1><p class="hero-sub">${amp(d.intro)}</p>${d.kind === 'guide' ? `<div class="hero-actions"><a href="/downloads/${d.slug}.pdf" class="btn btn-light btn-lg" download>⬇ Download PDF</a><a href="/resources/" class="btn btn-outline-light btn-lg">All resources</a></div>` : `<div class="hero-actions"><a href="/resources/" class="btn btn-outline-light btn-lg">← All resources</a></div>`}</div></div></section>` +
    section(`<div class="doc">${d.sections.map(([h, t, list], i) => `<h2 class="${reveal}">${d.emoji} ${i + 1}. ${amp(h)}</h2><p class="${reveal}">${amp(t)}</p>${list ? `<ul class="checks ${reveal}">${list.map((x) => `<li>${amp(x)}</li>`).join('')}</ul>` : ''}`).join('')}</div>`, 'lk') +
    cta('Want Help Applying This?', 'Talk to our team and we will tailor it to your site.'));
});

/* Contact */
add('/contact/', 'Contact', 'Contact 3S Safe Storage Solutions — book a demo, request a quote or talk to our team in Meerut.',
  hero({ crumbs: [['Home', '/'], ['Contact']], eyebrow: 'Contact', image: ['remote-support.jpg', 'Locker kiosk with live video support'], title: 'Get in Touch with 3S', intro: 'Planning lockers for a building, campus, gym, hospital or public space? Tell us about your site, what you need to store or deliver and roughly how many people will use it. Our team replies within one business day with a recommended setup, a few clarifying questions and clear next steps. Prefer to talk? Call us directly or book a short demo.', ctas: false, badges: ['Reply in 1 business day', 'Free site consultation', 'Pan-India installation'] }) +
  `<section class="stats"><div class="container stats-grid">
    <div class="${reveal}"><div class="stat-num">1 day</div><div class="stat-label">Typical Reply</div></div>
    <div class="${reveal}"><div class="stat-num">24/7</div><div class="stat-label">Locker Access</div></div>
    <div class="${reveal}"><div class="stat-num">Meerut</div><div class="stat-label">Headquarters</div></div>
    <div class="${reveal}"><div class="stat-num">${CERTS.length}</div><div class="stat-label">Certifications</div></div></div></section>` +
  section(head('Ways to Reach Us', 'Talk to the people who build your lockers.', 'Pick whichever is easiest. You will always reach our team directly, not a call centre.') + `<div class="grid grid-4">
    <article class="card has-emoji ${reveal}"><div class="emoji-tile" aria-hidden="true">📞</div><h3>Call Us</h3><p>Speak to our director about your project.</p><p class="contact-line"><a href="tel:+918657412969">86574 12969</a></p></article>
    <article class="card has-emoji ${reveal}"><div class="emoji-tile" aria-hidden="true">✉️</div><h3>Email Sales</h3><p>Send floor plans, photos or requirements for a written proposal.</p><p class="contact-line"><a href="mailto:3ssafestorage@gmail.com">3ssafestorage@gmail.com</a></p></article>
    <article class="card has-emoji ${reveal}"><div class="emoji-tile" aria-hidden="true">📍</div><h3>Visit Our Workshop</h3><p>See our lockers being built. Please call ahead to arrange a visit.</p><p class="contact-line">Mansarovar Garden Phase 2, Mohkampur Industrial Estate, Delhi Road, Meerut, U.P.</p></article>
    <article class="card has-emoji ${reveal}"><div class="emoji-tile" aria-hidden="true">🗓️</div><h3>Book a Demo</h3><p>A short call to scope sizes, quantities and integrations for your space.</p><p class="contact-line"><a href="#contact-form">Use the form below →</a></p></article>
  </div>`, 'lk') +
  section(head('Contact Form', 'Tell us what you are looking for.', 'The more detail you share, the more useful our first reply will be.') + `<div class="contact-grid ${reveal}">
    <form class="contact-form" id="contact-form" novalidate>
      <div class="form-row"><label for="name">Name <span aria-hidden="true">*</span></label><input type="text" id="name" name="name" autocomplete="name" required></div>
      <div class="form-row"><label for="email">Email <span aria-hidden="true">*</span></label><input type="email" id="email" name="email" autocomplete="email" required></div>
      <div class="form-row"><label for="phone">Phone</label><input type="tel" id="phone" name="phone" autocomplete="tel"></div>
      <div class="form-row"><label for="message">Message <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows="5" placeholder="Where will the lockers go, what will they store, and roughly how many users?" required></textarea></div>
      <div class="form-row honeypot" aria-hidden="true"><label for="company">Company</label><input type="text" id="company" name="company" tabindex="-1" autocomplete="off"></div>
      <button type="submit" class="btn btn-primary btn-lg" id="contact-submit">Send Message</button>
      <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
    </form>
    <aside class="contact-info"><h3>${SITE}</h3><p class="contact-tagline">We Secure Your Belongings</p>
      <dl class="contact-details">
        <div><dt>Director</dt><dd>Abhishek Dhamija</dd></div>
        <div><dt>Phone</dt><dd><a href="tel:+918657412969">86574 12969</a></dd></div>
        <div><dt>Email</dt><dd><a href="mailto:3ssafestorage@gmail.com">3ssafestorage@gmail.com</a></dd></div>
        <div><dt>Address</dt><dd>Mansarovar Garden Phase 2,<br>Mohkampur Industrial Estate,<br>Delhi Road, Meerut, U.P.</dd></div>
      </dl>
      <p class="contact-note">💡 Helpful to include: site type, number of users, items to store, indoor or outdoor, and your timeline.</p></aside></div>`, 'section-alt lk') +
  section(head('What Happens Next', 'From first message to installed lockers.', 'A clear, no-pressure process.') + stepCards([
    ['We Reply', 'Within one business day we respond with questions about your space, users and goals.'],
    ['Plan & Quote', 'We recommend compartment sizes, access method and layout, then send a clear written quote.'],
    ['Build & Install', 'We manufacture your lockers, install them on site and train your team, then stay on call for support.']]), 'lk') +
  section(head('FAQ', 'Before you reach out.') + faq([
    ['How soon will I hear back?', 'We reply to every enquiry within one business day, usually sooner.'],
    ['Is the consultation free?', 'Yes. Scoping your space and recommending a setup is free, with no obligation to buy.'],
    ['Do you install outside Meerut?', 'Yes. Tell us your location and we will confirm installation and service arrangements.'],
    ['What should I send you?', 'A short description is enough. Floor plans, photos and expected user numbers help us give a more accurate quote.'],
    ['Can I see lockers before deciding?', 'You can visit our Meerut workshop by appointment, and we can share photos of live installations such as Tripti Bhojnalya, Katra.']]), 'section-alt lk lk-faq') +
  cta('Prefer a Quick Call?', 'Call 86574 12969 or send an email and we will set up a demo.'));

/* Get a quote */
add('/get-quote/', 'Get a Quote', 'Request a smart locker quote from 3S Safe Storage Solutions.',
  hero({ crumbs: [['Home', '/'], ['Get a quote']], eyebrow: 'Get a Quote', image: ['lobby-dropoff.jpg', 'Dropping a parcel into a smart locker'], title: 'Get a Locker Quote Fast', intro: 'Tell us how many lockers you need and where they will go. A specialist will reply within one business day.', ctas: false }) +
  section(`<div class="contact-grid ${reveal}">
    <form class="contact-form" id="contact-form" novalidate>
      <div class="form-row"><label for="lockers">How many lockers do you need?</label><input type="number" min="1" id="lockers" name="lockers"></div>
      <div class="form-row"><label for="industry">Industry</label><select id="industry" name="industry"><option>Retail</option><option>Residential</option><option>Educational Institute</option><option>Workplace</option><option>Library</option><option>Government</option><option>Healthcare</option><option>Gym / Fitness</option><option>Other</option></select></div>
      <div class="form-row"><label for="name">Name <span aria-hidden="true">*</span></label><input type="text" id="name" name="name" autocomplete="name" required></div>
      <div class="form-row"><label for="email">Email <span aria-hidden="true">*</span></label><input type="email" id="email" name="email" autocomplete="email" required></div>
      <div class="form-row"><label for="phone">Phone</label><input type="tel" id="phone" name="phone" autocomplete="tel"></div>
      <div class="form-row"><label for="message">About your space <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows="4" required></textarea></div>
      <div class="form-row honeypot" aria-hidden="true"><label for="company">Company</label><input type="text" id="company" name="company" tabindex="-1" autocomplete="off"></div>
      <button type="submit" class="btn btn-primary btn-lg" id="contact-submit">Request Quote</button>
      <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
    </form>
    <aside class="contact-info"><h3>What happens next</h3>${checks(['We review your requirements', 'A specialist replies within one business day', 'We scope sizes, quantity and integrations', 'You receive a clear quote'])}</aside></div>`));

/* ---------- render ---------- */
const layout = ({ title, description, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${amp(title)} | ${SITE}</title>
<meta name="description" content="${description.replace(/"/g, '&quot;')}">
<link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
${HEAD_FLAGS}
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
${SPLASH()}
<a class="skip-link" href="#main">Skip to content</a>
${header()}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js"></script>
</body>
</html>
`;

const strip = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const searchIndex = pages.map((p) => ({ t: p.title, u: p.url, x: strip(p.body).slice(0, 1800) }));
try {
  const homeHtml = fs.readFileSync(path.join(PUB, 'index.html'), 'utf8');
  const main = (homeHtml.match(/<main[\s\S]*<\/main>/) || [homeHtml])[0];
  searchIndex.unshift({ t: 'Home', u: '/', x: strip(main).slice(0, 2500) });
} catch (e) { /* homepage not built yet */ }
fs.writeFileSync(path.join(PUB, 'assets', 'search-index.json'), JSON.stringify(searchIndex));

pages.forEach((p) => {
  const dir = path.join(PUB, p.url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), layout(p));
});

// Refresh shared header/footer on the homepage
const idx = path.join(PUB, 'index.html');
let home = fs.readFileSync(idx, 'utf8');
home = home.replace(/<header class="site-header"[\s\S]*?<\/header>/, header()).replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footer());
home = home.replace(/href="assets\//g, 'href="/assets/').replace(/src="assets\//g, 'src="/assets/');
home = home.replace(/<script>document\.documentElement\.className\+=[^<]*<\/script>/, HEAD_FLAGS);
home = home.replace(/<div class="splash"[\s\S]*?<!--\/splash-->\n?/, '');
home = home.replace(/<body>\s*/, '<body>\n' + SPLASH() + '\n');
fs.writeFileSync(idx, home);

console.log(`Built ${pages.length} pages.`);
