<template>
    <b-navbar id='navbar' toggleable="md" type="light">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/home">BABuilder</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
            <b-nav-item 
              v-for="tab in navtabs"
              :key=tab.label
              :to=tab.ref
              exact
            >
              {{tab.label}}
            </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

        <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->

        <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
            <font-awesome-icon icon="user" />
            <em> {{ userName }}</em>
            </template>
            <b-dropdown-item to='/admin' v-if="isAdmin">
              <font-awesome-icon icon="toolbox" />
              Admin
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <font-awesome-icon icon="address-book" />
              Profile
            </b-dropdown-item>
            <b-dropdown-item @click="logOutUser">
              <font-awesome-icon icon="sign-out-alt" />
              Signout
              </b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>

    </b-collapse>
    </b-navbar>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  data() {
    return {
      navtabs: [{ label: "Hem", ref: "/" }, { label: "Armé", ref: "/army" }],
    };
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    isAdmin() {
      return this.$store.getters.userRole === 'admin';
    }
  },
  methods: {
    logOutUser() {
      this.$store.dispatch("logOutUser").then(() => {
        console.log("utloggad");
        this.$router.push({ path: "/login" });
      });
    }
  }
};
</script>

<style scoped>
#navbar {
  background-color: #eeeeee;
  height: 75px;
}
.active {
  /* background-color: #a4aca8; */
  border-bottom: 3px solid #c22;
}
li.nav-item {
  background-color: #e2e1e1;
  height: 44px;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: 5px;
  color: white;
}
li.nav-item:hover {
  background-color: #d8d7d7;
}


</style>
