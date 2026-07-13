# Geodensity Landing Page — Technical Specification

## 1. Product summary

Geodensity is a location-intelligence product that estimates how many people are present within a selected geographical area. Its initial focus is daytime and workplace population density, helping organisations compare locations, identify concentrations of demand and make better investment decisions.

The first website release is a single-page validation site. Its purpose is to:

1. Explain the problem Geodensity solves.
2. Show the proposed solution through an attractive, credible heatmap graphic.
3. Capture email addresses from potential users who want early access.

The site must not imply that the illustrative heatmap contains real measured data. All sample data must be clearly labelled as fictional but realistic.

## 2. Primary audience

The page should speak primarily to people responsible for location-based planning and investment, including:

- Telecoms and network planners
- Transport and infrastructure teams
- Retail and property location analysts
- Local authorities and economic-development teams
- Consultants working with population, employment or demand data

## 3. Core proposition

**One-sentence proposition:**

> Geodensity estimates how many people live or work within any chosen area, helping organisations compare locations and prioritise investment.

**Primary user problem:**

Important location decisions are often made using broad administrative areas, old census releases, postcode averages or fragmented datasets. These sources can conceal meaningful differences between neighbouring locations and make it difficult to answer practical questions such as:

- How many people are likely to be within a 500-metre radius?
- Where are the strongest concentrations of daytime demand?
- Which candidate site serves the largest nearby population?
- How does one location compare with another on a consistent basis?

**Proposed solution:**

Geodensity combines sources such as building footprints, building use, estimated floor area, employment patterns and population data to produce a granular estimate of people density. Users will eventually be able to search for a location, select an area or radius, compare alternatives and inspect the assumptions behind the estimate.

## 4. MVP scope

### In scope

- Responsive single-page marketing website
- Clear explanation of the problem and proposed solution
- Fictional sample-city heatmap using dummy but realistic data
- Email-only waitlist form
- Form validation, success and error states
- Privacy and data-use statement
- Basic analytics and conversion tracking
- Search-engine and social-sharing metadata
- Accessible keyboard and screen-reader behaviour

### Out of scope

- User accounts or login
- Real geospatial datasets
- Search by address or postcode
- Drawing custom polygons or radii
- Paid subscriptions
- Dashboards, exports or comparisons
- Live map tiles or third-party mapping API keys

## 5. Recommended implementation

Use the existing Geodensity project stack where one already exists. Otherwise use:

- Next.js with the App Router
- TypeScript
- Tailwind CSS
- Server-side API route or server action for waitlist submission
- Supabase for waitlist storage
- Resend for an optional confirmation email
- Vercel for hosting

The heatmap should be implemented as an inline responsive SVG rather than a live external map. This keeps the first release fast, predictable, privacy-friendly and free from map licensing or API-key dependencies.

## 6. Information architecture

The page should contain the following sections in this order:

1. Header
2. Hero and primary waitlist form
3. Problem
4. Solution and sample heatmap
5. How Geodensity works
6. Use cases
7. Trust and methodology statement
8. Final waitlist call to action
9. Footer

Use anchor navigation rather than separate pages for the MVP.

## 7. Page content and behaviour

### 7.1 Header

**Left:** Geodensity wordmark.

**Right navigation:**

- The problem
- How it works
- Use cases
- Join the waitlist

The final item should be styled as the primary button and scroll to the nearest waitlist form.

On mobile, show the wordmark and a single “Join the waitlist” button. A menu is unnecessary for the MVP.

### 7.2 Hero

**Eyebrow:**

Location intelligence for better decisions

**H1:**

Know where people really are

**Supporting copy:**

Geodensity estimates how many people live or work within any chosen area, helping planners compare locations, identify concentrations of demand and prioritise investment.

**Primary form:**

- Email address field
- Button: `Join the waitlist`
- Supporting text: `Get product updates and an invitation to test the first version.`

**Secondary link:**

`See how it works` — scrolls to the solution section.

**Hero visual:**

Display a compact version of the sample-city heatmap inside a framed product-preview card. Include a location label, a density legend and a selected-area summary such as:

- Selected area: Central Westbridge
- Radius: 1 km
- Estimated daytime population: 18,400
- Density score: Very high

All figures must carry an `Illustrative data` label.

### 7.3 Problem section

