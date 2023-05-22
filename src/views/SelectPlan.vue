<template>
    <FormTitle>
        <template v-slot:h1>Select your plan</template>
        <template v-slot:p> You have the option of monthly or yearly billing. </template>
    </FormTitle>
    <div class="cards">
        <div class="card" v-for="card in cards" :key="card.name" >
            <input type="radio" id="card1" name="card" :class="{selected:card.name == this.cardValue.name}" v-model="cardValue" :value="card"/>
            <label for="card1">
                <img :src="card.image" />
                <div class="name">{{card.name}}</div>
                <div class="price" v-if="$store.state.month">{{card.pricePerMonth}}</div>
                <div v-else >
                    <div class="price">{{card.pricePerYear}}</div>
                    <div class="offer">{{card.offers}}</div>
                </div>
            </label>
        </div>
    </div>
    <div class="switch-container">
        <span>Monthly</span>
        <label class="switch">
            <input type="checkbox" v-model="switchValue" @change="$store.commit('changePeriod' ,switchValue )">
            <span class="slider round"></span>
        </label>
        <span>yearly</span>
    </div>
    <div class="error" v-if="errorMsg">{{errorMsg}}</div>
    <div class="buttons">
        <div class="back" @click="back()"> Go Back </div>
        <ButtonComponent @click="next()">
            <template v-slot:action>Next Step</template>
        </ButtonComponent>
    </div>
</template>

<script>
import image1 from "../assets/images/icon-arcade.svg"
import image2 from "../assets/images/icon-advanced.svg"
import image3 from "../assets/images/icon-pro.svg"
import ButtonComponent from '@/components/smallComponent/ButtonComponent.vue'
import FormTitle from "../components/smallComponent/FormTitle.vue"
export default {
    components: {FormTitle , ButtonComponent},
    data() {
        return {
            switchValue: !this.$store.state.month ,
            cardValue:{},
            planObject: {
                planName: '',
                pricePerMonth:'',
                pricePerYear:''
            },
            card:{},
            cards: [
                {
                    image: image1,
                    name: 'Arcade',
                    price: '$9/mo',
                    pricePerMonth:'$9/mo',
                    pricePerYear:'$90/yr',
                    offers:'2 months free'
                },
                {
                    image: image2,
                    name: 'Advanced',
                    pricePerMonth:'$12/mo',
                    pricePerYear:'$120/yr',
                    offers:'2 months free'
                },{
                    image: image3,
                    name: 'Pro',
                    pricePerMonth:'$15/mo',
                    pricePerYear:'$150/yr',
                    offers:'2 months free'
                }
            ],
            errorMsg:''
        }
    },
    mounted() {
        if(this.$store.state.stepNumber < 2){
            this.$router.push({name: 'PersonalInfo'})
        }
        else{
            this.cardValue.name = this.$store.state.planObj.planName;
            this.cardValue.pricePerMonth = this.$store.state.planObj.pricePerMonth;
            this.cardValue.pricePerYear = this.$store.state.planObj.pricePerYear;
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
            this.$store.commit('decreaseStep')
        },
        next(){
            if(this.cardValue.name != undefined){
                this.sendData();
                this.$router.push({name: 'AddOns'})
                this.$store.commit('increaseStep')
            }
            else{
                this.errorMsg = 'Select A Plan'
            }
            
        },
        sendData( ){
            this.planObject.planName = this.cardValue.name;
            this.planObject.pricePerMonth = this.cardValue.pricePerMonth;
            this.planObject.pricePerYear = this.cardValue.pricePerYear;
            this.$store.commit('setPlanObj' , this.planObject )
        }
    }
}
</script>

<style lang="scss" scoped>
.cards{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .card{
        border-radius: 10px;
        padding: 10px;
        width: 145px;
        margin-bottom: 15px;
        cursor: pointer;
        position: relative;
        input[type="radio"]{
            appearance: none;
            background-color: transparent;
            width:100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 10px;
            border: 1px solid #ccc;
            &:checked , &:hover{
                border: 1px solid hsl(213, 96%, 18%);
            }
            &.selected{
                border: 1px solid hsl(213, 96%, 18%);
            }
        }
        img{
            margin-bottom: 30px;
        }
        .price{
            color: gray;
        }
        .offer{
            color: hsl(213, 96%, 18%);
        }
    }
}
.switch-container{
    background-color: hsl(217, 100%, 97%);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 40px;
    border-radius: 10px;
    position: relative;
    z-index: 22;
    span{
        display: inline-block;
        padding-left: 20px;
        padding-right: 20px;
    }
}
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: hsl(206, 74%, 14%);
        -webkit-transition: .4s;
        transition: .4s;
        &::before{
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
        }
        &.round {
            border-radius: 34px;
        }

        &.round:before {
            border-radius: 50%;
        }
    }
    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
}
.error{
    color: red;
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