<template>
  <div class="wrapper">
    <div class="ui secondary  menu">
      <a class="item custom-item" style="padding: 0;">
        <div class="blue ui buttons">
          <button class="ui button"><i class="world icon"></i>Countries</button>
          <button class="ui button"><i class="flag icon"></i>Info card</button>
          <button class="ui button"><i class="bookmark icon"></i>Visited list</button>
        </div>
      </a>
      <div class="right menu">
        <div class="item custom-item">
          <div class="ui icon input">
            <input type="text" placeholder="Search...">
            <i class="search link icon"></i>
          </div>
        </div>
        <a class="item" style="padding: 0;">
        <div class="ui buttons">
          <button class="ui positive button" @click="Login()" v-show="!Authenticated">
            <i class="sign in icon"></i>
            Log-in
           </button>
           <button class="ui button" @click="Logout()" v-show="Authenticated">
             <i class="sign out icon"></i>
              Log-out
           </button> 
        </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'menu',
  props: ['Login', 'Logout', 'Authenticated'],
}
</script>

<style scoped>
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-color: rgba(33,133,208,0.1);
}
.wrapper .custom-item h4 {
  color: white;
}
</style>