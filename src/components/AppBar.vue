<template>
      <!--    <v-app-bar v-if="$vuetify.breakpoint.xsOnly"> -->
    <v-app-bar color="blue" dark app>
      <v-app-bar-nav-icon @click="$emit('drawer')"></v-app-bar-nav-icon>
      <v-spacer/>
      
      <v-btn v-if="isLogin" class="mr-3" icon @click="logout">
        로그아웃
      </v-btn>
      <v-btn v-else :to="{name: 'sign-in'}" class="mr-3" icon>
        로그인
      </v-btn>
      
      <v-btn :to="{name: 'sign-up'}" class="mr-1" icon>
        회원가입
      </v-btn>
    </v-app-bar>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name : 'AppBar',
  computed : {
    ...mapState(['isLogin'])
  },

  methods : {
    ...mapActions(['logout'])
  }

}
</script>

<style>

</style>