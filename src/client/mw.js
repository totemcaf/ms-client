
class MwClient {
    baseUrl = ""

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

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
        .then(response => response.json())
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
        .then(response => response.json())
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
        .then(response => response.json())
    }
}

export default MwClient;
