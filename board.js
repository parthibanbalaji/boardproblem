/**
 * This class will find the number of boats in the given board array
 */
class Board {
  board = [];
  destroyers = 0;
  submarines = 0;
  patrolBoats = 0;

  constructor(input) {
    for (let x = 0; x < input.length; x++) {
      let array = input[x].split("");
      this.board.push(array);
    }
  }

  position(x, y) {
    let positionObj = { x: x, y: y };
    return positionObj;
  }

  /**
   * Method to find destoryers 
   * @param {*} x postion in board array
   * @param {*} y 
   * @returns 
   */
  findDestroyers(x, y) {
    let ship = 0;
    const destroyerShapes = {
      shape1: {
        // [x][y+1] && [x][y+2];
        element1: this.position(x, y + 1),
        element2: this.position(x, y + 2),
      },
      shape2: {
        //[x+1][y] && [x+2][y];
        element1: this.position(x + 1, y),
        element2: this.position(x + 2, y),
      },
      shape3: {
        // [x][y+1] && [x+1][y];
        element1: this.position(x, y + 1),
        element2: this.position(x + 1, y),
      },
      shape4: {
        // [x][y+1] && [x+1][y+1];
        element1: this.position(x, y + 1),
        element2: this.position(x + 1, y + 1),
      },
      shape5: {
        // [x+1] [y] && [x+1][y+1];
        element1: this.position(x + 1, y),
        element2: this.position(x + 1, y + 1),
      },
      shape6: {
        // [x+1] [y] && [x+1] [y-1];
        element1: this.position(x + 1, y),
        element2: this.position(x + 1, y - 1),
      },
    };
    for (let shape of Object.keys(destroyerShapes)) {
      let found = this.findShapeandReplace(
        destroyerShapes[shape].element1,
        destroyerShapes[shape].element2
      );
      if (found) ship = ship + 1;
    }
    return ship;
  }

  /**
   * Method to find the ship in the board and replace the found values to omit on next search
   * @param {*} element1 
   * @param {*} element2 
   * @returns 
   */
  findShapeandReplace(element1, element2) {
    // destroyer
    if (element2) {
      if (
        this.board[element1.x] != undefined &&
        this.board[element2.x] != undefined
      ) {
        if (
          this.board[element1.x][element1.y] == "#" &&
          this.board[element2.x][element2.y] == "#"
        ) {
          this.board[element1.x][element1.y] = "C";
          this.board[element2.x][element2.y] = "C";
          return true;
        }
      }
    } else {  // submarine
      if (this.board[element1.x] != undefined) {
        if (this.board[element1.x][element1.y] == "#") {
          this.board[element1.x][element1.y] = "C";
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Method to find the submarine in the board
   * @param {*} x 
   * @param {*} y 
   * @returns 
   */
  findSubmarines(x, y) {
    let ship = 0;
    let submarineShapes = {
      shape1: {
        // [x] [y+1]
        element1: this.position(x, y + 1),
      },
      shape2: {
        // [x] [y+1]
        element1: this.position(x + 1, y),
      },
    };
    for (let shape of Object.keys(submarineShapes)) {
      let found = this.findShapeandReplace(
        submarineShapes[shape].element1,
        submarineShapes[shape].element2
      );
      if (found) ship = ship + 1;
    }
    return ship;
  }

  /**
   * Method will return the number of ships in the given array
   * @returns 
   */
  findBattleShips() {
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[0].length; y++) {
        let destroyer = 0;
        let submarine = 0;
        if (this.board[x][y] == "#") {
          this.board[x][y] = "C"; // changing values to record the element is processed

          // finding destroyers by matching pattern
          destroyer = this.findDestroyers(x, y);

          // finding submarines
          submarine = this.findSubmarines(x, y);

          // updating result array
          if (destroyer == 0 && submarine == 0) {
            this.patrolBoats = this.patrolBoats + 1;
          }
          this.destroyers = this.destroyers + destroyer;
          this.submarines = this.submarines + submarine;
        }
      }
    }
    return [this.patrolBoats, this.submarines, this.destroyers];
  }
}


function solution(B) {
  let board = new Board(B);
  let result = board.findBattleShips();
  console.log(`result for input array [${B}] = ${result}  `)
}

//Example calling
let sample1 = ['.##.#','#.#..','#...#','#.##.']; // 2 1 2
var sample2 = ['##.','#.#','.##']; // 0 0 2
var sample3 = ['','','']; // 0 0 0
solution(sample3);
