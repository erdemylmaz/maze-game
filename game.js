const mazeArea = document.querySelector('.maze-area');
const playerDIV = document.querySelector('.player-div');
const finishLine = document.querySelector('.finish-line');
const alertDiv = document.querySelector('.alert-div');
const movementCountSpan = document.querySelector('.movement-count');
const endBox = document.querySelector('.end-box');
const endModal = document.querySelector('.end-modal');

let rows;
let blocks;

let leftKeyButton = document.querySelector('.a-key');
let topKeyButton = document.querySelector('.w-key');
let bottomKeyButton = document.querySelector('.s-key');
let rightKeyButton = document.querySelector('.d-key');

class Maze {
    widePixel = 20;
    totalMovementCount = 0;

    startRow = 0;
    startCol = 0;

    currentRow = this.startRow;
    currentCol = this.startCol;

    playerCol = this.startCol;
    playerRow = this.startRow;

    movementSize = 24;

    isCompleted = false;
    isGameOver = false;

    positions = [
        {
            row: this.startRow,
            col: this.startCol,
        }
    ];

    initMap = () => {
        let id = 0;

        for(let x = 0; x < this.widePixel; x++) {
            let rowDIV = document.createElement('div');
            rowDIV.className = "row";

            for(let i = 0; i < this.widePixel; i++) {
                let blockDIV = document.createElement('div');
                blockDIV.className = "block";

                blockDIV.setAttribute('data-row', x);
                blockDIV.setAttribute('data-col', i);
                blockDIV.setAttribute('data-id', id);

                id++;

                rowDIV.appendChild(blockDIV);

                if(i == this.startCol && x == this.startRow) {
                    blockDIV.classList.add('current-block');
                }
            }
            mazeArea.appendChild(rowDIV);
        }

        rows = document.querySelectorAll('.row');
        blocks = document.querySelectorAll('.block');
    }

