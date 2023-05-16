<template>
    <FormTitle>
        <template v-slot:h1> Finishing up</template>
        <template v-slot:p>Double-check everything looks OK before confirming.</template>
    </FormTitle>
    <div class="table">
        <div class="plans">
            <div class="plan">
                <div>
                    <div>{{planObject.planName}} ({{time}}ly)</div>
                    <a href="#">change</a>
                </div>
                <div>{{planObject.planPrice}}</div>
            </div>
            <hr/>
            <div class="option" v-for="ons in onsObject" :key="ons.name"><span>{{ons.onsName}}</span> <span>{{ons.price}}</span></div>
        </div>
        <div class="total"><span>total (per {{time}})</span><span class="totalPrice">+${{this.total}}/{{this.tm}}</span>
        </div>
        <div v-if="errorMsg" class="error">{{errorMsg}}</div>
    </div>
    <div class="buttons">
        <div class="back" @click="back()"> Go Back </div>
        <ButtonComponent @click="confirm()" class="confirm">
            <template v-slot:action>confirm</template>
        </ButtonComponent>
    </div>
</template>

<script>
import ButtonComponent from '@/components/smallComponent/ButtonComponent.vue';
import FormTitle from "../components/smallComponent/FormTitle.vue";
export default {
    components: {FormTitle , ButtonComponent},
    data() {
        return {
            planObject:{},
            onsObject:[],
            month: true,
            time:'',
            tm:'',
            total: '',
            errorMsg:''
        }
    },
    mounted() {
        if(this.$store.state.stepNumber < 4){
            this.$router.push({name: 'PersonalInfo'})
        }
        else{
            this.getDataFromVux();
            this.calcTotal();
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
            this.$store.commit('decreaseStep')
        },
        getDataFromVux() {
            this.month = this.$store.state.month
            if(this.month == true){
                this.time = "month"
                this.tm = "Mo"
            }
            else{
                this.time = "year",
                this.tm = "Yr"
            }
            if(this.month == true){
                this.planObject = {
                    planName: this.$store.state.planObj.planName ,
                    planPrice: this.$store.state.planObj.pricePerMonth
                }
            }
            else{
                this.planObject = {
                    planName: this.$store.state.planObj.planName ,
                    planPrice: this.$store.state.planObj.pricePerYear
                }
            }
            this.onsObject = this.$store.state.onsObj.map((obj)=>{
                if(this.month == true){
                    return{
                        onsName:obj.name,
                        price:obj.pricePerMonth
                    }
                }
                else{
                    return{
                        onsName:obj.name,
                        price:obj.pricePerYear
                    }
                }
            })
        },
        calcTotal() {
            if(this.planObject.planPrice){
                let planPrice = this.planObject.planPrice.match(/\d+/)[0]
                this.total = parseInt(planPrice)
                this.onsObject.forEach((obj)=>{
                    this.total += parseInt(obj.price.match(/\d+/)[0])
                })
                this.$store.commit('setTotal' , `$${this.total}/${this.tm}`)
            }
        },
        async confirm(){
            await this.$store.dispatch('sendDataToApi');
            if(this.$store.state.check == "succeed"){
                this.$router.push({name: 'ThankYou'})
            }
            else{
                this.errorMsg = this.$store.state.check;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table{
    text-transform: capitalize;
    & > div {
        padding: 20px;
    }
    .plans{
        background-color: #eee;
        border-radius: 10px;
        & > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .plan{
            margin-bottom: 20px;
            a{
                color: blue;
                text-decoration: underline;
                display: block;
                margin-top: 5px;
            }
            & div:last-of-type{
                font-weight: bold;
            }
        }
        .option{
            & span:first-of-type{
                color: gray;
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }
    }
    .total{
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .totalPrice{
            font-size: 20px;
            color: hsl(243, 100%, 62%);
            font-weight: bold;
        }
    }
    .error{
        color: red;
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
    .confirm{
        background-color: hsl(243, 100%, 62%);
    }
}
</style>