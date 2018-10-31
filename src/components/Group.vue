<template lang="pug">
  div(:class='$style.group')
    div(:class='$style.header')
      div
        span {{ groupName || 'Group name'}}
      div
        a(href='#', @click='removeGroup(id)')
          svg.icon.icon-cancel-circle
            use(xlink:href='#icon-cancel-circle')
    div(v-if='groupUsers.length === 0')
      span В группе пусто
    draggable(
      v-model='groupUsers',
      :options="{group:'main', animation: 150}",
      @start='drag=true',
      @add='updateUsers',
      @remove='updateUsers',
      :class='$style.users',
      :move="onMoveCallback"
    )
      a(v-for='user in groupUsers', :class='$style.item', :name='fetchUserName(user)') {{fetchUserName(user)}}
      a(:class='$style.entry')
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

    methods: {
      onMoveCallback(evt) {
        // console.log(evt.target)
        //
        // const movedUserId = evt.draggedContext.element
        // const checkUserId = evt.relatedContext.list.some((item) => {
        //   return item === movedUserId
        // })
        // if (checkUserId) return false
        // //нельзя в свой же
      },

      updateUsers() {
        // const groupUsersUniq = this.groupUsers.filter((item, pos) => {
        //   return this.groupUsers.indexOf(item) === pos;
        // })

        this.$store.getters.dataGroups.filter((group) => {
          if (group.id === this.id) {
            group.users = this.groupUsers
          }
        })
      },

      ...mapActions(['removeGroup']),

      fetchUserName (userId) {
        return this.$store.getters.dataUsers.filter(user => user.id === userId)[0].username;
      }
    }

  }
</script>

<style module>
  .group {
    background-color: #e8e8e8;
    min-height: 20px;
    width: 300px;
    flex: 0 0 auto;
    border: 1px solid #808080;
    border-radius: 10px;
    margin: 5px;
    box-sizing: border-box;
    box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.75);
  }

  .header{
    background-color: #64b564;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 8px 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    color: white;
    font-weight: 600;
    box-shadow: 0 3px 12px -4px rgba(0,0,0,0.75);
  }

  .header a {
    color: #556b2f;
  }

  .users {
    padding: 0px 20px;
  }

  .item {
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 0 5px 0px rgba(9,45,66,.25);
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    padding: 4px 2px;
    max-width: 300px;
    text-decoration: none;
  }

  .item:hover {
    background-color: #dcffdc;
  }

  .entry {
    display: block;
    height: 30px;
  }
</style>