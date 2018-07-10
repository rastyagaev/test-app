import App from './containers/app';
import React from 'react';
import { Provider } from 'react-redux';
import express from 'express';
import cookieParser from 'cookie-parser'
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import fs from 'fs'
import path from 'path'

import createStore from './state/store';
import fetch from 'isomorphic-fetch';
import {fetchPost} from './state/posts'

const HARDCODED_SESSION_ID = '1234567890'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cookieParser())
  .post('/api/session/check', (req, res) => {
    res.status(200).send({ok: req.cookies.user_session === HARDCODED_SESSION_ID})
  })
  .get('/api/posts/:id', (req, res) => {
    const filePath = path.join(__dirname, '../data/posts.json')
    fs.readFile(filePath, {encoding: 'utf-8'}, function(_, posts){
      res.status(200).send(
        JSON.parse(posts)[req.params.id]
      )
    });
  })
  .get('/', (req, res) => {
    fetchPost('main-post').then(response => {
      const preloadedState = {posts: {posts: {'main-post': response}}};
      const store = createStore(preloadedState);

      const markup = renderToString(
        <Provider store={store}>
          <App />
        </Provider>
      );

      const finalState = store.getState();

      res.status(200).send(
        `<!doctype html>
        <html lang="">
          <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <title>Welcome to Razzle</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${
              assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
            }
            ${
              process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
          </head>
          <body>
            <div id="root">${markup}</div>
            <script>
              window.__PRELOADED_STATE__ = ${serialize(finalState)}
            </script>
          </body>
        </html>`
      );
    });
  });

export default server;
