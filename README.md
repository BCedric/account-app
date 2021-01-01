# Installation prod

- installation des dépendances : `npm install`
- copier build dans `client/build`
- renseigner les variables d'environnement:
  `ACCESS_TOKEN_SECRET=token_secret ACCESS_TOKEN_LIFE=600 PORT=8081 BASE_URL=url`
- démarrer le serveur: `npm run prod`

# Installation dev

- installation des dépendances : `npm install`
- installation des dépendances du client : `cd client && npm install`
- Editer la variable d'environnement `REACT_APP_SERVER_URL` dans `client/.env`
- renseigner les variables d'environnement: ` ACCESS_TOKEN_SECRET=token_secret ACCESS_TOKEN_LIFE=600 PORT=8081 BASE_URL=url`
- démarrer le serveur: `npm start`
- démarrer le serveur de développement du client: `cd client && npm start`
