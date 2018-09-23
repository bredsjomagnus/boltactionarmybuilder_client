<template>
    <div>
        <admin-navbar></admin-navbar>
        
        <b-container>
            <b-row>
                <b-col class="mt-4">
                    <h2>EDIT ARMY</h2>
                </b-col>
            </b-row>
            
            <b-card title="ARMY"
                sub-title="Add armygroup">

                <b-form>
                    <b-row class="mt-1">
                        <b-col class="text-center">
                            <h4>Nationality</h4>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1">
                        <b-col>
                            <b-form-group id="nationality"
                                            label="Nationality:"
                                            label-for="nationalityinput">
                                <b-form-select id="nationalityinput"
                                            type="select"
                                            v-model="selectednationality"
                                            :options="nationalities"
                                            required>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col class="text-center">
                            <h4>Description</h4>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1">
                        <b-col>
                            <b-form-group id="title"
                                            label="Title:"
                                            label-for="titleinput">
                                <b-form-input id="titleinput"
                                            type="text"
                                            v-model="title"
                                            placeholder="Title..."
                                            required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1">
                         <b-col>
                            <b-form-group id="category"
                                            label="Category:"
                                            label-for="categoryinput">
                                <b-form-select id="categoryinput"
                                            type="select"
                                            v-model="selectedcategory"
                                            :options="categories"
                                            required>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group id="type"
                                            label="Type:"
                                            label-for="typeinput">
                                <b-form-select id="typeinput"
                                            type="select"
                                            v-model="selectedtype"
                                            :options="types"
                                            required>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1">
                        <b-col>
                            <b-form-group id="description"
                                            label="Description:"
                                            label-for="descriptionarea">
                                <b-form-textarea id="descriptionarea"
                                    v-model="description"
                                    placeholder="Description..."
                                    :rows="3"
                                    :max-rows="6">
                                </b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1">
                        <b-col>
                            <b-form-group id="experience"
                                            label="Experience:"
                                            label-for="experienceinput">
                                <b-form-select id="experienceinput"
                                    v-model="selectedexperience"
                                    :options="experiences"
                                    required>
                                    
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group id="cost"
                                            label="Cost:"
                                            label-for="costinput">
                                <b-form-input id="costinput"
                                    v-model="cost"
                                    type="number"
                                    required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3" v-if="needsComposition">
                        <b-col class="text-center">
                            <h4>Composition</h4>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1">
                        <b-col>
                            <b-form-group id="compositiondescription"
                                            label="Description"
                                            label-for="compositiondescriptioninput"
                                            v-if="needsComposition">
                                <b-form-input id="compositiondescriptioninput"
                                        v-if="needsComposition"
                                        v-model="compositionDescription"
                                        type="text"
                                        required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group id="compositionsize"
                                            label="Size"
                                            label-for="compositionsizeinput"
                                            v-if="needsComposition">
                                <b-form-input id="compositionsizeinput"
                                        v-if="needsComposition"
                                        v-model="compositionSize"
                                        type="number"
                                        required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col class="text-center">
                            <h4>Weapons</h4>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1">
                        <b-col>
                            <b-form-group id="weapons"
                                            label="Weapons"
                                            label-for="weaponsinput">
                                <b-form-input id="weaponsinput"
                                        v-model="weapons"
                                        type="text"
                                        required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col v-if="needsDamagevalue">
                            <b-form-group id="damagevalue"
                                            label="Damage Value"
                                            label-for="damagevalueinput">
                                <b-form-input id="damagevalueinput"
                                        v-model="damagevalue"
                                        type="number"
                                        required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col class="text-center">
                            <h4>Options</h4>
                            <b-btn class="optionbtn" size="sm" @click="deleteOption">- Delete Option</b-btn><b-btn class="optionbtn" size="sm" @click="addOption">+ Add Option</b-btn>
                        </b-col>
                    </b-row>
                    <b-row class="my-3 optionrow" v-if="anyOption" v-for="option in options" :key="option.key">          
                        <b-col cols="12">
                            <b-form-group :id=option.iddescriptionformgroup
                                            :label=option.descriptionlabel
                                            :label-for=option.iddescriptionforminput>
                                <b-form-input :id=option.iddescriptionforminput
                                        v-model="option.descriptionvalue"
                                        type="text"
                                        :placeholder=option.descriptionplaceholder
                                        required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group :id=option.idcostformgroup
                                            :label=option.costlabel
                                            :label-for=option.idcostforminput>
                                <b-form-input :id=option.idcostforminput
                                        v-model="option.costvalue"
                                        type="number"
                                        required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group :id=option.idlimitformgroup
                                            :label=option.limitlabel
                                            :label-for=option.idlimitforminput>
                                <b-form-input :id=option.idlimitforminput
                                        v-model="option.limitvalue"
                                        type="number"
                                        required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group :id=option.idallornoneformgroup
                                            :label=option.allornonelabel
                                            :label-for=option.idallornoneforminput>
                                <b-form-select :id=option.iallornoneforminput
                                        v-model="option.selectedallornone"
                                        :options="option.allornoneoptions"
                                        required>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col class="text-center">
                            <h4>Special Rules</h4>
                            <b-btn class="optionbtn" size="sm" @click="deleteRule">- Delete Special Rule</b-btn><b-btn class="optionbtn" size="sm" @click="addRule">+ Add Special Rule</b-btn>
                        </b-col>
                    </b-row>
                    <b-row class="my-3 rulerow" v-if="anyRule" v-for="rule in rules" :key="rule.key">          
                        <b-col cols="12">
                            <b-form-group :id=rule.idformgroup
                                            :label=rule.label
                                            :label-for=rule.idforminput>
                                <b-form-input :id=rule.idforminput
                                        v-model="rule.value"
                                        type="text"
                                        placeholder="Add Special Rule..."
                                        required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-5">
                        <hr>
                    </b-row>
                    
                    <b-row>
                        <b-col class="text-center">
                            <b-btn to='/adminarmies' class="optionbtn" id="cancelbtn" type="cancel">Cancel</b-btn>
                            <b-btn class="optionbtn" id="createbtn" @click="updateArmyGroup">Edit Army Group</b-btn>
                        </b-col>
                    </b-row>
                </b-form>

            </b-card>
       </b-container>
    </div>
