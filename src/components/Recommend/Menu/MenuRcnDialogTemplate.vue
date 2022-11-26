<template>
  <v-container fluid>
    <v-data-iterator :items="items" :search="searchModel"
      :sort-by="sortByModel" :sort-desc="sortDescModel"
      hide-default-footer>

      <!--1. 정렬 창, 정렬 방법 버튼-->
      <template v-slot:header>
        <v-row align="center" justify="center">
          <v-col cols="8">
            <!--정렬 창-->
            <v-select v-model="sortByModel" :items="sortKeys" label="정렬 기준"
            outlined hide-details
            append-icon="mdi-sort" 
            ></v-select>
          </v-col>
        
          <v-spacer></v-spacer>
        
          <!--정렬 방법 버튼-->
          <v-col cols="4">
            <v-btn-toggle v-model="sortDescModel" mandatory dense>
              <v-btn small text color="#03C04A" elevation="14"
              :value="false" dark>
                <v-icon>mdi-arrow-up-bold-box</v-icon>
              </v-btn>
              <v-btn small text color="#03C04A" elevation="14"
              :value="true" dark>
                <v-icon>mdi-arrow-down-bold-box</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </template>


      <!--본문-->
      <template v-slot:default="props">
        <v-row class="borderColor">
          
          <!--1개 정보 반복-->
          <v-col v-for="item in props.items" :key="item.이름" 
          cols="12" sm="6" md="4" lg="3">  
            <!--1개 정보-->
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.이름 }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  
                  <v-list-item-content :class="{ 'blue--text': sortByModel === key }">
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortByModel === key }">
                    {{ item[key] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

        </v-row>
      </template>


    </v-data-iterator>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        
        searchModel: '',

        sortDescModel: false,
        sortByModel: '이름',
        sortKeys: ['이름','칼로리','탄수화물','단백질','지방'],
        
        items: [
          { 이름: 'Frozen Yogurt', 칼로리: 159, 탄수화물: 24, 단백질: 4.0, 지방: 6.0, },
          { 이름: 'Ice cream sandwich', 칼로리: 237, 탄수화물: 37, 단백질: 4.3, 지방: 9.0,},
          { 이름: 'Eclair', 칼로리: 262, 탄수화물: 23, 단백질: 6.0, 지방: 16.0, },
          { 이름: 'Cupcake', 칼로리: 305, 탄수화물: 67, 단백질: 4.3, 지방: 3.7,},
          { 이름: 'Gingerbread',칼로리: 356, 탄수화물: 49,단백질: 3.9, 지방: 16.0,},
          { 이름: 'Jelly bean', 칼로리: 375, 탄수화물: 94, 단백질: 0.0, 지방: 0.0,},
          { 이름: 'Lollipop', 칼로리: 392, 탄수화물: 98, 단백질: 0, 지방: 0.2,},
          { 이름: 'Honeycomb', 칼로리: 408, 탄수화물: 87, 단백질: 6.5, 지방: 3.2,},
          { 이름: 'Donut', 칼로리: 452, 탄수화물: 51, 단백질: 4.9,  지방: 25.0,},
          { 이름: 'KitKat', 칼로리: 518, 탄수화물: 65, 단백질: 7,  지방: 26.0,},
        ],
      }
    },

    computed: {
      filteredKeys () {
        return this.sortKeys.filter(key => key !== '이름')
      },
    },

  }
</script>

<style>

</style>