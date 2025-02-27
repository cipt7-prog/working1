import { ACCESS_TOKEN, EXPIRES_IN, logout, TOKEN_TYPE } from "./common";

const BASE_API_URL = "https://api.spotify.com/v1";

var client_id = '48392608b78e4eb9a62070cce51df2f9';
var client_secret = '13408cb89eb546d79e6de8ee40b38f17';

const getAccessToken = () => {
    console.debug("getAccessToken: Retrieving tokens from localStorage");
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const expiresIn = localStorage.getItem(EXPIRES_IN);
    const tokenType = localStorage.getItem(TOKEN_TYPE);
    console.debug("getAccessToken: Retrieved values", { accessToken, expiresIn, tokenType });

    if (!expiresIn || Date.now() >= expiresIn) {
        console.warn("getAccessToken: Token expired or missing. Logging out.");
        logout();
        return null;
    }
    // console.log(accessToken , tokenType);
    
    return { accessToken, tokenType };
};

const createAPIConfig = (tokenData, method = "GET") => {
    if (!tokenData) {
        console.error("createAPIConfig: Missing tokenData, cannot create API config");
        return {};
    }
    const { accessToken, tokenType } = tokenData;
    const config = {
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        },
        method
    };
    console.debug("createAPIConfig: API config created", config);
    return config;
};

export const fetchRequest = async (endpoint) => {
    const tokenData = getAccessToken();
    if (!tokenData) {
        console.error("fetchRequest: No valid token data available.");
        return null;
    }
    const config = createAPIConfig(tokenData);
    const url = `${BASE_API_URL}/${endpoint}`;
    console.debug("fetchRequest: Requesting URL:", url, "with config:", config);
    
    try {
        const result = await fetch(url, config);
        if (!result.ok) {
            console.log(result);    
            console.error(`fetchRequest: API responded with status ${result.status}`);
            
        }
        const data = await result.json();
        console.debug("fetchRequest: Received data", data);
        return data;
    } catch (error) {
        console.error("fetchRequest: Fetch error", error);
        return null;
    }
};
