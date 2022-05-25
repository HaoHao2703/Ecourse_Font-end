import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import EcourseCard from '../layouts/EcourseCard';

const coursesURL = 'http://127.0.0.1:8000/courses/';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const location = useLocation();
  
  useEffect(() => {
    let query = location.search; 
    if (query === ""){
      query = `?page=${page}`;
    }else{
      query += `&page=${page}`;
    }

    axios.get(`${coursesURL}${query}`).then(res => {
      setCourses(res.data.results);
      setNext(res.data.next !== null);
      setPrev(res.data.previous !== null);
    })
  }, [location.search, page]);

  const paging = (inc) => {
    setPage(page + inc)
  }
  return (
    <>
      <h1 className="text-center">Course</h1>
      <Row>
        {courses.map(c => <EcourseCard key={c.id} obj={c}/>)}
      </Row>
      <ButtonGroup style={{marginTop: '10px'}}>
        <Button style={{background: '#2476d4'}} variant='info' disabled={!prev} onClick={() => paging(-1)}>&lt;&lt;</Button>
        <Button style={{background: '#2476d4'}} variant='info' disabled={!next} onClick={() => paging(1)}>&gt;&gt;</Button>
      </ButtonGroup>
    </>
  )
}

