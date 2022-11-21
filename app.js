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

    const updateBoard = () => {
        const board = document.querySelector('.board')
        board.replaceChildren()
        for (let i = 0; i < gameBoard.boardContents.length; i++) {
            const box = document.createElement('div')
            box.classList.add('box')
            box.id = `box-${i}`
            box.innerText = gameBoard.boardContents[i]
            box.addEventListener('click', updateContents)
            board.appendChild(box)

        }
    }

    const updateContents = (e) => {
        boxId = e.target.id.replace(/\D/g, "")
        // console.log(boxId)
        // console.log(e.target.innerText)
        if (e.target.innerText != p1.marker && e.target.innerText != p2.marker) {
            gameBoard.boardContents[boxId] = activePlayer.marker
            updateBoard()
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
                box.removeEventListener('click', updateContents)
            });



        }
        else if (gameBoard.tie()) {

            next.innerText = `There has been a tie.`
            boxes.forEach((box) => {
                box.removeEventListener('click', updateContents)
            });



        }
        else {

            activePlayer == p1 ? activePlayer = p2 : activePlayer = p1
            next.innerText = `${activePlayer.name} select your move.`


        }
        action.appendChild(next)
    }


    const clearContents = () => {
        location.reload()
    }

    const initialize = () => {
        const header = document.querySelector('.header')
        const div = document.createElement('div')
        div.classList.add('game-buttons')
        const start = document.createElement('button')
        start.innerText = 'Start'
        start.addEventListener('click', createUsers)
        const restart = document.createElement('button')
        restart.innerText = 'Restart'
        restart.addEventListener('click', clearContents)
        div.appendChild(start)
        div.appendChild(restart)
        header.appendChild(div)

        const action = document.querySelector('.action')
        action.replaceChildren()
        const next = document.createElement('div')
        next.classList.add('action-next')
        next.innerText = `Click start to begin.`
        action.appendChild(next)
    }
    const createUsers = () => {
        username = window.prompt('Player 1 please enter your name.')
        marker = window.prompt(`${username} please select a marker`)
        p1 = Player(username, marker)
        username = window.prompt('Player 2 please enter your name.')
        marker = window.prompt(`${username} please select a marker`)
        p2 = Player(username, marker)
        activePlayer = p1
        const action = document.querySelector('.action')
        action.replaceChildren()
        const next = document.createElement('div')
        next.classList.add('action-next')
        next.innerText = `${activePlayer.name} select your move.`
        action.appendChild(next)
        console.log('Initialized')
    }

    const play = () => {
        initialize()
        updateBoard()
    }



    return { play, updateContents, updateBoard, clearContents, initialize }
})();


displayController.play()


