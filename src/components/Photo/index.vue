<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
const srcList = reactive([] as any)
onMounted(() => {
  getPhoto()
})

// 算出文件夹内有多少张图片
function countImagesInFolder() {
  const files = import.meta.globEager('../../assets/77/*.*')
  return Object.keys(files).length
}
// 给图片和预览数组添加url
function getPhoto() {
  const num: any = countImagesInFolder()

  for (let i = 1; i < num; i++) srcList.push(new URL(`../../assets/77/${i}.jpg`, import.meta.url).href)
}
// 定位到当前点击的图片
function getSrcList(index: any) {
  return srcList.slice(index).concat(srcList.slice(0, index))
}
</script>

<template>
  <div class="pic">
    <el-container>
      <div class="image__preview">
        <el-scrollbar height="84vh">
          <el-image v-for="(item, index) in srcList" :key="index" class="elImage" :src="item" :preview-src-list="getSrcList(index)" fit="cover" lazy />
        </el-scrollbar>
      </div>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.image__preview {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.elImage {
  width: 30vw;
  height: 40vw;
  margin: 0 20px 20px 0;
  max-width: 300px;
  max-height: 400px;
}
</style>
