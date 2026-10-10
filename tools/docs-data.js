// Resource documents: 3 downloadable guides (web page + PDF) and 6 articles (web page).
// Kind 'guide' gets a PDF at /downloads/<slug>.pdf, built by tools/build-pdfs.js.
module.exports = [
  {
    slug: 'smart-locker-buyers-guide', kind: 'guide', emoji: '🧭',
    title: 'Smart Locker Buyer’s Guide',
    intro: 'A practical checklist for comparing smart locker systems before you commit, written for facility managers, property teams and operations heads.',
    sections: [
      ['Start with the job to be done', 'Decide what the lockers must do: receive parcels, store belongings for a day, lend equipment or all three. The use case drives compartment sizes, access method and software features.', ['Parcel and delivery pickup', 'Day-use personal storage', 'Asset and equipment check-out', 'Mixed use across one site']],
      ['Check the hardware', 'Lockers live in busy spaces, so build quality matters more than the brochure. Ask what the body is made of, how doors and locks are protected and what warranty applies.', ['Powder-coated steel construction', 'Tamper-resistant electronic locks', 'Indoor or weather-resistant outdoor rating', 'Accessible reach heights and controls']],
      ['Look closely at access methods', 'The easiest systems let people use something they already have. Ask whether users can open lockers with an ID card, PIN, QR code or a phone app, and whether guests can be supported without registration.'],
      ['Ask about the software', 'The software decides how much staff time you save. Look for a live dashboard, automatic notifications, audit logs, role-based permissions and exportable reports.', ['Live compartment status', 'Automatic alerts to users and staff', 'Audit trail for every open and close', 'Reports and exports']],
      ['Confirm integrations and security', 'Check that the system connects to your existing ID cards, user directories and payment options, and ask which security certifications and accessibility standards the vendor holds.'],
      ['Plan installation and support', 'A locker is only as good as its servicing. Ask who installs it, how quickly faults are fixed and whether spares and technicians are local.', ['On-site installation and training', 'Maintenance contract options', 'Response time for faults', 'Local spares and technicians']]
    ]
  },
  {
    slug: 'planning-your-compartments', kind: 'guide', emoji: '📐',
    title: 'Planning Your Compartments',
    intro: 'How to work out how many lockers you need, what sizes to order and where to place them, using simple numbers from your own site.',
    sections: [
      ['Estimate peak demand', 'Size the bank for the busiest day, not the average one. Count how many people use the space, how many items arrive or are stored at peak and how long each item stays.', ['Number of users on a peak day', 'Items per user at the same time', 'Average time an item stays in a locker', 'Seasonal peaks such as festivals or exam weeks']],
      ['Choose the size mix', 'Most sites need a blend of compartment sizes. Measure the typical items you will store and add a few extra-large compartments for bulky exceptions.', ['Small: documents, keys, phones', 'Medium: bags, laptops, small parcels', 'Large: backpacks, cartons, equipment']],
      ['Add a buffer', 'Plan for about 15 to 20 percent more compartments than your peak figure so that people are never turned away and maintenance can take a unit out of service.'],
      ['Pick the right location', 'Place lockers where people already walk, close to entrances or lifts, in view of cameras or staff and away from damp or heat. Outdoor sites need weather-resistant units and a safe power source.'],
      ['Check power and network', 'Each locker bank needs a standard power supply and a wired or wireless network connection. Confirm both with your IT or facilities team before ordering.'],
      ['Leave room to grow', 'Choose a modular design so you can add columns later. Starting with the right layout is cheaper than replacing a bank that has been outgrown.']
    ]
  },
  {
    slug: 'roi-of-package-lockers', kind: 'guide', emoji: '📈',
    title: 'The ROI of Package Lockers',
    intro: 'A simple way to estimate the return on a locker system by looking at staff time, lost items and space, using your own figures.',
    sections: [
      ['Where the savings come from', 'Lockers move routine hand-offs from people to software. The savings show up in staff hours, fewer lost or disputed items and better use of floor space.', ['Less time handing items over at a desk', 'Fewer lost, misplaced or disputed parcels', 'Smaller storage rooms and reception areas', 'Lower cost per transaction at high volume']],
      ['Calculate staff time', 'Estimate how many minutes a person spends on each hand-off, multiply by the number of hand-offs per day and by the hourly cost of that role. That is the daily cost lockers can reduce.'],
      ['Count what goes missing', 'Add up the cost of items that are lost, damaged or claimed in error, plus the time spent investigating them. A locker log removes most of these disputes.'],
      ['Value the space', 'A mailroom or storage counter takes room that could serve another purpose. Compare the area a locker bank needs with the area it replaces.'],
      ['Include running costs', 'Count the cost of the locker system, software subscription, maintenance and power. Compare the annual total with the savings above to find your payback period.'],
      ['Review after launch', 'Track pickups, uncollected items and fault calls for the first three months. Use the dashboard reports to adjust compartment mix and notification timing.']
    ]
  },
  {
    slug: 'security-best-practices-for-shared-lockers', kind: 'article', emoji: '🛡️',
    title: 'Security Best Practices for Shared Lockers',
    intro: 'Shared lockers hold other people’s belongings, so security has to cover the hardware, the access method and the records.',
    sections: [
      ['Start with strong hardware', 'Reinforced steel bodies, tamper-resistant locks and concealed hinges make forced entry difficult and obvious.'],
      ['Use credentials people cannot lend easily', 'ID cards, one-time codes and phone-based QR codes are harder to share than a fixed PIN. Time-limited codes expire after use.'],
      ['Keep a full audit trail', 'Every open and close should be logged with the user and a time stamp, so any question about a missing item can be answered from the record.', ['Who opened which compartment', 'When items were placed and collected', 'Failed attempts and alerts']],
      ['Limit who can administer the system', 'Give staff only the permissions they need. Role-based access stops accidental or unauthorised changes.'],
      ['Monitor and update', 'Remote monitoring spots faulty doors early, and regular software updates close known weaknesses.']
    ]
  },
  {
    slug: 'smart-lockers-for-housing-societies', kind: 'article', emoji: '🏘️',
    title: 'Smart Lockers for Housing Societies',
    intro: 'Online shopping has made parcel handling a daily burden at society gates. Smart lockers turn it into a self-service routine.',
    sections: [
      ['The gate problem', 'Security staff accept parcels, residents queue to collect them and disputes follow when something goes missing. The process is slow and hard to track.'],
      ['How lockers help', 'Couriers drop parcels into a locker, the resident is alerted at once and collects with a code at any hour. Nothing changes hands informally.', ['No waiting for the guard to find a parcel', 'Collection at any time of day', 'A log for every parcel', 'Less clutter at the gate']],
      ['Choosing the setup', 'Many societies combine an outdoor bank near the entrance with an indoor bank in each tower lobby. Mix compartment sizes so shoebox and carton deliveries both fit.'],
      ['Rolling it out', 'Add residents to the system, share clear instructions with courier partners and run a short trial before the full launch.']
    ]
  },
  {
    slug: 'campus-lockers-a-practical-overview', kind: 'article', emoji: '🎓',
    title: 'Campus Lockers: A Practical Overview',
    intro: 'Colleges and universities use lockers for far more than bags. Parcels, books, devices and documents all move through the same platform.',
    sections: [
      ['Student storage', 'Day-use lockers give students a safe place for bags and laptops between classes without handing out keys.'],
      ['Parcels and hostels', 'Hostel deliveries collect in lockers and students pick up on their own schedule, which removes the mailroom queue.'],
      ['Equipment and devices', 'Departments can lend tablets, cameras or lab kits from lockers, with each item tied to a student ID and a return time.'],
      ['Making it work', 'Link lockers to campus ID cards where possible, place them near high-traffic areas and set clear time limits for uncollected items.', ['Use existing ID cards', 'Place banks near entrances and libraries', 'Set reminders for overdue items']]
    ]
  },
  {
    slug: 'libraries-and-after-hours-pickup', kind: 'article', emoji: '📚',
    title: 'Libraries and After-Hours Pickup',
    intro: 'Lockers let members collect holds and return items outside staffed hours, which makes the library useful for people with busy schedules.',
    sections: [
      ['Hold pickup', 'Staff place reserved items into lockers and the member is notified. The member collects at any time without waiting at the desk.'],
      ['After-hours returns', 'Return lockers accept items when the library is closed, and each return is logged so the record is up to date the next morning.'],
      ['Lending devices', 'Laptops, readers and tablets can be issued from lockers to authorised members and returned the same way.'],
      ['Benefits for staff', 'Fewer routine hand-offs leave staff free to help members with research, events and reading programmes.']
    ]
  },
  {
    slug: 'lockers-for-gyms-and-fitness-clubs', kind: 'article', emoji: '🏋️',
    title: 'Lockers for Gyms and Fitness Clubs',
    intro: 'Smart day-use lockers remove keys and padlocks from the locker room and give members one less thing to carry.',
    sections: [
      ['Keyless access', 'Members open lockers with a PIN, QR code or phone, so there is nothing to lose and no spare keys for staff to manage.'],
      ['Automatic release', 'When the visit ends, the locker returns to the pool. A small bank can serve many more people through the day than assigned lockers.'],
      ['Branding and revenue', 'Locker colours and screens can carry the club’s branding, and optional pay-per-use charges can add a small income stream.'],
      ['Running it', 'Staff see live locker status on a dashboard and can free any locker remotely if a member forgets to release it.']
    ]
  },
  {
    slug: 'maintaining-your-locker-system', kind: 'article', emoji: '🛠️',
    title: 'Maintaining Your Locker System',
    intro: 'A few simple routines keep smart lockers reliable for years. Most faults are small and easy to catch early.',
    sections: [
      ['Weekly checks', 'Walk the bank once a week and check that every door opens, closes and latches properly, and that touchscreens respond.', ['Doors and hinges move freely', 'Screens and scanners respond', 'No damage or loose panels']],
      ['Clean with care', 'Wipe the surfaces with a soft damp cloth and mild cleaner. Avoid harsh chemicals that can damage the powder coating and avoid spraying liquid into locks or screens.'],
      ['Watch the dashboard', 'Remote diagnostics flag low batteries, offline units and repeated failed openings, so you can fix problems before users notice.'],
      ['Keep software up to date', 'Apply updates promptly to keep features working and security current.'],
      ['Plan professional servicing', 'A maintenance contract gives you scheduled inspections and fast help when something needs repair.']
    ]
  }
];
