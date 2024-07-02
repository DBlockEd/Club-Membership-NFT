import React from 'react';
import '../css/UserNFT.css';

const UserNFT = ({ data }) => {
    if (!data) {
        return <div className="user-nft no-data">No Data Available</div>;
    }

    return (
        <div className="user-nft card">
            <h2 className="user-nft title">Your Membership NFT</h2>
            <div className="user-nft content">
                <img src={data.image} alt={data.name} className="user-nft image" />
                <div className="user-nft info">
                    <p className="user-nft name"><strong>Name:</strong> {data.name}</p>
                    <ul className="user-nft attributes">
                        {data.attributes.map((attribute, attrIndex) => (
                            <li key={attrIndex} className="user-nft attribute">
                                <strong>{attribute.trait_type}:</strong> {attribute.value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserNFT;
