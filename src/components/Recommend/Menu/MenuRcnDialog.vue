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
        <v-card>
            <v-toolbar dark color="#03C04A">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>메뉴 추천</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <MenuRcnDialogTemplate/>
            </v-card-text>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const MenuRcnDialogTemplate = () => import("@/components/Recommend/Menu/MenuRcnDialogTemplate.vue");
export default {
    name : 'MenuRcnDialog',
    data () {
      return {
        dialog: false,
      }
    },

    components : {
      "MenuRcnDialogTemplate" : MenuRcnDialogTemplate,
    }


}
</script>

<style>

</style>