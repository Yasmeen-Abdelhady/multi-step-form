<template>
  <div class="container">
    <NavComponent />
    <div class="content"><router-view/></div>
  </div>
</template>

<script>
import NavComponent from './components/Header/NavComponent.vue'
export default {
  components: { NavComponent },
}
</script>

<style lang="scss">
.container{
  display: grid;
  grid-template-columns: 270px 1fr ;
  width: 70%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  min-height: 650px;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 0;
    min-height: auto;
  }
}
.content{
  margin-left: 40px;
  margin-right: 40px;
  @media (min-width: 992px){
    margin-left: 20px;
    margin-right: 20px;
  }
  @media (max-width: 992px){
    padding-top: 30px;
    padding-bottom: 55px;
  }
  position: relative;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

nav {
  padding: 30px;
  
  li {
    &.active .step-number{
      color: black;
      background-color: aquamarine;
    }
  }
}
</style>
