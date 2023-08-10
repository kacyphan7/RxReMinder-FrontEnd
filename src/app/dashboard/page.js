"use client";

import React from 'react';
import CustomCalendar from '../components/calendar/Calender';

function Dashboard() {
    return (
        <div className="container">
            <div className="columns">
                {/* first column - Navbar in a card */}
                <div className="column is-one-quarter">
                    <div className="card">
                        <div className="card-content">
                            {/* <navbar /> */}
                        </div>
                    </div>
                </div>

                {/* second column - calendar and filler components in cards */}
                <div className="column is-half">
                    <div className="card">
                        <div className="card-content">
                            <CustomCalendar />
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            {/* <component placeholder /> */}
                            <div>Placeholder content for third column</div>
                        </div>
                    </div>
                </div>

                {/* Third column - Placeholder in a card */}
                <div className="column is-one-quarter">
                    <div className="card">
                        <div className="card-content">
                            {/* Placeholder component */}
                            <div>Placeholder content for third column</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
