import React, {useState,useEffect} from "react";
import { domain,derivative_endpoint} from "../commonFunctions";
import axios from "axios"
import './Tableview.css'


function Table(props){
    
    console.log("Inside Table component")
    console.log(props)
    let data=props['input']
    console.log(data)
    const headers = Object.keys(data[0]);
    const tableStyle={
        // visibility:"hidden"

    }
    return(
       <div class='table'>
        <table class='mainTable'>
            <thead style={tableStyle}>
                <tr>
                    <th hidden='hidden'>1</th>
                    {headers.map((header)=>(
                        <th key={header}>{header}</th>
                    ))}
                
                </tr>   
            </thead>
            <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header) => (
                            <td key={header} style={tableStyle}>{item[header]}</td>
                            ))}
                        </tr>
                ))}
                
            </tbody>
        </table>
        
       </div>
    )

}

export default Table