<script setup lang="ts"></script>

<template>
  <div class="min-h-500px flex-col-stretch overflow-hidden lt-sm:overflow-auto">
    <NCard title="媒体账户" class="mb-16px">
      <NTabs type="line" animated>
        <NTabPane name="facebook" tab="Facebook">Facebook</NTabPane>
        <NTabPane name="google" tab="Google"><LookForward /></NTabPane>
        <NTabPane name="tiktok" tab="TikTok"><LookForward /></NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style scoped></style>
