#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI, GOOGLE_API, X_RAPID_API_KEY, X_RAPID_API_HOST.

#### Routers

- lists.js
- songs.js
- spotifySearch.js
- youtubeSearch.js

#### Mongoose Errors

- Validation Errors
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit
