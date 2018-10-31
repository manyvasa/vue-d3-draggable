<template lang="pug">
  #app
    .chart
      chart
    .control
      control
    .groups
      symbol#icon-cancel-circle(viewbox='0 0 16 16', width="16px", height="16px")
        path(d='M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z')
        path(d='M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z')
      group(
        v-for='group in dataGroups',
        :key='group.id',
        :groupName='group.name',
        :groupId='group.id',
        :listUsers='group.users')
</template>

<script>
  import Chart from './components/Chart'
  import Group from './components/Group'
  import Control from './components/Control'

  export default {
    name: 'app',
    components: {
      Chart,
      Control,
      Group,
    },
    computed: {
      dataGroups() {
        return this.$store.getters.dataGroups
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  body {
    background-color: #fff7e1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }

  .chart {
    display: flex;
    justify-content: center;
  }

  .control {
    padding-top: 20px;
  }

  .groups {
    display: flex;
    min-height: 270px;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: flex-start;
  }

</style>