    makeMaze = () => {
        let activeBlocks = document.querySelectorAll('.active-block');

        if(activeBlocks.length < this.widePixel * this.widePixel) {
            let currentBlock = document.querySelector('.current-block');
            let topBlock = null;
            let bottomBlock = null;
            let leftBlock = null;
            let rightBlock = null;

            // define near blocks
            blocks.forEach((block) => {
                if(!block.classList.contains('active-block')) {
                    if(block.dataset.row == this.currentRow && block.dataset.col == this.currentCol - 1) {
                        leftBlock = block;
                        block.classList.add('next-block');
                    }

                    if(block.dataset.row == this.currentRow && block.dataset.col == this.currentCol + 1) {
                        rightBlock = block;
                        block.classList.add('next-block');
                    }

                    if(block.dataset.row == this.currentRow - 1 && block.dataset.col == this.currentCol) {
                        topBlock = block;
                        block.classList.add('next-block');
                    }

                    if(block.dataset.row == this.currentRow + 1 && block.dataset.col == this.currentCol) {
                        bottomBlock = block;
                        block.classList.add('next-block');
                    }
                }
            });

            let nearBlocks = [
                {
                    div: topBlock,
                    movementID: -1,
                },
                {
                    div: bottomBlock,
                    movementID: 1,
                },
                {
                    div: leftBlock,
                    movementID: -2,
                },
                {
                    div: rightBlock,
                    movementID: 2,
                },
            ]

            let availableMovements = [];

            nearBlocks.map((x) => {
                if(x.div) {
                    if(!x.div.classList.contains('active-block')) {
                        availableMovements.push(x.movementID);
                    }
                }
            });

            let randomMovement = availableMovements[Math.floor(Math.random() * availableMovements.length)];


            let canMove = true;

            if(canMove) {

                if(randomMovement == 1 && this.currentRow < this.widePixel) {
                    // bottom
                    currentBlock.classList.remove('current-block');
                    currentBlock.classList.add('active-block');

                    currentBlock.style.borderBottom = "1px solid #aaa";
                    bottomBlock.style.borderTop = "1px solid #aaa";

                    bottomBlock.classList.add('current-block');
                    bottomBlock.classList.add('active-block');

                    document.querySelectorAll('.next-block').forEach((block) => block.classList.remove('next-block'));

                    this.currentRow++;

                    this.positions.push({
                        row: this.currentRow,
                        col: this.currentCol,
                    });
                } else if (randomMovement == -1 && this.currentRow > 0) {
                    // top
                    currentBlock.classList.remove('current-block');
                    currentBlock.classList.add('active-block');

                    currentBlock.style.borderTop = "1px solid #aaa";
                    topBlock.style.borderBottom = "1px solid #aaa";

                    topBlock.classList.add('current-block');
                    topBlock.classList.add('active-block');

                    document.querySelectorAll('.next-block').forEach((block) => block.classList.remove('next-block'));
                
                    this.currentRow--;

                    this.positions.push({
                        row: this.currentRow,
                        col: this.currentCol,
                    });
                } else if (randomMovement == 2 && this.currentCol < this.widePixel) {
                    // right
                    currentBlock.classList.remove('current-block');
                    currentBlock.classList.add('active-block');

                    currentBlock.style.borderRight = "1px solid #aaa";
                    rightBlock.style.borderLeft = "1px solid #aaa";

                    rightBlock.classList.add('current-block');
                    rightBlock.classList.add('active-block');

                    document.querySelectorAll('.next-block').forEach((block) => block.classList.remove('next-block'));
                
                    this.currentCol++;

                    this.positions.push({
                        row: this.currentRow,
                        col: this.currentCol,
                    });
                } else if (randomMovement == -2 && this.currentCol > 0) {
                    // left
                    currentBlock.classList.remove('current-block');
                    currentBlock.classList.add('active-block');

                    currentBlock.style.borderLeft = "1px solid #aaa";
                    leftBlock.style.borderRight = "1px solid #aaa";

                    leftBlock.classList.add('current-block');
                    leftBlock.classList.add('active-block');

                    document.querySelectorAll('.next-block').forEach((block) => block.classList.remove('next-block'));
                
                    this.currentCol--;

                    this.positions.push({
                        row: this.currentRow,
                        col: this.currentCol,
                    });
                } else {
                    for(let x = 1; x < this.positions.length; x++) {
                        this.currentCol = this.positions[this.positions.length - x].col;
                        this.currentRow = this.positions[this.positions.length - x].row;

                        blocks.forEach((block) => {
                            if(!block.classList.contains('active-block')) {
                                if(block.dataset.row == this.currentRow && block.dataset.col == this.currentCol - 1) {
                                    leftBlock = block;
                                    block.classList.add('next-block');
                                }
                
                                if(block.dataset.row == this.currentRow && block.dataset.col == this.currentCol + 1) {
                                    rightBlock = block;
                                    block.classList.add('next-block');
                                }
                
                                if(block.dataset.row == this.currentRow - 1 && block.dataset.col == this.currentCol) {
                                    topBlock = block;
                                    block.classList.add('next-block');
                                }
                
                                if(block.dataset.row == this.currentRow + 1 && block.dataset.col == this.currentCol) {
                                    bottomBlock = block;
                                    block.classList.add('next-block');
                                }
                            }
                        });
                
                        let nearBlocks = [
                            {
                                div: topBlock,
                                movementID: -1,
                            },
                            {
                                div: bottomBlock,
                                movementID: 1,
                            },
                            {
                                div: leftBlock,
                                movementID: -2,
                            },
                            {
                                div: rightBlock,
                                movementID: 2,
                            },
                        ]
                
                        let availableMovements = [];
                
                        nearBlocks.map((x) => {
                            if(x.div) {
                                if(!x.div.classList.contains('active-block')) {
                                    availableMovements.push(x.movementID);
                                }
                            }
                        });

                        if(availableMovements.length > 0) {
                            blocks.forEach((block) => {
                                if(block.dataset.row == this.currentRow && block.dataset.col == this.currentCol) {
                                    currentBlock.classList.remove('current-block');
                                    currentBlock = block;
                                    block.classList.add('current-block');
                                    block.classList.add('active-block');
                                }
                            });

                            break;
                        } else {
                            continue;
                        }
                    }

                }

            }

            blocks.forEach((block) => {
                if(!block.classList.contains('active-block')) {
                    if(block.dataset.row == this.currentRow && block.dataset.col == this.currentCol - 1) {
                        block.classList.add('next-block');
                    }

                    if(block.dataset.row == this.currentRow && block.dataset.col == this.currentCol + 1) {
                        block.classList.add('next-block');
                    }

                    if(block.dataset.row == this.currentRow - 1 && block.dataset.col == this.currentCol) {
                        block.classList.add('next-block');
                    }

                    if(block.dataset.row == this.currentRow + 1 && block.dataset.col == this.currentCol) {
                        block.classList.add('next-block');
                    }
                }
            });
        } else {
            let currentBlock = document.querySelector('.current-block');
            if(currentBlock) {
                currentBlock.classList.remove('current-block');

                playerDIV.style.filter = "opacity(1)";

                finishLine.style.filter = "opacity(1)";

                this.isCompleted = true;

                alertDiv.style.display = "none";

                this.moveLeft();
            }

        }

    }

