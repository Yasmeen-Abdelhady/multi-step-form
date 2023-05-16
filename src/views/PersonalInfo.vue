<template>
    <div class="content">
        <FormTitle>
            <template v-slot:h1>
                Personal Info
            </template>
            <template v-slot:p>
                Please provide your name,email,address,and phone number.
            </template>
        </FormTitle>
        <form>
            <div>
                <label>Name</label>
                <input type="text" placeholder="e.g.Stephen King" v-model="userName"/>
                <div class="error" v-if="v$.userName.$error">
                    {{v$.userName.$errors[0].$message}}
                </div>
            </div>
            <div>
                <label>Email Address</label>
                <input type="email" placeholder="e.g.stephenking@lorem.com" v-model="email"/>
                <div class="error" v-if="v$.email.$error">
                    {{v$.email.$errors[0].$message}}
                </div>
            </div>
            <div>
                <label>Phone Number</label>
                <input type="text" placeholder="e.g.+1 234 567 890" v-model="phone"/>
                <div class="error" v-if="v$.phone.$error">
                    {{v$.phone.$errors[0].$message}}
                </div>
            </div>
        </form>
        <div class="buttons">
            <ButtonComponent @click="validateForm()">
                <template v-slot:action>next step</template>
            </ButtonComponent>
        </div>
    </div>
</template>

<script>
import FormTitle from '../components/smallComponent/FormTitle.vue';
import ButtonComponent from "../components/smallComponent/ButtonComponent.vue";
import useValidate from "@vuelidate/core";
import { required , email , numeric} from "@vuelidate/validators";

export default {
    components : {FormTitle , ButtonComponent},
    data(){
        return{
            v$: useValidate(),
            userName:'',
            email:'',
            phone:''
        }
    },
    validations(){
        return {
            userName : {required},
            email : {required , email},
            phone : {required ,numeric}
        }
    },
    mounted(){
        this.userName = this.$store.state.user.userName;
        this.email = this.$store.state.user.email;
        this.phone = this.$store.state.user.phone;
    },
    methods:{
        async validateForm(){
            this.v$.$validate();
            if(!this.v$.$error){
                this.$store.commit('userData',{
                    userName: this.userName,
                    email: this.email,
                    phone: this.phone
                })
                this.$router.push({name:'SelectPlan'})
                this.$store.commit('increaseStep')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
form{
    div{
        margin-bottom: 30px;
        label{
            display: block;
            font-size: 15px;
        }
        input{   
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            width: 100%;
            margin-top: 10px;
            &:focus{
                border-color: hsl(213, 96%, 18%);
            }
        }
    }
}
.buttons{
    display: flex;
    justify-content: flex-end;
}
.error{
    color: red;
}
</style>