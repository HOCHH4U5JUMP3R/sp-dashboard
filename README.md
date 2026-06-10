# SP Home-Assistant Dashboard

Dieses Repository enthält eine erste Lovelace-Konfiguration für die **Startseite** eines dunklen Home-Assistant Dashboards im Stil des bereitgestellten Screenshots.

## Enthalten

- `dashboards/startseite.yaml` – importierbare Lovelace Raw-Konfiguration für die Startseite.
- `www/sp-dashboard/floorplan-placeholder.svg` – Platzhalter-Grundriss für die Picture-Elements/Image-Karte.

## Voraussetzungen

Installiere über HACS die folgenden Frontend-Komponenten:

1. Mushroom Cards (`custom:mushroom-*`)
2. card-mod
3. layout-card
4. stack-in-card

Die Karten sind bewusst als normale Lovelace-/Mushroom-Konfiguration angelegt. Nach dem Import kannst du Entitäten, Reihenfolge, Positionen und Kartentypen weiterhin über die Home-Assistant Weboberfläche bzw. den Raw-Konfigurationseditor anpassen.

## Installation

1. Kopiere den Ordner `www/sp-dashboard` in deinen Home-Assistant `config/www/` Ordner.
2. Öffne Home Assistant → **Einstellungen** → **Dashboards**.
3. Erstelle ein neues Dashboard oder öffne ein bestehendes Dashboard.
4. Öffne den **Raw-Konfigurationseditor** und füge den Inhalt von `dashboards/startseite.yaml` ein.
5. Passe die Platzhalter-Entitäten an deine Installation an, zum Beispiel:
   - `person.person_1`, `person.person_2`
   - `weather.forecast_home`
   - `calendar.home`
   - `light.buero`, `light.schlafzimmer`, `light.wohnzimmer`
   - `sensor.kueche_temperatur`, `sensor.home_humidity`

## Aufbau der Startseite

- Kopfzeile links: Anwesenheit als Mushroom Person Cards.
- Kopfzeile mittig: dynamische Titelkarte für Seite/Raum.
- Linke Sidebar: Wetter- und Kalenderkarte nur für die Startseite.
- Mitte: Grundriss als `picture-elements` Karte mit frei positionierbaren Mushroom Cards.
- Unten: Navigationsleiste mit Mushroom Chips für spätere Bereiche und Raumseiten.

## Anpassung der Mushroom Cards

Im Grundriss werden Mushroom Cards als `picture-elements` Elemente verwendet. Die Position steuerst du über `style.top`, `style.left` und `style.width`. Beispiel:

```yaml
style:
  top: 67%
  left: 82%
  width: 190px
```

So kannst du alle gängigen Mushroom Cards ergänzen, austauschen und an die gewünschte Stelle setzen.