    endGame = () => {
        this.isGameOver = true;

        endModal.style.display = "flex";
        endBox.style.display = "flex";
        endBox.style.animation = "myAnimation 500ms ease-in-out infinite";

        setTimeout(() => {
            endBox.style.animation = "";
        }, 500);
    }

    moveUp = () => {
        let blocks = document.querySelectorAll('.active-block');

        let nextBlock;
        movementCountSpan.textContent = this.totalMovementCount;

        blocks.forEach((block) => {
            if(block.dataset.row == this.playerRow - 1 && block.dataset.col == this.playerCol) {
                nextBlock = block;
            }
        });

        if(nextBlock) {

            if(nextBlock.style.borderBottomColor == "rgb(170, 170, 170)") {
                this.playerRow -= 1;

                let nextBlocksTop = nextBlock.offsetTop;
                let nextBlocksLeft = nextBlock.offsetLeft;

                playerDIV.style.top = `${nextBlocksTop + 4}px`;
                playerDIV.style.left = `${nextBlocksLeft + 4}px`;
                this.totalMovementCount++;

                if(this.playerCol == this.widePixel - 1 && this.playerRow == this.widePixel - 1) {
                    this.endGame();
                }

            } else {
                document.body.style.animation = "wrongYAnimation 250ms linear infinite";

                setTimeout(() => {
                    document.body.style.animation = "0";
                }, 250);
            }
        } else {
            document.body.style.animation = "wrongYAnimation 250ms linear infinite";

            setTimeout(() => {
                document.body.style.animation = "0";
            }, 250);
        }
    }

    moveDown = () => {
        let blocks = document.querySelectorAll('.active-block');

        let nextBlock;

        movementCountSpan.textContent = this.totalMovementCount;

        blocks.forEach((block) => {
            if(block.dataset.row == this.playerRow + 1 && block.dataset.col == this.playerCol) {
                nextBlock = block;
            }
        });

        if(nextBlock) {

            if(nextBlock.style.borderTopColor == "rgb(170, 170, 170)") {
                this.playerRow += 1;

                let nextBlocksTop = nextBlock.offsetTop;
                let nextBlocksLeft = nextBlock.offsetLeft;

                playerDIV.style.top = `${nextBlocksTop + 4}px`;
                playerDIV.style.left = `${nextBlocksLeft + 4}px`;
                this.totalMovementCount++;

                if(this.playerCol == this.widePixel - 1 && this.playerRow == this.widePixel - 1) {
                    this.endGame();
                }

            } else {
                document.body.style.animation = "wrongYAnimation 250ms linear infinite";

                setTimeout(() => {
                    document.body.style.animation = "0";
                }, 250);
            }
        } else {
            document.body.style.animation = "wrongYAnimation 250ms linear infinite";

            setTimeout(() => {
                document.body.style.animation = "0";
            }, 250);
        }
    }

