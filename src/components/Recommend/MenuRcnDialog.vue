<template>
<v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        
        <!--Dialog 유발-->
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"
            color="#03C04A" dark>메뉴 추천 받기</v-btn>
        </template>

        <!--Dialog 내용-->
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              
                <v-toolbar-title>Settings</v-toolbar-title>
                
                <v-spacer></v-spacer>
                
                <v-toolbar-items>
                  <v-btn dark text @click="dialog = false">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </v-card>
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