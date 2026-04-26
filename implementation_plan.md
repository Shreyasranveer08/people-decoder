# People Decoder AI - Ultra Premium Features Upgrade

This plan outlines the integration of several high-end features to transform the application into an "Ultra-Premium" behavioral analysis tool. 

## Proposed Changes

We will add four major features:
1. **Personality Archetype Tagging:** A psychological label for the target.
2. **Honesty vs. Manipulation Meter:** A visual heatmap/bar showing how genuine the target is.
3. **Smart Auto-Reply Generator:** 3 context-aware reply suggestions.
4. **Export/Download Report:** A button to capture the result as a shareable image/PDF.

---

### UI & Layout (`index.html`)

#### [MODIFY] `index.html`
- **Archetype Badge:** Add a small badge next to the main `vibeTitle` in the Overview Banner.
- **Honesty Meter:** Add a new card or section under the Emotional Attachment to display an animated progress bar for Honesty (0-100%).
- **Auto-Replies:** Add a new section below the Final Verdict to display 3 actionable response cards (e.g., Professional, Boundary-Setting, Casual).
- **Download Button:** Add an "Export Report" button near the "Analyze Another Chat" button.
- **Dependencies:** Inject the `html2canvas` CDN link into the `<head>` to enable the screenshot export functionality.

---

### Logic & AI Prompt (`app.js`)

#### [MODIFY] `app.js`
- **Prompt Engineering:** Update the JSON schema in the prompt to require new fields:
  - `"archetype"`: String (e.g., "The Corporate Shark", "The Avoidant Ghoster")
  - `"honestyPercentage"`: Number (0-100)
  - `"suggestedReplies"`: Array of objects containing `type` and `text`.
- **Render Logic:** Update the `renderResults(data)` function to inject the new fields into the DOM.
- **Export Logic:** Add an event listener for the "Export Report" button that uses `html2canvas` to take a snapshot of the `resultsSection` and trigger a PNG download.

---

### Styling (`style.css`)

#### [MODIFY] `style.css`
- **Badges:** CSS classes for the `archetype-badge`.
- **Heatmap Meter:** CSS for the `honesty-meter-container`, the track, and the dynamic fill bar that changes color (red for low honesty, green for high).
- **Reply Cards:** Grid layout and glassmorphism styling for the `reply-card` elements so they look premium and clickable.
- **Export Button:** Styling for a flashy secondary action button.

---

## User Review Required

> [!IMPORTANT]
> To implement the **Download/Share Report** feature, I will add an external library (`html2canvas` via a secure CDN) to the `index.html` file. This allows the app to take a "screenshot" of the results page and download it as an image. Are you okay with adding this external script?

Please review this plan. If it looks good, approve it and I will execute the changes!
