<template>
    <ul class="breadcrumb">
        <li v-for="(item, index) in breadcrumbList"
            :key="index"
            @click="routeTo(index)"
            class="breadcrumb__item"
            :class="{'breadcrumb__active-link': !!item.link}">
            {{ item.name }}
        </li>
    </ul>
</template>
<script>
export default {
    data() {
        return {
            breadcrumbList: [],
        }
    },
    watch: {
        '$route': {
            deep: true,
            immediate: true,
            handler() {
                this.updateList();
            }
        }
    },
    methods: {
        routeTo(index) {
            if(this.breadcrumbList[index]) {
                this.$router.push(this.breadcrumbList[index].link)
            }
        },
        updateList() {
            this.breadcrumbList = this.$route.meta.breadcrumb;
            const id = this.$route?.params?.id;
            if(id) {
                const data = window?.globalFun?.util?.getPlantDetail(id);
                const obj = {
                    name: data?.itemname,
                    type: 'ID'
                }
                const itemIndex = this.breadcrumbList.findIndex(item => item.type === 'ID');
                if(itemIndex<0) {
                    this.breadcrumbList.push(obj);
                } else {
                    this.breadcrumbList[itemIndex] = obj;
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.breadcrumb {
    display: flex;
    flex-direction: row;
    margin-top: 15px;

    @include element(item) {
        font-size: 18px;
        margin-right: 20px;
        &:not(:last-child) {
            &::after {
                margin-left: 10px;
                content: '>';
                font-size: 18px;
                &:hover {
                    color: black;
                }
            }
        }
        &:last-child {
            font-weight: 700;
        }
    }

    @include element(active-link) {
        &:hover {
            color: $brand-green;
            cursor: pointer;
        }
    }
}
</style>