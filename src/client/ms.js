
class MwClient {
    baseUrl = ""

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    parseResult = response => response.ok ? response.json() : response.text().then( e => ({ error: e }));

    createNewGame = (accountId, rows, cols, mines) => {
        return fetch(
            `${this.baseUrl}/v2/accounts/${accountId}/games`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { rows, cols, mines } )
            }
        )
        .then(this.parseResult)
    }

    findGame = (accountId, id) => {
        console.log(`Finding game ${id} for account ${accountId}` );
        return fetch(
            `${this.baseUrl}/v2/accounts/${accountId}/games/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(this.parseResult)
    }

    listGames = accountId => {
        console.log(`Loading ${accountId} games` );

        return fetch(
            `${this.baseUrl}/v2/accounts/${accountId}/games`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(this.parseResult)
    }

    flagCell = (accountId, game, row, col, flag) => {
        return fetch(
            `${this.baseUrl}/v2/accounts/${accountId}/games/${game.id}/flags`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { row, col, flag } )
            }
        )
        .then(this.parseResult)
    }

    uncoverCell = (accountId, game, row, col) => {
        return fetch(
            `${this.baseUrl}/v2/accounts/${accountId}/games/${game.id}/uncovers`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { row, col } )
            }
        )
        .then(this.parseResult)
    }
}

export default MwClient;
