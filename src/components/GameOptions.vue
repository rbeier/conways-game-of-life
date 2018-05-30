<template>
    <div>

        <div id="option-header" class="is-clearfix is-flex">
            <h4 class="title is-marginless">Optionen</h4>

            <div class="spacer is-flex"></div>

            <label class="checkbox">
                Erweitert
                <input type="checkbox" v-model="advancedOptions">
            </label>
        </div>

        <section v-show="advancedOptions">

            <label for="matchfield-limited">
                <input type="checkbox" id="matchfield-limited" name="matchfieldLimited" @input="changeOption($event)">
                Spielfeld begrenzt <small> (Zellen sterben am Rand)</small>
            </label>

            <div class="columns is-vcentered">
                <div class="column is-4">
                    <label class="label">Spalten</label>
                </div>
                <div class="column">
                    <input class="input" type="number" min="3" step="1" name="cols" v-model="cols" @input="changeOption($event)">
                </div>
            </div>

            <div class="columns is-vcentered">
                <div class="column is-4">
                    <label class="label">Zeilen</label>
                </div>
                <div class="column">
                    <input class="input" type="number" min="3" step="1" name="rows" v-model="rows" @input="changeOption($event)">
                </div>
            </div>

            <div class="columns is-vcentered">
                <div class="column is-4">
                    <label class="label">Zellenbreite</label>
                </div>
                <div class="column is-flex">
                    <input id="width" class="slider is-fullwidth has-output" type="range" name="width"
                           min="5" max="90" step="0.5" v-model="width" @input="changeOption($event)">
                    <output for="width">{{ width }}</output>
                </div>
            </div>

            <div class="columns is-vcentered">
                <div class="column is-4">
                    <label class="label">Zellenhöhe</label>
                </div>
                <div class="column is-flex">
                    <input id="height" class="slider is-fullwidth has-output" type="range" name="height"
                           min="5" max="90" step="0.5" v-model="height" @input="changeOption($event)">
                    <output for="height">{{ height }}</output>
                </div>
            </div>

        </section>

        <div class="columns is-vcentered">
            <div class="column is-4">
                <label class="label">lebendige Zellen</label>
            </div>
            <div class="column">
                <p class="control has-icons-right">
                    <input class="input" type="number" min="0" max="100" step="1" name="livingCells" v-model="livingCells" @input="changeOption($event)">
                    <span class="icon is-small is-right">%</span>
                </p>
            </div>
        </div>

    </div>
</template>

<script>

    import { EventBus } from '../support/EventBus';

    export default{

        data () {
            return {
                width: 11,
                height: 11,
                rows: 65,
                cols: 80,
                livingCells: 0,
                advancedOptions: false
            }
        },

        methods: {
            changeOption(event) {
                this.emitEvent(event.target.name, event.target.value);
            },

            emitEvent(name, value) {
                EventBus.$emit('change-option', {
                    name : name,
                    value: value
                })
            }
        },

        /**
         * listen to events
         */
        mounted() {
            // initially communicate all options to game
            Object.entries(this.$data).forEach(item => {
                this.emitEvent(item[0], item[1]);
            })
        },
    }

</script>