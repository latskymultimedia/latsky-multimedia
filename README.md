# AWIEF 2026 conference app (PWA)
Static site: host the folder on Cloudflare Pages / Netlify / GitHub Pages (HTTPS required).

**Update content:** edit `schedule.json` (times, TBA panels) and `announcements.json` (in-app updates). Bump `C='awief-v1'` in `sw.js` when you change app files.
**Map:** drop the CTICC floor plan in as `map.jpg`; it appears on the Info tab.
**Push:** create an OneSignal web app, paste the App ID into `CFG.onesignal` in index.html. iPhone users must add the app to their Home Screen first.
**Photo wall (Supabase):** project URL is already set in `CFG.sbUrl` (https://qiriradmvqldqsdltlpl.supabase.co). Run `supabase-setup.sql` once in the Supabase SQL Editor (creates the `moments` table, the public `moments` bucket and the permissions). Then paste the **publishable key** (`sb_publishable_...`, Project Settings > API Keys) into `CFG.sbKey`. Never put the secret key or the `service_role` key in the app. Approve photos in Table Editor > moments by ticking `approved`.
**Analytics:** add a Plausible/Umami script tag where marked in index.html.
