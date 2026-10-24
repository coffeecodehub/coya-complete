import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu as MenuIcon,
  X,
  Camera,
  MapPin,
  Clock,
  Utensils,
  CalendarDays,
  Wine,
  Music2,
  Sparkles,
  Gift,
  Newspaper,
  Palette,
  Users,
  ArrowUp
} from 'lucide-react';

const links = {
  food: '#menu', pisco: '#pisco-bar', music: '#coya-music', club: '#coya-club',
  calendar: '#calendar', events: '#private-events', rewards: '#rewards',
  art: '#art', news: '#news', gifts: '#gift-vouchers'
};

const menuData = {
  Signature: [
    { name: 'Yellowtail Tiradito', description: 'Yellowtail, citrus leche de tigre, truffle oil', price: 'AED 95', image: 'photo-1519708227418-c8fd9a32b7a2', tag: 'HOUSE FAVOURITE' },
    { name: 'Black Cod', description: 'Miso glaze, fresh herbs, Peruvian spices', price: 'AED 145', image: 'photo-1515003197210-e0cd7184f8b5', tag: "CHEF'S SPECIAL" },
    { name: 'Beef Anticucho', description: 'Charcoal grilled beef, aji panca, chimichurri', price: 'AED 125', image: 'photo-1544025162-d76694265947', tag: 'SIGNATURE' }
  ],
  Seafood: [
    { name: 'Citrus Ceviche', description: 'Fresh fish, lime, red onion, coriander', price: 'AED 85', image: 'photo-1519708227418-c8fd9a32b7a2', tag: 'FRESH & VIBRANT' },
    { name: 'Grilled Sea Bass', description: 'Seasonal vegetables, aromatic herbs', price: 'AED 135', image: 'photo-1515003197210-e0cd7184f8b5', tag: 'FROM THE SEA' },
    { name: 'Tiger Prawns', description: 'Chilli butter, lime, Peruvian marinade', price: 'AED 110', image: 'photo-1625944525533-473f1a3d54e7', tag: 'GUEST FAVOURITE' }
  ],
  'From the Grill': [
    { name: 'Beef Anticucho', description: 'Charcoal grilled beef, aji panca, chimichurri', price: 'AED 125', image: 'photo-1544025162-d76694265947', tag: 'SIGNATURE' },
    { name: 'Peruvian Chicken', description: 'Aromatic spices, grilled lemon, herb sauce', price: 'AED 95', image: 'photo-1532550907401-a500c9a57435', tag: 'CHARCOAL GRILLED' },
    { name: 'Grilled Lamb', description: 'Slow marinated lamb, seasonal accompaniments', price: 'AED 155', image: 'photo-1544025162-d76694265947', tag: "CHEF'S SELECTION" }
  ],
  Desserts: [
    { name: 'Chocolate Delice', description: 'Rich chocolate, seasonal berries', price: 'AED 55', image: 'photo-1578985545062-69928b1d9587', tag: 'SWEET FINALE' },
    { name: 'Passionfruit Tart', description: 'Passionfruit cream, buttery pastry', price: 'AED 48', image: 'photo-1488477181946-6428a0291777', tag: 'BRIGHT & FRESH' },
    { name: 'Signature Ice Cream', description: 'Seasonal flavours, delicate toppings', price: 'AED 42', image: 'photo-1563805042-7684c019e1cb', tag: 'HOUSE MADE' }
  ]
};

const photo = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const discoverLinks = [
  { label: 'Calendar', url: links.calendar, icon: CalendarDays },
  { label: 'Private Events', url: links.events, icon: Users },
  { label: 'COYA Rewards', url: links.rewards, icon: Sparkles },
  { label: 'Art & Culture', url: links.art, icon: Palette },
  { label: 'News', url: links.news, icon: Newspaper },
  { label: 'Gift Vouchers', url: links.gifts, icon: Gift }
];

function ExternalLink({ href, children, className = '' }) {
  const external = href.startsWith('http');
  return <a className={className} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
}

