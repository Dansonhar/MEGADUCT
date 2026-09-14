#!/usr/bin/env bash
# MEGADUCT pre-deploy gate.
# Catches the things that make a GitHub Pages site render blank or broken.
# Run manually:  ./scripts/check-site.sh
set -uo pipefail

cd "$(git rev-parse --show-toplevel)" || exit 1

RED=$'\033[31m'; GRN=$'\033[32m'; YEL=$'\033[33m'; DIM=$'\033[2m'; OFF=$'\033[0m'
fail=0; warn=0
err()  { printf '%s  FAIL %s %s\n' "$RED" "$OFF" "$1"; fail=$((fail+1)); }
wrn()  { printf '%s  WARN %s %s\n' "$YEL" "$OFF" "$1"; warn=$((warn+1)); }
ok()   { printf '%s  ok   %s %s\n' "$GRN" "$OFF" "$1"; }

printf '\n%sMEGADUCT — pre-deploy checks%s\n\n' "$DIM" "$OFF"

# 1. An entry point must exist. Without this, Pages serves 404 / blank.
if [ -f index.html ]; then
  ok "index.html present at repo root"
else
  err "no index.html at repo root — GitHub Pages will serve a blank page/404"
fi

# 2. Every local href/src must resolve, with EXACT case.
#    macOS is case-insensitive; GitHub Pages (Linux) is not. This is the
#    single most common cause of "works on my machine, blank when live".
missing=0; casebad=0
while IFS= read -r html; do
  # pull href="..." and src="..." values
  grep -oE '(href|src)[[:space:]]*=[[:space:]]*"[^"]*"' "$html" 2>/dev/null \
  | sed -E 's/.*"(.*)"/\1/' \
  | while IFS= read -r ref; do
      case "$ref" in
        ''|'#'*|http://*|https://*|//*|mailto:*|tel:*|data:*|javascript:*) continue ;;
      esac
      clean="${ref%%#*}"; clean="${clean%%\?*}"
      [ -z "$clean" ] && continue
      case "$clean" in /*) target=".${clean}" ;; *) target="$(dirname "$html")/$clean" ;; esac
      if [ -e "$target" ]; then
        # exists case-insensitively on macOS — now confirm exact case
        base="$(basename "$target")"; dir="$(dirname "$target")"
        if ! ls -1 "$dir" 2>/dev/null | grep -qxF "$base"; then
          printf 'CASE\t%s\t%s\n' "$html" "$ref"
        fi
      else
        printf 'MISS\t%s\t%s\n' "$html" "$ref"
      fi
    done
done < <(find . \( -path ./.git -o -path ./node_modules -o -path ./dist \) -prune -o -name '*.html' -print) > /tmp/_md_refs.$$ 2>/dev/null

if [ -s /tmp/_md_refs.$$ ]; then
  while IFS=$'\t' read -r kind file ref; do
    if [ "$kind" = "MISS" ]; then
      err "broken link — ${file#./} → $ref"
    else
      err "case mismatch (breaks on Pages, works on macOS) — ${file#./} → $ref"
    fi
  done < /tmp/_md_refs.$$
else
  [ -f index.html ] && ok "all local asset paths resolve with exact case"
fi
rm -f /tmp/_md_refs.$$

# 3. The stylesheet and script the pages rely on.
[ -f assets/css/style.css ] && ok "assets/css/style.css present" || wrn "assets/css/style.css missing — page will render unstyled"
[ -f assets/js/main.js ]    && ok "assets/js/main.js present"    || wrn "assets/js/main.js missing — nav/lightbox/filters will not work"

# 4. Junk that should never ship.
if find . \( -path ./.git -o -path ./node_modules -o -path ./dist \) -prune -o -name '.DS_Store' -print | grep -q .; then
  wrn ".DS_Store files are tracked/present — they are gitignored, but remove any already committed"
fi

# 5. Jekyll on Pages skips files/folders starting with underscore.
if find . \( -path ./.git -o -path ./node_modules -o -path ./dist \) -prune -o -name '_*' -print 2>/dev/null | grep -q .; then
  wrn "paths starting with '_' found — add a .nojekyll file or Pages may not serve them"
fi

printf '\n'
if [ "$fail" -gt 0 ]; then
  printf '%s%d check(s) failed — push blocked.%s Fix the above, or bypass with: git push --no-verify\n\n' "$RED" "$fail" "$OFF"
  exit 1
fi
printf '%sAll checks passed%s%s\n\n' "$GRN" "$OFF" "$( [ "$warn" -gt 0 ] && printf ' (%d warning(s))' "$warn" )"
exit 0
