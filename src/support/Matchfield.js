import axios from 'axios';

import {Cell} from "./Cell";

import { DEAD } from "../support/Cell";
import { ALIVE } from "../support/Cell";

/**
 * Handle logic for our matchfield, such as the initial build process and preset imports
 */
export class Matchfield {

    constructor() {}

    /**
     * build the matchfield
     * creates a two-dimensional array of Cell Objects
     *
     * @param cols
     * @param rows
     * @param livingCells
     * @returns {Array}
     */
    build(cols, rows, livingCells) {

        let i = 1;
        let rowsArray = [];
        let colsArray = [];
        let isAlive = 1;

        for (let r = 0; r < rows; r++) {

            for (let c = 0; c < cols; c++) {

                // cell death or alive?
                isAlive = Math.random() < livingCells / 100 ? ALIVE : DEAD;

                colsArray.push(
                    new Cell(i++, isAlive, c, r)
                );

            }

            rowsArray.push(colsArray);

            colsArray = [];

        }

        return rowsArray;

    }

    /**
     * load a specific preset from a json file and assign it to our matchfield
     *
     * @param preset
     * @param matchfield
     */
    loadPreset(preset, matchfield) {

        axios.get('/static/presets/' + preset + '.json')
            .then(response => {
                response.data.forEach(row => {
                    row.forEach(cell => {
                        matchfield[cell.top][cell.left].isAlive = cell.isAlive;
                    })
                })
            })
            .catch( error => {
                console.error(error);
            });

    }

}