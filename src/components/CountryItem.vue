  
// <template>
//     <tr :class="[{visited: status}]" id="visited" v-on:mouseover="hoverCountry()" v-on:mouseout="leaveCountry()" v-bind:style="dataHoverStyle">
//       <td class="collapsing" style="padding: 7px"><img class="ui image my-flag" :src="flag"></td>
//       <td  style="padding: 7px">
//           <h5 class="ui header" v-on:click="changeStatus(id)" v-bind:style="dataHoverStyle" style="font-size: 13px">{{name}}</h5>
//       </td>
//       <td class="right aligned collapsing" v-bind:style="dataHoverStyle"  style="padding: 7px">
//         <div class="ui checkbox">
//           <input type="checkbox" :checked="status" v-on:click="changeStatus(id)">
//           <label></label>
//         </div> 
//       </td>
//     </tr>
// </template>

//   <script>
//   import { CHANGE_STATUS, SET_CURRENT } from '../store/countryStore.js';
//   let self = null;
//     export default {
//       name: 'listItem',
//       props: ['name', 'status', 'id', 'fillColor'],
//       data() {
//         self = this;
//         return {
//           dataHoverStyle: {},
//         }
//       },
//       computed: {
//         flag() {
//           if (this.id != '-99') {
//             return require(`../../static/4x3/${this.id}.svg`);
//           }
//         },
//       },
//     methods: {
//       changeStatus(id) {
//         this.$store.commit({
//           type: CHANGE_STATUS,
//           id,
//         })
//       },
//       hoverCountry() {



//         const countryState = self.countriesState[self.id];
//         self.layers.eachLayer(layer => {
//           if (layer.id === self.id) {
//             layer.setStyle({ fillColor: 'teal' });
//             self.$store.commit({
//               type: SET_CURRENT,
//               current: countryState,
//             });
//             self.addHoverColor();
//           } 
//         }); 
//       },
//       leaveCountry() {
//         const countryState = self.countriesState[self.id];
//         self.layers.eachLayer( layer => {
//           if (layer.id === self.id) {
//             layer.setStyle({fillColor: self.countryState.fillColor});
//             layer.bringToBack();
//             self.removeHoverColor();
//           }
//         });        
//       },
//       addHoverColor() {
//         this.dataHoverStyle = { 
//           'background-color': this.fillColor,
//           'color': 'white',
//           };
//       },
//       removeHoverColor() {
//         this.dataHoverStyle = {};
//       },
//     },
//     }

//   </script>
    
//   <style>
  
//   label:hover {
//     cursor: pointer;
//   }

//   .my-flag {
//     width: 25px;
//   }

//   tr#visited.visited {
//     background-color: rgba(255,69,0,0.7);
//     color: white;
//   }
//   </style>
  