    moveLeft = () => {
        let blocks = document.querySelectorAll('.active-block');

        let nextBlock;
        movementCountSpan.textContent = this.totalMovementCount;

        blocks.forEach((block) => {
            if(block.dataset.row == this.playerRow && block.dataset.col == this.playerCol - 1) {
                nextBlock = block;
            }
        });

        if(nextBlock) {
            if(nextBlock.style.borderRightColor == "rgb(170, 170, 170)") {
                this.playerCol -= 1;

                let nextBlocksTop = nextBlock.offsetTop;
                let nextBlocksLeft = nextBlock.offsetLeft;

                playerDIV.style.top = `${nextBlocksTop + 4}px`;
                playerDIV.style.left = `${nextBlocksLeft + 4}px`;
                this.totalMovementCount++;

                if(this.playerCol == this.widePixel - 1 && this.playerRow == this.widePixel - 1) {
                    this.endGame();
                }

            } else {
                document.body.style.animation = "wrongAnimation 250ms linear infinite";

                setTimeout(() => {
                    document.body.style.animation = "0";
                }, 250);
            }
        } else {
            document.body.style.animation = "wrongAnimation 250ms linear infinite";

            setTimeout(() => {
                document.body.style.animation = "0";
            }, 250);
        }
    }

    moveRight = () => {
        let blocks = document.querySelectorAll('.active-block');

        let nextBlock;
        movementCountSpan.textContent = this.totalMovementCount;

        blocks.forEach((block) => {
            if(block.dataset.row == this.playerRow && block.dataset.col == this.playerCol + 1) {
                nextBlock = block;
            }
        });


        if(nextBlock) {
            if(nextBlock.style.borderLeftColor == "rgb(170, 170, 170)") {

                this.playerCol += 1;

                let nextBlocksTop = nextBlock.offsetTop;
                let nextBlocksLeft = nextBlock.offsetLeft;

                playerDIV.style.top = `${nextBlocksTop + 4}px`;
                playerDIV.style.left = `${nextBlocksLeft + 4}px`;
                this.totalMovementCount++;

                if(this.playerCol == this.widePixel - 1 && this.playerRow == this.widePixel - 1) {
                    this.endGame();
                }

            } else {
                document.body.style.animation = "wrongAnimation 250ms linear infinite";

                setTimeout(() => {
                    document.body.style.animation = "0";
                }, 250);
            }
        } else {
            document.body.style.animation = "wrongAnimation 250ms linear infinite";

            setTimeout(() => {
                document.body.style.animation = "0";
            }, 250);
        }
    }

    move = (key) => {
        if(this.isCompleted && !this.isGameOver) {
            if(key.key == "w" || key.key == "ArrowUp" || key.key == "i") {
                this.moveUp();
            }

            if(key.key == "s" || key.key == "ArrowDown" || key.key == "k") {
                this.moveDown();
            }

            if(key.key == "a" || key.key == "ArrowLeft" || key.key == "j") {
                this.moveLeft();
            }

            if(key.key == "d" || key.key == "ArrowRight" || key.key == "l") {
                this.moveRight();
            }

            movementCountSpan.textContent = this.totalMovementCount;


            blocks.forEach((block) => {
                let row = parseInt(block.dataset.row);
                let col = parseInt(block.dataset.col);

                let distance = Math.sqrt(Math.pow(Math.abs(this.playerRow - row), 2) + Math.pow(Math.abs(this.playerCol - col), 2));

                let brightness = 1 - 0.4 * distance;

                if(brightness < 0) {
                    brightness = 0;
                }

                block.style.filter = `brightness(${brightness})`
            });
        }
    }
}

const maze = new Maze();

maze.initMap();
// maze.makeMaze();
setInterval(maze.makeMaze, 1000 / 60);
document.addEventListener('keydown', maze.move);

leftKeyButton.addEventListener('click', () => {
    maze.move({key: 'a'});
});

topKeyButton.addEventListener('click', () => {
    maze.move({key: 'w'});
});

bottomKeyButton.addEventListener('click', () => {
    maze.move({key: 's'});
});
rightKeyButton.addEventListener('click', () => {
    maze.move({key: 'd'});
});