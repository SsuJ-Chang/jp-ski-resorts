---
name: weathernews-snow-weather
description: Run the manual resort weather update workflow when the user says "更新雪況天氣" or explicitly requests the same operation. Read only snow depth and a seven-day forecast from each resort's Weathernews ski page; do not use for background scheduling or recurring scraping.
---

# Weathernews Snow Weather

Use this project-local skill when the user says `更新雪況天氣`, or explicitly asks to inspect or update a Japanese ski resort's `snowWeather` block using a Weathernews ski page.

## Scope

- This is a manual, one-request workflow. It is not a scraper, daemon, scheduled job, or runtime API.
- Research-only requests must not modify files.
- Only edit `snowWeather` when the user explicitly asks for an update.
- By default, update only the resorts listed in `references/target-resorts.md`; update other resorts only when the user names them.
- Treat Markdown comments in `references/target-resorts.md` as disabled entries. A resort line wrapped in `<!-- ... -->` must not be updated until it is uncommented.
- Preserve the project's static-first boundary and the existing resort data schema.
- Keep the Weathernews URL in `snowWeather.url`; do not put the provider name in user-facing notes except in the provider/source field.

## Fast Browser Workflow

Avoid a full-page snapshot because Weathernews pages contain a large hourly forecast and map DOM.

1. Open the resort's Weathernews URL from `snowWeather.url` or `links.weather`, or use the URL supplied by the user. If a target-list entry has no Weathernews URL, skip it and report it instead of substituting an unrelated source.
2. Use a targeted DOM query for the 10-day tab:

   ```js
   () => Array.from(document.querySelectorAll(
     '.switchContent__item[data-num="3"] .wTable__body .wTable__row'
   )).map((row) => ({
     date: row.querySelector('.day')?.innerText.trim(),
     high: row.querySelector('.txt-h')?.innerText.trim(),
     low: row.querySelector('.txt-l')?.innerText.trim(),
     weatherImage: row.querySelector('.weather img')?.src ?? '',
     snowImage: row.querySelector('.snowIcon')?.src ?? '',
   }))
   ```

3. Read the current snow depth from the page's `現在の積雪` block. Treat `---`, blank, `N/A`, or an unavailable seasonal value as unavailable; never convert it to `0 cm`.
4. Use only seven forecast rows, starting with the execution date in Japan Standard Time (JST) and continuing through six following calendar days. Do not store the remaining rows from the 10-day tab.
5. Use a small screenshot of the visible seven-day table when weather image URLs do not provide text. Weathernews often renders weather as icons without accessible labels.
6. Record the page's visible season/status notice and whether the resort is operating. A closed-season page can still provide a forecast, but it does not provide a live ski-surface condition.

## Reporting

When the user asks only what is visible, report:

- current snow depth, including `--- cm` when unavailable;
- each of the seven selected dates with weather interpretation and high/low temperature;
- whether the snow-quality column has a value;
- the page's operating-season/status notice;
- the distinction between forecast weather and live resort snow conditions.

Do not infer weather text from temperature alone. If an icon cannot be identified confidently, say that the icon is shown but its label is unavailable.

## Weather Icons

- Weathernews supplies forecast images, but the resort schema intentionally stores only the `weather` text and does not persist provider image URLs.
- Use the source image only to interpret the forecast during research. Do not add `weatherIcon`, external image URLs, or a new schema field during a weather-data update.
- If the UI later needs icons, derive a local icon from the stored weather text with an accessible text label; keep the data files provider-neutral.

## Updating Resort Content

Before editing, inspect the target entry and confirm the exact Weathernews URL. Change only the `snowWeather` block unless the user requests more.

- Keep `title`, `provider`, and the resort-specific `url` consistent with the entry.
- Store forecast dates, weather labels, and temperatures as display strings accepted by `src/content.config.ts`.
- Populate only `snowDepth` and the seven `forecast` entries from the weather reading; do not add hourly wind, hourly precipitation, snow-quality, or other Weathernews fields to the resort data.
- Always update `updatedAt` when a `snowWeather` update succeeds. Use the time when the user requested this update, in Taiwan time (Asia/Taipei), using the project's existing display format. Never copy the source page's observation/update time into `updatedAt`; one batch update should use the same request timestamp for every resort.
- If the source has no current snow depth, keep an explicit unavailable value such as `to be filled` rather than inventing a number.
- If the source has no usable 10-day rows, keep `forecast: []`.
- Do not copy stale placeholder weather as current data.
- Keep notes neutral and state that the block is a static snapshot, not a live feed.

After a content update, run `npm run check` as required by `AGENTS.md`. For a research-only request, do not run a build unless needed for diagnosis.

## References

- `skills/weathernews-snow-weather/references/target-resorts.md` (default update scope; create and maintain this list before using the default trigger)
- `DATA_SCHEMA.md` section `snowWeather`
- `src/content.config.ts` (`snowWeatherSchema`)
- `skills/jp-ski-resort-data/SKILL.md`
- `src/pages/resorts/[id].astro` snow weather display logic
