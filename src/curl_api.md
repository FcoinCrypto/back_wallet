creer un utilisateur :
curl --request POST \
  --url http://localhost:3001/api/users/register \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "mypassword"
}'

reponse :

{
    "message": "User registered successfully"
}




Se connecter en tant qu'utilisateur ou login :

curl --request POST \
  --url http://localhost:3001/api/users/login \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "john.doe@example.com",
    "password": "mypassword"
}'

la reponse :


{
    "message": "Logged in successfully",
    "user": {
        "id": 2,
        "name": "John Doe",
        "email": "john.doe@example.com"
    }
}




Créer un wallet pour un utilisateur (vous devrez remplacer :userId par l'ID d'utilisateur approprié) :

curl --request POST \
  --url http://localhost:3001/api/wallets/:userId \ j'ai mis 2 le id de JohnDoe
  --header 'Content-Type: application/json'


reponse :

{
    "message": "Wallet created successfully"
}






Obtenir les détails du wallet d'un utilisateur (vous devrez remplacer :userId par l'ID d'utilisateur approprié) :

curl --request GET \
  --url http://localhost:3001/api/wallets/:userId

reponse renvoyé :

{
    "id": 2,
    "user_id": 2,
    "address": "arc$2b$10$2U64Nqo7ohXtehJG8X51cOvqERnLE/wpguMIngG4iQoZi/7kiQW3a",
    "balance": 0
}







Envoyer une transaction (vous devrez remplacer les valeurs :senderWalletId, :recipientWalletAddress et :amount par les valeurs appropriées) :

curl --request POST \
  --url http://localhost:3001/api/transactions/send \
  --header 'Content-Type: application/json' \
  --data '{
    "senderWalletId": "2",
    "recipientWalletAddress": "arc$2b$10$WZJ/E4pFUlxU9L/ZKFFKHeqvsZTNAtxpwhH0wkyw2ewe4OBe8QXAe",
    "amount": 1000
}'
Obtenir l'historique des transactions d'un wallet (vous devrez remplacer :walletId par l'ID de wallet approprié) :

curl --request GET \
  --url http://localhost:3001/api/transactions/history/:walletId



