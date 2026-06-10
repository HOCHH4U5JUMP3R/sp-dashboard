const SP_DASHBOARD_VERSION = '0.2.0';
const TEMPLATE_URL = '/hacsfiles/sp-dashboard/startseite.yaml';
const FLOORPLAN_URL = '/hacsfiles/sp-dashboard/floorplan-placeholder.svg';

class SpDashboardCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._template = '';
    this._error = '';
    this._copied = false;
  }

  setConfig(config) {
    this.config = config || {};
    this.render();
    this.loadTemplate();
  }

  set hass(hass) {
    this._hass = hass;
  }

  getCardSize() {
    return 6;
  }

  static getStubConfig() {
    return {
      title: 'SP Dashboard Installer',
      show_preview: true,
    };
  }

  async loadTemplate() {
    if (this._template) return;

    try {
      const response = await fetch(TEMPLATE_URL, { cache: 'no-store' });
      if (!response.ok) {
        this._error = `Vorlage konnte nicht geladen werden (${response.status}).`;
        this.render();
        return;
      }

      this._template = await response.text();
      this._error = '';
    } catch (error) {
      this._error = `Vorlage konnte nicht geladen werden: ${error.message}`;
    }

    this.render();
  }

  async copyTemplate() {
    if (!this._template) await this.loadTemplate();
    if (!this._template) return;

    try {
      await navigator.clipboard.writeText(this._template);
      this._copied = true;
      this._error = '';
      this.render();
      window.setTimeout(() => {
        this._copied = false;
        this.render();
      }, 2500);
    } catch (error) {
      this._error = `YAML konnte nicht in die Zwischenablage kopiert werden: ${error.message}`;
      this.render();
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const title = this.config?.title || 'SP Dashboard Installer';
    const previewEnabled = this.config?.show_preview !== false;
    const templatePreview = this._template
      ? this.escapeHtml(this._template.split('\n').slice(0, 42).join('\n'))
      : 'Lade /hacsfiles/sp-dashboard/startseite.yaml …';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card {
          overflow: hidden;
          color: var(--primary-text-color);
          background: linear-gradient(180deg, rgba(5,10,36,.96), rgba(13,24,72,.96));
          border-radius: 24px;
          border: 1px solid rgba(145,163,218,.22);
          box-shadow: 0 18px 55px rgba(0,0,0,.28);
        }
        .wrap { padding: 24px; }
        .eyebrow {
          color: #2aa9ff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        h2 { margin: 8px 0 8px; font-size: 24px; letter-spacing: .04em; }
        p { margin: 0 0 16px; color: rgba(255,255,255,.72); line-height: 1.5; }
        .actions { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0; }
        button, a.button {
          border: 1px solid rgba(42,169,255,.45);
          border-radius: 999px;
          background: rgba(42,169,255,.14);
          color: #d9ecff;
          cursor: pointer;
          font: inherit;
          font-weight: 700;
          padding: 10px 16px;
          text-decoration: none;
        }
        button:hover, a.button:hover { background: rgba(42,169,255,.24); }
        .notice {
          border-left: 3px solid #2aa9ff;
          background: rgba(255,255,255,.06);
          border-radius: 12px;
          padding: 12px 14px;
          margin-top: 14px;
        }
        .error { border-left-color: #ff6b6b; }
        code, pre {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
        }
        pre {
          max-height: 360px;
          overflow: auto;
          margin: 18px 0 0;
          padding: 16px;
          border-radius: 16px;
          background: rgba(0,0,0,.34);
          color: rgba(255,255,255,.8);
          font-size: 12px;
          line-height: 1.45;
          white-space: pre-wrap;
        }
        .meta { color: rgba(255,255,255,.48); font-size: 12px; margin-top: 14px; }
      </style>
      <ha-card>
        <div class="wrap">
          <div class="eyebrow">HACS Dashboard Element</div>
          <h2>${this.escapeHtml(title)}</h2>
          <p>
            Diese HACS-Installation liefert die SP-Dashboard Startseitenvorlage, den Grundriss-Platzhalter
            und diese Installer-Karte aus. Kopiere die YAML-Vorlage und füge sie unter
            <strong>Einstellungen → Dashboards → Raw-Konfigurationseditor</strong> ein.
          </p>
          <div class="actions">
            <button type="button" id="copy">${this._copied ? 'YAML kopiert ✓' : 'Startseiten-YAML kopieren'}</button>
            <a class="button" href="${TEMPLATE_URL}" target="_blank" rel="noopener noreferrer">YAML öffnen</a>
            <a class="button" href="${FLOORPLAN_URL}" target="_blank" rel="noopener noreferrer">Grundriss öffnen</a>
          </div>
          <div class="notice ${this._error ? 'error' : ''}">
            ${this._error || 'Der Grundriss ist bereits über /hacsfiles/sp-dashboard/floorplan-placeholder.svg eingebunden. Du musst keine Dateien manuell nach /config/www kopieren.'}
          </div>
          ${previewEnabled ? `<pre>${templatePreview}</pre>` : ''}
          <div class="meta">SP Dashboard ${SP_DASHBOARD_VERSION} · custom:sp-dashboard</div>
        </div>
      </ha-card>
    `;

    this.shadowRoot.getElementById('copy')?.addEventListener('click', () => this.copyTemplate());
  }

  escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
}

customElements.define('sp-dashboard', SpDashboardCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'sp-dashboard',
  name: 'SP Dashboard Installer',
  description: 'Kopiert die SP-Dashboard Startseitenvorlage, die über HACS installiert wurde.',
  preview: true,
});

console.info(
  `%c SP Dashboard %c ${SP_DASHBOARD_VERSION} `,
  'color: #2aa9ff; font-weight: 700;',
  'color: #ffffff; background: #111b4d; border-radius: 3px; padding: 2px 4px;'
);
