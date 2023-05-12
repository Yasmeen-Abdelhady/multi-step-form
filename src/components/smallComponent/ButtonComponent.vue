<template>
    <button>
        <slot name="action"></slot>
    </button>
</template>

// <script>
// export default {

// }
// </script>

<style lang="scss" scoped>
button{
    background-color: hsl(213, 96%, 18%);
    color: white;
    outline: none;
    border: none;
    width: 110px;
    height: 45px;
    border-radius: 5px;
    text-transform: capitalize;
    margin-top: 50px;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover{
        opacity: .9;
    }
}
</style>