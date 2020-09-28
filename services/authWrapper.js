const express = require('express');
const axios = require("axios");
const router = express.Router();

const githubUserURI = "https://api.github.com/user";
const githubURI = "https://github.com/login/oauth/access_token";

const clientID = process.env.GITHUB_AUTH_CID || '';
const clientSecret = process.env.GITHUB_AUTH_SECRET || '';

const authorized = new Set();

router.get('/home', (req, res, next) => {
    if (req.cookies.access_token !== undefined) {
        if (req.query.logout === 'true') {
            authorized.delete(req.cookies.access_token);
            res.clearCookie('access_token').redirect('http://localhost:8080/home');
            next();
            return;
        }
        res.send(`
    <HTML>
    <BODY>
    <a href="http://localhost:8080/home?logout=true">
    Logout
  </a>
</BODY>
    </HTML>
    `);
    } else {
        res.send(`
    <HTML>
    <BODY>
    <a href="https://github.com/login/oauth/authorize?client_id=${clientID}">
    Login with github
  </a>
</BODY>
    </HTML>
    `);
    }
});

router.get('/auth', (req, res) => {
    const token = req.query.code;

    axios.post(githubURI,
        {
            client_id: clientID,
            client_secret: clientSecret,
            code: token
        },
        {
            headers: {
                accept: 'application/json'

            }
        }
    ).then(r => {
        const accessToken = r.data.access_token;
        res.cookie('access_token', accessToken).redirect(`/graphql`);
    }).catch(e => {
        res.send(e);
    })
});

router.use(async (req, res, next) => {
    let accessToken = req.cookies.access_token;
    if (accessToken) {
        if (!(authorized.has(accessToken))) {
            const response = await axios.get(githubUserURI, {
                headers: {
                    Authorization: `token ${accessToken}`
                }
            });
            if (response.status !== 200) {
                res.json({message: "You are not authorized, please log in at the home page."});
                return;
            } else {
                authorized.add(accessToken);
                next();
            }
        }
        next();
    } else {
        res.json({message: "Authorization code not provided, please log in at the home page."});
        return;
    }
});

module.exports = router;