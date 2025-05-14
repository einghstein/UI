import React from 'react';
import { Container } from 'reactstrap';


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
			<table className='h-100'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Address</th>
						<th>Last Sign In</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					{data.map((userData) => (
						<tr key={userData.id}>
							<td>{userData.name || userData.fullName || userData.username}</td>
							<td>{userData.email}</td>
							<td>{userData.address}</td>
							<td>
								{userData.last_sign_in
									? new Date(userData.last_sign_in * 1000).toLocaleString()
									: ''}
							</td>
							<td>
								{userData.created
									? new Date(userData.created * 1000).toLocaleString()
									: ''}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	);
	
}
