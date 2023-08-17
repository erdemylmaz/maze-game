const mazeArea = document.querySelector('.maze-area');
let rows;
let blocks;

class Maze {
    widePixel = 32;

    startRow = 0;
    startCol = 0;

    currentRow = this.startRow;
    currentCol = this.startCol;

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

        let activeBlocks = document.querySelectorAll('.active-block');

        let canMove = true;

        if(activeBlocks.length != 32 * 32 && canMove) {

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
    }
}

const maze = new Maze();

maze.initMap();
// maze.makeMaze();
setInterval(maze.makeMaze, 1000 / 10);