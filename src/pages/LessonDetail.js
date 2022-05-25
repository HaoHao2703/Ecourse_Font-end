import React, { useEffect, useState } from 'react'
import { Badge, Col, Form, Image, Row, Spinner, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Apis ,{endpoints} from '../configs/Apis';
import cookies from 'react-cookies';

export default function LessonDetail() {
	const [lesson, setLesson] = useState(null);
	const [comments, setComments] = useState([]);
	const [commentContent, setCommentContent] = useState(null);
	const [changed, setChanged] = useState(1)
	let { lessonId } = useParams();
	let user = useSelector(state => state.user.user);

	useEffect(() => {
		let loadLesson = async () => {
			try{
				let res = await Apis.get(endpoints['lessons_detail'](lessonId));
				setLesson(res.data);
			}catch(err){
				console.error(err);
			}
		}

		let loadComment = async () => {
			try{
				let res = await Apis.get(endpoints['comments'](lessonId));
				setComments(res.data);
				console.log(res.data)
			}
			catch(err){
				console.error(err);
			}
		}
		loadLesson();
		loadComment();
	}, [changed]);

	if (lesson === null)
		return  <Spinner animation='border' />
	
	let comment = <em><Link to="/login">Login</Link> to comment</em>;

	const addComment = async (event) => {
		event.preventDefault();
		try{
			let res = await Apis.post(endpoints['add-comment'](lessonId), {
				"content": commentContent
			}, {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${cookies.load("access_token")}`,
				}
			})
			console.info(res.data)
			comments.push(res.data);
			setComments(comments)
			setChanged(comments.length)
		}catch(err){
			console.error(err);
		}
	}
	if (user !== null && user !== undefined){
		comment = (
			<Form onSubmit={addComment}>
				<Form.Group className="mb-3" controlId="commentContent">
					<Form.Control as="textarea" 
												value={commentContent}
												onChange={e => e.target.value}
												placeholder="Comment..." rows={3} />
				</Form.Group>
				<Button type="submit" className='btn btn-primary'>Add comment</Button>
			</Form>
		)
	}
	return (
		<>
			<div style={{display: 'flex', flexDirection: 'column', maxWidth: '80%', margin: '0 auto'}}>
				<h1 className='text-center' style={{marginBottom: '20px'}}>{lesson.subject}</h1>
				<div className='grid' style={{marginBottom: '10px'}}>
					<img src={lesson.image} alt={lesson.subject} style={{'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '50%'}}/>
				</div>
				<p style={{'marginBottom': '5px'}} className="text-end">Created date: {lesson.created_date}</p>
				<p className='text-end'>Updated date: {lesson.updated_date}</p>
				<p className='text-end'>{lesson.tags.map(t => <Badge style={{backgroundColor: 'blue', 'marginRight': '5px', padding: '5px'}} bg="secondary">{t.name}</Badge>)}</p>
				<p style={{'textAlign': 'justify'}}>{lesson.content}</p>
			</div>
			<hr/>
			{comment}
			<hr/>

			{comments.map(c => (
				<Row>
					<Col md={2} xs={5}>
						<Image src={c.creator.avatar}/>
					</Col>
					<Col md={10} xs={7}>
						<p style={{marginBottom: '5px'}}>{c.creator.username}</p>
						<p style={{marginBottom: '5px'}}>{c.content}</p>
						<p>Created date: <Moment fromNow>{c.created_date}</Moment></p>
					</Col>
				</Row>
			))}
		</>
	)
}
