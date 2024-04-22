# ChatRSA: RSA-Encrypted Chat Platform

ChatRSA provides a secure chat environment where messages are encrypted using the robust RSA (Rivest–Shamir–Adleman) algorithm. RSA ensures confidentiality by allowing users to exchange messages that are unreadable by anyone who doesn't possess the recipient's private key.

## Created by:

- 18221065 Josua Adriel Sinabutar
- 18221162 Ceavin Rufus De Prayer Purba

## How to run in local development server:

1. Frontend

```
cd frontend
npm start
```

2. API server

(You need to create a MongoDB database and store the connection link in the `.env` file located on `backend` folder)

```
cd backend
echo MONGO_URL="mongo connection string" > .env & attrib +s .env
node index.js
```

3. Chat server (socket)

```
cd chat
echo NODE_ENV="development" > .env & attrib +s .env
node index.js
```

## Completeness

| Specification                         | Status |
| ------------------------------------- | ------ |
| Key generation                        | ✅     |
| Send public key                       | ✅     |
| Text encryption                       | ✅     |
| File encryption                       | ✅     |
| Text decryption                       | ✅     |
| File decryption                       | ✅     |
| Download text (encrypted & decrypted) | ✅     |
| Download file (encrypted & decrypted) | ✅     |
| Real chat app \*)                     | ✅     |

\*) Due to limited hosting features from Vercel, if you want to use the real chat app feature you can only access it via the local development server
