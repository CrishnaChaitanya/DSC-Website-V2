import React,{useEffect,useState} from "react";
import firebase from "firebase/app";
import { Col,Row } from "reactstrap";

export const MainEvents=()=>{
    const [events,setEvents]=useState(null);
    var arr=[];
    let sortedData=[];
    let i=0;
    let x=0;
    const getData=async ()=>{
      const eventsRef=await firebase.database().ref('/events');
      eventsRef.on('value',(snapshot)=>{
        console.log(snapshot.val());
        setEvents(snapshot.val())
      })
      console.log(events);
    };
    if(events!=null){
        Object.entries(events).map(([key,value])=>{
            arr[i]=value;
            i++;
          });
    }
      console.log(arr);
      if(arr!=null && arr!=[]){
        sortedData = arr.sort((a, b) => new Date(...a.Date.split('/').reverse()) - new Date(...b.Date.split('/').reverse()));
        console.log(sortedData)
     }
  useEffect(()=>{getData();x=0;},[])
 
  return(
    <div className="event-sec m-5">
    <div className="container">
    <h3 className="text-center">Events & Workshops</h3>
      <p className="text-center">Come learn, share and connect with us in person.</p>
      <div className="row ">
      {
      (sortedData!=null )?(
          sortedData.map((value)=>{
        var today = new Date(),
         date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +today.getDate()+ 'T'+today.getHours() + ':' + today.getMinutes();
         console.log(date);
         console.log(value.Date);
        if(date.split('T')[0].split('-')[0]<=value.Date.split('T')[0].split('-')[0] && date.split('T')[0].split('-')[1]<=value.Date.split('T')[0].split('-')[1] && date.split('T')[0].split('-')[2]<=value.Date.split('T')[0].split('-')[2] && date.split('T')[1].split(':')[0]<=value.Date.split('T')[1].split(':')[0] && date.split('T')[1].split(':')[1]<=value.Date.split('T')[1].split(':')[1]&&x==0||x>=1&&x<3){
            x++;
        return(
            <div className="col-lg-4 col-md-6 col-12 card-btm" style={{width:"300px"}}>
          <img class="card-img-top" style={{height:"250px"}} src={value.picture} alt="Card image cap"/>
          <div class="card-body">
              <h3 className="text-left card-text" style={{marginBottom:"15px"}} >{value.EventName}</h3>
            <Row>
              <Col>
              <p className="text-left m-0 p-0 card-text"><i class="far fa-calendar-alt text-primary" style={{marginRight:"15px"}}></i>{value.Date.split("T")[0]}</p>
            <p className="text-left card-text m-0 p-0"><i class="far fa-clock text-success"  style={{marginRight:"10px"}}></i>{value.Date.split("T")[1]}</p>
            <p className="bg-danger text-left pl-2 pr-2 level" style={{width:"70%",borderRadius:"25px", color:"#fff",fontSize:"12px"}}>{value.Level}</p>

              </Col>
              <Col>
              {(value.status)?(
            <a href={value.yLink}  target="_blank" class="btn btn-success float-right">View</a>
            ):(
            <a href={value.yLink}  target="_blank" class="btn btn-primary float-right attend-btn" style={{background:"#2f5be7"}}>Register</a>
            )}
              </Col>
            </Row>

          </div>
        </div>
        )
          }})):(<></>)
        
          
           
}
      </div>
      </div>
      </div>
        
  )
}