**Heading:**

Broad averages hide local demand

**Body copy:**

Location decisions are frequently based on postcodes, wards, census zones or regional averages. These boundaries are useful for reporting, but they rarely match the area around a site, transport stop, mast or development opportunity. Two locations only a short distance apart can serve very different populations.

Use three short problem cards:

1. **The wrong boundaries**  
   Administrative areas do not reflect the catchment around a real location.

2. **Fragmented evidence**  
   Building, employment and population information is spread across different sources and formats.

3. **Difficult comparisons**  
   Analysts spend time assembling data before they can compare candidate locations consistently.

### 7.4 Solution section

**Heading:**

A clearer picture of people density

**Body copy:**

Geodensity converts building and population information into a consistent estimate for the area that matters to the decision. Instead of accepting a fixed statistical boundary, users will be able to assess a chosen point, radius or custom area.

Place the full heatmap graphic immediately below this introduction.

## 8. Heatmap graphic specification

### 8.1 Purpose

The heatmap is the central proof-of-concept visual. It should make the product understandable within a few seconds, even though it uses fictional data.

### 8.2 Sample city

Use a fictional UK city named **Westbridge**. A fictional location avoids any risk that visitors mistake the demonstration for a real analysis.

The SVG should suggest a believable city containing:

- Dense historic centre
- Main railway station
- Business district
- University campus
- General hospital
- Several residential districts
- Light-industrial area
- River and two bridges
- Parks and lower-density outskirts

Do not use a real map outline or identifiable street network.

### 8.3 Visual composition

Create the graphic as a responsive SVG with a `viewBox` of `0 0 1200 720`.

Layers, from back to front:

1. Warm neutral background
2. Simplified neighbourhood blocks
3. Light road network
4. River, bridges and parks
5. Heatmap glow layer
6. Important place markers and labels
7. Selected circular catchment
8. Summary card
9. Density legend
10. `Illustrative data — fictional city` label

Use soft gradients and overlapping blurred circles to create the heat effect. Avoid a harsh “weather radar” appearance. The map should feel like a modern analytical product rather than a decorative illustration.

### 8.4 Density scale

Use five density bands:

| Band | Estimated people per km² | Label |
|---|---:|---|
| 1 | 0–1,000 | Low |
| 2 | 1,001–3,000 | Moderate |
| 3 | 3,001–6,000 | High |
| 4 | 6,001–10,000 | Very high |
| 5 | More than 10,000 | Exceptional |

The legend must remain readable without relying on colour alone. Include the numeric ranges and labels.

### 8.5 Dummy data

Store the sample values in a separate typed data file rather than embedding them directly in the component.

Suggested data structure:

```ts
export type DensityPoint = {
  id: string;
  name: string;
  x: number;
  y: number;
  peoplePerKm2: number;
  radius: number;
  category: "centre" | "employment" | "transport" | "education" | "health" | "residential" | "industrial";
};
```

Suggested sample points:

| Name | Category | Density | Relative position |
|---|---|---:|---|
| Old Town | Centre | 12,800/km² | Central |
| Riverside Business Quarter | Employment | 10,900/km² | Central-east |
| Central Station | Transport | 8,700/km² | South-central |
| Westbridge University | Education | 7,900/km² | North-east |
| St Anne’s Hospital | Health | 6,800/km² | North-west |
| Southbank | Residential | 5,100/km² | South-east |
| Millfield | Residential | 4,400/km² | West |
| Dockside Works | Industrial | 3,900/km² | East |
| Hillview | Residential | 3,300/km² | North |
| Westbridge Common | Residential | 1,700/km² | South-west |
| Riverside Park | Park influence | 350/km² | Central-west |
| Northern Fringe | Residential | 900/km² | Far north |

Add secondary points around major hubs so the heat transitions feel organic rather than appearing as isolated circles.

### 8.6 Selected-area example

Show a one-kilometre radius centred between Old Town and the business quarter.

The summary card should display:

- `Central Westbridge`
- `1 km radius`
- `Estimated daytime population: 18,400`
- `Average density: 8,950 people/km²`
- `Illustrative estimate`

The values do not need to be mathematically derived in the first release, but they should be internally plausible and stored in the sample-data file.

### 8.7 Interaction

Desktop:

