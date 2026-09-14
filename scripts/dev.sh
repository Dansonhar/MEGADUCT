#!/usr/bin/env bash
# MEGADUCT dev server supervisor.
#
# Runs Vite and restarts it automatically if it ever exits unexpectedly, so the
# server stays up for the whole working session. Stop it deliberately with
# Ctrl+C (that is treated as "you meant it" and does not restart).
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

PORT="${PORT:-5173}"
LOG="${LOG:-.dev-server.log}"
RED=$'\033[31m'; GRN=$'\033[32m'; YEL=$'\033[33m'; DIM=$'\033[2m'; OFF=$'\033[0m'

stop=0
on_int() { stop=1; printf '\n%sdev server stopped by you.%s\n' "$DIM" "$OFF"; exit 0; }
trap on_int INT TERM

# If something is already listening on the port, say so rather than letting
# Vite fail cryptically (strictPort makes it exit).
existing="$(lsof -ti:"$PORT" 2>/dev/null | head -1)"
if [ -n "$existing" ]; then
  printf '%sPort %s is already in use by PID %s.%s\n' "$YEL" "$PORT" "$existing" "$OFF"
  printf 'Either open http://localhost:%s (it may already be your dev server),\n' "$PORT"
  printf 'or free it with:  kill %s\n\n' "$existing"
  exit 1
fi

attempt=0
printf '%sMEGADUCT dev server — supervised. Ctrl+C to stop.%s\n' "$DIM" "$OFF"
printf '%slog: %s%s\n\n' "$DIM" "$LOG" "$OFF"

while [ "$stop" -eq 0 ]; do
  start=$(date +%s)
  npx vite --port "$PORT" 2>&1 | tee -a "$LOG"
  code=${PIPESTATUS[0]}
  [ "$stop" -eq 1 ] && break

  elapsed=$(( $(date +%s) - start ))
  attempt=$((attempt+1))

  if [ "$code" -eq 0 ]; then
    printf '\n%svite exited cleanly.%s\n' "$DIM" "$OFF"
    break
  fi

  # A crash within a couple of seconds means the config or a port is broken;
  # restarting in a tight loop would just spam. Back off and explain.
  if [ "$elapsed" -lt 3 ] && [ "$attempt" -ge 3 ]; then
    printf '\n%svite has crashed %s times immediately (exit %s).%s\n' "$RED" "$attempt" "$code" "$OFF"
    printf 'This is a real error, not a flake — see the output above or %s\n' "$LOG"
    exit 1
  fi

  delay=$(( attempt < 5 ? attempt : 5 ))
  printf '\n%svite exited (code %s) after %ss — restarting in %ss…%s\n' \
    "$YEL" "$code" "$elapsed" "$delay" "$OFF"
  sleep "$delay"
done
