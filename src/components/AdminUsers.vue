<template>
    <div>
        <admin-navbar></admin-navbar>
        <b-container fluid>
            <h2>USERS</h2>
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
            <br>
            <b-row>
                <b-col offset="2" cols="8">
                    <b-table 
                        responsive 
                        striped 
                        hover 
                        :items="getUsers" 
                        :fields="fields" 
                        small 
                        :current-page="currentPage" 
                        :per-page="perPage" 
                        :filter="filter" 
                        @filtered="onFiltered">
                    <template slot='email' slot-scope="data">
                        <a id="emaillink" :to="`/edituser/${data.item.id}`">{{data.value}}</a>
                    </template>
                    <template slot="table-caption">
                        {{computedTotalRows}} registered user accounts
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
import AdminNavbar from "./AdminNavbar.vue";
export default {
  data() {
    return {
      fields: [
        {
          key: "first",
          label: "First Name",
          sortable: true
        },
        {
          key: "last",
          label: "Last Name",
          sortable: true
        },
        {
          key: "email",
          label: "Email address",
          sortable: true
        },
        {
          key: "active",
          sortable: true
        },
        {
          key: "created",
          sortable: true
        }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: this.computedTotalRows,
      pageOptions: [5, 10, 20],
      filter: null,
    };
  },
  computed: {
    computedTotalRows() {
      return this.$store.getters.users.length;
    },
    getUsers() {
      return this.$store.getters.users;
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
    }
  },
  mounted: async function() {
    await this.$store.dispatch("getUsers");
  }
};
</script>

<style scoped>
a#emaillink {
  color: #157fce;
  cursor: pointer;
}
</style>
