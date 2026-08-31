# TODO — Next Time You Open This Repo

## 🔴 Must Do (Before Sharing With Anyone)

- [x] **Replace resume** — Resume is available at `/public/documents/abhijeet-resume.pdf`
- [ ] **Add OG share image** — Create a 1200×630px branded image and save as `/public/og-image.png`. This is what shows when your link is shared on LinkedIn/Slack/Twitter
- [ ] **Fill in company name** — Search `"COMPANY NAME"` in `lib/constants.tsx` and replace with your actual internship company
- [ ] **Fill in university names** — Search `"UNIVERSITY NAME"` in `lib/constants.tsx` and replace with your actual institutions
- [ ] **Verify LinkedIn URL** — Currently set to `linkedin.com/in/abhijeet-sandhu` in `components/Navbar.tsx` and `components/sections/ContactSection.tsx`
- [ ] **Update `metadataBase` URL** — Currently `https://abhijeet.dev` in `app/layout.tsx` — change to your actual domain

## 🟡 Should Do Soon

- [ ] **Add a professional headshot** — There's already `abhijeet.jpg` in `/public/images/personal/` but it's not displayed anywhere yet. Consider adding it to the About section
- [ ] **Add real project screenshots** — Replace Unsplash placeholder images in `lib/constants.tsx` with actual screenshots of your projects
- [ ] **Update project links** — Several projects have `link: "#"` and `github: "#"` — fill in real URLs or remove the buttons
- [ ] **Working contact form** — Currently uses `mailto:`. Consider Formspree, Resend, or a Next.js server action
- [ ] **Calendar booking link** — Add a Calendly/Cal.com link to reduce friction for recruiters

## 🟢 Nice To Have

- [ ] Review the full feature roadmap: `docs/` or the artifact in `.gemini/` for Tier 2–4 ideas
- [ ] Run `npx next build` to verify everything compiles
- [ ] Run Lighthouse audit and target 90+ performance score
- [ ] Add 1-2 blog posts if the blog feature gets built

## 📁 Key Files Reference

| What | Where |
| :--- | :--- |
| All project/skill/bio data | `lib/constants.tsx` |
| OG tags & metadata | `app/layout.tsx` |
| Navbar (resume/LinkedIn) | `components/Navbar.tsx` |
| Contact section | `components/sections/ContactSection.tsx` |
| Resume PDF | `public/documents/abhijeet-resume.pdf` |
| Favicon | `public/favicon.svg` |
| Feature roadmap | Portfolio roadmap artifact |
