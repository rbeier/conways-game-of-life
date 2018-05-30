/**
 * define some constants for unified usage
 * @type {number}
 */
export const DEAD  = 0;
export const ALIVE = 1;


/**
 * Handle the logic foreach cell in our matchfield
 *
 * @param id int
 * @param isAlive bool
 * @param left int
 * @param top int
 */
export class Cell {

    constructor(id, isAlive, left, top) {
        this.id = id;
        this.isAlive = isAlive;
        this.left = left;
        this.top = top;
    }

    /**
     * get current, above and below row
     * fetch the neighboring cells from this row
     *
     * @param matchField
     * @param maxLeft
     * @param maxTop
     * @returns {Array}
     */
    getNeighbors(matchField, maxLeft, maxTop) {

        this.maxLeft = maxLeft;
        this.maxTop  = maxTop;

        let cells = [];

        // current row
        let currentRow = matchField[this.top];
        cells = cells.concat( this.getCellsByRow(this, currentRow) );

        // above row
        let aboveRow = matchField[this.top - 1] ? matchField[this.top - 1] : matchField[maxTop];
        cells = cells.concat( this.getCellsByRow(aboveRow[this.left], aboveRow) );

        // below row
        let belowRow = matchField[this.top + 1] ? matchField[this.top + 1] : matchField[0];
        cells = cells.concat( this.getCellsByRow(belowRow[this.left], belowRow) );

        return cells;

    }

    /**
     * get neighbour-cells in a specific row
     *
     * @param cell
     * @param row
     * @returns {Array}
     */
    getCellsByRow(cell, row) {

        let cells = [];

        // if the cell is not the "initial" one, select it.
        if( cell != this ) {
            cells.push(cell);
        }

        // get left cell in current row
        if(row[cell.left - 1]) {
            cells.push(row[cell.left - 1])
        } else {
            cells.push(row[this.maxLeft])
        }

        // get right cell in current row
        if(row[cell.left + 1]) {
            cells.push(row[cell.left + 1])
        } else {
            cells.push(row[0])
        }

        return cells;

    }

    /**
     * apply the game-rules to a cell
     *
     * @param neighbors
     * @param data The Data Object form our Vue Instance
     */
    applyRules(neighbors, data) {

        let cell = this;

        // we are using .reduce here because it's faster then .filter
        let countAlive = neighbors.reduce(function (n, cell) {
            return n + (cell.isAlive == ALIVE);
        }, 0);

        if( data.matchfieldLimited ) {
            if( cell.top == 0 || cell.top == data.maxTop || cell.left == 0 || cell.left == data.maxLeft ) {
                cell.isAlive = DEAD;
            }
        }

        // check alive count and choose a rule
        if( ! cell.isAlive ) { // cell is dead
            if( countAlive == 3 ) {
                cell.isAlive = ALIVE;
            }
        } else { // cell is alive
            if( countAlive < 2 ) {
                cell.isAlive = DEAD;
            } else if( countAlive == 2 || countAlive == 3 ) {
                cell.isAlive = ALIVE;
            } else if( countAlive > 3 ) {
                cell.isAlive = DEAD;
            } else {
                throw Error('don\t know what to do with cell ! ' + cell.id );
            }
        }

    }

    /**
     * @returns {String}
     */
    toString() {
        return this.isAlive;
    }

}