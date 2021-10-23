<template>
    <h3 class="section-heading">{{headingName}}</h3>
</template>

<script>
export default {
    props: {
        headingName: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

.section-heading {
    text-align: center;
    font-size: 40px;
    line-height: 1.4;
    @include ralewayRegular;
    // font-family: 'Raleway';
}
</style>