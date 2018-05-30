<template>
    <section class="modal" :class="{'is-active' : showModal}">
        <div class="modal-background" @click="showModal = false;"></div>
        <div class="modal-content">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <h2 class="title">Anleitung</h2>
                        <hr>
                        <h4>Spielstart</h4>
                        <p>Um ein Spiel zu starten gibt es mehrere Möglichkeiten:</p>
                        <ul>
                            <li>Auswählen einer vordefinierten oder zufälligen Startgeneration</li>
                            <li>Festlegen eines Prozentsatzes lebender Zellen (zufallsgeneriert)</li>
                            <li>
                                An- und abwählen oder "Zeichnen" der lebenden Zellen <br>
                                <cite>(Zellen im Spielfeld anklicken oder mit gedrückter Maustaste ein Muster malen)</cite>
                            </li>
                        </ul>

                        <h4>Steuerung</h4>
                        <p>
                            Man kann das Spiel schrittweise voranschreiten oder automatisch laufen lassen.<br>
                            Dazu kann man die Buttons unter dem Punkt "Steuerung" benutzen oder alternativ die Shortcuts <code>N</code> oder <code>Leertaste</code> benutzen
                        </p>

                        <h4>Erweiterte Optionen</h4>
                        <p>Diverse Funktionen um das Spiel anzupassen</p>
                    </div>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="showModal = false;"></button>
    </section>
</template>
<script>

    import { EventBus } from '../support/EventBus';

    export default{

        data () {
            return {
                showModal: false,
            }
        },

        /**
         * listen to events
         */
        mounted() {
            EventBus.$on('open-instruction-modal', () => {
                this.showModal = true;
            });
        }
    }

</script>