- Hovering or focusing a named hotspot shows a small tooltip with its name, category and estimated density.
- The selected catchment remains visible at all times.

Mobile:

- Do not require hover.
- Tapping a marker opens the tooltip.
- Keep the selected-area summary permanently visible below the SVG if it would obscure the map.

Respect `prefers-reduced-motion`. Any heatmap entrance animation should be disabled for users who request reduced motion.

### 8.8 Accessibility

The SVG must have:

- `role="img"`
- A concise accessible title
- A longer description explaining the fictional city, density hotspots and selected area
- Keyboard-focusable hotspot controls
- Text labels and numeric values in addition to visual intensity

Immediately below the SVG, include a visually-hidden or expandable text summary listing the highest-density locations.

## 9. How it works

**Heading:**

From buildings to better location decisions

Use a three-step horizontal sequence on desktop and a vertical sequence on mobile.

1. **Choose an area**  
   Search for a location and select a radius or boundary relevant to the decision.

2. **Estimate the population**  
   Geodensity combines building, land-use, employment and population evidence into a granular estimate.

3. **Compare locations**  
   Review density, catchment population and supporting assumptions across possible sites.

Add a methodology note:

`Geodensity will provide modelled estimates rather than counts of identifiable individuals. The product will use aggregated data and will not track personal movements.`

## 10. Use cases

**Heading:**

Built for decisions where location matters

Use four cards:

### Network planning

Estimate the daytime population around potential infrastructure sites and prioritise areas of likely demand.

### Transport and mobility

Compare the population served by stops, stations, routes and proposed transport investments.

### Retail and property

Assess the people within realistic catchment areas around candidate stores, offices or developments.

### Public-sector planning

Build a more granular view of population and employment patterns for local services and economic analysis.

## 11. Trust and methodology section

**Heading:**

Transparent estimates, not false precision

**Copy:**

Geodensity is intended to make complex location evidence easier to use, while remaining clear about uncertainty. Estimates should show their source date, assumptions, confidence level and the geographical resolution of the underlying data. Users should be able to understand why a result was produced rather than receiving an unexplained number.

Show four small principles:

- Aggregated, privacy-conscious data
- Visible assumptions
- Confidence ranges where appropriate
- Comparable methods across locations

## 12. Final call to action

**Heading:**

Help shape the first version of Geodensity

**Body:**

Join the waitlist to receive product updates and opportunities to test early location-density tools.

Repeat the email form. Do not ask for name, organisation or telephone number in the MVP. Reducing friction is more important than collecting detailed lead information at this stage.

Success message:

`You’re on the list. We’ll email you when there is something useful to try.`

Duplicate-email message:

`You’re already on the Geodensity waitlist.`

Generic error message:

`We couldn’t add your email just now. Please try again.`

## 13. Waitlist data and API

Create a Supabase table named `gd_waitlist`.

Suggested schema:

```sql
create table gd_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_normalised text not null unique,
  source text not null default 'landing_page',
  consent_text text not null,
  consent_version text not null default 'v1',
  created_at timestamptz not null default now(),
  user_agent text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);
```

Submission flow:

1. Trim and lowercase the email for `email_normalised`.
2. Validate the address in the browser and on the server.
3. Reject empty or obviously invalid values.
4. Use a hidden honeypot field and rate limiting to reduce automated submissions.
5. Insert using a server-side Supabase client. Never expose a service-role key to the browser.
6. Treat the unique-email constraint as a friendly duplicate state rather than an error.
7. Return a typed response: `success`, `duplicate`, `invalid` or `error`.
8. Optionally send a simple confirmation email through Resend.

Consent copy below the form:

`By joining, you agree to receive occasional emails about Geodensity. You can unsubscribe at any time. See the Privacy Notice.`

## 14. Analytics

Track only useful product-validation events:

- `geodensity_page_view`
- `waitlist_form_started`
- `waitlist_submitted`
- `waitlist_duplicate`
- `waitlist_error`
- `heatmap_hotspot_viewed`
- `use_case_viewed`

Capture UTM parameters with the waitlist record. Do not send the visitor’s email address to analytics platforms.

Primary KPI:

`waitlist_submitted / unique landing-page visitors`

Secondary indicators:

- Hero-to-solution scroll rate
- Heatmap interaction rate
- Conversion by acquisition source

## 15. Visual design

