<template>
  <div id="app">
    <Chart></Chart>
    <div class="control">
      <button @click="addNewGroup()">Add Group</button>
      <input type="text" v-model="inputText">
    </div>
    <div class="layout">
      <Group
          v-for="group in dataGroups"
          :key="group.id"
          :groupName="group.name"
          :groupId="group.id"
          :listUsers="group.users"
      >
      </Group>
    </div>
  </div>
</template>

<script>
import Group from './components/Group'
import Chart from './components/Chart'
import {mapActions} from 'vuex'
import { getGroupId } from './services/getGroupId'

export default {
  name: 'app',
  components: {
    Group,
    Chart
  },
  data () {
    return {
      inputText: null
    }
  },
  computed: {
    dataGroups: {
      get() {
        return this.$store.getters.dataGroups
      },
      set(value) {
        this.$store.commit('updateList', value)
      }
    }
  },
  methods: {
    ...mapActions(['addGroup']),
    addNewGroup () {
      const nextId = getGroupId(this.dataGroups)
      const newGroup  = {id: nextId, name: this.inputText}
      this.addGroup(newGroup)
    },
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
    background-color: #deb887;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .layout {
    display: flex;
    flex-direction: row;
  }

</style>
