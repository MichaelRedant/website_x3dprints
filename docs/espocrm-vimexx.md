# EspoCRM op Vimexx

Doel: EspoCRM draait apart op `https://crm.x3dprints.be`, los van de bestaande X3DPrints website en de bestaande `public/crm-*.php` shopbeheer-endpoints.

## 1. Hosting check

Controleer dit eerst in Vimexx/DirectAdmin of via support:

- PHP: 8.3 of hoger.
- Database: MySQL 8.0+ of MariaDB 10.3+.
- PHP-extensies: `pdo_mysql`, `gd`, `openssl`, `zip`, `mbstring`, `iconv`, `curl`, `xml`, `xmlwriter`.
- Cronjobs beschikbaar.
- HTTPS actief op `crm.x3dprints.be`.

Stop als de database alleen MySQL 5.7 is. De huidige EspoCRM 9.x vereisten vragen MySQL 8.0+ of MariaDB 10.3+.

## 2. Vimexx voorbereiden

1. Maak of controleer de subdomain `crm.x3dprints.be`.
2. Noteer de document root van die subdomain.
   - In DirectAdmin kan dit bv. een pad onder `/domains/x3dprints.be/public_html/crm` zijn.
   - Gebruik het exacte pad uit DirectAdmin als deploy target.
3. Maak een nieuwe database, gebruiker en sterk wachtwoord.
4. Zet PHP voor de subdomain op 8.3 of hoger.
5. Zet gratis SSL/Let's Encrypt aan voor de subdomain.

## 3. GitHub deploy secrets/vars

De workflow `.github/workflows/deploy-espocrm.yml` gebruikt deze waarden:

- `CRM_FTP_SERVER`
- `CRM_FTP_USERNAME`
- `CRM_FTP_PASSWORD`
- `CRM_FTP_SERVER_DIR`

`CRM_FTP_SERVER` en `CRM_FTP_USERNAME` mogen terugvallen op de bestaande `FTP_SERVER` en `FTP_USERNAME`, maar `CRM_FTP_SERVER_DIR` moet expliciet gezet worden en naar de document root van `crm.x3dprints.be` wijzen.

Gebruik een pad met `crm` in de naam. De workflow weigert anders te deployen om te voorkomen dat EspoCRM per ongeluk over de publieke website wordt gezet.

## 4. EspoCRM uploaden

1. Ga in GitHub naar **Actions**.
2. Kies **Deploy EspoCRM**.
3. Run eerst met:
   - `version`: `latest`
   - `dry_run`: `true`
4. Als dat lukt, run opnieuw met:
   - `version`: `latest`
   - `dry_run`: `false`

De workflow downloadt de officiele release op deploytijd. Hij commit geen EspoCRM-zip of vendorcode in deze repo.

De upload sluit runtime-data uit bij latere runs:

- `data/config.php`
- `data/config-internal.php`
- `data/cache/**`
- `data/logs/**`
- `data/tmp/**`
- `data/upload/**`
- `custom/**`
- `client/custom/**`

Gebruik deze workflow voor de eerste bestandsupload. Gebruik voor echte upgrades bij voorkeur de officiele EspoCRM upgradeflow vanuit de applicatie of CLI, zodat database-migraties netjes lopen.

## 5. Web installer

Na upload:

1. Open `https://crm.x3dprints.be`.
2. Vul de databasegegevens in.
3. Maak een admin gebruiker aan.
4. Zet de site URL op `https://crm.x3dprints.be`.
5. Login en controleer **Administration > System Requirements**.

## 6. Cronjob

EspoCRM heeft een cronjob nodig voor scheduled jobs, e-mail, reminders en automatisering.

1. Login in EspoCRM als admin.
2. Ga naar **Administration > Scheduled Jobs**.
3. Kopieer het cron-commando dat EspoCRM toont.
4. Zet dit in DirectAdmin bij **Cronjobs**.

Vimexx gebruikt paden zoals `/opt/alt/php83/usr/bin/php`. Een typisch commando ziet er zo uit:

```bash
* * * * * /opt/alt/php83/usr/bin/php -f /home/GEBRUIKERSNAAM/domains/x3dprints.be/public_html/crm/cron.php >/dev/null 2>&1
```

Gebruik het exacte pad naar `cron.php` uit jouw subdomain document root.

## 7. Eerste CRM-inrichting

Minimale setup voor X3DPrints:

- Accounts: bedrijven/klanten.
- Contacts: contactpersonen.
- Leads of Opportunities: nieuwe offerte-aanvragen.
- Tasks: opvolging na offerte.
- Cases optioneel: support/nazorg.

Voor offertes/facturen blijft Octopus de officiele bron. In EspoCRM slaan we eerst alleen offerte-opvolging op: klant, contact, materiaal, prijsindicatie, status, deadline, notities en link/verwijzing naar Octopus of PDF.

## 8. Later: ChatGPT-koppeling

Pas na een werkende EspoCRM-installatie:

1. Maak een EspoCRM API User met beperkte rechten.
2. Maak een bridge endpoint, bv. `https://api.x3dprints.be/crm/quote`.
3. Laat ChatGPT/GPT Action alleen met die bridge praten, niet rechtstreeks met een brede EspoCRM API key.
