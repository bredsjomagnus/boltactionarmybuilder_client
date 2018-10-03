<template>
    <div>
    <navbar></navbar>
    <b-row>
        <b-col>
            <h1>{{ nation.toUpperCase() }}</h1>
        </b-col>
        
    </b-row>
        <b-row>

            
                <b-col>
                    <div class="build-wrapper">
                        <div class="army-wrapper">
                            <div class="armygroups-wrapper">
                                <nation-army-list
                                    v-for="armygroup in nationarmy"
                                    :key=armygroup._id
                                    :armygroup=armygroup
                                    >
                                    </nation-army-list>
                            </div>
                            <div class="divider"></div>
                            <div class="choosenarmygroups-wrapper">
                                <army-group
                                    v-for="armygroup in chosenarmy"
                                    :key=armygroup.key
                                    :armygroup=armygroup
                                    :reportBack=reportBack>
                                </army-group>
                            </div>
                        </div> 
                    </div>
                </b-col>
                    
                
            <b-col>
                <table class="table">
                    <tr>
                        <td>Cost</td>
                        <td>{{chosenarmycost}}pts</td>
                    </tr>
                </table>
            </b-col>
        </b-row>
</div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidemenu from "./Sidemenu.vue";
import ArmyGroup from "./ArmyGroup.vue";
import NationArmyList from "./NationArmyList";

export default {
    data() {
        return {
            armygroupkeys: []
        }
    },
    computed: {
        nation() {
            return this.$route.query.nation;
        },
        nationarmy() {
            // console.log("ArmyBuilder > this.$store.getters.nationarmy >\n", this.$store.getters.nationarmy)
            return this.$store.getters.nationarmy;
        },
        chosenarmy() {
            return this.$store.getters.chosenarmy;
        },
        chosenarmycost() {
            return this.$store.getters.chosenarmycost;
        },
        chosenarmylength() {
            return this.$store.getters.chosenarmy.length;
            
        },
        
     },
    components: {
                Navbar,
                Sidemenu,
                ArmyGroup,
                NationArmyList
    },
    methods: {
        keyid() {
            let key = 0;
            key = Math.floor(Math.random() * 100000000);
            // console.log("this.armygroupkeys.includes(key) ", this.armygroupkeys.includes(key))
            while (this.armygroupkeys.includes(key)) {
                key = Math.floor(Math.random() * 100000000);
            }
            this.armygroupkeys.push(key);
            // console.log("armygroupkeys: ", this.armygroupkeys);
            return key;
        },
        getAGKey(id) {
            return id + this.chosenarmylength;
        },
        reportBack(data) {
            console.log("parentCallback > data > ", data);
        }
    },
    mounted() {
        this.$store.dispatch('nationArmy', this.nation);
    }
}
</script>

<style scoped>
.build-wrapper {
    width: 100%;
    height: 700px;
    display: block;
    
}
.army-wrapper {
    display: block;
    width: 1500px;
    height: 700px;
    margin-left: 150px;
    padding: 20px 20px 20px 20px;
    background-color: #d1d1d1;
    border-top: 3px solid orange;
}
.armygroups-wrapper {
    overflow-y: scroll;
    display: block;
    height: 650px;
    padding: 5px;
    background-color: #d8d8d8;
    width: 30%;
    float: left;
    border: 1px solid #5f5f5f;
}
.choosenarmygroups-wrapper {
    display: inline-block;
    height: 650px;
    padding: 10px;
    background-color: #c2c2c2;
    width: 68%;
    margin-left: 2%;
    border: 1px solid #5f5f5f;
}
</style>
