"use client";

import React from 'react';
import CustomCalendar from '../components/calendar/Calender';

function Dashboard() {
    return (
        <div className="container">
            <div className="level">
                <div className="level-left">
                    <h1 className="title is-2">Hello, [User's Name]!</h1>
                </div>
                <div className="level-right">
                    <figure className="image is-48x48">
                        <img src="/path-to-user-profile-icon.jpg" alt="User's Profile" />
                    </figure>
                </div>
            </div>

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
                            <div>Placeholder content for second column</div>
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
