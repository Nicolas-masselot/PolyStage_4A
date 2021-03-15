#Installation (a faire dans a la racine de l'appli (dossier contenant index.js, config.js, package....json))
npm i
npm i nodemon

#lancement
npm start

#lancement alternatif
nodejs index.js


#configuration base de données et mailing
Informations de configuration à indiquer dans le fichier 'config.js' situé à la racine

Script de création de la base de données : fichier 'd17023188.sql'


#Pour accèder à l'application dans un navigateur web
localhost:8080


#Résumé application
Le FRONT se situe dans le répertoire app/
Le BACK se situe dans le répertoire api/

#Modification template mail
Mails de confirmation : api/controllers/mailController.js
Mails d'évaluation : api/controllers/formController.js

#Modification template pdf
Les templates sont dans public/templates/

#Informations supplémentaires
Pour toute modification concernant les dates limites de rendu ou les évaluations il faut faire le changement dans la base de données



#Comptes tests

Compte élève avec stages :
    - identifiant : bilal.bechari@etu.univ-amu.fr
    - mdp : bilalbechari
Compte élève sans stage :
    - identifiant : isabelle.gumos@etu.univ-amu.fr
    - mdp : isabellegumos
###Tous les élèves ont ici comme identifiant leur mail/numetudiant, et comme mot de passe {prenom}{nom}

Compte enseignant avec stages :
    - identifiant : nguyen.laurent97@gmail.com
    - mdp : prof
Compte enseignant sans stages :
    - identifiant : nicolas.baudru@univ-amu.fr
    - mdp : prof
###Tous les profs ont comme identifiant leur mail, et comme mot de passe 'prof'

Compte tuteur :
    - identifiant : bilal.bechari@etu.univ-amu.fr
    - mdp : ZGL;tSZ-
###Tous les comptes sont générés lors du lancement de l'évaluation par l'enseignant


