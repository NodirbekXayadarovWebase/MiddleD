<script setup lang="ts">
import type { FormInst, FormRules, FormValidationError } from 'naive-ui'
import { NCard, NForm, NFormItem, NInput, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EditPageHeader from '@/components/EditPageHeader.vue'
import { useUsersStore } from '../store'

const router = useRouter()
const route = useRoute()
const message = useMessage()

const usersStore = useUsersStore()
const { item, loading } = storeToRefs(usersStore)
const { createItem, updateItem } = usersStore

const formRef = useTemplateRef<FormInst>('formRef')

const isEdit = computed(() => !!route.params.id)

const rules: FormRules = {
  name: [{ required: true, message: 'Majburiy maydon', trigger: 'blur' }],
  username: [{ required: true, message: 'Majburiy maydon', trigger: 'blur' }],
}

const pageTitle = computed(() => (isEdit.value ? 'Foydalanuvchini tahrirlash' : "Foydalanuvchi qo'shish"))

const pageBreadcrumbs = computed(() => [
  { text: 'Foydalanuvchilar', to: '/query/users' },
  { text: pageTitle.value },
])

async function handleSave() {
  if (isEdit.value) {
    await updateItem(item.value)
  } else {
    await createItem(item.value)
  }
  router.push('/query/users')
}

function handleValidateButtonClick(e: MouseEvent) {
  if (e) {
    e.preventDefault()
  }
  formRef.value?.validate((errors: FormValidationError[] | undefined) => {
    if (!errors) {
      handleSave()
    } else {
      message.error("Formani to'ldiring")
    }
  })
}
</script>

<template>
  <NForm ref="formRef" :model="item" :rules="rules" size="large">
    <EditPageHeader
      :title="pageTitle"
      :breadcrumbs="pageBreadcrumbs"
      :loading="loading"
      back-link="/query/users"
      @save="handleValidateButtonClick"
    />

    <NCard>
      <div class="grid grid-cols-3 gap-x-6 md:grid-cols-2 sm:grid-cols-1">
        <NFormItem required path="name" label="Ism">
          <NInput v-model:value="item.name" autofocus placeholder="Ism" />
        </NFormItem>
        <NFormItem required path="username" label="Login">
          <NInput v-model:value="item.username" placeholder="Login" />
        </NFormItem>
        <NFormItem path="phone" label="Telefon">
          <NInput v-model:value="item.phone" placeholder="Telefon" />
        </NFormItem>
        <NFormItem path="website" label="Sayt">
          <NInput v-model:value="item.website" placeholder="Sayt" />
        </NFormItem>
      </div>
    </NCard>
  </NForm>
</template>
