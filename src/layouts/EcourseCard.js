import { Card, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function EcourseCard(props) {
	let path = `/courses/${props.obj.id}/lessons/`;

	if(props.type === "lesson")
		path = `/lessons/${props.obj.id}`;
		
  	return (
		<Col lg={4} md={6} xs={12} style={{padding: '10px'}}>
			<Card>
				<Link to={path}>
					<Card.Img variant="top" src={props.obj.image}/>
				</Link>
				<Card.Body>
						<Link to={path} style={{textDecoration: 'none'}}>
							<Card.Title style={{color: 'black'}}>{props.obj.subject}</Card.Title>
						</Link>
						<Card.Text>
							Created date: {props.obj.created_date}
						</Card.Text>
				</Card.Body>
			</Card>
		</Col>
  );
};
