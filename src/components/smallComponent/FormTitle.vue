<template>
    <div class="title">
        <h1> <slot name="h1"></slot> </h1>
        <p> <slot name="p"></slot> </p>
    </div>
</template>

<style lang="scss" scoped>
.title{
    margin-bottom: 40px;
}
</style>