<script setup lang="ts">
import Plum from '~/components/Plum.vue'
const users: any = {
  8010: {
    name: 'HuTu',
    cName: '胡涂',
    job: '前端',
  },
  8009: {
    name: 'LiJuShuai',
    cName: '李居帅',
    job: '后端',
  },
  8011: {
    name: 'WangYu',
    cName: '王愉',
    job: '前端',
  },
}
const port = ref<any>(8010)

onMounted(() => {
  const hport = window.location.port
  const arr: number[] = [8009, 8010, 8011]
  if (arr.every((item: any) => item !== hport)) return (port.value = 8010)

  port.value = window.location.port
})
</script>

<template>
  <Plum />
  <div class="max-w-153 text-left mt-23 mx-auto">
    <h2 text-3xl>
      {{ users[port].name }}
    </h2>
    <p>嘿 你好 我是{{ users[port].cName }}， 一名{{ users[port].job }}开发工程师</p>
    <p>兴趣使然让我成为了一名程序员，从事{{ users[port].job }}开发工作至今</p>
    <p>对这份爱好始终怀抱着热忱，将来也会持续下去</p>
    <p>在工作之余、吃美食、喝奶茶、打游戏、看电影、羽毛球、台球、烧烤、钓鱼、.....等等</p>
    <p>如果你碰巧有这些爱好，又刚好在武汉，不妨可以见个面，交个朋友</p>
    <p>什么样的年纪都不妨碍做自己喜欢的事情</p>
    <p>你所见皆是我，好与坏我都不反驳</p>
    <p>生活会把该你的东西都给你，或早或晚</p>
    <div />
  </div>
</template>

<style lang="less" scoped>
p {
  line-height: 2rem;
  margin: 1.5rem 0;
}
</style>
