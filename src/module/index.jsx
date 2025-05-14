import { Module } from "asab_webui_components";

import { TableScreen } from './TableScreen.jsx';
import { DetailsScreen } from "./Details.jsx";

export default class TableApplicationModule extends Module {
	constructor(app, name) {
		super(app, "TableApplicationModule");

		app.Router.addRoute({
			path: "/",
			end: false,
			name: 'Table',
			component: TableScreen,
		});

		app.Navigation.addItem({
			name: "Table",
			icon: 'bi bi-table',
			url: "/",
		});

		app.Router.addRoute({
			path: "/details/:id",
			end: false,
			name: 'Details',
			component: DetailsScreen,
		});

		app.Navigation.addItem({
			name: "Details",
			icon: 'bi bi-info-circle',
			url: "/details/:id",
		});

		
	}
}
