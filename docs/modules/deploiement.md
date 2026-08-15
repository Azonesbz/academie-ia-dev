# Hébergement

Le starter suppose **un processus Node unique avec un disque persistant** :
SQLite, fichiers locaux et compteur de débit en mémoire en dépendent tous.

## Le choix par défaut : un VPS

Un serveur à quelques euros par mois, Node, un reverse proxy, un certificat
automatique. Rien à réécrire, sauvegarde = copie d'un répertoire.

- **Hébergeurs** : Hetzner, Scaleway, OVH, Infomaniak.
- **Exécution** : `npm run build && npm start` sous systemd, ou Docker.
- **Proxy** : Caddy (certificat Let's Encrypt sans configuration) ou nginx.
- **Sauvegarde** : `DATA_DIR` contient la base et les fichiers. Copie
  quotidienne hors du serveur ; tester la restauration une fois.

Points à vérifier :

- `NODE_ENV=production` — sans quoi le cookie de session n'est pas `secure`.
- Le proxy doit transmettre `x-forwarded-for`, sinon toute la limitation de
  débit se retrouve dans un seul seau.
- Le service redémarre au reboot (`systemctl enable`).

## Vercel et le serverless

Pratique pour un site vitrine, incompatible avec SQLite et les fichiers
locaux : le système de fichiers est éphémère et chaque requête peut atterrir
sur une instance différente. Y aller impose de suivre
[`base-postgres.md`](base-postgres.md) et de déplacer les fichiers vers un
stockage objet.

## Conteneur

`Dockerfile` en deux étapes (build puis exécution), `data/` monté en volume.
Utile pour Fly.io ou un déploiement chez un client, ou pour un outil interne
qui doit tourner sur l'infrastructure existante.

`better-sqlite3` est un module natif : compilez-le dans l'image cible, ne
copiez pas un `node_modules` construit sur macOS dans une image Linux.
