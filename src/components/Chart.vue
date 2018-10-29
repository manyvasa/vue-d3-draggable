<template>
  <div id="inner">
  </div>
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: "chart",
    data() {
      return {
        width: 960,
        height: 500
      }
    },
    watch: {
      dataGroups: function () {
        this.reLoadSvg()
      },
    },
    mounted() {
      this.crSvg()
    },
    computed: {
      dataGroups: {
        get() {
          return this.$store.getters.dataGroups
        },
        set(value) {
          //this.$store.commit('updateList', value)
        }
      }
    },
    methods: {
      crSvg() {
        const svg = d3.select("#inner").append("svg")
          .attr("width", this.width)
          .attr("height", this.height);

        let node = svg.append("g")
          .attr("class", "nodes")
          .selectAll("g")
          .data(this.dataGroups)
          .enter().append("g")
          .call(d3.drag()
            .on('start', function(d) {
              if(!d3.event.active) {force.alphaTarget(0.3).restart();}
              d.fx = d.x;
              d.fy = d.y;
            })
            .on('drag', function(d) {
              d.fx = d3.event.x
              d.fy = d3.event.y
            })
            .on('end',function(d) {
              if (!d3.event.active) {force.alphaTarget(0);}
              d.fx = null;
              d.fy = null;
            })
          );

        node.append('circle')
          .attr("r", function(d) {
            return (d.users.length + 1) * 2})
          .attr("fill", '#8fbc8f')
          .attr("stroke", '#777777')
          .attr("stroke-width", '1')

        node.append("text")
          .attr("dx", 12)
          .attr("dy", ".35em")
          .text(function(d) { return d.name });

        let force = d3.forceSimulation(this.dataGroups)
          .force("charge", d3.forceManyBody().strength(-4))
          .velocityDecay(0.4)
          .force("center", d3.forceCenter(this.width / 2, this.height / 2));

        force.nodes(this.dataGroups)

        force.on("tick", function() {
          node.select("circle").attr("r", function(d) {
              return (d.users.length + 1) * 2});

          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        })
      },

      reLoadSvg () {
        d3.select("#inner").select("svg").remove()
        this.crSvg()
      }
    }

  }

</script>

<style scoped>
  .nodes {
    cursor: pointer;
  }
</style>