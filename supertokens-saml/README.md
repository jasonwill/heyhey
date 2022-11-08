# Description

The mywillamette directory contains a sample application using the recipe here:

https://supertokens.com/docs/thirdpartyemailpassword/introduction

# Notes

The AppInfo documentation here:  https://supertokens.com/docs/thirdpartyemailpassword/appinfo

on the React tab, has examples that don't agree with the defaults from the form on this page:

https://supertokens.com/docs/thirdpartyemailpassword/pre-built-ui/setup/frontend

For example:

In the for the API Domain suggestion (in the html placeholder) is http://localhost:8080, but in the AppInfo docs the value suggested is http://localhost:9000

```For local development, you are likely using localhost with some port (ex 9000). Then the value of this should be "http://localhost:9000".```

### Generated Code Goes Into frontend/src/config.tsx and frontend/src/App.tsx

https://supertokens.com/docs/thirdpartyemailpassword/pre-built-ui/setup/frontend#2-call-the-init-function does not explicitly specify where the generated code should be placed, it appears that this should replace what is in config.tsx.

```TypeScript
import React from 'react';

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdPartyEmailPassword, {Github, Google, Facebook, Apple} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: "mywillamette_saml",
        apiDomain: "http://localhost:8080",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [
                    Github.init(),
                    Google.init(),
                    Facebook.init(),
                    Apple.init(),
                ]
            }
        }),
        Session.init()
    ]
});
```

generated from the for here https://supertokens.com/docs/thirdpartyemailpassword/pre-built-ui/setup/frontend appears to belong in frontend/src/config.tsx

Original contents of config.tsx:

```TypeScript
import ThirdPartyEmailPassword, { Google, Github, Apple } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";

export const SuperTokensConfig = {
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init(), Apple.init()],
            },
        }),
        Session.init(),
    ],
};
```


https://supertokens.com/docs/thirdpartyemailpassword/pre-built-ui/setup/frontend#3-setup-routing-to-show-the-login-ui does not explicitly specify where the generated code should be placed, it appears that this should replace what is in frontend/src/App.tsx

new code (uses old school React class approach, will need to fix that):

```TypeScript
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import * as reactRouterDom from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <SuperTokensWrapper>
                <BrowserRouter>
                    <Routes>
                        {/*This renders the login UI on the /auth route*/}
                        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
                        {/*Your app routes*/}
                    </Routes>
                </BrowserRouter>
            </SuperTokensWrapper>
        );
    }
}
```

original code:

```TypeScript
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import { SuperTokensConfig } from "./config";

SuperTokens.init(SuperTokensConfig);

function App() {
    return (
        <SuperTokensWrapper>
            <div className="App">
                <Router>
                    <div className="fill">
                        <Routes>
                            {/* This shows the login UI on "/auth" route */}
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                            <Route
                                path="/"
                                element={
                                    /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */
                                    <SessionAuth>
                                        <Home />
                                    </SessionAuth>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
```

*Note: SuperTokensConfig is not found in the original App.js `import { SuperTokensConfig } from "./config";` . That is because the initial code does not use class components, but the generated code does.  This should be fixed once the "hello world" part is up and running.*

After step 3 run `npm start`...

Which does not work because index.tsx is expecting new style react (v18+ and not old react code in App.tsx and config.tsx).

There are a few other issues, see the commited code (November 8, 2022 18:58 UTC) for working code.


## TODOs

- [ ] Change the GitHub, Facebook, and Apple information to use our own, keys and secrets, in mywillamette/backend/config.ts.  DO NOT commit new keys and secrets

- [ ] Change the router to use the tanstack router

- [ ] Connect to postgraphile, see Graphile Discord:

```
ravinder.singh — 04/25/2022
Hi, is there any guidance on setting up SSO auth Auth0 and Azure Active Directory with PostGraphile. Any help highly appreciated. Thanks
RedShift — 04/25/2022
@ravinder.singh just do it like you would with express.js
JeffJankowski — 04/25/2022
Yeah we are actually using this stack. You're going to want to disable the JWT functionality in postgraphile itself. Use an express server with postgraphile in library mode. Then just follow the auth0 documentation to use express-jwt and jwks-rsa as a middleware to verify the token.
For AAD, just setup an auth0 connector using the auth0 web portal
Benjie 🔮 — 04/25/2022
In addition to the advice above, there's also https://www.graphile.org/postgraphile/jwk-verification/ but it might be out of date 🤷‍♂️
PostGraphile | PostGraphile JWT/JWK Verification Quickstart
Utilities to build powerful and performant GraphQL APIs
```

