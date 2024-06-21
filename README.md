
## Pré-requis

-  NodeJS : 
	- [Windows](https://nodejs.org/dist/v22.3.0/node-v22.3.0-x64.msi)
	- [MacOS](https://nodejs.org/dist/v22.3.0/node-v22.3.0.pkg)

- XAMPP : 
	- [WIndows](https://www.apachefriends.org/download.html)
	- [MacOS](https://www.apachefriends.org/download.html)
	- [Linux](https://www.apachefriends.org/download.html)
## Installation

```bash
npm install --save
```

## Configuration

1. Créer la base de données (\*) nommé `template` sur XAMPP et faîtes la commande suivante :
   
```node
	npm run database
```

2. Créer le fichier de configuration `.env` à partir du `.env.exemple` et remplissez les arguments manquants
   
```
TOKEN = ""  

SECRET = ""
CALLBACK_URL = "http://localhost:90/login"

HOST = "localhost"
USER = "root"
PASSWORD = ""
DATABASE = "template"
PORT = 3306
```

## Démarrage

Pour lancer le robot Discord vous avez juste a faire la commande suivante :

```node
npm run start
```
