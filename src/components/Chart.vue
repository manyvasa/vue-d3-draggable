<template lang="pug">
  #visual(:class='$style.layout')
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: "chart",
    data() {
      return {
        width: 960,
        height: 500,
        groupsColor: {
          defaultFill: '#8fbc8f',
          activeFill: '#c10f0f',
          strokeColor: '#777777'
        }
      }
    },
    watch: {
      dataGroups: function () {
        this.updateNodes()
      },
    },
    mounted() {
      this.CreationNodes()

    },
    computed: {
      dataGroups() {
        return this.$store.getters.dataGroups
      }
    },
    methods: {
      CreationNodes() {
        const activeFill = this.groupsColor.activeFill;
        const defaultFill = this.groupsColor.defaultFill;


        const svg = d3.select("#visual").append("svg")
          .attr("width", this.width)
          .attr("height", this.height)
          .call(d3.zoom()
            .scaleExtent([-10, 10])
            .on("zoom", zoom));

        let g = svg.append("g")
        let node = g
          .style('cursor', 'pointer')
          .selectAll("g")
          .data(this.dataGroups)
          .enter().append("g")
          .call(d3.drag()
            .on('start', function(d) {
              if(!d3.event.active) {force.alphaTarget(0.3).restart();}
              d.fx = d.x;
              d.fy = d.y;
              this.querySelector('circle').setAttribute('fill', activeFill)
            })
            .on('drag', function(d) {
              d.fx = d3.event.x
              d.fy = d3.event.y
            })
            .on('end',function(d) {
              if (!d3.event.active) {force.alphaTarget(0);}
              d.fx = null;
              d.fy = null;
              this.querySelector('circle').setAttribute('fill', defaultFill)
            })
          );

        function zoom() {
          g.attr("transform", d3.event.transform);
        }

        node.append('circle')
          .attr("r", function(d) {
            return (d.users.length + 1) * 2})
          .attr("fill", this.groupsColor.defaultFill)
          .attr("stroke", this.groupsColor.strokeColor)
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

      updateNodes () {
        d3.select("#visual").select("svg").remove()
        this.CreationNodes()
      }

    }

  }

</script>

<style module>
  .layout {
    border: 1px solid black;
    width: 70%;
    background-color: #f7f4ba;
    overflow-x: hidden;
  }


</style>