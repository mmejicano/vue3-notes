<template>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a v-for="(period, index) in periods" :key="index">
                {{period}}
            </a>
        </span>
    </nav>
</template>

<script setup lang="ts">
const periods = ["Today", "Week", "Month"]
</script>

