<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- 自定义指令 -->
    <!-- <div v-zyh.a.b="msg"></div> -->
    点击
    <button v-add.click.demo="handleClick">点击</button>
    <div class="box"
         v-color>
         测试，我是红色额
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  directives: {
    // 感觉这里都可以把各种指令实现一遍
    add (el, { modifiers, value }) {
      // modifiers <button>​点击​</button>​ {click: true, demo: true} ƒ handleClick() {}
      console.log('modifiers', el, modifiers, value)
      el.addEventListener('click', value)
    }
  },
  methods: {
    handleClick () {
      console.log('我被点击了 哈哈哈')
    }
  }
}
</script>
