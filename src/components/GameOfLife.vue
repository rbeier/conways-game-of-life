<script>

    import { cloneDeep } from 'lodash';
    import { EventBus } from '../support/EventBus';
    import { Matchfield } from "../support/Matchfield";
    import { bindKeyboardEventListener } from "../support/Helpers";

    import { DEAD } from "../support/Cell";
    import { ALIVE } from "../support/Cell";

    import GameOptions from './GameOptions';
    import GameControls from './GameControls';

    export default{

        /**
         * data object on our vue instance
         * two way data-binding is possible with these variables
         */
        data () {
            return {
                matchfield: [],
                rows: 65,
                cols: 80,
                livingCells: 0,
                maxLeft: 0,
                maxTop: 0,
                timer: null,
                matchfieldLimited: false,
                advancedOptions: false,
                generationCount: 0,
                width: 11,
                height: 11,
            }
        },

        /**
         * declare all methods for our Vue Component
         */
        methods: {
            /**
             * call the Matchfield class and assign some initial values
             */
            buildMatchfield: function () {

                this.matchfield = new Matchfield().build(this.cols, this.rows, this.livingCells);

                this.maxLeft    = this.cols - 1;
                this.maxTop     = this.rows - 1;

                this.matchfieldLimited = false;

            },

            /**
             * "calculate" the next round (generation) of the game
             */
            nextRound: function() {

                // count how many generations survived
                this.generationCount++;

                // to calculate correct generations, we need to make a read-only copy of our matchfield
                // so that the rules are applied at the same time and not instantly.
                let neighbors = [];
                let clone     = cloneDeep(this.matchfield);

                // iterate over our matchfield
                this.matchfield.forEach(row => {
                    // iterate over each row
                    row.forEach(cell => {
                        // get neighbours for each cell
                        neighbors = cell.getNeighbors(clone, this.maxLeft, this.maxTop);

                        // apply our ruleset to a cell
                        cell.applyRules(neighbors, this._data);
                    })
                })

            },

            /**
             * send a pause event to GameControls
             */
            pauseGame() {
                EventBus.$emit('pause-game');
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

//                this.resetGame();

                // reset some values
                this.livingCells = 0;
                this.generationCount = 0;

                // pause the game and clear the matchfield
                this.resetGame();
                this.buildMatchfield();

                if(limitMatchfield) {
                    this.matchfieldLimited = true;
                }

                if( preset == 'random' ) {
                    // generate a random value from 0 to 100
                    this.livingCells = Math.random() * (100 - 0);
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
                this.pauseGame();

                this.generationCount = 0;

                if(resetLivingCells) {
                    this.livingCells = 0;
                }

                this.buildMatchfield();
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

            },

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

            // add keyboard event listener
            bindKeyboardEventListener();

            // EventBus-Listener
            EventBus.$on('change-option', (payload) => {
                this[payload.name] = payload.value
            });

            EventBus.$on('next-round', this.nextRound);
            EventBus.$on('reset-game', this.resetGame);

        },

        components: {
            GameOptions, GameControls
        }
    }

</script>