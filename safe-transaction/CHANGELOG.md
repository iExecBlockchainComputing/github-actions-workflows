# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Ajouté
- ✅ Création et proposition de transactions Safe automatisées
- 🔐 Support de la signature automatique avec clé privée
- 📤 Intégration avec l'API Safe pour proposer les transactions
- 🌐 Support multi-chaînes avec configuration du chain ID
- ⚙️ Configuration flexible des paramètres de transaction
- 📝 Documentation complète avec exemples d'utilisation
- 🔒 Gestion sécurisée des secrets via GitHub Secrets

### Fonctionnalités
- Création de transactions Safe avec support des opérations Call et DelegateCall
- Signature automatique des transactions avec validation
- Proposition automatique au service Safe avec vérification
- Configuration flexible de la valeur et des données de transaction
- Support des principales chaînes blockchain (Ethereum, Polygon, Arbitrum, etc.)
- Logging détaillé pour le debug et le monitoring
- Gestion d'erreurs robuste avec messages informatifs

### Sécurité
- Utilisation des GitHub Secrets pour la gestion sécurisée des clés privées
- Validation des entrées pour éviter les erreurs de configuration
- Pas d'exposition des informations sensibles dans les logs
- Support des meilleures pratiques de sécurité Safe

### Documentation
- README complet avec exemples d'utilisation
- Documentation des paramètres d'entrée et de sortie
- Guide de configuration pour différents cas d'usage
- Exemples de workflows pour différents scénarios
- Conseils de sécurité et bonnes pratiques
