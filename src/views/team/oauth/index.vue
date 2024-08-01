<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import OAuthOperate, { type OAuthPlat } from './modules/oauth-operate.vue';

const plat = ref<OAuthPlat>('facebook');

function tabSwitch(tab: string) {
  plat.value = tab as OAuthPlat;
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch overflow-hidden lt-sm:overflow-auto">
    <NCard :title="$t('page.team.oauth.account')" class="mb-16px">
      <NTabs type="line" animated @update:value="tabSwitch">
        <NTabPane name="facebook" tab="Facebook"><OAuthOperate :oauth-plat="plat" /></NTabPane>
        <NTabPane name="google" tab="Google"><OAuthOperate :oauth-plat="plat" /></NTabPane>
        <NTabPane name="tiktok" tab="TikTok"><LookForward /></NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style scoped></style>