</template>

<script>
import AdminNavbar from './AdminNavbar.vue'
export default {
    data() {
        return {
            selectednationality: 'Germany',
            nationalities: ['Germany', 'USA', 'Britain'],
            selectedtype: 'Infantry',
            types: ['HQ', 'Infantry', 'Team', 'Artillery Gun', 'Anti-Tank', 'Anti-air', 'Armoured Cars', 'Tanks'],
            selectedcategory: 'Infantry',
            categories: ['Infantry', 'Artillery', 'Vechicles'],
            title: '',
            selectedexperience: 'Regular',
            experiences: ['Inexperienced', 'Regular', 'Veteran'],
            description: '',
            cost:0,
            compositionDescription: '',
            compositionSize: 0,
            weapons: '',
            damagevalue: -1,
            options: [],
            rules: [],
            armygroupoptions: [],
        }
    },
    computed: {
        needsComposition() {
            console.log("needsComposition: ", this.selectedcategory === 'Infantry')
            return this.selectedcategory === 'Infantry' || this.selectedcategory === 'HQ' || this.selectedcategory === 'Artillery';
        },
        needsDamagevalue() {
            return this.selectedcategory === 'Armoured Cars' || this.selectedcategory === 'Tanks';
        },
        anyOption(){
            return this.options.length > 0;
        },
        anyRule() {
            return this.rules.length > 0;
        },
        getArmy() {
            return this.$store.getters.army;
        }
    },
    components: {
        AdminNavbar
    },
    methods: {
        // needsComposition() {
        //     console.log("needsComposition: ", this.selectedcategory === 'Infantry')
        //     return this.selectedcategory === 'Infantry';
        // }
        addOption(option = false) {
            let index = this.options.length + 1;

            // description
            let iddescriptionformgroup = "optiondescription_" + index;
            let iddescriptionforminput = "optiondescriptioninput_" + index;
            let descriptionlabel = "# " + index + " Option Description";
            let descriptionplaceholder = "Option description...";

            // cost
            let idcostformgroup = "optioncost_" + index;
            let idcostforminput = "optioncostinput_" + index;
            let costlabel = "# " + index + " Option Cost";

            // limit
            let idlimitformgroup = "optionlimit_" + index;
            let idlimitforminput = "optionlimitinput_" + index;
            let limitlabel = "# " + index + " Option Limit";

            // allornone
            let idallornoneformgroup = "optionallornone_" + index;
            let idallornoneforminput = "optionallornoneinput_" + index;
            let allornonelabel = "# " + index + " Option All-Or-None";
            // let allornoneoptions = [{value: true, text: 'Yes'}, {value: false, text: 'No'}]

            let optionvalues = {
                index: index,
                key: index + "option",
                iddescriptionformgroup: iddescriptionformgroup,
                iddescriptionforminput: iddescriptionforminput,
                descriptionlabel: descriptionlabel,
                descriptionvalue: option ? option.description : '',
                descriptionplaceholder: descriptionplaceholder,
                idcostformgroup: idcostformgroup,
                idcostforminput: idcostforminput,
                costlabel: costlabel,
                costvalue: option ? option.cost : 0,
                idlimitformgroup: idlimitformgroup,
                idlimitforminput: idlimitforminput,
                limitlabel: limitlabel,
                limitvalue: option ? option.limit : 0,
                idallornoneformgroup: idallornoneformgroup,
                idallornoneforminput: idallornoneforminput,
                allornonelabel: allornonelabel,
                selectedallornone: option ? option.all_or_none : false,
                allornoneoptions: [{value: true, text: 'Yes'}, {value: false, text: 'No'}]
            };

            // console.log("option: ", option);
            this.options.push(optionvalues);
            
        },
        deleteOption(){
            // Remove last element
            this.options = this.options.slice(0, -1);
        },
        addRule(rule = false) {
            console.log("EditArmy > methods > addRule > rule > ", rule)

            let index = this.rules.length + 1;
            let label = "# " + index + " Special Rule";
            let idformgroup = "idspecialruleformgroup_" + index;
            let idforminput = "idspecialruleforminput_" + index;
            let value = '';

            let rulevalues = {
                index: index,
                key: index + "rule",
                label: label,
                idformgroup: idformgroup,
                idforminput: idforminput,
                value: rule ? rule.rule : '',
            };
            
            this.rules.push(rulevalues);

        },
        deleteRule() {
            this.rules = this.rules.slice(0, -1);
        },
        updateArmyGroup(){
            // Generate options and specialrules before constructing armygroup
            // HERE
            let armygroupoptions = this.getGeneratedOptions()
            let armyrules = this.getGeneratedRules()

            const choosenarmy = this.$store.getters.army;
            
            
            let armygroup = {
                _id: this.getArmy._id,
                nationality: this.selectednationality,
                type: this.selectedtype,
                category: this.selectedcategory,
                title: this.title,
                experience: this.selectedexperience,
                description: this.description,
                cost: this.cost,
                weapons: this.weapons,
                damagevalue: this.damagevalue,
                composition: {
                    description: this.compositionDescription,
                    size: this.compositionSize
                },
                options: armygroupoptions,
                special_rules: armyrules
            };
            // console.log("armygroupoptions: ", armygroupoptions);
            // console.log("armygrouprules: ", armyrules)
            // console.log("Armygroup: ", armygroup);
            this.$store.dispatch("updateArmyGroup", armygroup)
                .then(() => {
                    this.$router.push({
                        path: "/adminarmies"
                    });
                });

            
        },
        getGeneratedOptions() {
            let armygroupoptions = []
            this.options.forEach(option => {
                let armygroupoption = {}

                armygroupoption = {
                    description: option.descriptionvalue,
                    cost: option.costvalue,
                    limit: option.limitvalue,
                    all_or_none: option.selectedallornone
                }

                armygroupoptions.push(armygroupoption)
            });

            return armygroupoptions
        },
        getGeneratedRules(){
            let armyrules = []
            this.rules.forEach(rule => {
                let armyrule = {}

                armyrule = {
                    rule: rule.value
                }

                armyrules.push(armyrule)
            });

            return armyrules
        }
    },
    mounted() {
        // const choosenarmy = {}
        const choosenarmy = this.getArmy;
        console.log("mounted > choosenarmy > ", choosenarmy);

        this._id = choosenarmy._id;
        this.selectednationality = choosenarmy.nationality;
        this.title = choosenarmy.title;
        this.selectedexperience = choosenarmy.experience;
        this.selectedcategory = choosenarmy.category;
        this.selectedtype = choosenarmy.type;
        this.cost = choosenarmy.cost;
        this.description = choosenarmy.description;
        this.compositionDescription = choosenarmy.composition.description;
        this.compositionSize = choosenarmy.composition.size;
        this.weapons = choosenarmy.weapons;

        choosenarmy.options.forEach(option => {
            this.addOption(option);
        });
        choosenarmy.special_rules.forEach(rule => {
            this.addRule(rule);
        });

        // this.$store.dispatch('cleanArmy');
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Germania+One|Playfair+Display");
form {
    font-family: 'Playfair Display', serif;
}
input[type=text],
select,
textarea {
    border: 1px solid #d6d6d6;
    background-color: #fcfcfc;
    border-radius: 0;
}
.card-body{
    background-color: #f2f2f2;
}
.card {
    border-radius: 0;
}
.btn {
    background-color: #f2f2f2;
    color: black;
    border-radius: 0;
}
.optionrow {
    background-color: #d6dedb;
    border: 1px solid #bdcac5;
}
.optionbtn {
    margin-left: 5px;
    margin-right: 5px;
}
.oneoptiondeletebtnwrapper {
    width: 100%;
    display: inline-block;
}
.oneoptiondeletebtn {
    float: right;
}
.rulerow {
    background-color: #c3b2a8;
    border: 1px solid #a6958b;
}
hr {
       display: block;
       position: relative;
       padding: 0;
       margin: 8px auto;
       height: 0;
       width: 100%;
       max-height: 0;
       font-size: 1px;
       line-height: 0;
       clear: both;
       border: none;
       border-top: 1px solid #aaaaaa;
       border-bottom: 1px solid #ffffff;
    }

</style>
