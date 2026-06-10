# SP Home-Assistant Dashboard

Dieses Repository enthält eine HACS-kompatible **Dashboard**-Installation für die Startseite eines dunklen Home-Assistant Dashboards im Stil des bereitgestellten Screenshots.

## Direkt über HACS installieren

1. Öffne Home Assistant → **HACS** → **Drei Punkte** → **Benutzerdefinierte Repositories**.
2. Füge die URL dieses GitHub-Repositories ein.
3. Wähle als Kategorie **Dashboard** aus und füge das Repository hinzu.
4. Installiere **SP Dashboard** über HACS.
5. Falls HACS die Ressource nicht automatisch ergänzt, füge unter **Einstellungen → Dashboards → Ressourcen** diese JavaScript-Ressource hinzu:

   ```text
   /hacsfiles/sp-dashboard/sp-dashboard.js
   ```

6. Füge temporär eine Karte vom Typ `custom:sp-dashboard` zu einem Dashboard hinzu. Diese Karte zeigt dir die über HACS installierte Vorlage an und bietet einen Button zum Kopieren der Startseiten-YAML.
7. Öffne den **Raw-Konfigurationseditor** deines gewünschten Dashboards und füge die kopierte Vorlage ein.

> Hinweis: HACS kann Dashboard-Ressourcen und Dateien installieren, aber Home Assistant legt aus Sicherheits- und Architekturgründen keine komplette Lovelace-Ansicht automatisch aus einer HACS-Installation heraus an. Deshalb liefert `custom:sp-dashboard` die Vorlage direkt in der Weboberfläche zum Kopieren aus.

## Enthaltene HACS-Dateien

- `hacs.json` – HACS-Metadaten für die Kategorie **Dashboard**.
- `dist/sp-dashboard.js` – HACS-konformes Dashboard-Element und Installer-Karte.
- `dist/startseite.yaml` – Startseitenvorlage mit `/hacsfiles/sp-dashboard/...` Pfaden.
- `dist/floorplan-placeholder.svg` – über HACS ausgelieferter Platzhalter-Grundriss.

Zusätzlich bleiben die manuellen Quellen erhalten:

- `dashboards/startseite.yaml` – Lovelace Raw-Konfiguration mit `/local/...` Pfad für manuelle Installationen.
- `www/sp-dashboard/floorplan-placeholder.svg` – Grundriss-Platzhalter für manuelle Installationen unter `config/www/`.

## Voraussetzungen

Installiere über HACS zusätzlich die folgenden Frontend-Komponenten:

1. Mushroom Cards (`custom:mushroom-*`)
2. card-mod
3. layout-card
4. stack-in-card

Die Karten sind bewusst als normale Lovelace-/Mushroom-Konfiguration angelegt. Nach dem Import kannst du Entitäten, Reihenfolge, Positionen und Kartentypen weiterhin über die Home-Assistant Weboberfläche bzw. den Raw-Konfigurationseditor anpassen.

## Aufbau der Startseite

- Kopfzeile links: Anwesenheit als Mushroom Person Cards.
- Kopfzeile mittig: dynamische Titelkarte für Seite/Raum.
- Linke Sidebar: Wetter- und Kalenderkarte nur für die Startseite.
- Mitte: Grundriss als `picture-elements` Karte mit frei positionierbaren Mushroom Cards.
- Unten: Navigationsleiste mit Mushroom Chips für spätere Bereiche und Raumseiten.

## Platzhalter-Entitäten anpassen

Passe nach dem Einfügen der Vorlage diese Beispiel-Entitäten an deine Installation an:

- `person.person_1`, `person.person_2`
- `weather.forecast_home`
- `calendar.home`
- `light.buero`, `light.schlafzimmer`, `light.wohnzimmer`
- `sensor.kueche_temperatur`, `sensor.home_humidity`

## Anpassung der Mushroom Cards

Im Grundriss werden Mushroom Cards als `picture-elements` Elemente verwendet. Die Position steuerst du über `style.top`, `style.left` und `style.width`. Beispiel:

```yaml
style:
  top: 67%
  left: 82%
  width: 190px
```

So kannst du alle gängigen Mushroom Cards ergänzen, austauschen und an die gewünschte Stelle setzen.

## Manuelle Installation ohne HACS

Wenn du HACS nicht verwenden möchtest:

1. Kopiere den Ordner `www/sp-dashboard` in deinen Home-Assistant `config/www/` Ordner.
2. Öffne Home Assistant → **Einstellungen** → **Dashboards**.
3. Erstelle ein neues Dashboard oder öffne ein bestehendes Dashboard.
4. Öffne den **Raw-Konfigurationseditor** und füge den Inhalt von `dashboards/startseite.yaml` ein.
