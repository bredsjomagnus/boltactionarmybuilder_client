<template>
    <div>
        <admin-navbar></admin-navbar>
        <b-container fluid>
            <div class="header-wrapper">
                <h2 id="header">Admin Armies</h2>
                <b-btn size="sm" id="addarmybtn"  class="btn btn-default" to="addarmy">Add armygroup</b-btn>
            </div> 
            <b-row>
                <b-col offset="1" cols="10">
                    <b-table 
                        responsive 
                        striped 
                        hover 
                        :items="getArmies"
                        :fields="fields"  
                        small>
                        <template slot='edit' slot-scope="data">
                            <!-- <b-btn :to="`#${data.item.id}`"><font-awesome-icon icon="trash" /></b-btn> -->
                            <b-btn @click="editArmyGroup(data.item.id)"><font-awesome-icon icon="pencil-alt" /></b-btn>
                        </template>
                        <template slot='delete' slot-scope="data">
                            <!-- <b-btn :to="`#${data.item.id}`"><font-awesome-icon icon="trash" /></b-btn> -->
                            <b-btn @click="deleteArmyGroup(data.item.id, data.item.title)"><font-awesome-icon icon="trash" /></b-btn>
                        </template>
                        
                    <template slot="table-caption">
                        All registered armies
                    </template>
                </b-table>
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
          key: "id",
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
            label: "Title"
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
            // formatter: (value) => {
            //     let txt = '';
            //     value.forEach(opt => {
            //         txt += opt.description + " ";
            //     });
            //     return txt 
            // }
        },
        {
            key: "special_rules",
            label: "# Special Rules",
            formatter: (value) => { return value.length }
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
        }
    },
    computed: {
        getArmies() {
            // console.log("armies: ", this.$store.getters.armies);
            return this.$store.getters.armies;
        }
    },
    components: {
        AdminNavbar
    },
    methods: {
        deleteArmyGroup(id, title) {
            // console.log("Deleteing id: ", id)
            let yes = confirm("Delete " + title);
            if (yes) {
                this.$store.dispatch('deleteArmyGroup', id);
            }
        },
        editArmyGroup(id) {
            this.$store.dispatch('armyById', id);
            this.$router.push({
                path: '/editarmy'
            })
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
