<template>
    <div id="menu-wrapper">
        <h5>Sidemenu</h5>
        <div>
            <b-button-group vertical>
                <a href="#">New...</a>
                <a href="#">Load...</a>
                <a href="#">Save</a>
                <a href="#">Print</a>
            </b-button-group>
        </div>
        
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.link-wrapper {
    display: block;
    background-color: gray;
}
a {
    color: #f0af64;
}
#menu-wrapper{
    background-color: #4e4e4e;
    color: #c7c7c7;   
    display: block;
    width: 150px;
    height: 700px;
    padding: 20px;
    font-size: 0.8em;
    border-top: 3px solid #a84141;
    float: left;
}
</style>
