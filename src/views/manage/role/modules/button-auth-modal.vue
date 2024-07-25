<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { $t } from '@/locales';
import { bindRoleMenu, fetchGetMenuButton, fetchGetRoleMenu } from '@/service/api';

defineOptions({
  name: 'ButtonAuthModal'
});

interface Props {
  /** the roleId */
  roleId: number;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function closeModal() {
  visible.value = false;
}

const title = computed(() => $t('common.edit') + $t('page.manage.role.buttonAuth'));

const tree = shallowRef<Api.SystemManage.MenuButton[]>([]);

async function getAllButtons() {
  const { error, data } = await fetchGetMenuButton();
  if (!error) {
    tree.value = data;
  }
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  const { error, data } = await fetchGetRoleMenu({ roleId: props.roleId, mode: 2 });
  if (!error) {
    checks.value = data;
  }
}

async function handleSubmit() {
  const data: Api.SystemManage.RoleMenu = {
    roleId: props.roleId,
    mode: 2,
    ids: checks.value
  };
  const { error } = await bindRoleMenu(data);
  if (!error) {
    window.$message?.success?.($t('common.modifySuccess'));
  }

  closeModal();
}

function init() {
  getAllButtons();
  getChecks();
}

// init();
watch(visible, val => {
  if (val) {
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <NTree
      v-model:checked-keys="checks"
      :data="tree"
      key-field="id"
      block-line
      checkable
      expand-on-click
      virtual-scroll
      class="h-280px"
    />
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" class="mt-16px" @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" class="mt-16px" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
