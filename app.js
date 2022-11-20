const gameBoard = (() => {
    let boardContents = Array(9).fill("")
    const win = (player) => {
        marker = player.marker
        return (boardContents[0] == marker && boardContents[1] == marker && boardContents[2] == marker) ||
            (boardContents[3] == marker && boardContents[4] == marker && boardContents[5] == marker) ||
            (boardContents[6] == marker && boardContents[7] == marker && boardContents[8] == marker) ||
            (boardContents[0] == marker && boardContents[3] == marker && boardContents[6] == marker) ||
            (boardContents[1] == marker && boardContents[4] == marker && boardContents[7] == marker) ||
            (boardContents[2] == marker && boardContents[5] == marker && boardContents[8] == marker) ||
            (boardContents[0] == marker && boardContents[4] == marker && boardContents[8] == marker) ||
            (boardContents[2] == marker && boardContents[4] == marker && boardContents[6] == marker)

    }
    const tie = () => {
        return boardContents.join('').length == 9
    }
    return { boardContents, win, tie }

})();

const Player = (name, marker) => {
    return { name, marker }
}

const displayController = (() => {
    p1 = Player("Player 1", "X")
    p2 = Player("Player 2", "O")
    let activePlayer = p2


    const updateBoard = () => {
        const board = document.querySelector('.board')
        board.replaceChildren()
        for (let i = 0; i < gameBoard.boardContents.length; i++) {
            const box = document.createElement('div')
            box.classList.add('box')
            box.id = `box-${i}`
            box.innerText = gameBoard.boardContents[i]
            box.addEventListener('click', displayController.updateContents)
            board.appendChild(box)

        }
    }

    const updateContents = (e) => {
        boxId = e.target.id.replace(/\D/g, "")
        // console.log(boxId)
        // console.log(e.target.innerText)
        if (e.target.innerText != p1.marker && e.target.innerText != p2.marker) {
            gameBoard.boardContents[boxId] = activePlayer.marker
            displayController.updateBoard()
            updateAction()
        }
    }

    const updateAction = () => {
        const action = document.querySelector('.action')
        action.replaceChildren()
        const next = document.createElement('div')
        next.classList.add('action-next')
        const boxes = document.querySelectorAll('.box')
        if (gameBoard.win(activePlayer)) {

            next.innerText = `${activePlayer.name} has won!`
            boxes.forEach((box) => {
                box.removeEventListener('click', displayController.updateContents)
            });



        }
        else if (gameBoard.tie()) {

            next.innerText = `There has been a tie.`
            boxes.forEach((box) => {
                box.removeEventListener('click', displayController.updateContents)
            });



        }
        else {
            activePlayer == p1 ? activePlayer = p2 : activePlayer = p1


            next.innerText = `${activePlayer.name} select your move.`

        }
        action.appendChild(next)
    }

    const play = () => {
        updateAction()
        updateBoard()
    }



    return { play, updateContents, updateBoard }
})();


displayController.play()


