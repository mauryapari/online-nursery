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

.section-heading {
    text-align: center;
    font-size: 35px;
    line-height: 1.2;
    @include ralewayRegular;
    margin-bottom: 10px;

    @include sm {
        font-size: 40px;
        line-height: 1.4;
    }
}
</style>