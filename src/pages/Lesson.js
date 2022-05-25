import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import {useParams} from 'react-router'

import EcourseCard from '../layouts/EcourseCard';
import Apis , {endpoints} from '../configs/Apis'

export default function Lesson() {
  const [lessons, setLessons] = useState([]);
  const {courseId} = useParams();

  useEffect(() => {
    const loadLesson = async () => {
      try{
        let res = await Apis.get(endpoints['lessons'](courseId));
        setLessons(res.data)
      }catch(err){
        console.error(err);
      }
    }
    loadLesson();
  }, [courseId]);

  return (
    <>
      <h1>DANH MUC BAI HOC</h1>
      <Row>
        {lessons.map(l => <EcourseCard obj={l} key={l.id} type="lesson"/>)}
      </Row>
    </>
  )
}
