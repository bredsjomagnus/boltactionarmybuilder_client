<template>
    <div class="armygroup-wrapper">
        <div class="armygroup-header">
            <b-row class="mb-1">
                <b-col cols="4">
                    <div class='categoryinfo'>
                        <i>{{armygroup.category}} - {{armygroup.type}}</i>
                    </div>
                </b-col>
                <b-col cols ="4" offset="1">
                    <div class="costinfo">
                        <span>{{armygroup.experience}}</span> 
                    </div>
                </b-col>
                <b-col>
                    <div class="rightchevron">
                        <b-btn class="addarmygroup-btn" @click="addArmyGroup">{{armygroup.cost}}pts <font-awesome-icon icon="chevron-right" /></b-btn>
                    </div>
                </b-col>
            </b-row>
            
            
            
        </div>
        <center>
            <h5>{{armygroup.title}} </h5>
        </center>
        <b-collapse :id="collapsedid" class="mt-2">
            <b-card>
            <table>
                <tr>
                    <td class='gray-cell'>Composition</td>
                    <td>{{armygroup.composition.description}}</td>
                </tr>
                <tr>
                    <td class="rowdivider-white"></td>
                    <td class="rowdivider-gray"></td>
                </tr>
                <tr>
                    <td class='gray-cell'>Weapons</td>
                    <td>{{armygroup.weapons}}</td>
                </tr>
                <tr v-if="armygroup.options.length > 0">
                    <td class="rowdivider-white"></td>
                    <td class="rowdivider-gray"></td>
                </tr>
                <tr v-if="armygroup.options.length > 0">
                    <td class='gray-cell'>Options</td>
                    <td>
                        <ul>
                            <li
                            v-for="opt in armygroup.options"
                            :key="opt.description">
                                {{opt.description}}
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="armygroup.special_rules.length > 0">
                    <td class="rowdivider-white"></td>
                    <td class="rowdivider-gray"></td>
                </tr>
                 <tr v-if="armygroup.special_rules.length > 0">
                    <td class='gray-cell'>Special Rules</td>
                    <td>
                        <ul>
                            <li
                            v-for="rule in armygroup.special_rules"
                            :key="rule.rule">
                                {{rule.rule}}
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
            
            </b-card>
        </b-collapse>
        <b-btn class="toggle-btn" @click="toggleIcon" v-b-toggle="collapsedid" variant="primary">
            <font-awesome-icon v-if="up" icon="chevron-down" />
            <font-awesome-icon v-if="!up" icon="chevron-up" />
        </b-btn>
    </div>
</template>

<script>
export default {
    props: {
        armygroup: Object
    },
    data() {
        return {
            up: true
        }
    },
    computed: {
        collapsedid() {
            return "collapse" + this.armygroup._id;
        }
    },
    methods: {
        toggleIcon() {
            this.up = !this.up;
        },
        addArmyGroup() {
            this.$store.dispatch('addToChosenArmy', this.armygroup._id);
            // console.log("Add ArmyGroup > id > ", this.armygroup._id);
        }
    }
}
</script>

<style scoped>
.toggle-btn{
    border-radius: 0;
    width: 100%;
    height: 25px;
    padding: 0;
    /* background-color: #788978; */
    background-color: #465866;
    border: 1px solid black;
}
.armygroup-wrapper {
    padding: 2px;
    display: inline-block;
    border: 1px solid black;
    width: 100%;
    font-size: 0.8em;
    background-color: #484848;
    color: white;
    margin-bottom: 5px;
}
.card-body {
    color: black;
    padding: 2px;
}
 td {
    height: 30px;
    vertical-align: top;
    padding: 5px;
}
.gray-cell {
    background-color: #b7b7b7;
    width: 90px;
}
.rowdivider-white {
    height: 1px;
    padding: 0;
    /* border-bottom: 1px solid lightgray; */
}
.rowdivider-gray {
    height: 1px;
    padding: 0;
    border-bottom: 1px solid lightgray;
}
.categoryinfo {
    /* display: inline-block; */
    /* border: 1px solid green; */
    /* float: left; */
}
.costinfo{
    /* display: inline-block; */
    /* border: 1px solid pink; */
    float: right;    
    /* height: 10px; */
}
.rightchevron {
    /* display: inline-block; */
    /* width: 100px; */
    /* float: right; */
    /* border: 1px solid black; */
}
.armygroup-header{
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid gray;
}
.addarmygroup-btn{
    border-radius: 0;
    width: 70px;
    padding: 0;
    
    background-color: #6eab7c;
    border: 1px solid black;
}
</style>
