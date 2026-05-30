# X3DPrints Email Notifier

Local Windows email notifier with a subtle Apple-inspired visual style. It polls an IMAP mailbox and shows a small animated overlay for new messages.

Notifications stay available until you act on them. After a few seconds the card slides mostly off-screen on the configured edge, leaving a small visible pill. Click that pill to bring it back. `Email openen` opens webmail and closes the window. The standby pill also has a small `x` to close it fully.

## Setup

1. Run `npm install` in this folder.
2. Copy `config.example.env` to `.env`.
3. Fill in IMAP settings. Use an app password, not your main account password.
   If Node cannot verify your provider's certificate chain but you trust the mail host, set `IMAP_TLS_REJECT_UNAUTHORIZED=false`.
   Set `NOTIFIER_OPEN_URL` to your webmail inbox URL so the `Email openen` button opens the right mailbox.
   For multiple monitors, run `npm run screen-info` and set `NOTIFIER_MONITOR=primary`, `cursor`, or a screen number like `2`.
4. Test the visual notification:

```powershell
npm run test:toast
```

Or double-click `Test-X3DEmailNotifier.vbs` for a hidden/no-console test.

5. Check mail once:

```powershell
npm run once
```

6. Keep it running:

```powershell
npm start
```

Or double-click `Start-X3DEmailNotifier.vbs` to start it hidden.

## Windows Startup

Install startup launcher:

```powershell
npm run install:startup
```

Remove it:

```powershell
npm run uninstall:startup
```

## Filters

Use `.env` values to limit notifications:

- `NOTIFIER_ALLOWED_FROM=client@example.com,@domain.be`
- `NOTIFIER_SUBJECT_KEYWORDS=offerte,bestelling,contact`

Existing emails are skipped on first run unless `NOTIFY_EXISTING_ON_FIRST_RUN=true`.
By default, only unread messages trigger a notification. Set `NOTIFIER_UNREAD_ONLY=false` only if you also want notifications for read messages that arrived while the watcher was offline.
