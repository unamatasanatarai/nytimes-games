// https://www.nytimes.com/puzzles/sudoku/hard
// copy the code below into the console. See it get done!

const solver = gameBoard => {
    this.board = gameBoard
    this.board_length = this.board.length

    this.canPlaceNumberInRow = (board, y, number) => {
        for (let x = 0; x < this.board_length; x++) {
            if (board[y][x] === number) {
                return false
            }
        }
        return true
    }

    this.canPlaceNumberInCol = (board, x, number) => {
        for (let y = 0; y < this.board_length; y++) {
            if (board[y][x] === number) {
                return false
            }
        }
        return true
    }

    this.canPlaceNumberInBox = (board, x, y, number) => {
        const bx = x - (x % 3)
        const by = y - (y % 3)
        for (let iy = by; iy < by + 3; iy++) {
            for (let ix = bx; ix < bx + 3; ix++) {
                if (board[iy][ix] === number) {
                    return false
                }
            }
        }
        return true
    }

    this.canPlaceNumber = (board, x, y, number) => {
        return this.canPlaceNumberInRow(board, y, number) &&
            this.canPlaceNumberInCol(board, x, number) &&
            this.canPlaceNumberInBox(board, x, y, number)
    }

    this.workItOut = board => {

        for (let y = 0; y < this.board_length; y++) {
            for (let x = 0; x < this.board_length; x++) {
                if (board[y][x] !== 0) {
                    continue
                }
                for (let num = 1; num <= this.board_length; num++) {
                    if (this.canPlaceNumber(board, x, y, num)) {
                        board[y][x] = num
                        if (this.workItOut(board)) {
                            return true
                        } else {
                            board[y][x] = 0
                        }
                    }
                }
                return false
            }
        }
        return true
    }

    this.workItOut(this.board)
    return this.board

}


function justSolveIt(){
    nums = [];
    for (i = 0; i < 9; i++) nums.push([])

    for (i = 0; i < 81; i++) {
        num = $(`div[data-cell='${i}'`).childNodes[0].getAttribute("number")
        num = num * 1
        nums[Math.floor(i / 9)].push(num ?? 0)
    }
    solved = solver(nums)
    for (y = 0; y < 9; y++) {
        for (x = 0; x < 9; x++) {
            num = solved[y][x]
            i = x + y * 9
            $(`div[data-cell="${i}"]`).click()

            document.dispatchEvent(
                new KeyboardEvent("keydown", {
                    "key": `${num}`,
                    "keyCode": 48 + num,
                    "which": 48 + num,
                    "code": `Digit${num}`,
                    "location": 0,
                    "altKey": false,
                    "ctrlKey": false,
                    "metaKey": false,
                    "shiftKey": false,
                    "repeat": false
                })
            );
        }
    }
}