import react from 'react'
import './Header.css'

function Header(props){

    console.log("2")
    return (<header class='header'>
            <button class="item" >Home</button>
            <button class="item" >Equity</button>
            <button class="item" >Options</button>
    </header>)
}

export default Header