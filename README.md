# trello-delete
Delete all your Trello cards for a given board

## Usage

1. Add a `config.js` in the root of the project.
1. In `config.js`, add and export the following variables: `apiKey`, `token`, and `boardId`.

    ```
    // config.js
    
    // get apiKey and token from: https://trello.com/app-key
    const apiKey = "YOUR_KEY";
    const token =
        "YOUR_TOKEN";

    const boardId = "YOUR_BOARD_ID";

    module.exports = {
      apiKey, token, boardId
    }
    ```
1. In the terminal: `node index.js`
