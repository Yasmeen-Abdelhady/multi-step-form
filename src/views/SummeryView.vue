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
            <div class="option" v-for="ons in onsObject" :key="ons.onsName"><span>{{ons.onsName}}</span> <span>{{ons.price}}</span></div>
        </div>
        <div class="total"><span>total (per {{time}})</span><span class="totalPrice">+$12/mo</span>
        </div>
    </div>
    <div class="buttons">
        <div class="back" @click="back()"> Go Back </div>
        <ButtonComponent @click="confirm()">
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
            time:''
        }
    },
    mounted() {
        this.getDataFromVux();
    },
    methods: {
        back(){
            this.$router.go(-1)
            this.$store.commit('decreaseStep')
        },
        getDataFromVux() {
            this.planObject = this.$store.state.planObj
            this.onsObject = this.$store.state.onsObj
            this.month = this.$store.state.month
            if(this.month == true){
                this.time = "month"
            }
            else{
                this.time = "year"
            }
        },
        confirm(){
            this.$store.dispatch('sendDataToApi');
            if(this.$store.state.check == "succeed"){
                this.$router.push({name: 'ThankYou'})
            }
            else{
                console.log('not succeed')
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