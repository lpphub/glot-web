<script setup lang="tsx">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { tenantStatusOptions } from '@/constants/business';
import { fetchGetAllRoles, postTenant } from '@/service/api';

defineOptions({
  name: 'TenantOperateModal'
});

export type OperateType = NaiveUI.TableOperateType;

interface Props {
  /** the type of operation */
  operateType: OperateType;
  rowData?: Api.TenantManage.Tenant | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<OperateType, string> = {
    add: $t('page.tenant.addTenant'),
    edit: $t('page.tenant.editTenant')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.TenantManage.Tenant,
  'id' | 'name' | 'code' | 'contacts' | 'phone' | 'address' | 'size' | 'status' | 'roles'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    name: '',
    code: '',
    contacts: '',
    phone: '',
    address: '',
    size: '',
    status: 1,
    roles: []
  };
}

const disabledEdit = computed(() => props.operateType === 'edit');

type RuleKey = Extract<keyof Model, 'name' | 'code'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  code: defaultRequiredRule
};

const roleOptions = ref<CommonType.Option<string>[]>([]);

async function getRoleOptions() {
  const { error, data } = await fetchGetAllRoles();

  if (!error) {
    const options = data.map(item => ({
      label: item.name,
      value: item.code
    }));

    roleOptions.value = [...options];
  }
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (!props.rowData) return;

  if (props.operateType === 'edit') {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  const { error } = await postTenant(model as Api.TenantManage.Tenant);
  if (!error) {
    window.$message?.success($t('common.updateSuccess'));
    emit('submitted');
  }
  closeDrawer();
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    getRoleOptions();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-800px">
    <NScrollbar class="h-280px pr-20px">
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="100">
        <NGrid responsive="screen" item-responsive>
          <NFormItemGi span="24 m:12" :label="$t('page.tenant.name')" path="name">
            <NInput v-model:value="model.name" :placeholder="$t('page.tenant.formTip.name')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.tenant.code')" path="code">
            <NInput v-model:value="model.code" :disabled="disabledEdit" :placeholder="$t('page.tenant.formTip.code')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.tenant.contacts')" path="contacts">
            <NInput v-model:value="model.contacts" :placeholder="$t('page.tenant.formTip.contacts')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.tenant.phone')" path="phone">
            <NInput v-model:value="model.phone" :placeholder="$t('page.tenant.formTip.phone')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.tenant.address')" path="address">
            <NInput v-model:value="model.address" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.tenant.size')" path="size">
            <NInput v-model:value="model.size" class="w-full" />
          </NFormItemGi>

          <NFormItemGi span="24 m:12" :label="$t('page.tenant.status')" path="status">
            <NRadioGroup v-model:value="model.status">
              <NRadio
                v-for="item in tenantStatusOptions"
                :key="item.value"
                :value="Number(item.value)"
                :label="$t(item.label)"
              />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.tenant.roleScope')" path="roles">
            <NSelect
              v-model:value="model.roles"
              multiple
              :options="roleOptions"
              :placeholder="$t('page.tenant.formTip.roles')"
            />
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NScrollbar>
    <template #footer>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
