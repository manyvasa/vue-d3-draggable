<template>
  <div :class="$style.group">
    <div :class="$style.header">
      <div>
        <span>{{ groupName || 'Group name'}}</span>
      </div>
      <div>
        <a href="#" @click="removeGroup(id)">X</a>
      </div>
    </div>
    <div v-if="groupUsers.length === 0">
      <span>В группе пусто</span>
    </div>
    <draggable
        v-model="groupUsers"
        :options="{group:'people'}"
        @start="drag=true"
        @end="drag=false"
    >
      <a
          v-for="user in groupUsers"
          :class="$style.item"
      >
        {{fetchUserName(user)}}
      </a>
      <a :class="$style.entry"></a>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import {mapActions} from 'vuex'


  export default {
    name: "group",
    components: {
      draggable
    },
    props: {
      groupName: String,
      groupId: String,
      listUsers: Array
    },
    data () {
      return {
        groupUsers: this.listUsers,
        id: this.groupId
      }
    },

    watch: {
      groupUsers: function () {
        this.dataGroups.filter((group) => {
          if (group.id === this.id) {
            group.users = this.groupUsers
          }
        })
      },
    },

    computed: {
      dataUsers: {
        get() {
          return this.$store.getters.dataUsers
        },
        set(value) {}
      },
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
      ...mapActions(['removeGroup']),

      fetchUserName (userId) {
        let res = this.dataUsers.filter(user => user.id === userId)[0];
        return res.username;
      }
    }

  }
</script>

<style module>
  .group {
    background-color: #8fbc8f;
    min-height: 20px;
    width: 300px;
    padding: 10px;
    border: 1px solid #777777;
    border-radius: 10px;
    margin: 5px;
    box-shadow: inset 0px 0px 1px 0px rgba(0,0,0,0.75);
  }

  .header{
    border-bottom: 1px solid black;
    padding: 4px 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    color: white;
    font-weight: 600;
  }

  .header a {
    color: #556b2f;
  }

  .item {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,45,66,.25);
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    text-decoration: none;
  }

  .entry {
    display: block;
    height: 30px;
  }
</style>