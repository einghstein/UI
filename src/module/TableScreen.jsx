import React from 'react';
import { Container } from 'reactstrap';

function User({ id, name, email }) {
	const [hovered, setHovered] = React.useState(false);

	const handleMouseEnter = () => setHovered(true);
	const handleMouseLeave = () => setHovered(false);

	const liStyle = {
		marginTop: "10px",
		display: 'flex',
		alignItems: 'center',
		color: hovered ? '#000' : 'white',
		backgroundColor: hovered ? '#e0e0e0' : 'transparent',
		cursor: 'pointer',
		padding: '10px',
		borderRadius: '8px'
	};

	return (
		<li
			key={id}
			style={liStyle}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<span style={{ minWidth: 160 }}>{name}</span>
			<span style={{ marginLeft: 32 }}>{email}</span>
			{hovered && (
				<span style={{ marginLeft: 'auto', color: '#888' }}>ID: {id}</span>
			)}
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
			<dataTable2 className='h-100'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{data.map((userData) => (
						<tr key={userData.id}>
							<td>{userData.name || userData.fullName || userData.username}</td>
							<td>{userData.email}</td>
						</tr>
					))}
				</tbody>
			</dataTable2>
			<ul>
				{data.map((userData) => (
					<User
						key={userData.id}
						id={userData.id}
						name={userData.name || userData.fullName || userData.username}
						email={userData.email}
					/>
				))}
			</ul>
		</Container>
		
	);
	
}
