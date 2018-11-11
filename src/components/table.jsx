import React, { Component } from 'react';
import classNames from 'classnames/bind';

import settings from '../settings';

export default class Table extends Component {
	getValue(meeting, key) {
		if (key == 'address') {
			const address = meeting.formatted_address.split(', ');
			return address.length ? address[0] : '';
		} else if (key == 'name') {
			return(
				<a href={meeting.url}>{meeting.name}</a>
			);
		} else if (key == 'time') {
			return(
				<time className="text-nowrap">
					<span className={classNames('mr-1 d-block d-sm-inline', {'d-none': this.props.state.input.day.length == 1})}>
						{settings.strings[settings.days[meeting.day]]}
					</span>
					{meeting.time_formatted}
				</time>
			);
		}
		return meeting[key];
	}

	render() {

		const hide: boolean = (this.props.filteredSlugs.length == 0) || (this.props.state.input.view != 'list');

		return(
			<table className={classNames('table table-striped flex-grow-1', { 'd-none': hide })}>
				<thead>
					<tr className="d-none d-sm-table-row">
						{settings.defaults.columns.map(column => 
							<th key={column} className={column}>{settings.strings[column]}</th>
						)}
					</tr>
				</thead>
				<tbody>
					{this.props.state.meetings.map(meeting => {
						if (this.props.filteredSlugs.indexOf(meeting.slug) == -1) return;
						return(
							<tr className="d-block d-sm-table-row" key={meeting.slug}>
								{settings.defaults.columns.map(column => 
									<td key={[meeting.slug, column].join('-')} className={classNames('d-block d-sm-table-cell', column)}>
										{this.getValue(meeting, column)}
									</td>
								)}
							</tr>
						)
					})}
				</tbody>
			</table>
		);
	}
}