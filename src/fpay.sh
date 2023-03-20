#!/bin/bash

# Création de la structure de répertoires
mkdir fpay-wallet
cd fpay-wallet
mkdir css js
mkdir views
mkdir views/pages
mkdir views/includes

# Téléchargement des fichiers CSS nécessaires
wget https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css -O css/bootstrap.min.css
wget https://cdn.datatables.net/1.10.24/css/dataTables.bootstrap4.min.css -O css/dataTables.bootstrap4.min.css

# Création des fichiers HTML
touch index.html
touch login.html
touch register.html
touch dashboard.html
touch history.html
touch achat.html
touch vente.html

# Création des fichiers JavaScript
touch js/index.js
touch js/login.js
touch js/register.js
touch js/dashboard.js
touch js/history.js
touch js/achat.js
touch js/vente.js

# Création du fichier CSS personnalisé
touch css/custom.css

# Création des fichiers d'inclusion de la vue
touch views/includes/header.ejs
touch views/includes/footer.ejs

# Donner les permissions pour le script
chmod +x create_fpay_wallet.sh

echo "FPAY Wallet project has been created successfully!"
