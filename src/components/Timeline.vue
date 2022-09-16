<script setup lang="ts">
import { DateTime } from "luxon";
import { computed, ref } from "vue";
import { Post, thisMonth, thisWeek, TimelinePost, today } from "../posts";
import TimelineItem from "./TimelineItem.vue";

// type Period = "Today" | "This Week" | "This Month"
// const periods: string[] = ["Today", "Week", "Month"]
// const periods: Period[] = ["Today", "This Week", "This Month"]

const periods = ["Today", "This Week", "This Month"] as const;
type Period = typeof periods[number];

const selectedPeriod = ref<Period>("Today");

function selectPeriod(period: Period) {
  selectedPeriod.value = period;
}

const posts = computed<TimelinePost[]>(() =>
  [today, thisWeek, thisMonth]
    .map((post) => {
      return {
        ...post,
        created: DateTime.fromISO(post.created),
      };
    })
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }
      if (selectedPeriod.value === "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }
      return post;
    })
);
</script>
<template>
  <nav class="is-link panel">
    <p class="panel-heading">My app</p>
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === selectedPeriod }"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem v-for="post of posts" :key="post.id" :post="post" />
  </nav>
</template>



