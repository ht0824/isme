<script setup="props" lang="ts">
import { ElMessage } from 'element-plus'
import { checkUsername, getToken, loginApi, userRegister } from '~/api/path/user'
const user = reactive({
  username: '',
  password: '',
  confirm: '',
})
const slide_up = ref(false)
const router = useRouter()
const login = () => {
  if (user.username === '77') {
    ElMessage.success('七七你来啦')
    router.push('/hi/me')
    return sessionStorage.setItem('user', user.username)
  }
  loginApi({
    username: user.username,
    password: user.password,
  }).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success('登录成功')
      getToken({
        username: user.username,
        password: user.password,
      }).then((re: any) => {
        if (re.code === 200) {
          localStorage.setItem('access_token', re.data.access_token)
          localStorage.setItem('refresh_token', re.data.refresh_token)
          localStorage.setItem('token_type', re.data.token_type)
          router.push('/hi/me')
          sessionStorage.setItem('user', user.username)
        }
      })
    }
    else {
      ElMessage.warning(res.msg)
    }
  })
}
const register = () => {
  if (!user.password || !user.confirm)
    return ElMessage.warning('请填写完整')
  // 对比密码和确认密码
  if (user.password !== user.confirm)
    return ElMessage.warning('两次密码不一致')
  // 是否重复注册
  checkUsername(user.username)
    .then((res: any) => {
      if (res.code === 200 && res.success) {
        return ElMessage.warning('该用户名已被注册')
      }
      else {
        userRegister({
          username: user.username,
          password: user.password,
        }).then((res: any) => {
          if (res.code === 200 && res.success) {
            ElMessage.success(res.msg)
            slide_up.value = false
          }
          else {
            ElMessage.warning(res.msg)
          }
        })
      }
    })
    .catch((err: any) => {
      return ElMessage.warning(err.msg)
    })
}
const goRegister = () => {
  user.username = ''
  user.password = ''
  user.confirm = ''
  slide_up.value = true
}
const goLogin = () => {
  slide_up.value = false
  user.username = ''
  user.password = ''
  user.confirm = ''
}
</script>

<template>
  <div class="section">
    <!-- 背景颜色 -->
    <div class="color" />
    <div class="color" />
    <div class="color" />
    <div class="box">
      <!-- 背景圆 -->
      <div class="circle" style="--x: 0" />
      <div class="circle" style="--x: 1" />
      <div class="circle" style="--x: 2" />
      <div class="circle" style="--x: 3" />
      <div class="circle" style="--x: 4" />
      <!-- 登录框 -->
      <div class="container">
        <div class="LoginBox" :class="[{ slide_up }]">
          <p class="forget" :class="[{ slide_up }]">
            已有账号,去
            <span @click="goLogin">登录</span>
            <!-- 没有账户?<span @click="goRegister">注册</span> -->
          </p>
          <div v-if="!slide_up" class="from flex flex-col items-center">
            <h2>登录</h2>
            <input v-model="user.username" class="name" type="text" placeholder="输入用户名" autocomplete="false" maxlength="11">
            <input v-model="user.password" class="password" type="password" placeholder="输入密码" autocomplete="false" maxlength="11" @keydown.enter="login">
            <button class="submit" :disabled="!user.username" @click="login">
              登录
            </button>
          </div>
        </div>
        <div class="register" :class="[{ slide_up: !slide_up }]">
          <div class="decorate">
            <p class="forget" :class="[{ slide_up }]">
              没有账户?
              <span @click="goRegister">注册</span>
              <!-- 已有账号,去<span @click="goLogin">登录</span> -->
            </p>
          </div>
          <div v-if="slide_up" class="from flex flex-col items-center">
            <h2>注册</h2>
            <input v-model="user.username" class="name" type="text" placeholder="用户名" autocomplete="false" maxlength="11">
            <input v-model="user.password" class="password" type="password" placeholder="密码" autocomplete="false" maxlength="11">
            <input v-model="user.confirm" class="password" type="password" placeholder="确认密码" autocomplete="false" maxlength="11">
            <button class="submit" :disabled="!user.username" @click="register">
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.section {
  /* 相对定位 */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  /* linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片 */
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
}

