<template>
    <div class="armygroup-wrapper">
        <h3>{{armygroup.title}}</h3>
    </div>
</template>

<script>
export default {
    props: {
        armygroup: Object
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
.armygroup-wrapper {
    display: inline-block;
    background-color: gray;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
}
</style>
