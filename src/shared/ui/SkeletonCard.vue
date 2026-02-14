<template>
  <div class="skeleton-card" :aria-hidden="true">
    <div class="skeleton-header">
      <div class="skeleton-badge skeleton-shimmer" />
      <div class="skeleton-title skeleton-shimmer" />
    </div>
    <div class="skeleton-body">
      <div class="skeleton-image skeleton-shimmer" />
      <div class="skeleton-lines">
        <div class="skeleton-line skeleton-shimmer" />
        <div class="skeleton-line skeleton-shimmer short" />
        <div class="skeleton-line skeleton-shimmer medium" />
      </div>
    </div>
    <div class="skeleton-footer">
      <div class="skeleton-button skeleton-shimmer" />
      <div class="skeleton-button skeleton-shimmer small" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonCard",
};
</script>

<style scoped>
.skeleton-card {
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(161, 152, 130, 0.15);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(161, 152, 130, 0.08) 25%,
    rgba(161, 152, 130, 0.15) 50%,
    rgba(161, 152, 130, 0.08) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skeleton-badge {
  width: 60px;
  height: 24px;
  flex-shrink: 0;
}

.skeleton-title {
  width: 60%;
  height: 20px;
}

.skeleton-body {
  display: flex;
  gap: 1rem;
}

.skeleton-image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 8px;
}

.skeleton-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
}

.skeleton-line {
  height: 12px;
  width: 100%;
}

.skeleton-line.short {
  width: 40%;
}

.skeleton-line.medium {
  width: 70%;
}

.skeleton-footer {
  display: flex;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(161, 152, 130, 0.1);
}

.skeleton-button {
  height: 36px;
  width: 100px;
  border-radius: 6px;
}

.skeleton-button.small {
  width: 70px;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer {
    animation: none;
    background: rgba(161, 152, 130, 0.12);
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
