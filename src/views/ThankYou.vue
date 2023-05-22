<template>
    <div class="thank-container">
        <img src="../assets/images/icon-thank-you.svg">
        <h1>Thank you!</h1>
        <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
    </div>
</template>

<script>
export default {
    mounted() {
        if(this.$store.state.stepNumber == 1){
            this.$router.push({name: 'PersonalInfo'})
        }
    }
}
</script>
<style lang="scss" scoped>
.thank-container{
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    p{
        width: 80%;
        line-height: 1.5;
        margin-top: 0;
    }
}
</style>