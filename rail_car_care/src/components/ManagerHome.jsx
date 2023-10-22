import React from "react";
import NavBar from "./NavBar";
import AboutUs from "./AboutUs"; // Import the AboutUs component

function ManagerHome() {
    const handleLogout = () => {
        window.location.href = "/login";
    };

    return (
        <div>
            <NavBar onLogout={handleLogout} /> {/* Use the NavigationBar component */}
            <div className="top-content">
                <h2>Dashboard</h2>
                {/* Add your code to display the list of trains under repair here */}
                <h2>Train Information</h2>
                <table>
                    <tr>
                        <th>S.No</th>
                        <th>Train No</th>
                        <th>Train Name</th>
                        <th>Coach No</th>
                        <th>Problem</th>
                        <th>Repair Status</th>
                        <th>Assign Status</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>12345</td>
                        <td>Express Train</td>
                        <td>A123</td>
                        <td>Mechanical Issue</td>
                        <td>In Progress</td>
                        <td>Assigned</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>67890</td>
                        <td>Local Train</td>
                        <td>B456</td>
                        <td>Electrical Issue</td>
                        <td>Completed</td>
                        <td>Not Assigned</td>
                    </tr>
                </table>
            </div>
            <AboutUs /> {/* Include the AboutUs component at the bottom of the page */}
        </div>
    );
}

export default ManagerHome;
