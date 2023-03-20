const { extractSheets } = require("spreadsheet-to-json");

const key = {
    "type": "service_account",
    "project_id": "eagle-eye-373816",
    "private_key_id": "e0463ec4aadcfe5a9cc6ff1a3071818476086a6e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCjocBzP5zqJWvQ\nsoA+dV3yOzhw1bIDkoeHsLhIjqEnnu+jH9fVg7JkYWBvRLdASpz8J1Q/1rDRC/zA\nXTmvpCm31VH66XFE+ts9Mibh1lCkBPyRBrpy2atrOoG+wSfqlyq+6dQbeHjf/D+m\nbCUyIGcoofQEJDR9gSAa1EPBJdVtWPa6W2hxRZ0Ca/U2yNSaFaM4knKz8zkMSfjO\nTQafWLjfCBWCE82fp/xLLUWk5+R2rptGIsReNmKfwatE/1t3wmysBTVpBZTf2UaC\nO1ScDDUywhDKWDq1vllbfZt9FZS8FaZAfgGut0r2dp042d/+T3UESa/bLYTur3bO\nnWBzRSJVAgMBAAECggEAHh2YQ63OxapO+klMAJLN0FX1aJDv8yfeAUt1U0dK4jWm\ngaWL7fxP0hk47Cmft3m0BFWBtEEhaEwWP9o4knq6gd7FOJKL2gf4Xz4yeUieLV3M\nlS2Blb85hSHuvKqkm9CoGZyEAO1Og9zTYyAOxXfAvLH37OYz8fBYtg9gi/UYX4gf\nSVs/qvC2r4yLL22Nwrhne3TVO9KJ+C43arDpeONYgNB1qfA18fqCvK+phxdOq/GT\n4rwa25M+kDBoWXm+CjuzEjf4EuY4VPIl444Z/EX/32qYNHZggyEdJF3r5OISGMWP\numTEzfTfUYYx7s8V3o4fnaKCc7rB7XcdyigBOHvUQQKBgQDdTGdEQUyaYQE3rugQ\ngNy8SBF55S1m9JKGdPy4btvGizPVu/Np837cs9SsatByg9gPpSar5Axtxx4zqwAb\npD0aiIOuS6Lfu9tJejst251LRtWe7zlsyzajEg5e1tMhf5XNce7LtHhVw6y6dYQj\nRrR3Ly6OtxK96Gy3nXD7/F5awQKBgQC9Sm8ywlDE8prdysK+7LTc0Yqu5uuE5Veu\nb7K6kxlkUZyp4tW1nr94cRjY7PzkuoUXRCwAdVKXpbIrXJf/vDjkQ1+FQq5EDhLH\n6zyfkphEDo/jnFZwSSpxNUPT+0dhPzZ1jvzqAvnUkC4ETAtb2OwRwEhO9tGI9IF9\nk8Y/qX5QlQKBgCe3eKklVww18LP/riKYHgWkoY5Q9U8PAeUjxd+L9eGyRgFMFCml\ny9TsaXTwTqzewL4+E6yx5xEktWTsgb50QYsriQaVCIxC+N49E7XtPlOuSNSXdqTx\n68JkkTOwNoBCl64hjov8vcQWtD9aq/Zw0B671w1CChkPR8PEe+ydpImBAoGAQE1j\n3vNhqrXbZBK3+1G/0u+f0/B/+2JJWel55qWHz6tls9Rp0su9sXWCAlbnRfASvCed\nZv5z8y4Hi3Fl9SsEjI5SiZtwRZAeUymXK4IKFbx4ptJ6DqTcNR7qDr3irqdhoafU\nRM6D/fCIoU8P4MCc2R7fsWtpHMQqpPUpOIEkds0CgYEAzJaQ20dBZhs3KmMb5Vip\nXcXYcSaS2MJsAYumhQ13zC4cXLsns7YEEQYR1zFrbHHDsL9cBgL3lsI8v0Ab7Hwk\nfbeO6589i3b9j8hhlQgybgpnpuv59spBm3KqtUfeI9ILQuOHUhsE9HJA9P/ZfwG8\nXwM10HSWfYvJ96vS5dADEvk=\n-----END PRIVATE KEY-----\n",
    "client_email": "eagle-eye@eagle-eye-373816.iam.gserviceaccount.com",
    "client_id": "115144001171383269654",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/eagle-eye%40eagle-eye-373816.iam.gserviceaccount.com"
}

export const funGetDataSheet = async (sheet: string) => {
    const result = await extractSheets(
        {
            spreadsheetKey: "1et3XwiRtiGGgHw3_dVeAGuezu9Z7wvbvaUyFEI59j2U",
            credentials: key,
            sheetsToExtract: [sheet],
        }
    );

    for (let a of Object.keys(result)) {
        for (let b of result[a]) {
            for (let c of Object.keys(b)) {
                b[c] = isNaN(b[c]) ? b[c] : Number(b[c])
            }
        }
    }

    return result[sheet]
}