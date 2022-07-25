import React, { useContext, useEffect } from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { CurrencyContext } from '../App';
import { apiHost } from '../utlitis/URLs';

type Props = {}

const Portfolio = (props: Props) => {

    const [portfolio,setPortfolio] = React.useState<any>([]);
    const [loading,setLoading] = React.useState(true);
    const [updated,setUpdated]=React.useState<string>('');
    const [company,setCompany] = React.useState<any>([]);
    const [companyloading,setCompanyLoading] = React.useState(true);
    const value = useContext(CurrencyContext);
    const uid = useParams().uid;
    const navigate = useNavigate();
useEffect(()=>{
   // fetch('https://n1040919-api.azurewebsites.net/api/porfolio/:uid')
   fetch(apiHost+`api/${uid}/portfolio/${value.value}`)
    .then(res => res.json())
    .then(data => {
      setPortfolio(data);
      getCompany();
      setUpdated(data[0].updatedAt)
    })
   // .then((data) => setUpdated(data.updatedAt))
    .then(() => setLoading(false));
   
},[uid,value]);
console.log()
const getCompany = () => {
  // fetch('https://n1040919-api.azurewebsites.net/api/companies/:symbol')
  fetch(apiHost + `api/${uid}/companies/${value.value}`)
  .then(res => res.json())
  .then(data => {setCompany(data)})
  .then(()=>setCompanyLoading(false));
}

function handleRowClick(id:any) {
  navigate(`/${uid}/companies/${id}`);
}

const getPrice = (symbol:string) => {
    return +company.filter((x:any) =>x._id === symbol)[0].price;
}

  return (
    <Container className='m-4'>
      <h2>Portfolio</h2>
          <Table className='text-start'  bordered hover responsive>
           <thead>
              <tr>
                
                  <th>S.no</th>
                  <th>CompanyName</th>
                  <th>TotalShares</th>
                  <th>TotalValue({value.value})</th>
                  <th></th>
                  </tr>
                </thead>
              <tbody>
              
              
                {!loading && !companyloading &&  portfolio[0].shares && portfolio.length > 0 ? portfolio[0].shares.filter((x:any)=>x.count !==0).map((portfolio:any,index:any)=>(
                <>
                <tr key={index}>
                  <td>{index+1}</td>
                    <td>{portfolio.code}</td>
                    <td>{portfolio.count}</td>
                    <td>{(getPrice(portfolio.company_id) * portfolio.count).toFixed(2)}</td>
                    <td> <Button className='m-2' size='sm' onClick={()=>handleRowClick(portfolio.company_id)}>Buy/Sell</Button>
                   </td>
      
                   </tr>
                   
                </>
                )):<tr><td colSpan={5} className = 'text-center bg-warning'>No Stocks available in your Portfolio</td></tr>}
              
                </tbody>
                <tbody>
                <tr>
                    <td colSpan={3} className='text-end '><b>GrandTotal:</b></td>
                    <td colSpan={2}> 
                    {!loading && !companyloading &&  portfolio[0].shares && portfolio.length > 0 ? portfolio[0].shares.reduce((preVal:any,currValue:any)=> preVal + currValue.count * (getPrice(currValue.company_id)),0):0}
                    </td>
                   </tr>
                </tbody>
                <tbody>
                <tr>
                <td colSpan={5} className='bg-secondary text-white text-center'>
                <small>Updated at <i>{new Date(updated).toDateString()}</i></small>
                </td>
              </tr>
            </tbody>
          </Table>
      
    </Container>
  )
}

export default Portfolio