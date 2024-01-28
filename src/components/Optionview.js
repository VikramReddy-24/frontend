import React, {useState,useEffect} from "react";
import { derivative_endpoint, domain,dropdown_endPoint } from "../commonFunctions";
import axios from "axios";

import './Optionview.css'
import Tableview from "./Tableview";

function Optionview(){

    const [dropdown, setdropDown] =useState({})
    const [query,setquery]=useState({'indexName':[],'instrumentName':[],'expiryDate':[],'strikePrice':[]})
    const [result,setResult] =useState({'indexName':'','instrumentName':'','expiryDate':'','strikePrice':'','status':false,'derivativeData':[{}] })
    const [tableHead, setTableHead]=useState({})
    const [gridStyle,setGridStyle]=useState(false)
    const [tableData,setTableData]=useState([{}])

    function updateDropDown(event){
        console.log(event.target.value)
        console.log(event.target.id)
        
        if(event.target.id === 'indexName'){
            setquery(({'indexName':Object.keys(dropdown),'instrumentName':Object.keys(dropdown[event.target.value]),'expiryDate':[],'strikePrice':[]}))
            setResult(({'indexName':event.target.value,'instrumentName':'','expiryDate':'','strikePrice':'','status':false }))
           
        }
        if(event.target.id === 'instrumentName'){
            result['instrumentName']=event.target.value
            console.log(dropdown)
            setquery((prevquery) => ({'indexName': prevquery['indexName'],'instrumentName': prevquery['instrumentName'],'expiryDate': Object.keys(dropdown[result['indexName']][event.target.value]),'strikePrice': []}))
            setResult((pre)=>({'indexName':pre['indexName'],'instrumentName':event.target.value,'expiryDate':'','strikePrice':'','status':false  }))
        }
        if(event.target.id === 'expiryDate'){
            setquery((prevquery)=>({'indexName':prevquery['indexName'],'instrumentName':prevquery['instrumentName'],'expiryDate':prevquery['expiryDate'],'strikePrice':dropdown[result['indexName']][result['instrumentName']][event.target.value]}))
            setResult((pre)=>({'indexName':pre['indexName'],'instrumentName':pre['instrumentName'],'expiryDate':event.target.value,'strikePrice':'','status':false  }))      
        }
     
    }

    
    

    const fourthDropDownClick = async (event) => {
        result['strikePrice']=event.target.value

        try {
          const derivative_response = await axios.post(`${domain}${derivative_endpoint}`,result
           );
          console.log(derivative_response.data);
          setResult((pre)=>({'indexName':pre['indexName'],'instrumentName':pre['instrumentName'],'expiryDate':pre['expiryDate'],'strikePrice':event.target.value,'status':true,'derivativeData': derivative_response.data }))   
          const objectFromArray =Object.keys(derivative_response.data[0]).reduce((acc, item) => {
            acc[item] = false;
            return acc;
          }, {});
          if(Object.keys(tableHead).length===0){
            setTableHead(objectFromArray)
          }
          if(derivative_response.status===200){
            changeTableData(derivative_response.data)

          }
        //   setTimeout(changeTableData(), 30000)

          
        } catch (error) {
          console.error(error);
        }

    }



    const refresh = async(event)=>{
      try {
        const derivative_response = await axios.post(`${domain}${derivative_endpoint}`,result
         );
        console.log(derivative_response.data);

        if(derivative_response.status===200){
          changeTableData(derivative_response.data)

        }
      //   setTimeout(changeTableData(), 30000)
      } catch (error) {
        console.error(error);
      }
      
    }

    
    // const intervalId = setInterval(, 10000);

    // setTimeout(() => {
    //     clearInterval(intervalId);
    //     console.log("Interval stopped after 5 seconds");
    //   }, 100000);

    useEffect(()=>{
         axios
         .get(`${domain}${dropdown_endPoint}`)
         .then((response) => {
            console.log(response);
            setdropDown(response.data)
           })
         .catch((err) => console.log(err));
    },[])
    
   let changeTableData=(dataChange)=>{
         let derivativeInput=[]
          console.log("inside derivative Input")
          console.log(tableHead)
          let derivativeResp=dataChange
          for(let i=0; i<derivativeResp.length;i++){
            let dummy={}
            for(const key in derivativeResp[i]){
              if(tableHead[key]){
              dummy[key]=derivativeResp[i][key]
              }
            } 
            derivativeInput.push(dummy)
          }
          setGridStyle(false)
          setTableData(derivativeInput)
    }

    let onSubmitClick=(event)=>{
      
        if(event.target.id==='submit'){
          changeTableData(result['derivativeData'])
        }
        if(event.target.id==='input')
        { 
  
          tableHead[event.target.name]=!tableHead[event.target.name]
          setTableHead(tableHead)
         
        }
        
      }

    let onSettingsClick=(event)=>{
        setGridStyle(!gridStyle)
      }

    return(
        <div class='optionViewContainer'>
           <div class="dropdownContainer">
                <select class='dropdown' id='indexName' onChange={updateDropDown}>
                    <option defaultValue value={true}>Index Name</option>
                    {
                       Object.keys(dropdown).map((indexName) => (
                        <option value={indexName}>{indexName}</option>
                        ))
                    }
                </select>
                <select  class='dropdown' id='instrumentName' onChange={updateDropDown}>
                    <option defaultValue value={true}>Instrument Name</option>
                    {   
                        query['instrumentName'].map((indexName) => (
                        <option value={indexName}>{indexName}</option>
                        )) 
                    }   
                </select>
                <select  class='dropdown' id='expiryDate' onChange={updateDropDown}>
                   <option defaultValue value={true}>Expiry Date</option>
                    {  query['expiryDate'].map((indexName) => (
                        <option value={indexName}>{indexName}</option>
                        )) 
                    }
                </select>
                <select  class='dropdown' id='strikePrice' onChange={fourthDropDownClick }>
                    <option defaultValue value={true}>Stike Price</option>
                    { query['strikePrice'].map((indexName) => (
                        <option value={indexName}>{indexName}</option>
                        )) 
                    }
                </select>
           </div>
            <div style={{display:result['status']?'block':'none'}}>
                <div class="settingsContainer">
                    <p class='settingsIndex' >{`${result['indexName']}_${result['instrumentName']}_${result['expiryDate']}_${result['strikePrice']}`}</p>
                    <button class='settingItems' onClick={refresh}>Refresh</button>
                    <button class='settingItems' onClick={onSettingsClick}>Settings</button>
                </div>
                <div>
                <Tableview input={tableData}/>
                </div>
                
            </div>
            
            <div class={gridStyle?'grid-container':'grid-containernone'}>
                { Object.keys(tableHead).map((key)=>(
                <lable>
                <input type="checkbox" name={key} id='input' defaultChecked={tableHead[key]} onChange={onSubmitClick} />{key}
                </lable> 
                
                ))
                }
                <button class='SubmitButton' id='submit' onClick={onSubmitClick}>Submit</button>
          </div>
            
        </div>  
    )
}

export default Optionview