import react, {Component} from 'react'

import './Realtime.css'



class Realtime extends Component{


      render(){
        return (
            <div class='container'>
              <div class='box'>
                <span class="indexName">Index Name</span>
                <span class="pChange">%change</span>
                <span class="Change">Change value</span>
                <span>High</span>
                <span class="LTP">LTP</span>
              </div>
               

              <div class='box'>
                <span class="indexName">Index Name</span>
                <span class="pChange">%change</span>
                <span class="Change">Change value</span>
                <span class="LTP">LTP</span>
            
              </div>

              <div class='box'>
                 <span class="indexName">Index Name</span>
                <span class="pChange">%change</span>
                <span class="Change">Change value</span>
                <span class="LTP">LTP</span>
              </div>

              <div class='box'>
                <span class="indexName">Index Name</span>
                <span class="pChange">%change</span>
                <span class="Change">Change value</span>
                <span class="LTP">LTP</span>
              </div>
            </div>
        )
      }
}


export default Realtime