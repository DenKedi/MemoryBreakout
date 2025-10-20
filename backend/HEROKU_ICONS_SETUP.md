# Heroku Backend Deployment - Icon Setup

## Problem

Der Backend sucht nach Icons im `icons/` Verzeichnis, aber das existiert nicht auf Heroku wenn wir nur den Backend deployen.

## Lösung: Icons mit Git hochladen

Das einfachste ist, die Icons direkt in Git zu committen und zu deployen:

```bash
# 1. Icons in den Backend-Ordner kopieren (lokal)
cp -r ../MemoryBreakout/src/assets/icons ./icons

# 2. Git-ignore anpassen (nur die Regel für "icons/" entfernen wenn nötig)
# Die Icons sollten jetzt mit Git committbar sein

# 3. Committen
git add icons/
git commit -m "add: Studio icons for Heroku deployment"

# 4. Zu Heroku pushen
git push heroku master
```

## Alternative: Heroku Buildpack

Falls die Icons zu groß werden für Git, kann man einen Custom Buildpack verwenden der die Icons von irgendwo herunterlädü.

## Was passiert nach dem Push:

- Die Icons werden mit dem Git-Repo zu Heroku hochgeladen
- Das `postinstall` Script versucht sie zu kopieren, findet sie aber schon vor
- Der Server kann die Icons dann bei `ICONS_BASE_PATH` finden
