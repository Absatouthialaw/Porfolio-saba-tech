# Guide de Personnalisation

## 🎯 Éléments Critiques à Personnaliser

### 1. Informations de Contact

#### Fichiers à modifier:
- `src/app/components/Contact.tsx`
- `src/app/components/FloatingWhatsApp.tsx`
- `src/app/App.tsx` (Footer)

#### Remplacer:
```
+221XXXXXXXXX → Votre numéro WhatsApp réel
contact@absatouthialaw.com → Votre email réel
```

### 2. Liens Réseaux Sociaux

#### Fichier: `src/app/components/Contact.tsx`
Ligne ~91-97: Remplacer `href="#"` par vos vrais liens:
```tsx
{ icon: Instagram, href: 'https://instagram.com/votrecompte' },
{ icon: Facebook, href: 'https://facebook.com/votrecompte' },
{ icon: Linkedin, href: 'https://linkedin.com/in/votrecompte' },
```

### 3. Images du Portfolio

#### Fichier: `src/app/components/Portfolio.tsx`
Remplacer les URLs Unsplash par vos vraies images de projets:
```tsx
image: 'https://votre-url-image.com/projet1.jpg'
```

### 4. Témoignages

#### Fichier: `src/app/components/Testimonials.tsx`
Remplacer par de vrais témoignages clients:
- Noms
- Entreprises
- Photos
- Textes

### 5. Photos Personnelles

#### Fichiers à modifier:
- `src/app/components/Hero.tsx` (ligne ~87)
- `src/app/App.tsx` - Section About (ligne ~150)

Remplacer par vos vraies photos professionnelles.

## 🎨 Personnalisation Couleurs (Optionnel)

Si vous souhaitez changer la palette rose:

#### Fichier: `src/styles/theme.css`
```css
--primary: #C2185B; /* Votre couleur principale */
--secondary: #E91E63; /* Votre couleur secondaire */
--accent: #880E4F; /* Votre accent */
```

## 📝 Contenu à Adapter

### Section "À Propos"
Fichier: `src/app/App.tsx` - fonction `About()`
Personnalisez votre bio et votre histoire.

### Section "Services"
Fichier: `src/app/components/Services.tsx`
Ajustez la description de vos services si nécessaire.

### Section "Tarifs"
Fichier: `src/app/App.tsx` - fonction `Pricing()`
Personnalisez les noms des plans et les features selon vos offres.

## 🔗 SEO (Recommandé)

Créer un fichier `index.html` avec les meta tags:
```html
<title>Absatou Thialaw | Experte en Communication Digitale à Dakar</title>
<meta name="description" content="Portfolio premium d'Absatou Thialaw...">
```

## 📊 Analytics (Optionnel)

Ajouter Google Analytics dans `index.html` ou créer un composant Analytics.

## ✅ Checklist Avant Mise en Ligne

- [ ] Numéro de téléphone WhatsApp mis à jour
- [ ] Email de contact mis à jour
- [ ] Liens réseaux sociaux mis à jour
- [ ] Photos personnelles remplacées
- [ ] Images portfolio remplacées
- [ ] Témoignages clients réels ajoutés
- [ ] Section À Propos personnalisée
- [ ] Tarifs et services ajustés
- [ ] Logos clients ajoutés (section Social Proof)
- [ ] Meta tags SEO configurés
- [ ] Test sur mobile, tablet, desktop
- [ ] Vérification formulaire de contact
- [ ] Test bouton WhatsApp

## 🚀 Déploiement

Une fois personnalisé, le portfolio est prêt pour:
- Netlify
- Vercel
- GitHub Pages
- Hébergement personnalisé

---

Bon courage pour la personnalisation ! 🎉
