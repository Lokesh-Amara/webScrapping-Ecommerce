import React, {useState, useContext} from "react";
import Pagination from "./components/Pagination.js"
import {useEffect} from "react" ;

const axios = require("axios");

const api = axios.create({
  baseURL : 'http://localhost:3210',
});

function Navbar() {
  return (
    <div className=" container-fluid" style={{backgroundColor : "#7952B3", position : "fixed", zIndex:"2"}} >
      <p style={{
        border:"2px solid black",
        borderRadius:"5px", 
        position : "relative", 
        top : "10px", 
        left : "50px",
        color : "white",
        fontFamily: "Raleway, sans-serif",
        padding : "3px",
        display : "inline-block"
      }}><i>WS</i></p>
      <p style={{display : "inline-block", position : "relative", top : "10px", left : "65px", fontSize:"20px", color : "#EBE5F4"}}>MYWEBSCRAPPER </p>
    </div>
  )
}


function Searchbox(props) {
  return(
    <div className="pt-3 pb-5">
      <input type="text" 
      id="inputbox"
      className="srchbox form-control" 
      style={{display : "inline-block", width : "90%", }} 
      onChange={ () => {
        var x = document.getElementById("inputbox").value;
        if(x.length > 0){
          const resArr =  [];
          api.post("/search",  {searchkey : x}).then(  (resp) => props.setSearchsuggestions(resp.data)  ) ;
        }else {
          props.setSearchsuggestions([]);
        }
      }}
      ></input>
      <button 
      type="button" 
      className="btn btn-primary" 
      style={{
        position : "relative", 
        bottom : "3px", 
        fontSize:"20px", 
        padding : "2px"
      }}
      onClick= {() => { 
        console.log("Search clicked");
        const reqTitle = document.getElementById("inputbox").value;
        api.post("/title", {title : reqTitle}).then( (resp) => props.setDataToDisplay(resp.data[0]));
         api.get("/").then( (resp) => props.setWebdata(resp.data))}}  
      ><i className="fas fa-search"></i> search</button>
       {props.searchList}
    </div>
  )
}

function DisplayProduct(props) {
  return (
    <div >
      <div className="row pb-5">
        <div className="col-4" style={{}}>
          <p style={{textAlign:"center"}}> <b>{props.title}</b></p>
          <img src={props.image} className="img-fluid" style={{height : "300px"}}></img>
        </div>
        <div className="col-8" style={{}}>
          <div className="row mb-3">
            <div className="col-3"></div>
            <div className="col-2"><img className="img-fluid  mt-2" src="data:image/png;base64,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"></img></div>
            <div className="col-1"></div>            
            <div className="col-2"><img className="img-fluid  mt-2" src="data:image/png;base64,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"></img></div>
            <div className="col-1"></div>                       
            <div className="col-2"><img className="img-fluid  " src="data:image/png;base64,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"></img></div>
            <div className="col-1"></div>                      
          </div>
          <div className="row mb-3">
            <div className="col-1"></div>          
            <div className="col-2"><p><b>Price</b></p></div>
            <div className="col-3"><p style={{color:"#C02704"}}>₹ {props.price[0]}/-</p></div>
            <div className="col-3"><p style={{color:"#C02704"}}>₹ {props.price[1]}/-</p></div>
            <div className="col-3"><p style={{color:"#C02704"}}>₹ {props.price[2]}/-</p></div>
          </div>
          <div className="row mb-3">
            <div className="col-1"></div>
            <div className="col-2"><p><b>Final Price</b></p></div>
            <div className="col-3"><p style={{color:"#848100"}}>₹ {props.fPrice[0]}/-</p></div>
            <div className="col-3"><p style={{color:"#848100"}}>₹ {props.fPrice[1]}/-</p></div>
            <div className="col-3"><p style={{color:"#848100"}}>₹ {props.fPrice[2]}/-</p></div>
          </div>
          <div className="row mb-3">
            <div className="col-1"></div>
            <div className="col-2"><p><b>Reviews</b></p></div>
            <div className="col-3"><p> &nbsp;{props.rating[0]} ⭐</p></div>
            <div className="col-3"><p> &nbsp;{props.rating[1]} ⭐</p></div>
            <div className="col-3"><p> &nbsp;{props.rating[2]} ⭐</p></div>
          </div>          
        </div>
      </div>
      <hr style={{backgroundColor : "grey", height: "2px", width: "90%", marginLeft : "0px"}}/>
    </div>
  )
}



function SearchInput(props) {
  return (
    <div>
      <input type="text" 
        key={props.id}
        className="srchbox form-control" 
        style={{display : "inline-block", width : "90%", }}
        value={props.value}
        readOnly="readonly"
        onClick={ () => { 
             document.getElementById("inputbox").value = props.value ;
             props.setSearchsuggestions([]);
        }}
        >
      </input>
    
    </div>
  )
}

export default function App() {
  
  
  // useEffect(
  //   () => api.get("/onload").then((response) => {
  //     console.log("Getting response as  :", response.data);
  //   }),
  //   []
  // );

  const [webdata, setWebdata] = useState([]);

  const [ currentPage, setCurrentPage] = useState(1);
  const [displaysPerPage] = useState(3);

  const [dataToDisplay, setDataToDisplay] = useState({});
  var webList = [];

  const indexOfLastDisplay = currentPage * displaysPerPage ;
  const indexOfFirstDisplay = indexOfLastDisplay - displaysPerPage;
  const currentDisplays = webdata.slice(indexOfFirstDisplay, indexOfLastDisplay);
  
  if(webdata.length !== 0) {
    webList.push(<p style={{fontSize : "24px"}} key="dsa"> <b>Related products</b></p>);
    var id = 0 ;
        for(const v of currentDisplays){
        webList.push(<DisplayProduct title={v.title} image={v.image} price={v.price} fPrice={v.fPrice} rating={v.rating} key={id} />) ;
        id++ ;
        }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [searchSuggestions, setSearchsuggestions] = useState([]);
  var searchList = [];

  if(searchSuggestions.length !== 0) {
    let sid = 1 ;
        for(const v of searchSuggestions){
       // console.log(v);
        searchList.push(<SearchInput  value={v} setSearchsuggestions={setSearchsuggestions} key={sid}/>) ;
        sid++ ;
        }
  }

  return (
      <div className="App " >
        <Navbar></Navbar>
        <div style={{height : "51px"}}></div>
        <div style={{backgroundColor: "#F0F2F5", height : "100%"}}>
          <div className="container" style={{backgroundColor:"#FFFFFF", height : "100%"}}>
            <Searchbox 
            setWebdata={setWebdata} 
            webdata={webdata} 
            searchList={searchList} 
            setSearchsuggestions={setSearchsuggestions}
            setDataToDisplay={setDataToDisplay} 
            ></Searchbox>
            {Object.keys(dataToDisplay).length !== 0  &&  
              <DisplayProduct title={dataToDisplay.title} image={dataToDisplay.image} price={dataToDisplay.price} fPrice={dataToDisplay.fPrice} rating={dataToDisplay.rating} />
            }
            {webList}
            <Pagination displaysPerPage={displaysPerPage} totalPosts={webdata.length} paginate={paginate}></Pagination>
          </div>
        </div>
      </div>
  );
}




