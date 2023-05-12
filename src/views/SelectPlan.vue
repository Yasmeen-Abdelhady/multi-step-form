<template>
    <FormTitle>
        <template v-slot:h1>Select your plan</template>
        <template v-slot:p> You have the option of monthly or yearly billing. </template>
    </FormTitle>
    <div class="cards">
        <div class="card" @click="getPlanData()">
            <input type="radio" id="card1" name="card" value='{"name": "Arcade" , "pricePerMonth": "$9/mo" , "pricePerYear":"$90/yr" }' v-model="cardValue" />
            <label for="card1">
                <img src="../assets/images/icon-arcade.svg" />
                <div class="name">Arcade</div>
                <div class="price" v-if="$store.state.month">$9/mo</div>
                <div v-else >
                    <div class="price">$90/yr</div>
                    <div>2 months free</div>
                </div>
            </label>
        </div>
        <div class="card" @click="getPlanData()">
            <input type="radio" id="card2" name="card" value='{"name": "Advanced" , "pricePerMonth": "$12/mo" , "pricePerYear":"$120/yr" }' v-model="cardValue" />
            <label for="card2">
                <img src="../assets/images/icon-advanced.svg" />
                <div class="name">Advanced</div>
                <div class="price" v-if="$store.state.month">$12/mo</div>
                <div v-else >
                    <div class="price">$120/yr</div>
                    <div>2 months free</div>
                </div>
            </label>
        </div>
        <div class="card" @click="getPlanData()">
            <input type="radio" id="card3" name="card" value='{"name": "pro" , "pricePerMonth": "$15/mo" , "pricePerYear":"$150/yr" }' v-model="cardValue" />
            <label for="card3">
                <img src="../assets/images/icon-pro.svg" />
                <div class="name">Pro</div>
                <div class="price" v-if="$store.state.month">$15/mo</div>
                <div v-else >
                    <div class="price">$150/yr</div>
                    <div>2 months free</div>
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
    <div class="buttons">
        <div class="back" @click="back()"> Go Back </div>
        <ButtonComponent @click="next()">
            <template v-slot:action>Next Step</template>
        </ButtonComponent>
    </div>
</template>

<script>
import ButtonComponent from '@/components/smallComponent/ButtonComponent.vue'
import FormTitle from "../components/smallComponent/FormTitle.vue"
export default {
    components: {FormTitle , ButtonComponent},
    data() {
        return {
            switchValue:false ,
            cardValue:'',
            planObject: {
                planName: '',
                planPrice:''
            }
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
            this.$store.commit('decreaseStep')
        },
        next(){
            this.$router.push({name: 'AddOns'})
            this.$store.commit('increaseStep')
        },
        getPlanData(){
            if(this.cardValue){
                let cardValueObj = JSON.parse(this.cardValue)
                this.planObject.planName = cardValueObj.name
                if(this.$store.state.month == true){
                    this.planObject.planPrice = cardValueObj.pricePerMonth
                }
                else{
                    this.planObject.planPrice = cardValueObj.pricePerYear
                }
                this.$store.commit('setPlanObj' , this.planObject )
            }
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
            border: 1px solid black;
            &:checked , &:hover{
                border: 1px solid red;
            }
        }
        img{
            margin-bottom: 30px;
        }
        .price{
            color: gray;
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