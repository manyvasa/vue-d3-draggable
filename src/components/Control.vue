<template lang="pug">
  div(:class='$style.layout')
    div(:class='$style.ctrls')
      button(@click='addNewGroup()', :class='$style.btn') Добавить группу
      input(type='text', v-model='inputText', :class='$style.field', placeholder='Введите название')
    div(:class='$style.infoText', v-show='infoText') {{infoText}}

</template>

<script>
  import {mapActions} from 'vuex'
  import { getGroupId } from '../services/getGroupId'

  export default {
    name: "control",
    data () {
      return {
        inputText: null,
        infoText: null
      }
    },
    computed: {
      dataGroups() {
        return this.$store.getters.dataGroups
      }
    },
    methods: {
      ...mapActions(['addGroup']),
      addNewGroup () {
        if (this.inputText !== null) {
          const nextId = getGroupId(this.dataGroups)
          const newGroup  = {id: nextId, name: this.inputText}
          this.addGroup(newGroup)
          this.inputText = null
          this.infoText = 'Группа создана.'
          setTimeout(() => {this.infoText = null}, 2000)
        } else {
          this.infoText = 'Вы не ввели название группы'
          setTimeout(() => {this.infoText = null}, 2000)
        }

      },
    }
  }
</script>

<style module>

  .layout {
    height: 70px;
  }
  .infoText {

  }
  .ctrls {
    margin-bottom: 6px;
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
    color: #fff;
    background-color: #28a745;
    border: 1px solid transparent;
    border-color: #28a745;
    line-height: 1.5;
    border-radius: 3px;
    padding: 6px 10px;
    transition: background-color .15s ease-in-out,border-color .15s ease-in-out;

  }
  .btn:hover {
    background-color: #218838;
    border-color: #1e7e34;
  }

  .field {
    padding: 8px 5px;
    font-weight: 600;
    margin-left: 10px;
  }
</style>