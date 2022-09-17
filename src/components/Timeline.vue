<script setup lang="ts">
import { DateTime } from "luxon";
import { computed, ref } from "vue";
import { Post, thisMonth, thisWeek, TimelinePost, today } from "../posts";
import TimelineItem from "./TimelineItem.vue";
// import { usePosts } from '../stores/posts';
import { usePosts } from '../stores/postpinia';
import {periods} from '../constants'
// type Period = "Today" | "This Week" | "This Month"
// const periods: string[] = ["Today", "Week", "Month"]
// const periods: Period[] = ["Today", "This Week", "This Month"]
const postsStore = usePosts()

// const selectedPeriod = ref<Period>("Today");

// function selectPeriod(period: Period) {
//   selectedPeriod.value = period;
// }
await postsStore.fetchPosts()

</script>
<template>
  <nav class="is-link panel">
    <p class="panel-heading">My app</p>
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === postsStore.selectedPeriod }"
        @click="postsStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem v-for="post of postsStore.filteredPosts" :key="post.id" :post="post" />
  </nav>

<p>
  State: 
  <pre>
    <!-- {{ postsStore.getState().foo }} -->
    {{ postsStore.$state }}
  </pre>
</p>


</template>



