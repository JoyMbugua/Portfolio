/* Portfolio content. Edit the text, links and projects here. */
window.PORTFOLIO=(()=>{
/* ---------- EDIT ME ---------- */
const CONFIG={
  name:['JOY','MBUGUA'],
  email:'joymbugua123@gmail.com'
};
const GH='https://github.com/JoyMbugua';
/* Address of your live WordPress landing page. Set it to '' to show "Coming soon" instead. */
const WP_URL='https://joy-mbugua.infinityfreeapp.com/';
const PROJECTS=[
  {name:'Her Story',kind:'Tribute landing page',tag:'Live project',art:'track',one:'A responsive landing page about my favourite Olympic champion.',blurb:'A fully functional, responsive information landing page about my favourite Olympic champion, Tara Davis-Woodhall. Built with HTML, CSS and JavaScript and brought to life with GSAP animation.',stack:['HTML','CSS','JavaScript','GSAP'],stats:[['Responsive','Every screen size'],['GSAP','Animation'],['Live','On GitHub Pages']],live:'https://joymbugua.github.io/TARA-DAVIS-WOODHALLHER-STORY/',repo:GH},
  {name:'Weather App',kind:'Web app with API',tag:'Live project',art:'blobs',one:'Live weather with reusable components.',blurb:'A weather app built from reusable components with API integration. It fetches weather data with axios and uses GSAP for smooth, friendly motion.',stack:['HTML','CSS','JavaScript','GSAP','axios','APIs'],stats:[['API','Data via axios'],['Reusable','Components'],['GSAP','Animation']],live:'https://joymbugua.github.io/JoyMbuguaWeatherProject/',repo:GH},
  {name:'WordPress Landing Page',kind:'WordPress',tag:WP_URL?'Live project':'Coming soon',art:'grid',one:'A WordPress landing page with a contact form and plugins.',blurb:'A landing page built in WordPress with custom styling, a contact form and several plugins, hosted live on InfinityFree.',stack:['WordPress','Plugins','Contact form','CSS'],stats:[['Live','On InfinityFree'],['Plugins','Contact form and more'],['Custom','Styling']],live:WP_URL||undefined,soon:!WP_URL},
  {name:'GSAP Animation',kind:'GSAP, ScrollTrigger',tag:'Service',art:'waves',one:'Motion that adds life without the weight.',blurb:'Timeline and scroll-driven animation with GSAP and ScrollTrigger that makes a page feel alive while staying light and smooth on any device.',stack:['GSAP','ScrollTrigger','JavaScript'],stats:[['Timelines','GSAP'],['Scroll','ScrollTrigger'],['Smooth','On any device']]},
  {name:'Design Handoff',kind:'Figma, Photoshop, Illustrator',tag:'Service',art:'orbits',one:'Reading designs closely, prepping assets.',blurb:'I read Figma files closely and prepare images and icons in Photoshop and Illustrator, so every asset arrives web-ready and every spacing value is pixel-accurate.',stack:['Figma','Photoshop','Illustrator'],stats:[['Figma','Specs to code'],['Photoshop','Image prep'],['Illustrator','Icons and SVG']]},
  {name:'Fast, Findable Pages',kind:'SEO, accessibility, speed',tag:'Service',art:'bars',one:'Quick, usable by everyone, easy to find.',blurb:'Semantic markup, WCAG-minded accessibility, optimised images and clean metadata, so pages load fast, work for everyone and are easy for search engines to read.',stack:['Semantic HTML','WCAG','SEO basics'],stats:[['WCAG','Accessibility'],['Fast','Performance'],['Semantic','Markup']]}
];
const SKILLS=[
  ['HTML','HTML5','Semantic markup that reads well to people and search engines.'],
  ['CSS','CSS3','Responsive, mobile-first layouts with Grid, Flexbox and fluid type.'],
  ['JS','JavaScript','Modern ES6+ for interactions, APIs and DOM work.'],
  ['GSAP','GSAP and ScrollTrigger','Engaging animation, from timelines to scroll effects.'],
  ['Git','Git and GitHub','Version control and a public home for my projects.'],
  ['Figma','Figma','Reading designs closely and building them to match.'],
  ['WP','WordPress','Custom-styled sites clients can edit themselves.'],
  ['Ps','Photoshop','Image editing and prep for the web.'],
  ['Ai','Illustrator','Icons, logos and clean SVG exports.'],
  ['SEO','SEO basics','Page structure and metadata that search engines like.'],
  ['A11y','Accessibility','WCAG-minded, keyboard-friendly code.'],
  ['Speed','Web performance','Light pages that load fast on any connection.']
];
const TIMELINE=[
  ['2 yrs','Front-end developer','Two years of turning designers\' Figma files into responsive, working websites.'],
  ['Step 1','Read the design','I go through every frame and note spacing, type, states and breakpoints before I write any code.'],
  ['Step 2','Build it responsive','Mobile first, then wider screens, so layouts hold up from tiny phones to large displays.'],
  ['Step 3','Test and polish','Real devices, keyboard checks and a pass for speed and SEO basics.'],
  ['Step 4','Hand over','Clean code and a site the client can maintain.']
];

return{CONFIG,PROJECTS,SKILLS,TIMELINE};
})();
