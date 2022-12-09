import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import * as dotenv from 'dotenv';

dotenv.config();
const SUPERTOKEN_API_KEY: string = process.env.SUPERTOKEN_API_KEY ?? 'none'
//TODO, should all secret values be read from env?

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        // this is the location of the SuperTokens core.
        connectionURI: '',
        apiKey: SUPERTOKEN_API_KEY, // pattern to load from environment
    },
    appInfo: {
        appName: "mywillamette_saml",
        apiDomain: "http://localhost:8080",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        ThirdPartyEmailPassword.init({
            providers: [
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                ThirdPartyEmailPassword.Google({
                    clientId: '',
                    clientSecret: '',
                }),
                ThirdPartyEmailPassword.Github({
                    clientSecret: '',
                    clientId: '',
                }),
                ThirdPartyEmailPassword.Apple({
                    clientId: '',
                    clientSecret: {
                        keyId: '',
                        privateKey: '',
                        teamId: '',
                    },
                }),
                // Facebook({
                //     clientSecret: "FACEBOOK_CLIENT_SECRET",
                //     clientId: "FACEBOOK_CLIENT_ID"
                // })
            ],
        }),
        Session.init(),
        Dashboard.init({
            apiKey: SUPERTOKEN_API_KEY,
        }),
    ],
};

