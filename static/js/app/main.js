import Vue from 'vue'
import EditStoreForm from './components/EditStoreForm.vue'
import Filters from './components/Filters.vue'
import MapContainer from './components/Map.vue'
import Menu from './components/Menu.vue'
import SearchBox from './components/SearchBox.vue'
import SelectedGameStore from './components/SelectedGameStore.vue'
import StoreList from './components/StoreList.vue'

new Vue({
    el: '#app',
    components: {
        EditStoreForm,
        Filters,
        MapContainer,
        Menu,
        SearchBox,
        SelectedGameStore,
        StoreList
    },
    template: `
        <div>
            <div id="menu-dim"></div>
            <div id="main-panel">
                <Filters></Filters>
                <div id="filter-dim"></div>
                <StoreList><SearchBox></SearchBox></StoreList>
                <MapContainer></MapContainer>
                <SelectedGameStore></SelectedGameStore>
            </div>
            <Menu></Menu>
            <EditStoreForm></EditStoreForm>
        </div>`
});
