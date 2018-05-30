<script>

    import { cloneDeep } from 'lodash';
    import { Matchfield } from "../support/Matchfield";
    import { enableFullscreen, showFullscreenHint } from "../support/Helpers";
    import Renderer from '../support/Renderer';

    import { DEAD } from "../support/Cell";
    import { ALIVE } from "../support/Cell";

    var Cells = [];
    var Canvas;

    export default{

        /**
         * data object on our vue instance
         * two way data-binding is possible with these variables
         */
        data () {
            return {
                matchfield: [],
                rows: 350,
                cols: 350,
                livingCells: 50,
                animationFrame: null,
                matchfieldLimited: false,
                advancedOptions: false,
                generationCount: 0,
                showModal: false,
            }
        },

        /**
         * declare all methods for our Vue Component
         */
        methods: {
            /**
             * build a new playground
             */
            buildMatchfield: function () {

                for (let x = 0; x < this.rows; x++) {
                    Cells[x] = [];
                    for (var y = 0; y < this.cols; y++) {
                        Cells[x][y] = Math.random() < this.livingCells / 100;
                    }
                }

                // todo: cellSize
                Canvas = new Renderer(this.rows, this.cols, 2);

                Canvas.draw(Cells);

            },

            /**
             * calculate the next round (generation) of the game
             */
            nextRound: function() {

                // count how many generations survived
                this.generationCount++;

                let nextGeneration = new Array(this.cols);

                for (let x = 0; x < this.rows; x++) {
                    nextGeneration[x] = new Array(this.rows);
                    for (let y = 0; y < this.cols; y++) {
                        nextGeneration[x][y] = this.applyRules(x, y);
                    }
                }

                Canvas.draw(nextGeneration);

                Cells = nextGeneration;

            },

            applyRules(x, y) {

                var Cell = Cells[x][y];
                var livingNeighbors = this.getNumberOfAliveNeighbors(x, y);

                if (!Cell && livingNeighbors === 3) {
                    return true;
                } else if (Cell && (livingNeighbors > 3 || livingNeighbors < 2)) {
                    return false;
                } else {
                    return Cell;
                }

            },

            getNumberOfAliveNeighbors(x, y) {

                var aliveNeighbors = - (Cells[x][y]);

                for (var xN = -1; xN <= 1; xN++) {
                    for (var yN = -1; yN <= 1; yN++) {
                        if (Cells[x + xN] && Cells[x + xN][y + yN]) {
                            aliveNeighbors++;
                        }
                    }
                }

                return aliveNeighbors;

            },

            /**
             * controls: autoplay the game
             */
            play: function () {
                if( ! this.animationFrame ) {

                    var animate = () => {
                        this.nextRound();
                        this.animationFrame = requestAnimationFrame( animate );
                    }

                    this.animationFrame = requestAnimationFrame( animate );

                }
            },

            /**
             * controls: pause autoplay
             */
            pause: function () {
                if(this.animationFrame) {
                    window.cancelAnimationFrame(this.animationFrame);
                    this.animationFrame = null;
                }
            },

            autoplay: function () {
                if( ! this.animationFrame ) {
                    this.play();
                } else {
                    this.pause();
                }
            },

            /**
             * load a preset from a json file and assign it to our matchfield
             *
             * @param preset
             * @param limitMatchfield
             */
            loadPreset: function (preset, limitMatchfield) {

                if(this.advancedOptions && preset != 'random') {
                    return false;
                }

                // reset some values
                this.livingCells = 0;
                this.generationCount = 0;

                // pause the game and clear the matchfield
                this.pause();
                this.buildMatchfield();

                if(limitMatchfield) {
                    this.matchfieldLimited = true;
                }

                if( preset == 'random' ) {
                    // generate a random value from 0 to 100
                    this.livingCells = Math.random() * (100 - 0) + 0;
                } else {
                    // load the preset via axios
                    new Matchfield().loadPreset(preset, this.matchfield);
                }

            },

            /**
             * a simple reset for our game
             * pauses the execution, resets the counter, clears the matchfield
             */
            resetGame: function (resetLivingCells = true) {
                this.pause();

                this.generationCount = 0;

                if(resetLivingCells) {
                    this.livingCells = 0;
                }

                this.buildMatchfield();
            },

            /**
             * handle fullscreen enabling
             */
            launchFullscreen: function() {
                this.fullscreen = true;
                enableFullscreen();
            },

            /**
             * enables "drawing" on our matchfield to revive cells
             */
            drawPattern: function (event) {

                // checks if the user has pressed a mouse key
                if(event.which) {

                    // get data from cell
                    let left = event.target.dataset.left;
                    let top = event.target.dataset.top;

                    // revive cell
                    this.matchfield[top][left].isAlive = 1;

                }

            }

        },

        /**
         * watcher: when changing a value, execute some additional logic
         */
        watch: {
            rows: function (v) {
                this.rows = parseInt(v);
                this.resetGame(false);
            },
            cols: function (v) {
                this.cols = parseInt(v);
                this.resetGame(false);
            },
            livingCells: function (v) {
                this.livingCells = parseInt(v);
                this.resetGame(false);
            },
        },

        /**
         * our Component is mounted and ready
         * time to get the game started
         */
        mounted() {

            // initially build our matchfield
            this.buildMatchfield();

            // check for fullscreen mode and
            // show some information about fullscreen if not enabled
            if(! window.screenTop && ! window.screenY) {
//                showFullscreenHint(this.$snackbar, this.launchFullscreen);
            }

            // add keyboard event listener
            window.onkeyup = e => {
                let key = e.keyCode ? e.keyCode : e.which;

                if (key == 32) {
                    if( this.animationFrame ) {
                        this.pause();
                    } else {
                        this.play();
                    }
                } else if (key == 78) {
                    this.pause();
                    this.nextRound();
                }
            }

        }
    }

</script>