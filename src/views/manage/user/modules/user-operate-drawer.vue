<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchGetAllRoles, fetchGetTenantList, postUser } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';

defineOptions({
  name: 'UserOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.User | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const isEdit = computed(() => props.operateType === 'edit');

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.user.addUser'),
    edit: $t('page.manage.user.editUser')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.SystemManage.User,
  'id' | 'username' | 'nickname' | 'phone' | 'email' | 'roles' | 'status' | 'tenantId'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    username: '',
    nickname: '',
    phone: '',
    email: '',
    roles: [],
    status: null,
    tenantId: null
  };
}

type RuleKey = Extract<keyof Model, 'username' | 'status' | 'phone' | 'email'>;

const rules = computed<Record<RuleKey, App.Global.FormRule>>(() => {
  const { patternRules } = useFormRules(); // inside computed to make locale reactive
  return {
    username: defaultRequiredRule,
    status: defaultRequiredRule,
    email: patternRules.email,
    phone: patternRules.phone
  };
});

/** the enabled role options */
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

const tenantLoading = ref(false);
const tenantOptions = ref<CommonType.Option<number>[]>([]);

async function getTenantOptions(query: string) {
  if (!query.length) {
    tenantOptions.value = [];
    return;
  }

  tenantLoading.value = true;
  const { error, data } = await fetchGetTenantList({ name: query });

  if (!error) {
    const options = data.list.map(item => ({
      label: item.name,
      value: item.id
    }));

    tenantOptions.value = [...options];
  }
  tenantLoading.value = false;
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  const { error } = await postUser(model as Api.SystemManage.User);
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
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.user.userName')" path="username">
          <NInput v-model:value="model.username" :placeholder="$t('page.manage.user.form.userName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.nickName')" path="nickname">
          <NInput v-model:value="model.nickname" :placeholder="$t('page.manage.user.form.nickName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userPhone')" path="phone">
          <NInput v-model:value="model.phone" :placeholder="$t('page.manage.user.form.userPhone')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userEmail')" path="email">
          <NInput v-model:value="model.email" :placeholder="$t('page.manage.user.form.userEmail')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userStatus')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio
              v-for="item in enableStatusOptions"
              :key="item.value"
              :value="Number(item.value)"
              :label="$t(item.label)"
            />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userRole')" path="roles">
          <NSelect
            v-model:value="model.roles"
            multiple
            :options="roleOptions"
            :placeholder="$t('page.manage.user.form.userRole')"
          />
        </NFormItem>
        <NFormItem v-if="!isEdit" :label="$t('page.manage.user.userTenant')" path="tenant">
          <NSelect
            v-model:value="model.tenantId"
            filterable
            :placeholder="$t('page.manage.user.form.userTenant')"
            :options="tenantOptions"
            :loading="tenantLoading"
            clearable
            remote
            @search="getTenantOptions"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
