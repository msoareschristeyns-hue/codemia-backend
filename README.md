# Kodemia Backend

**Backend Node.js + TypeScript + Express + PostgreSQL pour Kodemia - plateforme de gestion de cours avec Stripe**

## 📋 Table des matières

- [Présentation](#présentation)
- [Stack Technique](#stack-technique)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Déploiement](#déploiement)
- [Variables d'Environnement](#variables-denvironnement)

## 🎯 Présentation

Kodemia Backend est l'API REST de la plateforme de gestion de cours Kodemia, construite avec:
- **Node.js + TypeScript** pour le développement type-safe
- **Express** pour le routage et les middlewares
- **PostgreSQL** (via Supabase) pour la base de données
- **Prisma** pour l'ORM
- **Stripe** pour les paiements
- **JWT** pour l'authentification

## 🛠 Stack Technique

- Node.js v18+
- TypeScript
- Express.js
- PostgreSQL (Supabase)
- Prisma ORM
- Stripe API
- JWT Authentication
- CORS middleware
- dotenv pour les variables d'environnement

## 📦 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/msoareschristeyns-hue/codemia-backend.git
   cd codemia-backend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   ```
   Remplissez les variables dans `.env`

4. **Setup Prisma et base de données**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

### Supabase (PostgreSQL)
1. Créer un projet sur [Supabase](https://supabase.com)
2. Obtenir la chaîne de connexion: `Settings > Database > Connection String`
3. Copier-coller dans `DATABASE_URL` du `.env`

### Stripe
1. Créer un compte [Stripe](https://stripe.com)
2. Obtenir les clés depuis `Developers > API Keys`
3. Ajouter `STRIPE_SECRET_KEY` et `STRIPE_WEBHOOK_SECRET` au `.env`

### JWT
Générer une clé secrète sécurisée:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Coller le résultat dans `JWT_SECRET`

## 🔌 API Endpoints

### Health Check
- `GET /health` - Vérifier l'état du serveur

### Courses
- `GET /api/courses` - Récupérer tous les cours
- `GET /api/courses/:id` - Récupérer un cours spécifique
- `POST /api/courses` - Créer un nouveau cours (auth requise, rôle: instructor)

### Webhooks
- `POST /api/webhooks/stripe` - Webhook pour les paiements Stripe

## 🚀 Déploiement

### Option 1: Hostinger (Node.js Hosting)

1. **Préparer le code**
   ```bash
   npm run build
   ```

2. **Connecter Git à Hostinger**
   - Aller sur Hostinger > Applications > Node.js Applications
   - Connecter le repository GitHub
   - Définir la branche: `main`
   - Start command: `npm run start`

3. **Configurer les variables d'environnement**
   - Dans Hostinger, ajouter toutes les variables du `.env`
   - Incluant: `DATABASE_URL`, `STRIPE_SECRET_KEY`, `JWT_SECRET`, etc.

4. **Déployer**
   - Push le code sur GitHub
   - Hostinger va automatiquement déployer

### Option 2: Vercel/Railway/Render
Utiliser les services cloud pour un déploiement serverless plus simple.

## 🔐 Variables d'Environnement

Créer un fichier `.env` basé sur `.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Authentication
JWT_SECRET=your_jwt_secret_key_here

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 📚 Structure du Projet

```
codemia-backend/
├── prisma/
│   └── schema.prisma       # Schéma de la base de données
├── src/
│   ├── middleware/
│   │   └── auth.ts         # Authentification JWT
│   ├── routes/
│   │   └── courses.ts      # Routes des cours
│   └── server.ts           # Point d'entrée de l'application
├── .env.example            # Variables d'environnement exemple
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 Modèles de Données

### User
- Stores user information (students, instructors)
- JWT authentication based on userId

### Course
- Contains course metadata (title, description, price)
- Linked to instructor (User)

### Module & Lesson
- Hierarchical course structure
- Each course has multiple modules
- Each module has multiple lessons

### Enrollment
- Tracks student enrollment in courses
- Status: active, completed, cancelled

### Payment
- Records all payment transactions
- Integrated with Stripe payment intents

## 🆘 Support & Troubleshooting

### Database Connection Issues
```bash
# Vérifier la connexion
npx prisma db push
```

### Prisma Migrations
```bash
# Créer une migration
npx prisma migrate dev --name <migration_name>

# Appliquer les migrations en production
npx prisma migrate deploy
```

## 📝 Notes

- Le backend écoute sur le port 3000 par défaut
- Les requêtes cross-origin sont autorisées depuis `FRONTEND_URL`
- Tous les endpoints (sauf /health) utilisent le middleware d'authentification JWT
- Les webhooks Stripe sont essentiels pour traiter les paiements

## 📄 Licence

Projet privé Kodemia - Tous droits réservés
