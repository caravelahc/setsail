<template>
    <div id="app">
        <caravela-menu ref="menu" :bgColor="'#003b6f'" :scrolledColor="'#003b6f'"></caravela-menu>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
        <caravela-footer></caravela-footer>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        watch:{
            $route(to, from) {
                window.scrollTo(0, 0)
                if (this.$refs.menu.state) {
                    this.$refs.menu.toggleMenu()
                }
            }
        }
    })
</script>
