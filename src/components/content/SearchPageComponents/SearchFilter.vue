<template>
    <div class="search-filters">
        <div class="search-filters__heading-wrapper">
            <div class="search-filters__heading-title">Filters</div>
        </div>
        <!-- <div class="search-filters__filters-section">
            <div class="search-filters__filters-type" v-for="(value, key, index) in filter" :key="index">
                <div class="search-fiter__filters-heading">{{key}}</div>
                <div class="search-filters__filters-list">
                    <div class="search-filters__filters-item" :key="index">{{item.value}}</div>
                    <div class="search-filters__filters-item" v-for="(item,itemIndex) in value" :key="itemIndex">
                        <input :id="key + item.name + itemIndex" type="checkbox" :value="item.name" v-model="brandName">
                        <div class="search-filter__label-container">
                            <label :for="key + item.name + itemIndex" class="search-filter__label">
                                <span :id="key + item.name + itemIndex" class="search-filter__label-check"></span>
                                <span v-html="item && item.name"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
const brand = require('../../../resources/json/brands.json');
export default {
    data() {
        return {
            filter: {
                brand: brand,
                price: [{
                    displayname: 'Below Rs.250',
                    name: '0 TO 250',
                }, {
                    displayname: 'Rs.251 - Rs.500',
                    name: '251 TO 500',
                }, {
                    displayname: 'Rs.501 - Rs.1000',
                    name: '501 TO 1000',
                }]
            },
            brandName:[]
        }
    }
}
</script>

<style lang="scss">
.search-filters {
    padding: 20px;
    @include element(heading-wrapper) {
        padding: 10px 0px;
    }

    @include element(heading-title) {
        font-size: 18px;
        font-weight: 400;
    }
}

</style>
