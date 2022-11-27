<template>
    <v-chip-group column mandatory v-model="activeFoodIndex" active-class="blue--text">
        <v-chip v-for="(food,index) in cnddtFood" :key="`food-${index}`" link filter>
            {{food.name}}
        </v-chip>  
    </v-chip-group>
</template>

<script>
export default {
    name : 'CandidateFoods',
    props : {
        cnddtFood : {
            type : Array
        },
        cnddtIndex : {
            type : Number
        }
    },

    watch : {
        activeFoodIndex : {
            immediate : true,
            handler(activeFoodIndex){
                this.selectCandiate(activeFoodIndex);
            }
        }
    },

    data(){
        return {
            activeFoodIndex : 0,
        }
    },

    methods : {
        selectCandiate(activeFoodIndex){
            this.$emit("select-canddt", this.cnddtIndex ,activeFoodIndex);
        }
    }
}
</script>

<style scoped>
.border-candidate{
  border: 2px dashed;
  border-color: #80CAFF;
}
</style>