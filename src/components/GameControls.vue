<template>
    <div>
        <h3 class="title">
            Steuerung

            <button type="button" @click="resetGame()" class="button is-warning is-small restart-game">
                <i class="material-icons">clear</i>
                Spielfeld leeren
            </button>
        </h3>

        <div class="columns controls">
            <div class="column is-7">
                <a class="button is-primary is-fullwidth is-medium" @click="nextRound">
                    <i class="material-icons">skip_next</i>
                    Nächste Runde
                </a>
                <legend class="keyboard-shortcut">
                    Shortcut:
                    <span class="tag is-light">N</span>
                </legend>
            </div>
            <div class="column">
                <a class="button is-dark is-fullwidth is-medium autoplay" @click="autoplay()">
                    <span v-if="! timer">
                        <i class="material-icons">play_arrow</i>
                    </span>
                    <span v-else>
                        <i class="material-icons">pause</i>
                    </span>
                </a>
                <legend class="keyboard-shortcut">
                    Shortcut:
                    <span class="tag is-light">Leertaste</span>
                </legend>
            </div>
        </div>
    </div>
</template>

<script>

    import { EventBus } from '../support/EventBus';

    export default{

        data () {
            return {
                timer: null,
            }
        },

        methods: {
            resetGame() {
                EventBus.$emit('reset-game');
            },

            nextRound() {
                this.pause();
                this.emitEvent();
            },

            autoplay: function () {
                if( ! this.timer ) {
                    this.play();
                } else {
                    this.pause();
                }
            },

            play: function () {
                if( ! this.timer ) {
                    this.timer = setInterval(() => {
                        this.emitEvent();
                    }, 0);
                }
            },

            pause: function () {
                if(this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },

            emitEvent() {
                EventBus.$emit('next-round');
            }
        },

        mounted() {
            EventBus.$on('pause-game', this.pause);
        }

    }

</script>