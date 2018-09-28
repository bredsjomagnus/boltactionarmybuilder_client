<template>
    <div>
        <admin-navbar></admin-navbar>
        <b-container fluid>
            <div class="header-wrapper">
                <h2 id="header">Admin Armies</h2>
                <b-btn size="sm" id="addarmybtn"  class="btn btn-default" to="addarmy">Add armygroup</b-btn>
            </div>
            <b-row>
                <b-col offset="2" cols="3">
                    <b-form-group horizontal label="Per page" class="mb-0">
                        <b-form-select :options="pageOptions" v-model="perPage" />
                    </b-form-group>
                </b-col>
                <b-col cols="5">
                    <b-form-group horizontal label="Filter" class="mb-0">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Type to Search" />
                            <b-input-group-append>
                            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                        </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col offset="5" md="5" class="my-1">
                <b-form-group horizontal label="Sort" class="mb-0">
                    <b-input-group>
                        <b-form-select v-model="sortBy" :options="sortOptions">
                            <option slot="first" :value="null">-- none --</option>
                        </b-form-select>
                        <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                            <option :value="false">Asc</option>
                            <option :value="true">Desc</option>
                        </b-form-select>
                    </b-input-group>
                </b-form-group>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col offset="1" cols="10">
                    <b-table 
                        responsive 
                        striped 
                        hover 
                        :items="getArmies"
                        :fields="fields"  
                        small
                        :current-page="currentPage" 
                        :per-page="perPage"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :sort-direction="sortDirection"
                        :filter="filter" 
                        :filter-by.sync="filterBy"
                        @filtered="onFiltered">
                         <template slot='copy' slot-scope="data">
                            <!-- <b-btn :to="`#${data.item.id}`"><font-awesome-icon icon="trash" /></b-btn> -->
                            <b-btn @click="copyArmyGroup(data.item._id)"><font-awesome-icon icon="copy" /></b-btn>
                        </template>
                        <template slot='edit' slot-scope="data">
                            <!-- <b-btn :to="`#${data.item.id}`"><font-awesome-icon icon="trash" /></b-btn> -->
                            <b-btn @click="editArmyGroup(data.item._id)"><font-awesome-icon icon="pencil-alt" /></b-btn>
                        </template>
                        <template slot='delete' slot-scope="data">
                            <!-- <b-btn :to="`#${data.item.id}`"><font-awesome-icon icon="trash" /></b-btn> -->
                            <b-btn @click="deleteArmyGroup(data.item._id, data.item.title)"><font-awesome-icon icon="trash" /></b-btn>
                        </template>
                        
                    <template slot="table-caption">
                        {{computedTotalRows}} registered army groups
                    </template>
                </b-table>
                </b-col>    
            </b-row> 
            <b-row>
                <b-col offset="4">
                    <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import AdminNavbar from './AdminNavbar.vue'
export default {
    data() {
            return {
                fields: [
            {
            key: "_id",
            label: "ID",
            sortable: true
            },
            {
            key: "nationality",
            label: "Nationality",
            sortable: true
            },
            {
                key: "title",
                label: "Title",
                sortable: true
            },
            {
            key: "category",
            label: "Category",
            sortable: true
            },
            {
            key: "type",
            label: "Type",
            sortable: true
            },
            {
            key: "experience",
            label: "Experience",
            sortable: true
            },
            {
            key: "cost",
            label: "Cost",
            sortable: true
            },
            {
                key: "options",
                label: "# Options",
                formatter: (value) => { return value.length }
            },
            {
                key: "special_rules",
                label: "# Special Rules",
                formatter: (value) => { return value.length }
            },
            {
                key: "copy",
                label: "Copy"
            },
            {
                key: "edit",
                label: "Edit"
            },
            {
                key: "delete",
                label: "Delete"
            }
        ],
        filterBy: 'type',
        currentPage: 1,
        perPage: 5,
        totalRows: this.computedTotalRows,
        pageOptions: [5, 10, 20],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        }
    },
    computed: {
        sortOptions () {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => { return { text: f.label, value: f.key } })
        },
        computedTotalRows() {
            return this.$store.getters.armies.length;
        },
        getArmies() {
            // console.log("armies: ", this.$store.getters.armies);
            return this.$store.getters.armies;
        }
    },
    components: {
        AdminNavbar
    },
    methods: {
        onFiltered (filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        deleteArmyGroup(id, title) {
            // console.log("Deleteing id: ", id)
            let yes = confirm("Delete " + title);
            if (yes) {
                this.$store.dispatch('deleteArmyGroup', id);
            }
        },
        editArmyGroup(id) {
            console.log('AdminArmies > editArmyGroup > id > ', id);
            this.$store.dispatch('getEditArmyGroupById', id)
                .then(() => {
                    this.$router.push({
                        path: '/editarmy'
                    });
                });
        },
        copyArmyGroup(id) {
            this.$store.dispatch('copyEditArmyGroup', id);
        }
    },
    mounted: async function() {
        await this.$store.dispatch("updateArmy");
    },
}
</script>

<style scope>
.header-wrapper {
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    padding: 20px;
}
#addarmybtn {
    border-radius: 0;
    background-color: #eeeeee;
    color: black;
    float: right;
}
#header{
    float: left;
}
</style>
