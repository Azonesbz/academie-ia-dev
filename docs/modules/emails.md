# E-mails transactionnels — Resend

Nécessaire dès qu'il faut vérifier une adresse, réinitialiser un mot de passe
ou notifier. Un outil interne s'en passe souvent.

## Clés

| Variable | Où l'obtenir |
| --- | --- |
| `RESEND_API_KEY` | https://resend.com/api-keys |
| `EMAIL_FROM` | une adresse sur un domaine vérifié chez Resend, ex. `contact@mondomaine.fr` |

Sans domaine vérifié, Resend n'autorise l'envoi que vers votre propre adresse —
suffisant pour développer.

## Installation

```bash
npm install resend
```

## Ce qu'il faut écrire

1. **`src/lib/email.ts`** — un client unique et une fonction `send({to, subject, html})`
   qui journalise en cas d'échec sans faire tomber la requête appelante.

2. **Vérification d'adresse** — table `email_tokens (token, user_id, expires_at)`,
   jeton aléatoire, lien `/verify?token=…`, expiration à 24 h, suppression après usage.

3. **Réinitialisation de mot de passe** — même mécanique, expiration à 1 h.
   Répondre « si un compte existe, un e-mail est parti » quelle que soit la
   réalité, pour ne pas révéler quelles adresses sont inscrites.

## Pièges

- **Ne pas bloquer la réponse HTTP sur l'envoi.** Un e-mail lent ne doit pas
  faire échouer une inscription.
- **Jeton à usage unique.** Le supprimer à la consommation, pas seulement le
  marquer.
- **Configurer SPF et DKIM** sur le domaine, sinon tout part en indésirable.
