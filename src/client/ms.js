
class MwClient {
    baseUrl = ""

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    parseResult = response => response.ok ? response.json() : response.text().then( e => ({ error: e }));

    createNewGame = (rows, cols, mines) => {
        return fetch(
            `${this.baseUrl}/v1/games`,
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

    findGame = id => {
        return fetch(
            `${this.baseUrl}/v1/games/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(this.parseResult)
    }

    listGames = () => {
        return fetch(
            `${this.baseUrl}/v1/games`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(this.parseResult)
    }

    flagCell = (game, row, col, flag) => {
        return fetch(
            `${this.baseUrl}/v1/games/${game.id}/flags`,
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

    uncoverCell = (game, row, col) => {
        return fetch(
            `${this.baseUrl}/v1/games/${game.id}/uncovers`,
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
