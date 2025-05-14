import React from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { TreeMenu } from 'asab_webui_components/dist/components/TreeMenu';

export function TableScreen(props) {
	const { t } = useTranslation();
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
				setData(json);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			})
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<Container className='h-100'>
			<TreeMenu data={data} />
		</Container>
	);
}
