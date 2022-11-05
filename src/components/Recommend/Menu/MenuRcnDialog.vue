<template>
<v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        
        <!--Dialog 유발-->
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="#03C04A" dark>
              <v-icon left dark>mdi-alert-circle-outline</v-icon>메뉴 추천 받기<v-icon right dark>mdi-alert-circle-outline</v-icon>
            </v-btn>
        </template>

        <!--Dialog 내용-->
        
        <!--
        <v-card>
            <v-toolbar dark color="#03C04A">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>메뉴</v-toolbar-title>
            </v-toolbar>
        </v-card>-->


    </v-dialog>
  </v-row>
</template>

<script>
export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
}
</script>

<style>

</style>