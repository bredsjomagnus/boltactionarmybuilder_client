<template>
    <div class="armygroup-wrapper">
        <b-row>
            <b-col class="left-chevron" cols="1">
                <b-btn class="removearmygroup-btn" @click="removeArmyGroup">
                    <font-awesome-icon icon="chevron-left" /> {{armygroup.cost}}pts
                </b-btn>
            </b-col>
            <b-col cols="9">
                <h5>{{armygroup.title}}</h5>
            </b-col>
            <b-cols cols="2">
                <div>
                    Total cost: <span class="costinfo">{{cost}}pts</span>
                </div>
            </b-cols>
        </b-row>
        <b-row>
            <b-col cols="8">
                <table class="infotable">
                    <tr v-if="weapon('smg')">
                        <td class="weapondescription">{{weapondescription('smg')}}</td>
                    </tr>
                    <tr v-if="weapon('ar')">
                        <td class="weapondescription">{{weapondescription('ar')}}</td>
                    </tr>
                    <tr v-if="weapon('lmg')">
                        <td class="weapondescription">{{weapondescription('lmg')}}</td>
                    </tr>
                    <tr v-if="weapon('panzerfaust')">
                        <td class="weapondescription">{{weapondescription('panzerfaust')}}</td>
                    </tr>
                </table>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div class="figure-wrapper">
                    <!-- One figure -->
                   
                    <div class="figure"
                    v-for="(item, index) in maxsize"
                    :key=index
                    :index="index"
                    >
                        <div v-if="index < minsize">
                            <div class="minumumFigure" v-if="index === 0">NCO</div>
                            <div class="minumumFigure" v-else>Soldier</div>
                            <b-btn @click="toggleBtn('smg', index)" :class="[isActive('smg', index) ? 'weaponbtnactive' : 'weaponbtninactive']" v-if="weapon('smg')">SMG<br>+{{weaponcost('smg')}}pts</b-btn>
                            <b-btn @click="toggleBtn('ar', index)" :class="[isActive('ar', index) ? 'weaponbtnactive' : 'weaponbtninactive']" v-if="weapon('ar')">AR<br>+{{weaponcost('ar')}}pts</b-btn>
                            <b-btn @click="toggleBtn('lmg', index)" :class="[isActive('lmg', index) ? 'weaponbtnactive' : 'weaponbtninactive']" v-if="weapon('lmg')">LMG<br>+{{weaponcost('lmg')}}pts</b-btn>
                            <b-btn @click="toggleBtn('panzerfaust', index)" :class="[isActive('panzerfaust', index) ? 'weaponbtnactive' : 'weaponbtninactive']" v-if="weapon('panzerfaust')">PF<br>+{{weaponcost('panzerfaust')}}pts</b-btn>
                        </div>
                        <div v-else-if="index >= minsize && index < currentsize">
                            <b-btn @click="removeFigure()" class="removeFigure-btn">Soldier</b-btn>
                            <b-btn @click="toggleBtn('smg', index)" :class="[isActive('smg', index) ? 'weaponbtnactive' : 'weaponbtninactive']" v-if="weapon('smg')">SMG<br>+{{weaponcost('smg')}}pts</b-btn>
                            <b-btn @click="toggleBtn('ar', index)" :class="[isActive('ar', index) ? 'weaponbtnactive' : 'weaponbtninactive']" v-if="weapon('ar')">AR<br>+{{weaponcost('ar')}}pts</b-btn>
                            <b-btn @click="toggleBtn('lmg', index)" :class="[isActive('lmg', index) ? 'weaponbtnactive' : 'weaponbtninactive']" v-if="weapon('lmg')">LMG<br>+{{weaponcost('lmg')}}pts</b-btn>
                            <b-btn @click="toggleBtn('panzerfaust', index)" :class="[isActive('panzerfaust', index) ? 'weaponbtnactive' : 'weaponbtninactive']" v-if="weapon('panzerfaust')">PF<br>+{{weaponcost('panzerfaust')}}pts</b-btn>
                        </div>
                        <div class="nofigure" v-else>
                            <b-btn class="addFigure-btn" @click="addFigure()">+{{weaponcost('extra men')}}pts</b-btn>
                        </div>
                        
                    </div>
                    
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div class="weapons">
                     <table class='infotable'>
                    <tr v-if="weapon('smg')">
                        <td>Submachine guns left (SMG):</td>
                        <td>{{weaponsleft('smg')}}</td>
                    </tr>
                    <tr v-if="weapon('ar')">
                        <td>Assault rifles left (AR):</td>
                        <td>{{weaponsleft('ar')}}</td>
                    </tr>
                    <tr v-if="weapon('lmg')">
                        <td>Light machine guns left (LMG):</td>
                        <td>{{weaponsleft('lmg')}}</td>
                    </tr>
                    <tr v-if="weapon('panzerfaust')">
                        <td> Panzerfausts left (PF):</td>
                        <td>{{weaponsleft('panzerfaust')}}</td>
                    </tr>
                </table>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    props: {
        armygroup: {
            type: Object
        },
        reportBack: {
            type: Function
        }
    },
    data() {
        return {
            added: 0,
            activeBtns: {},
            current: {
                smg: 0,
                ar: 0,
                lmg: 0,
                panzerfaust: 0
            },
            cost: this.armygroup.cost
        }
    },
    computed: {
        minsize() {
            return this.armygroup.composition.size;
        },
        maxsize() {
            return this.armygroup.maxsize;
        },
        currentsize() {
            return this.minsize + this.added;
        }
    },
    methods: {
        weaponsize(wpn) {
            let ws = this.armygroup.options.filter( obj => {
                return obj.optionkey === wpn;
            });
            return ws[0].limit;
        },
        weaponcost(wpn) {
            let ws = this.armygroup.options.filter( obj => {
                return obj.optionkey === wpn;
            });
            return ws[0].cost;
        },
        weapondescription(wpn) {
            let ws = this.armygroup.options.filter( obj => {
                return obj.optionkey === wpn;
            });
            return ws[0].description;
        },
        weaponsleft(wpn) {
            return this.weaponsize(wpn) - this.current[wpn];
        },
        weapon(wpn) {
            let weapon = this.armygroup.options.filter( obj => {
                return obj.optionkey === wpn;
            });
            return weapon.length > 0;
        },
        removeArmyGroup() {
            let payload = {
                key: this.armygroup.key,
                cost: this.armygroup.cost
            }
            this.$store.dispatch('removeFromChosenArmy', payload);
        },
        addWeapon(weapon, index) {
            console.log("add weapon ", weapon, " for index ", index);
        },
        addFigure() {
            this.added += 1;
            this.cost += this.weaponcost('extra men');
            // console.log("added: " + this.added);
            // console.log("currentsize: ", this.currentsize)
        },
        removeFigure() {
            this.added -= 1;
            this.cost -= this.weaponcost('extra men');
            let deletedweapons = this.activeBtns[this.currentsize];
            deletedweapons.forEach(weapon => {
                this.removeweapon(weapon);
            });
            delete this.activeBtns[this.currentsize];
        },
        reload() {
            this.added += 1;
            this.added -= 1;
        },
        isActive(type, index) {
            let active;
            if(index in this.activeBtns) {
                active = this.activeBtns[index].indexOf(type) !== -1
            } else {
                active = false;
            }
            // console.log("active? ", active);
            return active;
            // return this.activeBtns.index.indexOf(type) !== -1;
            
        },
        toggleBtn(type, index) {
            // type = weapontype
            // index is what figure
            
            if (index in this.activeBtns) {
                // that figure already has some weapon chosen.

                // array with existing types.
                let existingtypes = this.activeBtns[index];

                if(existingtypes.indexOf(type) !== -1) {
                    // type already exists. Just toggle of and remove weapon from counter.
                    
                    this.activeBtns[index].splice(this.activeBtns[index].indexOf(type), 1);
                    this.removeweapon(type);
                } else {
                    // type is different from existing. Toggle of existing and remove existing. Toggle on and add new one.

                    // oldtypes is array with all types except panzerfaust
                    let oldtypes = this.activeBtns[index].filter( element => {
                        return element !== "panzerfaust";
                    });

                    // If there ar old types that is not panzerfaust and if the new type is not panzerfaust
                    // remove old type
                    if (oldtypes.length > 0 && type !== "panzerfaust") {
                        let oldtype = oldtypes[0];

                        this.activeBtns[index].splice(this.activeBtns[index].indexOf(oldtype), 1);
                        this.removeweapon(oldtype);
                        // console.log("oldtype: ", oldtype);
                    }
                    
                    // add new type if allowed according to limit
                    if(this.weaponsleft(type) > 0) {
                        this.activeBtns[index].push(type);
                        this.addweapon(type);
                    }
                }
                
                if(this.activeBtns[index].length < 1) {
                    delete this.activeBtns[index];
                }
                // console.log("activeBtns: ", this.activeBtns);
            } else if(this.weaponsleft(type) > 0){
                // add index and type to object and att weapon to armygroup
                this.activeBtns[index] = [];
                this.activeBtns[index].push(type);
                // console.log("activeBtns: ", this.activeBtns);
                this.addweapon(type);
            }
            this.reload();
        },
        addweapon(type) {
            this.current[type] += 1;
            this.cost += this.weaponcost(type);
        },
        removeweapon(type) {
            this.current[type] -= 1;
            this.cost -= this.weaponcost(type);
        }
    }
}
</script>

