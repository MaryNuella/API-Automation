describe('API Testing with Cypress', () => {

  const URL = 'https://sometransferurl/gateway/transaction/banktransfers'
    
 function generateRandom4DigitNumber() {
   let min = Math.pow(10,3)
   let max = Math.pow(10,4)
 return Math.floor(Math.random() * (max- min + 1) + min)
 }
    for(let i=10; i <= 1; i++){
   it('POST request to create a new transaction', () => {
 
    const bearerToken = "eyJraWQiOiJEODVIT3lOcGRxSG05YlVHV2VnblE1TlJCY002a21jT0ZSXC9mMkRFTElJUT0iLCJhbGciOiJSUzI1NiJ9eyJzdWIiOiJlMmI1OTRkNC1lMDUxLTcwMjItZmRhOC0zMTVlYzk4MDczY2YiLCJjb2duaXRvOmdyb3VwcyI6WyJDTElFTlQiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfdTdNdzF2dmZaIiwiY2xpZW50X2lkIjoiNHAzamllYmVsbW00NzN1bXJqbzB2YnJocW0iLCJvcmlnaW5fanRpIjoiMGY1ZmI1MDItNGMxMi00ZWQ5LWI1NTMtN2NmNmUzM2JkNTN"
 
    cy.log(generateRandom4DigitNumber)
   
    const data = {
     "payload": [
       {
         "plugin": "DemoStructure",
       "transactionRequest": {
         "receiver_bank_account_no": "2125302761032",
         "receiver_country_iso3": "USA",
         "receiver_curency": "USD",
         "receiver_first_name": "Rotwelier",
         "receiver_last_name": "Donkey",
         "receiver_mobile_number": "2347067573339",
         "receiving_amount": 1,
         "reference_code": `abcd${generateRandom4DigitNumber()}`,
         "send_amount": 1,
      
       }
     }
   ]
   };
     cy.request({
       method: 'POST',
       url:URL,
       headers:{
         'Authorization': `Bearer ${bearerToken}`,
         'Content-Type' : 'application/json'
       },
       body: data,
     }).then((response) => {
 
       cy.log(data)
       const refCode = response?.body.map((item)=>{
          cy.log(item?.reference_code)
       })
 
       cy.log('--------------response--------------')
       cy.log(response)
       cy.log('--------------refCode--------------')
       cy.log(refCode)
 
 
       cy.log('----------------------------')
       // Check the response status
       expect(response.status).to.eq(200)
     expect(response.body[0]).to.have.property("status")
 
       // Check the response body
       expect(response.body[0].status).to.eq("OK");
       expect(response.body[0].responseCode).to.eq("0000")
     })
   })
 }
  })