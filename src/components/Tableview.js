import React from "react";


import './Tableview.css'

function Tableview(props){
    console.log("Inside tableView component")
    let tableData=props['input']
    console.log(props)
    
    return(
      <div>
          <div class='tableContainer' >
              
                <table class='mainTable'>
                    <thead >
                        <tr>
                            {Object.keys(tableData[0]).map((head)=>(
                                <th key={head}>{head}</th>
                            ))}
                        </tr>   
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                                <tr key={index}>
                                    {Object.keys(tableData[0]).map((head) => (
                                    <td key={head}>{item[head]}</td>
                                    ))}
                                </tr>
                         ))}
                    </tbody>
                </table>
           
          </div>
          
      </div>
    )
}

export default Tableview