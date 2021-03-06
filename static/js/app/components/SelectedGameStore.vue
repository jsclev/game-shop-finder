<template>
    <div>
        <div class="selected-game-store-closed selected-game-store selected-game-store-select"
             v-show="selectedGameStore">
            <div class="info-header info-header-class">
                <div style="display: flex;justify-content: center;flex-direction: column;"
                     v-if="selectedGameStore">{{ selectedGameStore.business.name }}
                </div>
                <div class="icon up-icon-position up-down-icon up-down-closed"></div>

            </div>
            <button id="edit" v-if="selectedGameStore" @click="edit()">Edit</button>
            <a v-if="selectedGameStore"
               :href="'https://www.google.com/maps/place/' + selectedGameStore.address1 + ' ' + selectedGameStore.city + ' ' + selectedGameStore.stateCode + ' ' + selectedGameStore.zipCode"
               target="_blank" style="text-decoration: none">
                <div id="info-address" class="info-list-container tooltip">
                    <div id="place-info-icon" class="info-icon"></div>
                    <div v-if="selectedGameStore" class="info-text">
                        <span v-show="selectedGameStore.address1">{{ selectedGameStore.address1 }}<br/>{{ selectedGameStore.city }}, {{ selectedGameStore.stateCode }} {{ selectedGameStore.zipCode }}</span>
                        <span v-show="!selectedGameStore.address1">None</span>
                    </div>
                    <span class="tooltiptext">Google Maps</span>
                </div>
            </a>
            <div v-if="addressLastUpdated"
                 class="info-text last-verified">
                {{ addressLastUpdated }}
            </div>
            <a v-if="selectedGameStore" :href="'https://' + selectedGameStore.business.website"
               target="_blank" style="text-decoration: none">
                <div id="website" class="info-list-container tooltip">
                    <div id="website-icon" class="info-icon"></div>
                    <div id="website-text" class="info-text" v-if="selectedGameStore">
                        <span v-show="selectedGameStore.business.website">{{ selectedGameStore.business.website }}</span>
                        <span v-show="!selectedGameStore.business.website">None</span>
                    </div>
                    <span class="tooltiptext" style="margin-top: 27px;">Go to website</span>
                </div>
            </a>
            <div v-if="websiteLastUpdated"
                 class="info-text last-verified">
                {{ websiteLastUpdated }}
            </div>
            <a v-if="selectedGameStore" v-show="selectedGameStore.business.email"
               :href="'mailto:' + selectedGameStore.business.email" target="_blank">
                <div class="info-list-container tooltip">
                    <div class="info-icon email-icon"></div>
                    <div class="info-text" v-if="selectedGameStore">
                        {{ selectedGameStore.business.email }}
                    </div>
                    <span class="tooltiptext" style="margin-top: 27px;">Send email</span>
                </div>
            </a>
            <a v-if="selectedGameStore" v-show="!selectedGameStore.business.email">
                <div class="info-list-container">
                    <div class="info-icon email-icon"></div>
                    <div class="info-text" v-if="selectedGameStore">
                        None
                    </div>
                </div>
            </a>
            <div v-if="emailLastUpdated"
                 class="info-text last-verified">
                {{ emailLastUpdated }}
            </div>
            <div class="info-list-container tooltip">
                <div id="phone-icon" class="info-icon"></div>
                <div class="info-text" v-if="selectedGameStore">
                    <span v-if="formattedPhoneNumber">{{ formattedPhoneNumber }}</span>
                    <span v-else>None</span>
                </div>
                <span class="tooltiptext" style="margin-top: 27px;">Phone</span>
            </div>
            <div v-if="phoneLastUpdated"
                 class="info-text last-verified">
                {{ phoneLastUpdated }}
            </div>
        </div>
        <div v-show="!selectedGameStore"
             class="selected-game-store-closed selected-game-store selected-game-store-select"
             id="selected-game-store">
            <div class="info-header info-header-class">
                <div style="display: flex;justify-content: center;flex-direction: column;">Select a store
                </div>
                <div class="icon up-icon-position up-down-icon up-down-closed"></div>
            </div>
            <br/>
            <span style="font-size: 15px; color: #656565; margin-left: 3px">Select a store from the store list to see information</span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {ParseError, parsePhoneNumber} from 'libphonenumber-js'
    import store from '../store/index'

    export default {
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
            formattedPhoneNumber() {
                const gameStore = this.selectedGameStore;

                if (gameStore && gameStore.phone) {
                    try {
                        const phoneNumber = parsePhoneNumber(gameStore.phone, 'US');
                        return phoneNumber.formatNational();
                    } catch (error) {
                        if (error instanceof ParseError) {
                            // Not a phone number, non-existent country, etc.
                            console.log(error.message)
                        } else {
                            throw error
                        }
                    }

                    return gameStore.phone;
                }

                return null;
            },
            addressLastUpdated() {
                return this.getLastUpdatedDate('Address last verified', 1, 1);
            },
            emailLastUpdated() {
                return this.getLastUpdatedDate('Email last verified', 0, 2);
            },
            phoneLastUpdated() {
                return this.getLastUpdatedDate('Phone last verified', 1, 2);
            },
            websiteLastUpdated() {
                return this.getLastUpdatedDate('Website last verified', 0, 1);
            },
            selectedGameStore() {
                return store.state.selectedGameStore;
            },
        },
        methods: {
            edit() {
                store.dispatch('setIsEditingStore', true, {root: true})
            },
            getLastUpdatedDate(prefix, level, logItemType) {
                if (this.selectedGameStore) {
                    let logItems = [];
                    if (level === 0) {
                        logItems = this.selectedGameStore.business.logItems;
                    }
                    else if (level === 1) {
                        logItems = this.selectedGameStore.logItems;
                    }

                    if (logItems.length > 0) {
                        for (let logItem of logItems) {
                            if (logItem.logItemType === logItemType) {
                                let str = prefix + ' ';
                                str += moment(logItem.lastUpdated).format('MM/DD/YYYY');
                                str += ' by ' + logItem.user.username;

                                return str;
                            }
                        }
                    }
                }

                return null;
            }
        }
    }
</script>
