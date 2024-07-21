import React, { useState} from 'react';
import './Board.css';
import Box from './box';

const initialArray = ["", "", "", "", "", "", "", "", ""];

function Bigboard() {
    const [currAr, setCurrAr] = useState(initialArray);
    const [winner, setWinner] = useState('');
    const [click, setClick] = useState(0);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function AImove() {
        checkGameStatus(currAr);
        const emptyIndices = currAr.map((v, i) => v === '' ? i : '').filter(v => v !== '');
        let bestScore = -Infinity;
        let move;
        for (let i of emptyIndices) {
            const boardCopy = [...currAr];
            boardCopy[i] = 'O';
            let score = minimax(boardCopy, 0, false);
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        const result = checkWinner(board);
        if (result !== null) {
            const scores = {
                'X': -10,
                'O': 10,
                'tie': 0
            };
            return scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function checkWinner(board) {
        for (let [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'tie';
    }

    function checkGameStatus(board) {
        const result = checkWinner(board);
        if (result) {
            setWinner(result === 'tie' ? 'Tie' : (result === 'X' ? 'You Win' : 'AI Wins'));
        }
    }

    function userClick(i) {
        if (currAr[i] === 'O' || currAr[i] === 'X' || winner !== '') return;

        const newBoard = [...currAr];
        newBoard[i] = 'X';
        setCurrAr(newBoard);
        setClick(1);
    }
    if (click === 1 && winner ==='') {
        const aiMove = AImove();
        if (aiMove !== undefined) {
            const newBoard = [...currAr];
            newBoard[aiMove] = 'O';
            setCurrAr(newBoard);
            setClick(0);
            checkGameStatus(newBoard);
        }
    }
    function rel(){
        window.location.reload()
    }

    return (
        <>
        <h1>Welcome to out Tic-Tac-Toe</h1>
        {winner !== '' ?(
                        <div className='Winer'>{winner}
                            <button id='reload'onClick={()=>rel()}>Play Again</button>
                        </div>
                    ):''
        }
            <div className="BigBoard">
                {currAr.map((value, index) => (
                    <Box key={index} value={value} onClick={() => userClick(index)} />
                ))}
            </div>

        </>
    );
}

export default Bigboard;
