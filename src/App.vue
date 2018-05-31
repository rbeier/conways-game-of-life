<!-- HTML Markup for our game -->
<template>
    <div id="app" class="container">
        <header class="columns">
            <div class="column is-8">
                <h1 class="title">Conway's Game of Life</h1>
                <h2 class="subtitle">Eine Vue.js Implementierung</h2>
            </div>
            <div class="column">
                <button type="button" class="button is-info is-pulled-right manual" @click="openInstructionModal">
                    <i class="material-icons ">info_outline</i>&nbsp;
                    Anleitung
                </button>
            </div>
        </header>

        <hr>

        <!-- call game of life component -->
        <game-of-life class="row" inline-template>
            <div>

                <section class="columns">
                    <div class="column is-4">

                        <game-options></game-options>

                        <hr>

                        <game-controls></game-controls>

                        <hr>

                        <h4 class="title">Startgeneration</h4>

                        <a class="load-preset button" @click="loadPreset('random')">Zufällig</a>

                        <span v-if="! this.advancedOptions">
                            <a class="load-preset button" @click="loadPreset('still-life')">still-life</a>
                            <a class="load-preset button" @click="loadPreset('54-dead')">in 54 generations dead</a>
                            <a class="load-preset button" @click="loadPreset('gosper-glider-gun', true)">Gosper glider gun</a>
                            <a class="load-preset button" @click="loadPreset('r-pentomino', true)">r-Pentomino</a>
                            <a class="load-preset button" @click="loadPreset('exploder')">Exploder</a>
                            <a class="load-preset button" @click="loadPreset('10-cell-row')">10 Cell Row</a>
                            <a class="load-preset button" @click="loadPreset('tumbler')">Tumbler</a>
                            <a class="load-preset button" @click="loadPreset('pulsar')">Pulsar</a>
                            <a class="load-preset button" @click="loadPreset('spaceships')">Spaceships</a>
                        </span>

                    </div>
                    <div class="column">
                        <h3 class="title">
                            Spielfeld
                            <div class="generation-count">
                                <span v-text="generationCount"></span>.
                                Generation
                            </div>
                        </h3>
                        <div id="matchfield">
                            <table>
                                <tr v-for="row in this.matchfield">
                                    <td v-for="cell in row"
                                        :data-top="cell.top"
                                        :data-left="cell.left"
                                        :class="cell.isAlive ? 'alive' : ''"
                                        :style="{'width' : width + 'px', 'height' : height + 'px'}"
                                        @click="cell.isAlive = + ! cell.isAlive"
                                        @mouseover="drawPattern($event)">
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </game-of-life>

        <instruction-modal></instruction-modal>

        <!-- fullscreen hint -->
        <div id="fullscreen-hint" class="notification is-dark is-size-6 is-clearfix" :class="{'is-active' : ! this.isFullscreen}">
            Tipp: Mit Vollbild ist alles besser!
            <button class="button is-info is-small is-pulled-right" @click="toggleFullscreen">Aktivieren</button>
        </div>

    </div>
</template>

<!-- register game-of-life Component -->
<script>

    import { EventBus } from './support/EventBus';
    import { enableFullscreen } from "./support/Helpers";

    import GameOfLife from './components/GameOfLife'
    import InstructionModal from './components/InstructionModal';

    export default {

        name: 'app',

        data () {
            return {
                isFullscreen: false
            }
        },

        methods: {
            openInstructionModal() {
                EventBus.$emit('open-instruction-modal');
            },

            toggleFullscreen() {
                enableFullscreen();
                this.isFullscreen = true;
            }
        },

        mounted() {
            setTimeout(() =>  {
                this.isFullscreen = true;
            }, 5000);
        },

        components: { GameOfLife, InstructionModal },

    }
</script>

<!-- include our stylesheets -->
<style lang="scss">

    // google icon font
    @import '../node_modules/material-design-icons/iconfont/material-icons.css';

    // bulma.css
    @import '../node_modules/bulma/bulma';

    // slider component
    @import "../node_modules/bulma-slider/slider";

    // custom stylesheet
    @import 'assets/app';

</style>