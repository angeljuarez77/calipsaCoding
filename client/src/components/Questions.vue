<template>
  <div>
    <h1>Question</h1>
    <p>{{ message.message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  props: ['message'],
}
</script>
