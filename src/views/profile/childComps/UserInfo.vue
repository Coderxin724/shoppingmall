<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <div class="privateImage">
          <span class="iconfont icon-touxiang"></span>
        </div>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span class="iconfont icon-shouji"> </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
};
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}

#user-info .privateImage {
  float: left;
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  position: relative;
}
#user-info .privateImage .icon-touxiang {
  font-size: 60px;
  position: absolute;
  top: -4px;
  color: #eee;
}

.left {
  float: left;
}

#user-info .arrow-svg {
  width: 11px;
  height: 22px;
  margin-top: 18px;
}

#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}

#user-info .login-info .phone {
  position: relative;

  font-size: 13px;
  margin-top: 5px;
  font-weight: 300;
}

#user-info .login-info .phone .icon-mobile {
  position: absolute;
  width: 12px;
  height: 18px;
  left: -15px;
  top: 0px;
}
</style>
