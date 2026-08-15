# Paiement et abonnements — Stripe

À brancher quand le produit encaisse de l'argent. Inutile pour un outil interne.

## Clés

| Variable | Où l'obtenir |
| --- | --- |
| `STRIPE_SECRET_KEY` | https://dashboard.stripe.com/test/apikeys — commencer en mode test (`sk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | `stripe listen --forward-to localhost:3000/api/stripe/webhook` l'affiche (`whsec_…`) |
| `NEXT_PUBLIC_STRIPE_PRICE_ID` | https://dashboard.stripe.com/test/products — l'identifiant du tarif, pas du produit (`price_…`) |

Déclarez-les dans `src/lib/env.ts` pour que leur absence se voie.

## Installation

```bash
npm install stripe
```

## Ce qu'il faut écrire

1. **Colonnes d'abonnement** dans `migrate()` (`src/lib/db.ts`) :

   ```sql
   ALTER TABLE users ADD COLUMN stripe_customer_id TEXT;
   ALTER TABLE users ADD COLUMN subscription_status TEXT;  -- active|past_due|canceled|null
   ALTER TABLE users ADD COLUMN subscription_until TEXT;
   ```

   `ALTER TABLE` n'est pas idempotent : gardez-le derrière une vérification de
   `PRAGMA table_info(users)`.

2. **`src/lib/stripe.ts`** — un client unique, `new Stripe(process.env.STRIPE_SECRET_KEY!)`.

3. **`POST /api/stripe/checkout`** — crée une session Checkout pour
   l'utilisateur courant, avec `client_reference_id: user.id`, et renvoie
   l'URL de redirection.

4. **`POST /api/stripe/webhook`** — la seule source de vérité sur l'état de
   l'abonnement. Traiter `checkout.session.completed`,
   `customer.subscription.updated` et `customer.subscription.deleted`.

5. **`src/lib/entitlements.ts`** — `requireSubscription()` en complément de
   `requireUser()`, à appeler dans chaque route payante.

## Pièges

- **Ne jamais accorder l'accès depuis la page de retour.** L'utilisateur peut
  l'ouvrir sans avoir payé ; seul le webhook fait foi.
- **Le webhook a besoin du corps brut.** Dans une route App Router :
  `await request.text()`, jamais `request.json()`, sinon la signature ne se
  vérifie pas.
- **Vérifier la signature** avec `stripe.webhooks.constructEvent(raw, sig, secret)` —
  sans quoi n'importe qui peut s'offrir un abonnement par une requête POST.
- **Les webhooks se rejouent.** Rendre le traitement idempotent (l'identifiant
  d'événement en table, ou une écriture qui converge).
- **Passer en clés `sk_live_`** seulement au moment de la mise en production,
  et recréer le webhook côté tableau de bord Stripe (le secret diffère).
