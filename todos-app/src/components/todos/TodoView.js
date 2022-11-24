import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col,Form,Card } from 'react-bootstrap';
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import APIService from '../../utils/APIService'
const ItemAPI = new APIService();

const TodoView = ()=>{

    const [elemData, setelemData] = useState([]);
    const param_id = useParams();
    const user_id = param_id.id;
    let navigate = useNavigate();

    useEffect(() => {
        getElement();
    }, [])

    const getElement = async () => {
        const res = await ItemAPI.getItem(`/todos/${user_id}`);
        console.log('res element', res)
        const getRes = res.data
        setelemData(getRes)
    }
    
    function myDate(date){
        let closedate = new Date(date);
        let month_number = closedate.getMonth()+1;
        let yearr = closedate.getFullYear();
        let datee = closedate.getDate();
        let drawclosenew = datee+'-'+ month_number +'-'+ yearr;
        return drawclosenew;
    }

    return(
        <>
        <br/><br/><br/>
        <Container >
        <Card>
            {/* <Card.Img variant="top" src="/images/default.jpg" width='50px' /> */}
            <Card.Body>
            <Card.Title>{elemData.title}</Card.Title>
            <div style={{'display':'flex','justifyContent': 'space-between'}}>   
                <div style={{'color':'blue', 'fontWeight': '500'}}> 
                    <small><i>{elemData.updated_at ?  myDate(elemData.updated_at) : myDate(elemData.created_at) }</i></small>
                </div>
            </div> 
            
            <Card.Text>
                {elemData.desc}
            </Card.Text>
            </Card.Body>
        </Card><br/><br/>
        <Button variant="primary" onClick={() => navigate('/')}>Back</Button>
        </Container >
        </>
    )
}
export default TodoView