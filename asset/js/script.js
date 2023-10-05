const SYMBOL = { PLAYER1_SYMBOL: 'O', PLAYER2_SYMBOL: 'X' };

class TicTacToe {
    static #SIDE = 3;
    #board;
    #currentPlayer = 1; // Player 1 starts
    #moveIndex = 0;
    #player1Score = 0;
    #player2Score = 0;
    constructor() {
        this.#board = new Array();
        this.#board.push(['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']);

        // Add event listeners for buttons
        document.querySelector('.btn--ok').addEventListener('click', () => {
            this.#toggleWinnerModal();
            this.#reset();
        });
        document.querySelector('.btn--play').addEventListener('click', () => {
            this.#togglePlayerChoiceModal();
        });
        document.querySelector('.btn--yes').addEventListener('click', () => {
            this.#currentPlayer = 1; // Player 1 starts
            this.#disablePlayBtn();
            this.#togglePlayerChoiceModal();
        });
        document.querySelector('.btn--no').addEventListener('click', () => {
            this.#currentPlayer = 2; // Player 2 starts
            this.#disablePlayBtn();
            this.#togglePlayerChoiceModal();
        });

        // Add event listener for the game board
        const boardContainer = document.querySelector('.board');
        boardContainer.addEventListener('click', (event) => {
            this.#initializeClickListener(event);
        });
    }

    #initializeClickListener(event) {
        const cell = event.target;
        if (cell.classList.contains('cell') && cell.textContent === '-') {
            const cellNo = cell.dataset.id;
            const row = Math.floor((cellNo - 1) / TicTacToe.#SIDE);
            const col = Math.floor((cellNo - 1) % TicTacToe.#SIDE);

            if (this.#currentPlayer === 1) {
                cell.textContent = SYMBOL.PLAYER1_SYMBOL;
                this.#board[row][col] = SYMBOL.PLAYER1_SYMBOL;
                this.#currentPlayer = 2;
            } else {
                cell.textContent = SYMBOL.PLAYER2_SYMBOL;
                this.#board[row][col] = SYMBOL.PLAYER2_SYMBOL;
                this.#currentPlayer = 1;
            }

            this.#moveIndex++;

            if (this.#checkWinner()) {
                this.#updateScores();
                this.#toggleWinnerModal();
            }
        }
    }

    #togglePlayerChoiceModal() {
        document.querySelector('.backdrop').classList.toggle('hidden');
        document.querySelector('.modal').classList.toggle('hidden');
    }

    #toggleWinnerModal() {
        document.querySelector('.backdrop').classList.toggle('hidden');
        document.querySelector('.winnermodal').classList.toggle('hidden');
    }

    #checkWinner() {
        if (this.#gameOver()==false && this.#moveIndex === TicTacToe.#SIDE * TicTacToe.#SIDE) {
            const innerHtml = `
                <img class="resImage" src="./asset/images/prohibited.png" alt="prohibited">
                <p>It's a draw</p>
            `;
            document.querySelector('.result').innerHTML = innerHtml;
            this.#toggleWinnerModal
            
            return true;
        } else if (this.#gameOver()) {
            const winnerSymbol = this.#currentPlayer === 0 ? SYMBOL.PLAYER2_SYMBOL : SYMBOL.PLAYER1_SYMBOL;
            const innerHtml = `
                <img class="resImage" src="./asset/images/win.png" alt="prohibited">
                <p>Player ${this.#currentPlayer} Wins!</p>
            `;
            document.querySelector('.result').innerHTML = innerHtml;
            
            return true;
        }
        return false;
    }

    #gameOver() {
        return (
            this.#checkRow() || this.#checkColumn() || this.#checkDiagonal()
        );
    }

    #checkRow() {
        for (let i = 0; i < TicTacToe.#SIDE; i++) {
            if (
                this.#board[i][0] === this.#board[i][1] &&
                this.#board[i][1] === this.#board[i][2] &&
                this.#board[i][0] !== '-'
            ) {
                return true;
            }
        }
        return false;
    }

    #checkColumn() {
        for (let i = 0; i < TicTacToe.#SIDE; i++) {
            if (
                this.#board[0][i] === this.#board[1][i] &&
                this.#board[1][i] === this.#board[2][i] &&
                this.#board[0][i] !== '-'
            ) {
                return true;
            }
        }
        return false;
    }

    #checkDiagonal() {
        return (
            (this.#board[0][0] === this.#board[1][1] &&
                this.#board[1][1] === this.#board[2][2] &&
                this.#board[0][0] !== '-') ||
            (this.#board[0][2] === this.#board[1][1] &&
                this.#board[1][1] === this.#board[2][0] &&
                this.#board[0][2] !== '-')
        );
    }

    #updateScores() {
        if (this.#currentPlayer === 1) {
            this.#player1Score++;
        } else {
            this.#player2Score++;
        }

        document.getElementById('player1-score').textContent = this.#player1Score;
        document.getElementById('player2-score').textContent = this.#player2Score;
    }

    #disablePlayBtn() {
        const playBtn = document.querySelector('.btn--play');
        playBtn.style.display = 'none';
    }

    #reset() {
        document.querySelectorAll('.cell').forEach((cell) => {
            cell.textContent = '-';
        });
        this.#board = new Array();
        this.#board.push(['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']);
        this.#moveIndex = 0;
        this.#currentPlayer = 1;
    }
}

const ticTacToe = new TicTacToe();