The design should communicate technical credibility without looking like a conventional enterprise dashboard.

Recommended direction:

- Off-white or very pale stone page background
- Deep navy or charcoal text
- One distinctive accent colour for actions
- Heatmap gradient reserved primarily for the map
- Rounded cards with restrained shadows
- Generous spacing and short paragraphs
- Modern sans-serif typeface with clear numeric forms

Avoid:

- Stock photography
- Satellite imagery
- Dense charts or data tables above the fold
- Claims that the product already provides national coverage
- Vague artificial-intelligence language
- Excessive animation

## 16. Responsive behaviour

### Desktop, 1024 px and above

- Hero uses a two-column layout: copy and form on the left, heatmap preview on the right.
- Full heatmap fills a wide content container.
- Use-case cards display in a four-column grid where space allows.

### Tablet, 768–1023 px

- Hero remains two columns only when the heatmap remains legible.
- Otherwise stack the visual below the copy.
- Use-case cards display two per row.

### Mobile, below 768 px

- Single-column layout
- Heatmap may horizontally scroll only as a last resort; prefer adapting labels and summary placement
- Email input and button stack vertically
- Minimum touch target of 44 by 44 pixels
- Body text no smaller than 16 pixels

## 17. SEO and metadata

**Page title:**

`Geodensity — Understand people density around any location`

**Meta description:**

`Geodensity estimates how many people live or work within a chosen area, helping planners compare locations and make better investment decisions.`

**Open Graph title:**

`Know where people really are | Geodensity`

**Open Graph description:**

`A more granular way to understand population, workplace density and location demand.`

Create a social image based on the fictional Westbridge heatmap and clearly label it `Illustrative data`.

## 18. Performance and security

- Target a Lighthouse performance score above 90 on mobile.
- Keep the main SVG optimised and below approximately 150 KB uncompressed.
- Lazy-load non-critical sections where appropriate, but do not delay the hero form.
- Apply a Content Security Policy.
- Add secure headers and HTTPS-only behaviour.
- Keep secrets in environment variables.
- Sanitize all submitted values.
- Apply server-side rate limiting by IP or request fingerprint.
- Do not include real personal or movement data in the demonstration.

## 19. Suggested project structure

```text
app/
  api/
    waitlist/
      route.ts
  privacy/
    page.tsx
  page.tsx
  layout.tsx
components/
  Header.tsx
  Hero.tsx
  ProblemSection.tsx
  DensityHeatmap.tsx
  HeatmapTooltip.tsx
  HowItWorks.tsx
  UseCases.tsx
  Methodology.tsx
  WaitlistForm.tsx
  Footer.tsx
data/
  westbridge-density.ts
lib/
  analytics.ts
  email.ts
  supabase-server.ts
  validation.ts
public/
  geodensity-social-preview.png
```

## 20. Acceptance criteria

The release is complete when:

1. A first-time visitor can understand the problem and proposition without scrolling.
2. The page contains a clearly labelled fictional heatmap with realistic density variation.
3. The heatmap works at desktop, tablet and mobile widths.
4. A user can submit a valid email and see a success state without a page reload.
5. Duplicate emails produce a friendly confirmation rather than a technical error.
6. Invalid email addresses are rejected on both client and server.
7. The email is stored in Supabase with consent, source and campaign metadata.
8. The form is protected by a honeypot and server-side rate limiting.
9. All interactive elements are keyboard-accessible and have visible focus states.
10. The page passes automated accessibility checks with no serious issues.
11. The heatmap has an accessible text description and does not rely on colour alone.
12. Analytics record page views, heatmap interactions and successful waitlist registrations without capturing email addresses.
13. The site includes a privacy notice and unsubscribe wording.
14. No copy or visual suggests that the dummy heatmap represents real measured data.
15. The production page loads securely on `geodensity.net` and has correct search and social metadata.

## 21. Future extensions

The architecture should allow later addition of:

- Address and postcode search
- Radius and travel-time catchments
- Residential, workplace and blended daytime views
- Comparison of multiple locations
- Confidence intervals and methodology drill-downs
- Real geospatial datasets
- CSV and image exports
- Saved projects and user accounts
- API access for enterprise users

These capabilities should not be exposed as working features on the initial landing page. They may be described only as planned possibilities where the wording remains cautious.
