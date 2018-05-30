export default class {

    constructor(rows, cols, cellSize) {

        // get the canvas via ID and define the 2D context
        let canvas  = document.querySelector('canvas');
        this.ctx    = canvas.getContext('2d', { alpha: false });
        this.ctx.translate(0.5, 0.5)

         this.cellSize = cellSize;

        this.rows     = rows;
        this.cols     = cols;
        // this.cellSize = cellSize;

        // calculate the width and height from the
        // number of cols/rows * the cellSize
        this.width    = cols * cellSize;
        this.height   = rows * cellSize;

        // todo: scaling (blurry canvas)
        var devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                this.ctx.mozBackingStorePixelRatio ||
                this.ctx.msBackingStorePixelRatio ||
                this.ctx.oBackingStorePixelRatio ||
                this.ctx.backingStorePixelRatio || 1,
            ratio = devicePixelRatio / backingStoreRatio;

        if( devicePixelRatio !== backingStoreRatio ) {

            this.width    = this.width * ratio;
            this.height   = this.height * ratio;

            this.ctx.scale(ratio, ratio);

        }

        // set width and height on the canvas
        canvas.width = this.width;
        canvas.height = this.height;

    }

    draw(Cells) {

        // clear the entire canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // fill the canvas again with cells
        for (var x = 0; x < this.rows; x++) {
            for (var y = 0; y < this.cols; y++) {
                if (Cells[x][y]) {
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }

    }

}