import React from 'react';
import '../css/Members.css';

const Members = ({ members }) => {
    if (!members || members.length === 0) {
        return <div className="all-members no-data">No data available</div>;
    }

    return (
        <div className="all-members">
            <h2>All NFT Holders</h2>
            <table className="all-members-table">
                <thead>
                    <tr className="all-members-header">
                        <th className="all-members-index">S. No.</th>
                        <th className="all-members-name">Name</th>
                        <th className="all-members-role">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={index} className="all-members-item">
                            <td className="all-members-index">{index + 1}</td>
                            <td className="all-members-name">{member.name}</td>
                            <td className="all-members-role">{member.attributes.find(attr => attr.trait_type === 'Role').value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Members;
