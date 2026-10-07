<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portal architecture
- Use TanStack file routes for Home, Lab, Profile, Social and experiment details so each view is independently navigable.
- Keep student information, experiments and theme in a shared browser-persisted React provider; hydrate storage after mount to preserve SSR consistency.
- Define the portal's appearance in the global semantic design system and reuse accessible Button and Dialog components.
- Keep reference experiment records in a browser-safe seed module; merge updated defaults with saved custom records and replace only legacy demo entries so user-added work survives content updates.
- Store supplied photos and official university branding as CDN asset pointers; derive the public favicon from the same official logo source.
