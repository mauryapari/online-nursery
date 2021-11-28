<template>
    <div class="background-page">
        <section-component :hasBreadCrumb="true">
            <template slot="page-breadcrumb">
                <breadcrumb-component></breadcrumb-component>
            </template>
            <template slot="page-content">
                <div class="search-section">
                    <div class="search-section__filter-container">
                        <search-filter></search-filter>
                    </div>
                    <div class="search-section__results-container">
                        <search-results></search-results>
                    </div>
                </div>
            </template>
        </section-component>
    </div>
</template>

<script>
import BreadcrumbComponent from '../BreadcrumbComponent.vue';
import SearchFilter from './SearchFilter.vue';
import SearchResults from './SearchResults.vue';
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
export default {
  components: { SearchFilter, SearchResults, BreadcrumbComponent, SectionComponent },
    
}
</script>

<style lang="scss">
.search-section {
    display: flex;
    flex: 1;
    margin: 20px 0px;
    @include element(filter-container) {
        max-width: 218px;
        width: 218px;
        border-right: 1px solid #d8d8d8;
    }
    @include element(results-container) {
        width: calc(100% - 218px);
    }
}
</style>