function App() {
  const [activeCategory, setActiveCategory] = useState('Signature');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [guests, setGuests] = useState('2 Guests');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [notice, setNotice] = useState('');

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
    setDiscoverOpen(false);
  };

  const handleReservation = (event) => {
    event.preventDefault();
    setNotice(`Your reservation request is ready: ${date}, ${time}, ${guests}. This concept does not submit a real booking.`);
  };

  return (
    <main>
      <div className="announcement"><span>AN EXTRAORDINARY DINING EXPERIENCE</span><i /> <span>DISCOVER THE WORLD OF COYA</span></div>
      <header className="header">
        <a className="brand" href="#home" aria-label="COYA home">COYA<span>®</span><small>PERUVIAN INSPIRED</small></a>
        <nav className={mobileOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          <ExternalLink href={links.food}>FOOD</ExternalLink>
          <ExternalLink href={links.pisco}>PISCO BAR</ExternalLink>
          <ExternalLink href={links.music}>COYA MUSIC <ArrowUpRight size={12} /></ExternalLink>
          <ExternalLink href={links.club}>COYA CLUB</ExternalLink>
          <div className="discover-menu">
            <button className="discover-toggle" onClick={() => setDiscoverOpen(!discoverOpen)} aria-expanded={discoverOpen}>DISCOVER <span>{discoverOpen ? '−' : '+'}</span></button>
            {discoverOpen && <div className="discover-dropdown">{discoverLinks.map(({ label, url, icon: Icon }) => <ExternalLink key={label} href={url}><Icon size={15} />{label}{label === 'Gift Vouchers' && <ArrowUpRight size={13} />}</ExternalLink>)}</div>}
          </div>
          <button className="mobile-book" onClick={() => scrollTo('reservation')}>BOOK A TABLE <ArrowUpRight size={16} /></button>
        </nav>
        <button className="book-button desktop-book" onClick={() => scrollTo('reservation')}>BOOK A TABLE <ArrowUpRight size={16} /></button>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>{mobileOpen ? <X /> : <MenuIcon />}</button>
      </header>

      <section className="hero" id="home">
        <img className="hero-image" src={photo('photo-1517248135467-4c7edcad34c4', 2200)} alt="Warmly lit luxury restaurant interior" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content"><div className="eyebrow"><span />A WORLD OF FLAVOUR<span /></div><h1>Beyond<br /><em>the ordinary.</em></h1><p>A vibrant celebration of Peruvian flavours, culture and unforgettable moments.</p><div className="hero-actions"><button className="gold-button" onClick={() => scrollTo('menu')}>EXPLORE THE MENU <ArrowRight size={17} /></button><button className="text-button" onClick={() => scrollTo('story')}>OUR WORLD <ArrowDown size={16} /></button></div></div>
        <div className="hero-bottom"><span>ABU DHABI · UNITED ARAB EMIRATES</span><span className="vertical-line" /><span>FOOD · ART · MUSIC · CULTURE</span></div><div className="hero-index">01 <span>/</span> 04</div>
      </section>

      <section className="intro section-pad" id="story">
        <div className="intro-image"><img src={photo('photo-1559339352-11d035aa65de')} alt="Elegant restaurant dining experience" loading="lazy" /><div className="image-caption"><span>THE ART OF DINING</span><span>EST. IN SPIRIT, ROOTED IN PERU</span></div></div>
        <div className="intro-copy"><div className="eyebrow eyebrow-dark"><span />MORE THAN A RESTAURANT</div><h2>A meeting of<br /><em>cultures &amp; flavours.</em></h2><p>Inspired by the rich culinary heritage of Peru, COYA brings together bold ingredients, thoughtful craftsmanship and an atmosphere made for sharing.</p><p>From vibrant plates to the energy of the room, every detail invites you to experience something extraordinary.</p><ExternalLink className="underlined-link" href={links.food}>DISCOVER OUR FOOD <ArrowUpRight size={17} /></ExternalLink><div className="intro-stamp"><span>COYA</span><small>AN EXPERIENCE</small><small>TO REMEMBER</small></div></div>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="section-heading"><div><div className="eyebrow eyebrow-dark"><span />MADE TO BE DISCOVERED</div><h2>The art of <em>flavour.</em></h2></div><p>Bold ingredients. Beautiful presentation. An exploration of vibrant culinary traditions.</p></div>
        <div className="menu-tabs" role="tablist" aria-label="Menu categories">{Object.keys(menuData).map(category => <button key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}<span>↗</span></button>)}</div>
        <div className="dish-grid">{menuData[activeCategory].map((dish, index) => <article className="dish-card" key={`${dish.name}-${index}`}><div className="dish-image"><img src={photo(dish.image, 850)} alt={dish.name} loading="lazy" /><span className="dish-number">0{index + 1}</span><span className="dish-tag">{dish.tag}</span></div><div className="dish-info"><div><h3>{dish.name}</h3><p>{dish.description}</p></div><span className="dish-price">{dish.price}</span></div><div className="dish-line" /></article>)}</div>
        <div className="menu-bottom"><p className="menu-disclaimer">Illustrative concept menu and prices for design demonstration only. Confirm actual menu items, prices and allergens with the restaurant.</p><ExternalLink className="underlined-link" href={links.food}>EXPLORE OUR MENU <ArrowUpRight size={17} /></ExternalLink></div>
      </section>

      <section className="experience" id="experience"><img src={photo('photo-1414235077428-338989a2e8c0', 1900)} alt="Fine dining table setting" loading="lazy" /><div className="experience-overlay" /><div className="experience-content"><div className="eyebrow"><span />THE COYA EXPERIENCE<span /></div><h2>Where every<br />moment <em>matters.</em></h2><p>An atmosphere of discovery, inspired flavours and moments worth sharing.</p><button className="gold-button" onClick={() => scrollTo('reservation')}>MAKE IT A MOMENT <ArrowRight size={17} /></button></div></section>

      <section className="experience-links section-pad"><div className="section-heading"><div><div className="eyebrow eyebrow-dark"><span />DISCOVER MORE</div><h2>Beyond the <em>table.</em></h2></div><p>Explore the wider world of COYA, from music and cocktails to celebrations and culture.</p></div><div className="feature-grid">
        <ExternalLink className="feature-card" href={links.pisco}><img src={photo('photo-1514362545857-3bc16c4c7d1b', 800)} alt="Craft cocktails at a bar" loading="lazy" /><span className="feature-number">01 / BAR</span><div><h3>Pisco Bar</h3><p>Signature cocktails and vibrant evenings.</p><ArrowUpRight /></div></ExternalLink>
        <ExternalLink className="feature-card" href={links.music}><img src={photo('photo-1470229722913-7c0e2dbbafd3', 800)} alt="Live music and event atmosphere" loading="lazy" /><span className="feature-number">02 / SOUND</span><div><h3>COYA Music</h3><p>Soundtracks for memorable moments.</p><ArrowUpRight /></div></ExternalLink>
        <ExternalLink className="feature-card" href={links.events}><img src={photo('photo-1511795409834-ef04bbd61622', 800)} alt="Elegant private event table setup" loading="lazy" /><span className="feature-number">03 / OCCASIONS</span><div><h3>Private Events</h3><p>Gather, celebrate and make it personal.</p><ArrowUpRight /></div></ExternalLink>
      </div></section>

      <section className="world-sections section-pad" id="pisco-bar">
        <div className="world-intro"><div className="eyebrow eyebrow-dark"><span />THE BAR EXPERIENCE</div><h2>Raise a glass to <em>discovery.</em></h2><p>Bright citrus, aromatic botanicals and the unmistakable spirit of Peru inspire a cocktail experience made for long conversations and lively evenings.</p></div>
        <div className="world-split"><img src={photo('photo-1514362545857-3bc16c4c7d1b',1200)} alt="Craft cocktails at an elegant bar" loading="lazy"/><div><span className="world-number">01 / PISCO BAR</span><h3>Crafted with character.</h3><p>Explore a curated selection of signature serves, refreshing classics and alcohol-free creations, designed to pair beautifully with the energy of the evening.</p><button className="gold-button" onClick={() => scrollTo('reservation')}>PLAN YOUR EVENING <ArrowRight size={17}/></button></div></div>
      </section>
      <section className="world-sections world-dark section-pad" id="coya-music"><div className="world-split reverse"><img src={photo('photo-1470229722913-7c0e2dbbafd3',1200)} alt="DJ and live music atmosphere" loading="lazy"/><div><div className="eyebrow"><span/>SOUND OF COYA</div><span className="world-number">02 / MUSIC</span><h2>Feel the <em>rhythm.</em></h2><p>From relaxed afternoon sounds to vibrant late-night energy, music is part of the atmosphere. Discover a soundtrack built around culture, movement and connection.</p><button className="text-button" onClick={() => scrollTo('calendar')}>EXPLORE WHAT'S ON <ArrowRight size={16}/></button></div></div></section>
      <section className="world-sections section-pad" id="coya-club"><div className="world-intro"><div className="eyebrow eyebrow-dark"><span/>THE COYA COMMUNITY</div><h2>Belong to a world of <em>experiences.</em></h2><p>A concept for guests who return for the flavours, the atmosphere and the people. Join our demo community for updates about experiences and special occasions.</p><button className="gold-button" onClick={() => scrollTo('newsletter')}>JOIN THE LIST <ArrowRight size={17}/></button></div></section>
      <section className="world-sections world-dark section-pad" id="calendar"><div className="eyebrow"><span/>WHAT'S ON</div><h2>Make room for <em>something special.</em></h2><div className="event-grid"><article><span>01 / DINING</span><h3>Signature Nights</h3><p>An evening built around vibrant dishes, thoughtful service and a lively atmosphere.</p><button onClick={() => scrollTo('reservation')}>PLAN A VISIT <ArrowRight size={15}/></button></article><article><span>02 / MUSIC</span><h3>Sound & Social</h3><p>Discover the sounds that shape the COYA-inspired evening experience.</p><button onClick={() => scrollTo('coya-music')}>EXPLORE MUSIC <ArrowRight size={15}/></button></article><article><span>03 / CULTURE</span><h3>Artful Moments</h3><p>Culture, creativity and conversation meet in a distinctive setting.</p><button onClick={() => scrollTo('art')}>DISCOVER ART <ArrowRight size={15}/></button></article></div></section>
      <section className="world-sections section-pad" id="private-events"><div className="world-split"><img src={photo('photo-1511795409834-ef04bbd61622',1200)} alt="Elegant private celebration dining setup" loading="lazy"/><div><div className="eyebrow eyebrow-dark"><span/>PRIVATE EVENTS</div><h2>Celebrate <em>your way.</em></h2><p>Bring people together for a birthday, business dinner or a special celebration. Tell us what you are planning and use this concept form to start your enquiry.</p><button className="gold-button" onClick={() => scrollTo('reservation')}>START AN ENQUIRY <ArrowRight size={17}/></button></div></div></section>
      <section className="world-sections world-dark section-pad" id="rewards"><div className="world-intro"><div className="eyebrow"><span/>A LITTLE MORE COYA</div><h2>Good moments deserve <em>rewards.</em></h2><p>Imagine a guest programme with curated experiences, seasonal invitations and thoughtful touches for returning visitors. This demo shows how a rewards page could feel.</p><button className="gold-button" onClick={() => scrollTo('newsletter')}>GET UPDATES <ArrowRight size={17}/></button></div></section>
      <section className="world-sections section-pad" id="art"><div className="eyebrow eyebrow-dark"><span/>ART & CULTURE</div><h2>Inspired by a world of <em>creativity.</em></h2><div className="art-grid"><img src={photo('photo-1577083552431-6e5fd01aa342',800)} alt="Colourful contemporary artwork" loading="lazy"/><img src={photo('photo-1541961017774-22349e4a1262',800)} alt="Abstract art in a gallery" loading="lazy"/><img src={photo('photo-1579783902614-a3fb3927b6a5',800)} alt="Art exhibition details" loading="lazy"/></div><p className="section-note">A visual celebration of art, colour and cultural inspiration.</p></section>
      <section className="world-sections world-dark section-pad" id="news"><div className="eyebrow"><span/>THE JOURNAL</div><h2>Stories worth <em>sharing.</em></h2><div className="event-grid"><article><span>FOOD & CULTURE</span><h3>A journey through flavour</h3><p>Discover the ingredients, influences and rituals that inspire a memorable dining experience.</p><button onClick={() => scrollTo('menu')}>EXPLORE THE MENU <ArrowRight size={15}/></button></article><article><span>BEHIND THE SCENES</span><h3>The details matter</h3><p>From the first welcome to the final course, atmosphere is made from thoughtful details.</p><button onClick={() => scrollTo('experience')}>DISCOVER THE EXPERIENCE <ArrowRight size={15}/></button></article><article><span>GATHER TOGETHER</span><h3>Moments made for sharing</h3><p>Find inspiration for your next dinner, celebration or special evening.</p><button onClick={() => scrollTo('private-events')}>PLAN AN OCCASION <ArrowRight size={15}/></button></article></div></section>
      <section className="world-sections section-pad gift-section" id="gift-vouchers"><div><div className="eyebrow eyebrow-dark"><span/>GIVE AN EXPERIENCE</div><h2>A gift with a taste of <em>the extraordinary.</em></h2><p>Make a celebration feel personal with the idea of a dining gift voucher. In this concept demo, the button takes you to the reservation section instead of an external checkout.</p><button className="gold-button" onClick={() => scrollTo('reservation')}>EXPLORE THE EXPERIENCE <ArrowRight size={17}/></button></div><img src={photo('photo-1515003197210-e0cd7184f8b5',1000)} alt="Beautifully presented dining plate" loading="lazy"/></section>

      <section className="reservation section-pad" id="reservation"><div className="reservation-copy"><div className="eyebrow eyebrow-dark"><span />YOUR TABLE AWAITS</div><h2>An evening<br /><em>to remember.</em></h2><p>Set the scene for your next memorable dining experience. Choose your preferred details below.</p><div className="reservation-detail"><Utensils size={19} /><span>Exceptional food, thoughtfully presented</span></div><div className="reservation-detail"><Clock size={19} /><span>Choose your preferred dining time</span></div><div className="reservation-detail"><MapPin size={19} /><span>Abu Dhabi, United Arab Emirates</span></div></div>
        <form className="reservation-form" onSubmit={handleReservation}><span className="form-kicker">PLAN YOUR VISIT</span><h3>Request a reservation</h3><label htmlFor="guests">NUMBER OF GUESTS</label><select id="guests" value={guests} onChange={event => setGuests(event.target.value)}><option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option><option>5 Guests</option><option>6 Guests</option></select><label htmlFor="date">PREFERRED DATE</label><input id="date" type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={event => setDate(event.target.value)} required /><label htmlFor="time">PREFERRED TIME</label><select id="time" value={time} onChange={event => setTime(event.target.value)}><option value="18:00">6:00 PM</option><option value="18:30">6:30 PM</option><option value="19:00">7:00 PM</option><option value="19:30">7:30 PM</option><option value="20:00">8:00 PM</option><option value="20:30">8:30 PM</option><option value="21:00">9:00 PM</option></select><button className="gold-button form-submit" type="submit">CHECK MY REQUEST <ArrowRight size={17} /></button>{notice && <p className="form-notice" role="status">{notice}</p>}<p className="form-disclaimer">Concept demo only. This form does not contact the restaurant or create a real reservation.</p><ExternalLink className="official-booking" href={links.food}>BACK TO THE EXPERIENCE <ArrowUpRight size={14} /></ExternalLink></form>
      </section>

      <section className="location section-pad" id="location"><div><div className="eyebrow"><span />COME FIND US</div><h2>Your next<br /><em>experience awaits.</em></h2></div><div className="location-info"><MapPin size={22} /><div><h3>COYA Restaurant</h3><p>Abu Dhabi, United Arab Emirates</p><p className="location-note">Please confirm the current venue address and opening hours with the restaurant before visiting.</p><ExternalLink className="underlined-link" href="#home">EXPLORE THE EXPERIENCE <ArrowUpRight size={16} /></ExternalLink></div></div><button className="gold-button" onClick={() => scrollTo('reservation')}>PLAN YOUR VISIT <ArrowRight size={17} /></button></section>

      <section className="newsletter section-pad"><div><div className="eyebrow"><span />STAY IN THE KNOW</div><h2>Keep a taste of <em>COYA.</em></h2><p>Explore the latest news, events and experiences.</p></div><ExternalLink className="gold-button" href={links.news}>DISCOVER THE LATEST <ArrowUpRight size={17} /></ExternalLink></section>

      <footer className="footer"><div className="footer-main"><a className="brand footer-brand" href="#home">COYA<span>®</span><small>PERUVIAN INSPIRED</small></a><div className="footer-column"><h4>EXPLORE</h4><ExternalLink href={links.food}>Food</ExternalLink><ExternalLink href={links.pisco}>Pisco Bar</ExternalLink><ExternalLink href={links.music}>COYA Music</ExternalLink><ExternalLink href={links.club}>COYA Club</ExternalLink></div><div className="footer-column"><h4>EXPERIENCES</h4><ExternalLink href={links.calendar}>Calendar</ExternalLink><ExternalLink href={links.events}>Private Events</ExternalLink><ExternalLink href={links.rewards}>COYA Rewards</ExternalLink><ExternalLink href={links.gifts}>Gift Vouchers</ExternalLink></div><div className="footer-column"><h4>DISCOVER</h4><ExternalLink href={links.art}>Art & Culture</ExternalLink><ExternalLink href={links.news}>News</ExternalLink><ExternalLink href="#home">Official Website</ExternalLink><button onClick={() => scrollTo('home')}>Back to top <ArrowUp size={14} /></button></div></div><div className="footer-social"><span>FOOD · ART · MUSIC · CULTURE</span><div><ExternalLink href="#newsletter"><Camera size={17} /> Instagram <ArrowUpRight size={12} /></ExternalLink><ExternalLink href="#newsletter"><Users size={17} /> Facebook <ArrowUpRight size={12} /></ExternalLink></div></div><div className="footer-bottom"><span>© 2026 WEBSITE CONCEPT</span><span>DESIGNED BY coffeeCODEhub</span><span>UNOFFICIAL DESIGN DEMO · NOT AFFILIATED WITH COYA</span></div></footer>
    </main>
  );
}

export default App;
