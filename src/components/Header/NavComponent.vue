<template>
    <nav>
        <ul>
            <li :class="{active : $store.state.stepNumber == 1}" data-number="1">
                <div class="step-number">1</div>
                <div class="text">
                    <span>step 1</span>
                    <div>your info</div>
                </div>
            </li>
            <li :class="{active : $store.state.stepNumber == 2}" data-number="2">
                <div class="step-number">2</div>
                <div class="text">
                    <span>step 2</span>
                    <div>select plan</div>
                </div>
            </li>
            <li :class="{active : $store.state.stepNumber == 3}" data-number="3">
                <div class="step-number">3</div>
                <div class="text">
                    <span>step 3</span>
                    <div>add-ons</div>
                </div>
            </li>
            <li :class="{active : $store.state.stepNumber == 4}"  data-number="4">
                <div class="step-number">4</div>
                <div class="text">
                    <span>step 4</span>
                    <div>summary</div>
                </div>
            </li>
        </ul>
    </nav>
</template>


<style lang="scss" scoped>
nav{
    background-image: url('../../assets/images/bg-sidebar-desktop.svg');
    @media (max-width: 992px){
        background-image: url('../../assets/images/bg-sidebar-mobile.svg');
        padding: 13px;
        display: flex;
        justify-content: center;
        height: 120px;
    }
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    border-radius: 10px;
    ul{
        @media (max-width: 992px) {
            display: flex;
            justify-content: center;
        }
    }
    li{
        margin-bottom: 30px;
        display: flex;            
        .text{
            text-transform: uppercase;
            @media (max-width: 992px){
                display: none;
            }
            span{
            color:#ccc;
            font-size: 14px;
            }
            div{
                color: white;
                margin-top: 5px;
            }
        }
        .step-number{
            color: white;
            border: 1px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            margin-right: 15px;
        }
    }
}
</style>