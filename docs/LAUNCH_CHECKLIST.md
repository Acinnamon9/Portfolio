# Operations & Launch Checklist

Everything that isn't writing code — deployment, testing, content prep, and using the portfolio strategically.

---

## 🚀 PRE-LAUNCH (Before Sharing the Link)

### Deployment
- [ ] Buy a custom domain (abhijeet.dev, abhijeetsandhu.com, etc.)
- [ ] Deploy to Vercel and connect domain
- [ ] Set up `metadataBase` in `layout.tsx` to your real domain
- [ ] Verify OG image renders correctly (use [opengraph.xyz](https://opengraph.xyz) to test)
- [ ] Set up Vercel Analytics (free tier) for visitor tracking
- [ ] Set up Vercel Speed Insights for Core Web Vitals monitoring
- [ ] Add `robots.txt` and `sitemap.xml` (Next.js can auto-generate these)

### Testing
- [ ] Cross-browser check: Chrome, Firefox, Safari, Edge
- [ ] Mobile test: iPhone Safari, Android Chrome (use real devices if possible)
- [ ] Responsive breakpoints: 320px, 375px, 768px, 1024px, 1440px
- [ ] Run Lighthouse audit — target 90+ on all 4 scores
- [ ] Test dark mode across all pages (including case studies and 404)
- [ ] Verify all external links open correctly (project demos, GitHub repos)
- [ ] Test resume download works on all devices
- [ ] Check that OG/Twitter cards render when pasting link in LinkedIn/Slack

### Content Prep
- [ ] Take real screenshots of each project (not Unsplash placeholders)
- [ ] Record short screen captures of interactive projects (GIFs or MP4s)
- [ ] Finalize resume PDF — make sure it matches the portfolio's positioning
- [ ] Write a 2-sentence "elevator pitch" for your LinkedIn headline
- [ ] Prepare 3 talking points per project for interview conversations

---

## 📣 LAUNCH & DISTRIBUTION

### Where to Share
- [ ] LinkedIn post announcing the portfolio (tag relevant people, use hashtags)
- [ ] Update LinkedIn "Featured" section with the portfolio link
- [ ] Update GitHub profile README with the portfolio link
- [ ] Submit to portfolio showcase sites:
  - [Bestfolios](https://www.bestfolios.com/submit)
  - [Awwwards](https://www.awwwards.com/submit) (paid, but prestigious)
  - [SiteInspire](https://www.siteinspire.com/submit)
  - [Brutalist Websites](https://brutalistwebsites.com/) (perfect for this design)
  - [DevDojo](https://devdojo.com/)
- [ ] Post in developer communities:
  - r/webdev, r/reactjs, r/Frontend
  - Dev.to article: "I built a neo-brutalist portfolio — here's how"
  - Twitter/X thread showing the design process
- [ ] Add portfolio link to email signature
- [ ] Add portfolio link to all job application profiles (LinkedIn, AngelList, Wellfound, Otta)

### Job Applications
- [ ] Customize the CTA text for the type of role you're targeting
- [ ] Track which projects get the most clicks (Vercel Analytics)
- [ ] Prepare a "portfolio walkthrough" script for video interviews
- [ ] Have 2-3 people review the site and give honest feedback before mass sharing

---

## 🔄 ONGOING MAINTENANCE

### Weekly
- [ ] Check analytics — which pages get traffic, where do visitors drop off
- [ ] Fix any broken links or images

### Monthly
- [ ] Update project descriptions if anything shipped
- [ ] Add new projects as you build them
- [ ] Update resume PDF if experience changed
- [ ] Review Lighthouse scores — catch regressions

### Quarterly
- [ ] Refresh the design if it feels stale
- [ ] Write a blog post (if blog feature exists)
- [ ] Update certifications if you completed new courses
- [ ] Re-evaluate the CTA text based on career goals

---

## 🧪 ACCESSIBILITY AUDIT

- [ ] Run axe DevTools browser extension and fix all violations
- [ ] Keyboard-only navigation test: can you reach everything with Tab?
- [ ] Screen reader test: does the page make sense read aloud? (use NVDA or VoiceOver)
- [ ] Color contrast check: do all text/background combos pass WCAG AA?
- [ ] Reduced motion: does `prefers-reduced-motion` disable animations?
- [ ] Focus indicators: are focused buttons/links visually obvious?

---

## 📦 DEPENDENCY HYGIENE

- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Run `npm outdated` and update non-breaking dependencies
- [ ] Pin major versions in `package.json` to avoid surprise breaks
- [ ] Consider adding Dependabot or Renovate for automated updates