<style scoped>
.armygroup-wrapper {
    display: inline-block;
    background-color: #484848;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    color: white;
}
.figure-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    height: 175px;
    border-top: 2px solid #ada6a6;
    border-bottom: 1px solid #909090;
    padding-top: 10px;
    margin-top: 10px;

}
.figure {
    /* order: 0; */
    display: inline-block;
    border: 1px solid black;
    flex-basis: 78px;
    height: 150px;
    text-align: center;
    background-color: #465866;
} 
.nofigure{
    display: inline-block;
    border: 1px solid black;
    flex-basis: 78px;
    height: 150px;
    text-align: center;
    background-color: #5f5f5f;
    width: 100%;
} 
.removearmygroup-btn {
    border-radius: 0;
    width: 70px;
    padding: 0;
    
    background-color: #a38476;
    border: 1px solid black;
}
.weaponbtninactive {
    display: inline-block;
    border-radius: 0;
    width: 37px;
    height: 37px;
    padding: 0;
    background-color: #888888;
    border: 1px solid black;
    font-size: 10px;
    margin-top: 1px;
}
.bigweaponbtninactive {
    border-radius: 0;
    width: 78px;
    height: 39px;
    padding: 0;
    background-color: #888888;
    border: 1px solid black;
    font-size: 10px;
}
.weaponbtnactive {
    border-radius: 0;
    width: 37px;
    height: 37px;
    padding: 0;
    background-color: #8cac6e;
    border: 1px solid black;
    font-size: 10px;
    margin-top: 1px;
}
.minumumFigure {
    width: 100%;
    border-radius: 0;
    background-color: #484848;
    height: 30px;
    display: block;
    padding-top: 5px;
    color: #e7e7e7;
    text-align: center;
    font-size: 10px;
    margin-bottom: 5px;
    border-bottom: 2px solid #ffa500;
}
.removeFigure-btn {
    width: 100%;
    border-radius: 0;
    background-color: #424a50;
    height: 30px;
    padding: 0; 
    font-size: 10px;
    margin-bottom: 5px;
    border-bottom: 2px solid #ffa500;
}
.addFigure-btn {
    width: 100%;
    border-radius: 0;
    background-color: #424a50;
    height: 30px;
    padding: 0;
    font-size: 10px;
    border-bottom: 2px solid #ffa500;
}
.infotable {
    font-size: 11px;
}
.infotable td {
    width: 250px;
}
.infotable .weapondescription {
    width: 100%;
}
.costinfo {
    font-size: 16px;
    color: #ffd68c;
}

</style>
