# Étapes de Configuration Finales - Kodemia Backend

Suivez ces étapes précisément pour finaliser votre installation.

---

## 🔑 1. Obtenir le mot de passe PostgreSQL Supabase

1. Allez sur votre dashboard Supabase:
   [https://supabase.com/dashboard/project/clvyuxkmcrgqkybnumko](https://supabase.com/dashboard/project/clvyuxkmcrgqkybnumko)

2. Naviguez vers **Settings** (icône roue dentée en bas à gauche) > **Database**.

3. Dans la section **Database password**, vous pouvez voir ou réinitialiser le mot de passe que vous avez défini lors de la création du projet.

4. **Action**: Dans votre fichier `.env.local`, remplacez `[YOUR_PASSWORD]` par ce mot de passe dans la variable `DATABASE_URL`.

---

## 💳 2. Obtenir les clés Stripe

1. **Créer un compte Stripe**: Si vous n'en avez pas, inscrivez-vous sur [https://stripe.com](https://stripe.com/).

2. **Accéder aux clés API**: Allez sur [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys).

3. **Copier les clés de test**:
   - Copiez la **Publishable key** (commence par `pk_test_`).
   - Copiez la **Secret key** (commence par `sk_test_`).

4. **Action**: Collez ces clés dans `.env.local` pour `STRIPE_PUBLISHABLE_KEY` et `STRIPE_SECRET_KEY`.

---

## ⚓ 3. Créer un Webhook Stripe

1. Allez sur [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks).

2. Cliquez sur **"Add endpoint"**.

3. **Configuration**:
   - **Endpoint URL**: `https://votre-backend-url.com/api/webhooks/stripe` (ou utilisez Stripe CLI pour les tests locaux).
   - **Events to send**: Sélectionnez `payment_intent.succeeded`.

4. **Obtenir le secret**: Une fois l'endpoint créé, cliquez sur **"Reveal"** sous "Signing secret" pour copier la clé commençant par `whsec_`.

5. **Action**: Collez cette clé dans `.env.local` pour `STRIPE_WEBHOOK_SECRET`.

---

## 📝 4. Compléter .env.local

Assurez-vous que votre fichier `.env.local` ressemble à ceci avec vos vraies valeurs:

```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@db.clvyuxkmcrgqkybnumko.supabase.co:5432/postgres"
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
JWT_SECRET="généré_avec_node_crypto"
```

---

## 💻 5. Tester localement

Exécutez les commandes suivantes dans votre terminal:

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

---

## 🚀 6. Déploiement sur Hostinger

1. **GitHub**: Committez et pushez tout votre code (sauf .env.local qui est ignoré).
2. **Hostinger Panel**:
   - Connectez votre repository GitHub.
   - **Variables d'environnement**: Ajoutez manuellement toutes les variables de `.env.local` dans le panneau Hostinger.
   - **Déploiement**: Hostinger détectera le push et déploiera automatiquement.

---

**Félicitations!** Votre infrastructure est maintenant prête. 🎉
