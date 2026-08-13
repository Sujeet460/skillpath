# Skillpath

A responsive learning-platform landing page built as a Framer Code Component for the Junior Developer assignment.

Skillpath demonstrates a live API-driven course catalogue with country-based pricing, resilient error handling, responsive layouts, search, sorting, and customizable Framer properties.

## Live Demo

**Framer:**
`PASTE_YOUR_PUBLISHED_FRAMER_LINK_HERE`

## Repository

**GitHub:**
`PASTE_YOUR_GITHUB_REPOSITORY_LINK_HERE`

---

## Features

* Responsive learning-platform landing page
* Live course data from the provided API
* Dynamic course count
* Country-based currency display
* INR and USD price formatting
* Loading skeletons
* API error handling for 404/500 responses
* Empty-state handling
* Independent Course and Country API failures
* Independent retry actions
* Client-side course search
* Client-side price sorting
* Refundable course badge
* Two-line course descriptions
* Responsive 3/2/1 course grid
* Dark/Light mode
* Accessible search, sorting, and retry controls
* Two Framer property controls

---

## API Integration

The application uses the provided public API.

### Course Data

```text
GET https://syncsphere-hiv6.onrender.com/assignment/course-data
```

Returns a dynamic array of courses.

### Country Code

```text
GET https://syncsphere-hiv6.onrender.com/assignment/country-code
```

Returns either:

```json
{
  "country_code": "IN"
}
```

or:

```json
{
  "country_code": "US"
}
```

No authentication is required.

---

## Currency Handling

The country API determines which price field is displayed.

### India

The API returns the price in paise.

```text
pricePaise / 100
```

Example:

```text
199900 paise → ₹1,999
```

### United States

The API returns the price in cents.

```text
priceUsdCents / 100
```

Example:

```text
3999 cents → $39.99
```

`Intl.NumberFormat` is used for currency formatting.

If the country request fails, the course data remains visible and the price is shown as unavailable rather than guessing a currency.

---

## Error Handling

The provided API intentionally fails periodically with HTTP 404 or 500 responses.

The application handles these states independently.

### Course API failure

The course section displays an error state with a retry action.

Retrying courses only requests the course endpoint again.

### Country API failure

Successfully loaded courses remain visible.

The price displays:

```text
Price unavailable
```

with an independent country retry action.

Retrying the country does not refetch the course data.

### Empty Response

If the course API returns:

```json
[]
```

the application displays a dedicated empty state rather than an error.

---

## Responsive Design

The course grid adapts to different screen sizes:

| Screen  | Columns |
| ------- | ------: |
| Desktop |       3 |
| Tablet  |       2 |
| Mobile  |       1 |

The grid is generated dynamically from the API response, so it does not assume a fixed number of courses.

---

## Framer Property Controls

The component exposes exactly two Framer controls:

### Accent Color

Controls the primary visual accent used throughout the interface.

### Card Border Radius

Controls the corner radius of course cards.

Both controls can be changed from the Framer property panel without modifying the source code.

---

## Search and Sorting

### Search

Search is performed client-side against:

* Course name
* Description
* Main category

It is case-insensitive and does not create additional API requests.

### Sorting

Courses can be sorted by:

* Select Order
* Price: Low to High
* Price: High to Low

Price sorting uses the correct currency field based on the country API response.

---

## Technology

* React
* TypeScript
* Framer Code Components
* Tailwind CSS
* Native Fetch API
* CSS Grid
* `Intl.NumberFormat`

No external data-fetching library is required.

---

## Project Structure

```text
src/
├── components/
│   ├── CourseCard.tsx
│   ├── Courses.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── States.tsx
│
├── utils/
│   └── price.ts
│
├── types.ts
├── Skillpath.tsx
├── main.tsx
├── index.css
└── framer-mock.ts
```

### Main responsibilities

**Skillpath.tsx**
Manages API requests, application state, retries, and Framer properties.

**Courses.tsx**
Handles search, sorting, and the responsive course grid.

**CourseCard.tsx**
Displays individual course information.

**States.tsx**
Contains loading, error, and empty states.

**price.ts**
Handles country-based price formatting.

**Hero.tsx**
Landing-page hero section and CTA.

**Footer.tsx**
Footer links and copyright information.

---

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run TypeScript validation:

```bash
npx tsc --noEmit
```

---

## AI Usage

AI tools were used during development.

**AI used:** ChatGPT and `[INSERT YOUR AI IDE NAME]`.

AI was used for architecture discussion, API error-handling review, implementation assistance, debugging, and compliance checks.

I reviewed the generated implementation and specifically validated the API failure handling, independent course/country retries, currency conversion, responsive behavior, and Framer property controls.

The final implementation was tested against the assignment requirements rather than relying on generated code without review.

## What I Would Improve With More Time

With another two days, I would focus on deeper visual testing across more device sizes and browsers, improve the accessibility pass further, and add automated tests for the API state transitions and currency formatting. I would also refine the visual system and micro-interactions while keeping the API behavior unchanged.

---

## Assignment Notes

The course and country APIs are intentionally unreliable and may return HTTP 404 or 500 responses. The application is designed to handle these failures without displaying raw errors or losing successfully loaded course data.

The course count is also dynamic, so the UI does not rely on a fixed number of cards.

---

## License

This project was created as a developer assignment for demonstration and evaluation purposes.
