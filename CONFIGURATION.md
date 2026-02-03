# Guide de Configuration Kodemia Backend

## 📋 Vue d'ensemble

Ce guide vous accompagne dans la configuration du backend Kodemia avec:
- **Supabase** (PostgreSQL géré)
- **Stripe** (Paiements en ligne)
- **JWT** (Authentification sécurisée)

---

## 🔧 ÉTAPE 1: Configuration Supabase (PostgreSQL)

### 1.1 Obtenir la chaîne de connexion

1. Accédez au dashboard Supabase:
   https://supabase.com/dashboard/project/clvyuxkmcrgqkybnumko

2. Cliquez sur le bouton **"Connect"** (en haut à droite)

3. S électionnez **"Node.js"** ou **"psycopg2"** dans la liste

4. Vous verrez une chaîne de connexion:
   ```
   postgresql://postgres:[YOUR_PASSWORD]@clvyuxkmcrgqkybnumko.supabase.co:5432/postgres
   ```

5. Remplacez `[YOUR_PASSWORD]` par le mot de passe PostgreSQL de votre projet

### 1.2 Ajouter DATABASE_URL au fichier .env

1. Créez un fichier `.env` en copiant `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Ouvrez le fichier `.env` et trouvez la ligne:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@[YOUR_HOST].supabase.co:5432/postgres"
   ```

3. Collez la chaîne de connexion complète obtenue à l'étape 1.4

### 1.3 Initialiser la base de données

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma migrate dev --name init
```

Vous devriez voir un message "Database migrated"!

---

## 💳 ÉTAPE 2: Configuration Stripe (Paiements)

### 2.1 Obtenir les clés d'API Stripe

1. Accédez au dashboard Stripe:
   https://dashboard.stripe.com/apikeys

2. Vous verrez deux sections:

   **Section "Publishable key":**
   - Commence par `pk_test_` ou `pk_live_`
   - Copier la clé complète

   **Section "Secret key":**
   - Commence par `sk_test_` ou `sk_live_`
   - Copier la clé complète

### 2.2 Ajouter les clés au fichier .env

Dans votre fichier `.env`, trouvez et remplissez:

```env
STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_KEY_HERE"
STRIPE_SECRET_KEY="sk_test_YOUR_KEY_HERE"
```

Collez les clés obtenues à l'étape 2.1

### 2.3 Configurer le Webhook Stripe

Le webhook permet à Stripe de notifier votre backend des paiements:

1. Accédez à https://dashboard.stripe.com/webhooks

2. Cliquez sur **"Add endpoint"**

3. Entrez l'URL de votre endpoint:
   ```
   https://votre-backend.com/api/webhooks/stripe
   ```
   (Changez `votre-backend.com` par le domaine de déploiement)

4. Sélectionnez l'événement à écouter:
   - Cochez **"payment_intent.succeeded"**

5. Cliquez sur **"Add endpoint"**

6. Vous verrez un écran avec le "Signing secret":
   - Commence par `whsec_`
   - Copier la clé complète

7. Dans `.env`, remplissez:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_YOUR_SECRET_HERE"
   ```

---

## 🔐 ÉTAPE 3: Configuration JWT (Authentification)

### 3.1 Générer une clé secrète JWT

Dans votre terminal, exécutez:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Cela affichera une longue chaîne de caractères aléatoires.

### 3.2 Ajouter JWT_SECRET au fichier .env

Dans `.env`, remplissez:

```env
JWT_SECRET="La_clé_générée_ci_dessus"
```

Par exemple:
```env
JWT_SECRET="a3c5f7e2b8d1c4f6a9e2b5d8c1f4a7e0b3c6f9d2e5a8b1c4f7a0d3e6b9c2"
```

---

## ✅ ÉTAPE 4: Tester la configuration

### 4.1 Lancer le serveur de développement

```bash
npm run dev
```

Vous devriez voir:
```
✓ Kodemia Backend running on port 3000
✓ Environment: development
```

### 4.2 Vérifier le health check

Ouvrez votre navigateur et allez à:
```
http://localhost:3000/health
```

Vous devriez voir:
```json
{
  "status": "ok",
  "timestamp": "2026-02-03T17:00:00.000Z",
  "service": "Kodemia Backend"
}
```

---

## 🚀 ÉTAPE 5: Déploiement sur Hostinger

### 5.1 Préparer le code

1. Assurez-vous que tout fonctionne localement
2. Committez les changements dans Git

### 5.2 Connecter à Hostinger

1. Allez sur https://hpanel.hostinger.com
2. Naviguez vers **Applications** > **Node.js Applications**
3. Cliquez sur **Add Application**
4. Sélectionnez votre repository GitHub (codemia-backend)
5. Configurez les paramètres:
   - **Build command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start command**: `npm run start`
   - **Node.js version**: 18 ou supérieur

### 5.3 Configurer les variables d'environnement

Dans Hostinger, allez à **Environment Variables** et ajoutez:

```
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=https://votre-frontend.com
```

### 5.4 Déployer

1. Push votre code sur GitHub
2. Hostinger déploiera automatiquement
3. Attendez quelques minutes
4. Testez avec: `https://votre-backend.com/health`

---

## 🔍 Dépannage

### Erreur: "Cannot find module 'stripe'"
→ Exécutez: `npm install stripe`

### Erreur: "Database connection failed"
→ Vérifiez que DATABASE_URL est correcte dans .env

### Erreur: "JWT verification failed"
→ Assurez-vous que JWT_SECRET est le même partout

### Erreur: "Stripe key is not valid"
→ Vérifiez que vous utilisez sk_test_ (développement) ou sk_live_ (production)

---

## 📚 Ressources utiles

- **Supabase**: https://supabase.com/docs
- **Stripe**: https://stripe.com/docs/api
- **Prisma**: https://www.prisma.io/docs
- **Express.js**: https://expressjs.com

---

**Configuration réalisée!** Votre backend Kodemia est maintenant prêt à fonctionner avec Supabase et Stripe! 🎉
