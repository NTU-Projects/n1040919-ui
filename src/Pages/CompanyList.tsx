import React, {useEffect,useContext } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../App';
import { apiHost } from '../utlitis/URLs';

type Props = {}



function CompanyList({}: Props) {
    const uid = useParams().uid;
    const value = useContext(CurrencyContext);
    const [companies, setCompanies] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const [search, setSearch] = React.useState(undefined);
    //console.log(companies)
    useEffect(()=>{
        //fetch('https://n1040919-api.azurewebsites.net/api/companies')
        fetch(apiHost+`api/${uid}/companies/${value.value}`)
        .then(res => res.json())
        .then(data => setCompanies(data))
        .then(() => setLoading(false))
    },[uid, value]);

function handleRowClick(id:any) {
    navigate(`/${uid}/companies/${id._id}`);
  }


  return (
<div style={{margin:'40px'}}>
  <h2 className='bg-dark text-white rounded p-2'>Companies Listed In the Stock Market</h2>
<Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search stocks"
              className="me-2"
              aria-label="Search"
              onChange={(e:any)=> setSearch(e.target.value)}
            />
            <Button variant="outline-success" >Search</Button>
          </Form>
{!loading ? <Table striped hover  responsive>
      <thead>
        <tr style={{textAlign:'start'}}>
            {['S.no','Company','Symbol',`Price (${value.value})`,'TotalShares','Last updated'].map(item=><th key={item}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
       
         {!loading && companies.filter((x:any)=> search ? x.Name.toLowerCase().includes(search): true).map((item:any,index:number)=> {
             return(
               
                <tr style={{textAlign:'start'}} key={item._id} onClick={()=>handleRowClick(item)}>
                <td>{index+1}</td>
                <td>{item.Name}</td>
                <td>{item.Symbol}</td>
                <td>{item.price}</td>
                <td>{item.totalshares}</td>
                <td><i>{new Date().toDateString()}</i></td>
                </tr>
               
             )
         })}
     
      </tbody>
    </Table>:<div className='text-center bg-warning p-2 rounded text-white'><h1>Loading...</h1></div>}
    </div>
  )
}

export default CompanyList