<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- All page copy and figures live in typed constants in `src/data/beloira.ts`; components only read from it, so text edits happen in one place.
- Image slots are single constants (`IMAGES` in the data file); a `null` slot renders a neutral placeholder, so real photos can be swapped in without touching components.
- The Beloira page is one long anchor-scrolling page by explicit brief (sticky nav with section ids), not separate routes.
- Charts (Recharts) are lazy-loaded behind `ClientOnly` + `Suspense` to keep them out of SSR and the initial bundle; each chart has an sr-only data table.
- The NDA form and data-room gating are client-side simulations (React state only, nothing stored or sent); they must be wired to a secure server workflow before real use.