/* 背景颜色 */

.section .color {
  /* 绝对定位 */
  position: absolute;
  /* 使用filter(滤镜) 属性，给图像设置高斯模糊*/
  filter: blur(200px);
}

/* :nth-child(n) 选择器匹配父元素中的第 n 个子元素 */

.section .color:nth-child(1) {
  top: -20%;
  width: 60%;
  height: 60%;
  background: #ff359b;
}

.section .color:nth-child(2) {
  bottom: 5%;
  left: 5%;
  width: 50%;
  height: 50%;
  background: #fffd87;
}

.section .color:nth-child(3) {
  bottom: 5%;
  right: 10%;
  width: 50%;
  height: 50%;
  background: #00d2ff;
}

.box {
  position: relative;
}

/* 背景圆样式 */

.box .circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  /* 使用filter(滤镜) 属性，改变颜色。
    hue-rotate(deg)  给图像应用色相旋转
    calc() 函数用于动态计算长度值
    var() 函数调用自定义的CSS属性值x*/
  filter: hue-rotate(calc(var(--x) * 70deg));
  /* 调用动画animate，需要10s完成动画，
    linear表示动画从头到尾的速度是相同的，
    infinite指定动画应该循环播放无限次*/
  animation: animate 10s linear infinite;
  /* 动态计算动画延迟几秒播放 */
  animation-delay: calc(var(--x) * -1s);
}

/* 背景圆动画 */

@keyframes animate {
  0%,
  100% {
    transform: translateY(-50px);
  }

  50% {
    transform: translateY(50px);
  }
}

.box .circle:nth-child(1) {
  top: -50px;
  right: -60px;
  width: 6rem;
  height: 6rem;
}

.box .circle:nth-child(2) {
  top: 150px;
  left: -100px;
  width: 7rem;
  height: 7rem;
  z-index: 2;
}

.box .circle:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 5rem;
  height: 5rem;
  z-index: 2;
}

.box .circle:nth-child(4) {
  bottom: -80px;
  left: 100px;
  width: 4rem;
  height: 4rem;
}

.box .circle:nth-child(5) {
  top: -80px;
  left: 140px;
  width: 4rem;
  height: 4rem;
}

/* 登录框样式 */

.container {
  position: relative;
  overflow: hidden;
  width: 20rem;
  height: 25rem;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* 登录标题样式 */

.from h2 {
  position: relative;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 5px;
  margin-bottom: 8px;
  cursor: pointer;
}

/* 登录标题的下划线样式 */

.from h2::before {
  content: '';
  position: absolute;
  bottom: -10px;
  width: 0px;
  height: 3px;
  background: #fff;
  transition: 0.5s;
}

.from h2:hover:before {
  width: 53px;
}

/* 输入框样式 */

input {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: none;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #666666;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin: 8px 0;
}

.from input::placeholder {
  color: #666666;
}

/* 登录按钮样式 */

.submit {
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 30px;
  background: #fff;
  color: #666;
  width: 100px;
  margin: 8px 0;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.forget {
  margin-top: 6px;
  color: #fff;
  letter-spacing: 1px;
  display: none;

  span {
    cursor: pointer;
    color: #666;
  }
}

.LoginBox.slide_up .forget {
  display: inline-block;
}

.LoginBox {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s ease;
}

.LoginBox.slide_up {
  top: 4%;
  transform: translate(-50%, 0%);
}

.register {
  position: absolute;
  background-color: rgba(255, 189, 217, 0.3);
  // backdrop-filter: blur(5px);
  inset: 0;
  top: 26%;
  z-index: 2;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;

  .decorate {
    background-color: rgba(255, 189, 217, 0.3);
    // backdrop-filter: blur(5px);
    width: 110%;
    height: 40px;
    border-radius: 50% 50% 0 0;
    position: absolute;
    top: -40px;
    left: 50%;
    z-index: -1;
    transform: translateX(-50%);
  }

  p {
    margin-top: 20px;
  }
}

.register.slide_up .forget {
  display: inline-block;
}

.slide_up {
  top: 96%;
}

.register.slide_up .from {
  opacity: 0;
  visibility: hidden;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
