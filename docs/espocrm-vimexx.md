# EspoCRM op Vimexx via DirectAdmin

Doel: EspoCRM draait apart op `https://crm.x3dprints.be`, los van de bestaande X3DPrints website en de bestaande `public/crm-*.php` shopbeheer-endpoints.

## 1. Hosting check

Controleer dit eerst in Vimexx/DirectAdmin of via support:

- PHP: 8.3 of hoger.
- Database: MySQL 8.0+ of MariaDB 10.3+.
- PHP-extensies: `pdo_mysql`, `gd`, `openssl`, `zip`, `mbstring`, `iconv`, `curl`, `xml`, `xmlwriter`.
- Cronjobs beschikbaar.
- HTTPS actief op `crm.x3dprints.be`.

Stop als de database alleen MySQL 5.7 is. De huidige EspoCRM 9.x vereisten vragen MySQL 8.0+ of MariaDB 10.3+.

## 2. DirectAdmin voorbereiden

1. Open DirectAdmin bij Vimexx.
2. Controleer de subdomain `crm.x3dprints.be`.
3. Noteer de document root van die subdomain.
   - Vaak is dit iets zoals `/domains/x3dprints.be/public_html/crm`.
   - Gebruik altijd het exacte pad dat DirectAdmin toont.
4. Zet PHP voor deze subdomain op 8.3 of hoger.
5. Zet gratis SSL/Let's Encrypt aan voor `crm.x3dprints.be`.
6. Maak een nieuwe database en databasegebruiker aan.

Noteer veilig:

```text
DB host:
DB naam:
DB gebruiker:
DB wachtwoord:
CRM document root:
```

## 3. EspoCRM uploaden

1. Download de nieuwste EspoCRM zip van de officiele EspoCRM downloadpagina.
2. Open in DirectAdmin **File Manager**.
3. Ga naar de document root van `crm.x3dprints.be`.
4. Maak de map leeg als daar placeholder-bestanden staan.
5. Upload de EspoCRM zip.
6. Gebruik **Extract** in DirectAdmin.
7. Als de zip uitpakt naar een submap zoals `EspoCRM-9.x.x`, verplaats dan de inhoud van die submap naar de document root.
8. Verwijder daarna de zip en lege uitpakmap.

Na het uitpakken moet `index.php` direct in de document root van `crm.x3dprints.be` staan.

Als DirectAdmin de zip niet goed kan uitpakken, pak de zip lokaal uit en upload de uitgepakte bestanden via SFTP/FTP naar dezelfde document root.

## 4. Web installer

Na upload:

1. Open `https://crm.x3dprints.be`.
2. Volg de EspoCRM installer.
3. Vul de databasegegevens in.
4. Maak een admin gebruiker aan.
5. Zet de site URL op `https://crm.x3dprints.be`.
6. Login en controleer **Administration > System Requirements**.

## 5. Cronjob

EspoCRM heeft een cronjob nodig voor scheduled jobs, e-mail, reminders en automatisering.

1. Login in EspoCRM als admin.
2. Ga naar **Administration > Scheduled Jobs**.
3. Kopieer het cron-commando dat EspoCRM toont.
4. Open in DirectAdmin **Cronjobs**.
5. Voeg het commando toe.

Vimexx gebruikt paden zoals `/opt/alt/php83/usr/bin/php`. Een typisch commando ziet er zo uit:

```bash
* * * * * /opt/alt/php83/usr/bin/php -f /home/GEBRUIKERSNAAM/domains/x3dprints.be/public_html/crm/cron.php >/dev/null 2>&1
```

Gebruik het exacte pad naar `cron.php` uit jouw subdomain document root.

## 6. Eerste CRM-inrichting

Minimale setup voor X3DPrints:

- Accounts: bedrijven/klanten.
- Contacts: contactpersonen.
- Leads of Opportunities: nieuwe offerte-aanvragen.
- Tasks: opvolging na offerte.
- Cases optioneel: support/nazorg.

Voor offertes/facturen blijft Octopus de officiele bron. In EspoCRM slaan we eerst alleen offerte-opvolging op: klant, contact, materiaal, prijsindicatie, status, deadline, notities en link/verwijzing naar Octopus of PDF.

## 7. Later: ChatGPT-koppeling

Pas na een werkende EspoCRM-installatie:

1. Maak een EspoCRM API User met beperkte rechten.
2. Maak een bridge endpoint, bv. `https://api.x3dprints.be/crm/quote`.
3. Laat ChatGPT/GPT Action alleen met die bridge praten, niet rechtstreeks met een brede EspoCRM API key.
