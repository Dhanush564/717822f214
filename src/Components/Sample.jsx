import React, { Fragment, useState } from "react";
import axios from "axios";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";

const Sample = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [type, setType] = useState("fibo");
  const [details, setDetails] = useState({
    windowPrevState: [],
    windowCurrState: [],
    numbers: [],
    avg: 0,
  });
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjI0ODk1LCJpYXQiOjE3NDI2MjQ1OTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImViYjA2YTJmLWRhYzMtNGM3NS04M2M3LWVkNzhlNjA1MjYxYyIsInN1YiI6ImRoYW51c2htbXMwMDdAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiS2FycGFnYW0gQ29sbGVnZSBPZiBlbmdpbmVlcmluZyIsImNsaWVudElEIjoiZWJiMDZhMmYtZGFjMy00Yzc1LTgzYzctZWQ3OGU2MDUyNjFjIiwiY2xpZW50U2VjcmV0IjoiUkh2enludnV6ZUppdGJTcyIsIm93bmVyTmFtZSI6IkRoYW51c2giLCJvd25lckVtYWlsIjoiZGhhbnVzaG1tczAwN0BnbWFpbC5jb20iLCJyb2xsTm8iOiI3MTc4MjJmMjE0In0.ZYNUnP77sipd20Igm6iUyKt8lpFvZCEwkEsk8Z_2EvI"; 
  const apiFetch = async (selectedType) => {
    try {
      let url = ""; 
      if (selectedType === "primes") {
        url = "http://20.244.56.144/test/primes";
      } else if (selectedType === "fibo") {
        url = "http://20.244.56.144/test/fibo";
      } else if (selectedType === "even") {
        url = "http://20.244.56.144/test/even";  
      } else if (selectedType === "rand") {
        url = "http://20.244.56.144/test/rand";
      }
      const response = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      setData(result);
      const newNumbers = result.numbers.filter(
        (n) => !details.windowCurrState.includes(n)
      );
      let updatedWindow = [...details.windowCurrState, ...newNumbers];
      if (updatedWindow.length > 10) {
        const overflow = updatedWindow.length - 10;
        updatedWindow = updatedWindow.slice(overflow);
      }

      setDetails({
        windowPrevState: details.windowCurrState,
        windowCurrState: updatedWindow,
        numbers: result.numbers,
        avg:
          updatedWindow.length > 0
            ? updatedWindow.reduce((a, b) => a + b, 0) / updatedWindow.length
            : 0,
      });

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiFetch(type);
  };

  return (
    <Fragment>
      <Container>
        <h1>Average Calculator Microservice</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="numberType">Select Number Type</Label>
            <Input type="select" id="numberType" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="primes">Prime Numbers</option>
              <option value="fibo">Fibonacci Numbers</option>
              <option value="even">Even Numbers</option>
              <option value="rand">Random Numbers</option>
            </Input>
          </FormGroup>
          <Button color="primary" type="submit">Submit</Button>
        </Form>
        
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {data && (
          <div style={{ marginTop: "20px" }}>
            <h2>API Response</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default Sample;
