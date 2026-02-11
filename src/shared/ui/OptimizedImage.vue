<template>
  <img
    :src="src"
    :alt="alt"
    :loading="loading"
    :decoding="decoding"
    :width="width"
    :height="height"
    :class="imageClass"
    @load="onLoad"
    @error="onError"
  />
</template>

<script>
export default {
  name: "OptimizedImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    loading: {
      type: String,
      default: "lazy",
      validator: (value) => ["lazy", "eager"].includes(value),
    },
    decoding: {
      type: String,
      default: "async",
      validator: (value) => ["async", "sync", "auto"].includes(value),
    },
    width: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    imageClass: {
      type: String,
      default: "",
    },
  },
  methods: {
    onLoad(event) {
      this.$emit("load", event);
    },
    onError(event) {
      this.$emit("error", event);
    },
  },
};
</script>
