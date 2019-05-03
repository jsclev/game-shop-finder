import store from '../store/index.js?v=0.0.4'

Vue.component('SelectedGameStore', {
    store,
    template: `
        <div>
            <div id="selected-game-store" 
                 class="selected-game-store-closed selected-game-store selected-game-store-select"
                 v-show="selectedGameStore">
                <div id="info-header" class="info-header-class">
                    <div style="display: flex;justify-content: center;flex-direction: column;" v-if="selectedGameStore">{{ selectedGameStore.business.name }}</div>
                    <div class="icon up-icon-position up-down-icon up-down-closed"></div>

                </div>
                <a v-if="selectedGameStore" :href="'https://www.google.com/maps/place/' + selectedGameStore.street1 + ' ' + selectedGameStore.city + ' ' + selectedGameStore.stateCode + ' ' + selectedGameStore.zipCode" target="_blank" style="text-decoration: none">
                    <div id="info-address" class="info-list-container tooltip">
                        <div id="place-info-icon" class="info-icon"></div>
                        <div v-if="selectedGameStore" class="info-text">
                            <span v-show="selectedGameStore.street1">{{ selectedGameStore.street1 }}<br/>{{ selectedGameStore.city }}, {{ selectedGameStore.stateCode }} {{ selectedGameStore.zipCode }}</span>
                            <span v-show="!selectedGameStore.street1">None</span>
                        </div>
                        <span class="tooltiptext">Google Maps</span>
                    </div>
                </a>
                <a v-if="selectedGameStore" :href="'https://' + selectedGameStore.business.website" target="_blank" style="text-decoration: none">
                    <div id="website" class="info-list-container tooltip">
                        <div id="website-icon" class="info-icon"></div> 
                        <div id="website-text" class="info-text" v-if="selectedGameStore">
                            <span v-show="selectedGameStore.business.website">{{ selectedGameStore.business.website }}</span>
                            <span v-show="!selectedGameStore.business.website">None</span>
                        </div>
                        <span class="tooltiptext" style="margin-top: 27px;">Go to website</span>
                    </div>
                </a>
                <a v-if="selectedGameStore" v-show="selectedGameStore.business.email" :href="'mailto:' + selectedGameStore.business.email" target="_blank">
                    <div class="info-list-container tooltip">
                        <div id="email-icon" class="info-icon"></div>
                        <div class="info-text" v-if="selectedGameStore">
                            {{ selectedGameStore.business.email }}
                        </div>
                        <span class="tooltiptext" style="margin-top: 27px;">Send email</span>
                    </div>
                </a>
                <a v-if="selectedGameStore" v-show="!selectedGameStore.business.email">
                    <div class="info-list-container">
                        <div id="email-icon" class="info-icon"></div>
                        <div class="info-text" v-if="selectedGameStore">
                            None
                        </div>
                    </div>
                </a>
                <div class="info-list-container tooltip">
                    <div id="phone-icon" class="info-icon"></div>
                    <div class="info-text" v-if="selectedGameStore">
                        <span v-show="selectedGameStore.phone">{{ selectedGameStore.phone }}</span>
                        <span v-show="!selectedGameStore.phone">None</span>
                    </div>
                    <span class="tooltiptext" style="margin-top: 27px;">Phone</span>
                </div>
            </div>
            <div v-show="!selectedGameStore" class="selected-game-store-closed selected-game-store selected-game-store-select" id="selected-game-store">
                <div id="info-header" class="info-header-class">
                    <div style="display: flex;justify-content: center;flex-direction: column;">Select a store</div>
                    <div class="icon up-icon-position up-down-icon up-down-closed"></div>
                </div>
                <br/>
                <span style="font-size: 15px; color: #656565; margin-left: 3px">Select a store from the store list to see information</span>
            </div>
        </div>`,
    mounted: function () {
        $('.info-header-class').click(function () {
            if ($('.selected-game-store').hasClass('selected-game-store-closed')) {
                $('.selected-game-store').removeClass('selected-game-store-closed');
                $('.up-down-icon').removeClass('up-icon-position up-down-closed');
            } else {
                $('.selected-game-store').addClass('selected-game-store-closed');
                $('.up-down-icon').addClass('up-icon-position up-down-closed');
            }
        });

    },
    computed: {
        selectedGameStore() {

            return store.state.selectedGameStore;
        },
    },
});
