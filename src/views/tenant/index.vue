<script setup lang="tsx">
import { NButton, NTag } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { fetchGetTenantList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { tenantStatusRecord } from '@/constants/business';
import { useTable, useTableOperate } from '@/hooks/common/table';
import TenantSearch from './modules/tenant-search.vue';
import TenantTableHeader from './modules/tenant-table-header.vue';
import TenantOperateModal, { type OperateType } from './modules/tenant-operate-modal.vue';

const appStore = useAppStore();

const { bool: visible, setTrue: openModal } = useBoolean();
const operateType = ref<OperateType>('add');

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetTenantList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    status: null,
    code: null,
    name: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'name',
      title: $t('page.tenant.name'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'code',
      title: $t('page.tenant.code'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'contacts',
      title: $t('page.tenant.contacts'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'phone',
      title: $t('page.tenant.phone'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'status',
      title: $t('page.tenant.status'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          2: 'warning'
        };

        const label = $t(tenantStatusRecord[row.status]);

        return <NTag type={tagMap[row.status]}>{label}</NTag>;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => handleEdit(row)}>
            {$t('common.edit')}
          </NButton>
        </div>
      )
    }
  ]
});

const { checkedRowKeys } = useTableOperate(data, getData);

const editingData: Ref<Api.TenantManage.Tenant | null> = ref(null);

function handleAdd() {
  operateType.value = 'add';
  openModal();
}

function handleEdit(item: Api.TenantManage.Tenant) {
  operateType.value = 'edit';
  editingData.value = { ...item };

  openModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <TenantSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.tenant.common.list')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TenantTableHeader v-model:columns="columnChecks" :loading="loading" @add="handleAdd" @refresh="getData" />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <TenantOperateModal
        v-model:visible="visible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
