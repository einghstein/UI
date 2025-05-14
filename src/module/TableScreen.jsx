import React from 'react';
import { Container } from 'reactstrap';

function User({ id, name, email }) {
	console.log('User', id, name, email);
	return (
		<li key={id}>
			{name}    {email}
		</li>
	);
}


export function TableScreen(props) {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
		fetch('https://devtest.teskalabs.com/data')
			.then((res) => {
				if (!res.ok) throw new Error('Network response was not ok');
				return res.json();
			})
			.then((json) => {
				// Ensure data is always an array
				const usersArray = Array.isArray(json) ? json : (json.data ? json.data : [json]);
				setData(usersArray);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			})
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	console.log('data', data);
	return (
		<Container className='h-100'>
			<ul>
				{data.map((userData, idx) => {
					return (
						User(userData)
					)
				})}
			</ul>
		</Container>
		
	);
	
}
