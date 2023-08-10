"use client";

import React from 'react';
import CustomCalendar from '../components/calendar/Calender';

function Dashboard() {
    return (
        <div className="container">
            <div className="level">
                {/* user greeting */}
                <div className="level-left">
                    <h1 className="title is-2">Hello, [User's Name]!</h1>
                </div>

                {/* profile image icon on the top right */}
                <div className="level-right">
                    <figure className="image is-48x48">  {/* You can adjust the size as needed */}
                        <img src="/path-to-user-profile-icon.jpg" alt="User's Profile" />
                    </figure>
                </div>
            </div>

            <div className="columns">
                {/* FIRST COLUMN */}
                <div className="column is-one-quarter">
                    <div className="card">
                        <div className="card-content">
                            {/* <navbar /> */}
                        </div>
                    </div>
                </div>

                {/* SECOND COLUMN */}
                <div className="column is-half">
                    <div className="card">
                        <div className="card-content">
                            <CustomCalendar />
                        </div>
                    </div>

                    <div className="columns"> {/* Nested columns */}
                        {/* First card */}
                        <div className="column">
                            <div className="card">
                                <div className="card-content">
                                    <div>Placeholder content for first card</div>
                                </div>
                            </div>
                        </div>

                        {/* Second card */}
                        <div className="column">
                            <div className="card">
                                <div className="card-content">
                                    <div>Placeholder content for second card</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* THIRD COLUMN */}
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

