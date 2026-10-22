<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useHead({ title: notFound.value ? 'Lost · Boneshakers' : 'Error · Boneshakers' })
</script>

<template>
  <NuxtLayout>
    <div class="page">
      <PageHero
        :title="notFound ? 'Lost' : 'Oops'"
        :intro="notFound ? `We can't find that page. Our skeleton is checking the map. Click him to help.` : 'Something went wrong on our end. Please try again.'"
      >
        <template #mascot>
          <MascotSkeleton pose="lost" />
        </template>
        <button type="button" class="button" @click="clearError({ redirect: '/' })">Take me home</button>
      </PageHero>
    </div>
  </NuxtLayout>
</template>
