import React from 'react';
import { Container } from 'reactstrap';

export function TableScreen(props) {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);
	const [hoveredId, setHoveredId] = React.useState(null);

	React.useEffect(() => {
		fetch('https://devtest.teskalabs.com/data')
			.then((res) => {
				if (!res.ok) throw new Error('Network response was not ok');
				return res.json();
			})
			.then((json) => {
				const usersArray = Array.isArray(json)
					? json
					: json.data
					? json.data
					: [json];
				setData(usersArray);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<Container className='h-100'>
			<table className='h-100' style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th>Name</th>
						<th style={{ padding: '16px' }}>Email</th>
						<th>Address</th>
						<th style={{ padding: '16px' }}>Last Sign In</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					{data.map((userData) => (
						<tr
							key={userData.id}
							onMouseEnter={() => setHoveredId(userData.id)}
							onMouseLeave={() => setHoveredId(null)}
							style={{
								backgroundColor:
									hoveredId === userData.id ? '#f0f0f0' : 'transparent',
								transition: 'background-color 0.2s ease',
								cursor: 'pointer',
							}}
						>
							<td>
								{userData.name || userData.fullName || userData.username}
								{hoveredId === userData.id && (
									<span style={{ marginLeft: '8px', color: '#888' }}>
										(ID: {userData.id})
									</span>
								)}
							</td>
							<td style={{ padding: '16px' }}>{userData.email}</td>
							<td>{userData.address}</td>
							<td style={{ padding: '16px' }}>
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
