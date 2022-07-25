import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ModalDilog from './ModalDilog';
import { CurrencyContext } from '../App';
type Props = {}

const CompanyDetails = (props: Props) => {
const [value,setValue] = useState(1);
const currencyValues = useContext(CurrencyContext);
const apiHost = window.location.host.includes('localhost') ? `http://localhost:5008/` : `https://n1040919-api.azurewebsites.net/` ;
    const id = useParams().id;
    const uid = useParams().uid;
    const navigate = useNavigate();
    //console.log(uid)
    const [company, setCompany] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(true);
    const [shares,setShares] = React.useState<any>([]);
    const [sharesloading,setSharesLoading] = React.useState(true);
    useEffect(()=>{
        //fetch(`https://n1040919-api.azurewebsites.net/api/companies/${id}`)
        fetch(apiHost + `api/${uid}/companies/${id}/${currencyValues.value}`)
        .then(res => res.json())
        .then(data => {
          setCompany(data)
          getShares();
      })
        .then(() => setLoading(false))
    },[id, uid,currencyValues]);

    const getShares = () => {
      fetch(apiHost+`api/${uid}/portfolio/${currencyValues.value}`)
      .then(res=>res.json())
      .then(data=> setShares(data))
      .then(()=>setSharesLoading(false));
    }
    const sharesAvailable = ()=>{
     let val:any = shares[0]?.shares && shares[0].shares.filter((x:any)=>x.company_id === id)[0];
     return val  ? val.count : 0; 
    }
    const PostData = (action:boolean) =>{
      (async () => {
        const rawResponse = await fetch(apiHost+`api/${uid}/portfolio`, {
          method: 'PATCH',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "user_id": uid && parseInt(uid),
              "shares":{
              "company_id":id,
              "code": company.Name,
              "count": action ? -value : value
               }  
          })
        });
        const content = await rawResponse.json();
        if(content){
          navigate(`/${uid}/portfolio`);
        }
        
      })();
    }
  return (
   
    <Container className='d-flex justify-content-center'>
   {!loading && !sharesloading && <Card style={{ width: '18rem',textAlign:'start' }} className='text-center mt-4'>
      <Card.Body>
        <Card.Title className='text-center bg-dark text-white p-2'>{company.Name}</Card.Title>
        <Card.Text className='text-start'>
         The company is based in {company.country}.It was ranked {company.Rank} &nbsp;
          in listed stock companies in {company.country}.
          {company.Name} have listed shares of {company.totalshares} in National Stock Exchange.
        </Card.Text>
      </Card.Body >
      <ListGroup className="list-group-flush text-start">
      <ListGroup.Item>Company Code:&nbsp;<b>{company.Symbol}</b></ListGroup.Item>
        <ListGroup.Item>Rank:&nbsp;<b>{company.Rank}</b></ListGroup.Item>
        <ListGroup.Item>Price({currencyValues.value}):&nbsp;<b>{+company.price}</b></ListGroup.Item>
        <ListGroup.Item>Your Shares:&nbsp;<b>{sharesAvailable()}</b></ListGroup.Item>
        <ListGroup.Item>Country :&nbsp;<b>{company.country}</b></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Row className='m-3'>
        <Form.Label>Add Stock</Form.Label>
          <Col>
        <ButtonGroup size="sm" >
       
        <Button onClick={()=>setValue(prevValue => prevValue >0 ? prevValue-1 : 0)}>-</Button>
        <Form.Control type="number" style={{width:'60px',borderRadius:'0'}} className='m-0' value={value} onChange={(e:any)=>setValue(e.target.value)} />
        <Button onClick={()=>setValue(prevValue => prevValue+1)}> + </Button>
      </ButtonGroup>
      </Col>
        </Row>
        <Button className='text-center m-2' onClick={()=>PostData(false)}>Buy</Button>
        <Button className='text-center btn btn-danger m-2' onClick={()=>PostData(true)} disabled= {sharesAvailable() > value ? false : true}>Sell</Button>
      </Card.Body>
    </Card>}
    {
      (value > sharesAvailable() && sharesAvailable() !== 0 ) ? <ModalDilog setData={()=>setValue(value => value-1)} show={false} >You don't have enough shares</ModalDilog> : null
    }
    </Container>
   
  )
}

export default CompanyDetails;