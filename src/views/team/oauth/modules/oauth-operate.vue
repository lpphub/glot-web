<script setup lang="ts">
import { $t } from '@/locales';
import { fetchGetOAuthUrl } from '@/service/api/oauth';

defineOptions({
  name: 'OAuthOperate'
});

export type OAuthPlat = 'facebook' | 'google';

const oauthPlat = defineModel<OAuthPlat>('oauthPlat');

async function openOAuthPage() {
  if (!oauthPlat.value) {
    return;
  }
  const { data, error } = await fetchGetOAuthUrl(oauthPlat.value);
  if (!error) {
    window.open(data, '_blank', 'width=550,height=640');
  }
}
</script>

<template>
  <NButton type="primary" @click="openOAuthPage">{{ $t('page.team.oauth.authBind') }}</NButton>
</template>
