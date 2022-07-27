<template>
  <vats-page :has-permission="true" title="Dashboard" @init="handlePass">
    这是dashboard页面
    <p>当前语言：{{ $t('common.test') }}</p>
  </vats-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardIndex',
});
</script>

<script lang="ts" setup>
const handlePass = () => {
  console.log('此处初始化数据');
};
</script>

<style scoped lang="scss"></style>
