<template>

        <p>hej</p>

</template>

<script>
export default {
    props: {
            smg: {
                type: Boolean
            },
            index: {
                type: Number
            }
    },
    data() {
        return {

        }
    },
    methods: {
        addWeapon(weapon, index) {
            console.log("add weapon ", weapon, " for index ", index);
        }
    },
    mounted() {
        console.log("mounted");
    }
}
</script>

<style scoped>
.figure {
    /* order: 0; */
    display: inline-block;
    border: 1px solid black;
    flex-basis: 30px;
    width: 80px;
    height: 150px;
}
.nofigure{
    border: 1px solid black;
    flex-basis: 30px;
    width: 80px;
    height: 150px;
}
.weaponbtn-inactive {
    border-radius: 0;
    width: 39px;
    height: 39px;
    padding: 0;
    background-color: #888888;
    border: 1px solid black;
    font-size: 10px;
}
.bigweaponbtn-inactive {
    border-radius: 0;
    width: 78px;
    height: 39px;
    padding: 0;
    background-color: #888888;
    border: 1px solid black;
    font-size: 10px;
}
.weaponbtn-active {
    border-radius: 0;
    width: 39px;
    height: 39px;
    padding: 0;
    background-color: #8cac6e;
    border: 1px solid black;
    font-size: 10px;
}
</style>
