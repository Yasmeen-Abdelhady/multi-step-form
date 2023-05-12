<template>
    <FormTitle>
        <template v-slot:h1>Pick add-ons</template>
        <template v-slot:p>Add-ons help enhance your gaming experience.</template>
    </FormTitle>
    <div class="services">
        <div class="service" v-for="service in services" :key="service.id">
            <div class="checkDiv">
                <input type="checkbox" :id="service.id" :name="service.id" :value="service" v-model="checkedOns">
                <label :for="service.id"> 
                    <div class="text">
                        <h3>{{service.name}}</h3>
                        <p>{{service.description}}</p>
                    </div>
                </label>
            </div>
            <div class="price" v-if="$store.state.month">{{service.pricePerMonth}}</div>
            <div class="price" v-else>{{service.pricePerYear}}</div>
        </div>
    </div>
    <div class="buttons">
        <div class="back" @click="back()"> Go Back </div>
        <ButtonComponent @click="onsData()">
            <template v-slot:action>Next Step</template>
        </ButtonComponent>
    </div>
</template>

<script>
import FormTitle from "../components/smallComponent/FormTitle.vue"
import ButtonComponent from '@/components/smallComponent/ButtonComponent.vue'
export default {
    components: {FormTitle , ButtonComponent},
    data() {
        return {
            services: [
                {
                    name:'Online service',
                    description:'Access to multiplayer games',
                    pricePerMonth:'+$1/mo',
                    pricePerYear:'+$10/yr',
                    id:'service1',
                },
                {
                    name:' Larger storage',
                    description:'Extra 1TB of cloud save',
                    pricePerMonth:'+$2/mo',
                    pricePerYear:'+$20/yr',
                    id:'service2'
                },
                {
                    name:'Customizable Profile ',
                    description:'Custom theme on your profile ',
                    pricePerMonth:'+$2/mo',
                    pricePerYear:'+$20/yr',
                    id:'service3'
                }
            ],
            checkedOns:[]
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
            this.$store.commit('decreaseStep')
        },
        next(){
            this.$router.push({name:'SummeryView'})
            this.$store.commit('increaseStep')
        },
        onsData(){
            let newData=[]
            newData = this.checkedOns.map((obj)=>{
                if(this.$store.state.month == true){
                    return {
                        onsName: obj.name ,
                        price: obj.pricePerMonth
                    }
                }
                else{
                    return {
                        onsName: obj.name ,
                        price: obj.pricePerYear
                    }
                }
            });
            if(this.$store.state.onsObj){
                this.$store.state.onsObj.length = 0
            }
            newData.forEach(ele => {
                this.$store.commit('setOnsData', ele)
            });
            this.next();
        }
    }
}
</script>

<style lang="scss" scoped>
.services{
    .service{
        border: 1px solid gray;
        border-radius: 10px;
        margin-bottom: 20px;
        padding: 20px 25px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .checkDiv{
            display: flex;
            align-items: center;
            h3{
                margin-bottom: 10px;
                margin-top: 0;
            }
            .text p{
                margin: 0;
            }
        }
        input{
            width: 20px;
            height: 20px;
            margin-right: 20px;
        }
    }
}
.buttons{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;

    .back{
        color: gray;
        margin-top: 50px;
        margin-bottom: 20px;
        cursor: pointer;
    }
}
</style>