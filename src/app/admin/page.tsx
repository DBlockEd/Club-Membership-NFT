"use client";

import React, { useState, useEffect } from 'react';
import { useWriteContract, type BaseError } from 'wagmi';
import { abi, address as contractAddress } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import '../css/Admin.css';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [userAddress, setUserAddress] = useState('');
    const [role, setRole] = useState('member');
    const [year, setYear] = useState('2024');
    const [isMinting, setIsMinting] = useState(false);

    const { isPending: isWriteLoading, status: writeStatus, isError: isWriteError, writeContract } = useWriteContract();
    const toastId = React.useRef(null);

    useEffect(() => {
        if (writeStatus === 'pending') {
            toastId.current = toast.loading("Minting NFT");
        }
        else if (writeStatus === 'success' && !isWriteLoading && !isWriteError) {
            toast.update(toastId.current, {
                render: "NFT Minted",
                isLoading: false,
                autoClose: 5000,
                type: "success",
            });
            setIsMinting(false);
        }
        else if (writeStatus === 'error') {
            toast.update(toastId.current, {
                render: 'Error Minting NFT',
                isLoading: false,
                autoClose: 5000,
                type: "error",
            });
            setIsMinting(false);
        }
    }, [writeStatus]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsMinting(true);

        const data = new FormData();
        if (image) {
            data.set('file', image);
            data.set('name', name);
            data.set('address', userAddress);
            data.set('role', role);
            data.set('year', year);
        }
        toastId.current = toast("Metadata Created");

        const result = await fetch('/api/submit', {
            method: 'POST',
            body: data,
        });

        if (result.ok) {
            const res = await result.json();
            mintNFT(res.nftURI);
        } else {
            toast.error("Error Submitting Form");
            setIsMinting(false);
        }
    };

    const mintNFT = (URI: string) => {
        try {
            writeContract({
                address: contractAddress,
                abi,
                functionName: 'mintNFT',
                args: [userAddress, URI],
            })
        } catch (error) {
            console.error('Error minting NFT:', error);
            setIsMinting(false);
        }

    };

    return (
        <div className="admin-page">
            <h1 className="admin-title">Admin Form</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <label className="admin-label">
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="admin-input"
                        required
                    />
                </label>
                <label className="admin-label">
                    Image:
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="admin-input"
                        required
                    />
                </label>
                <label className="admin-label">
                    Role:
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="admin-input"
                        required
                    >
                        <option value="Member">Member</option>
                        <option value="VicePresident">Vice President</option>
                        <option value="Mentor">Mentor</option>
                    </select>
                </label>
                <label className="admin-label">
                    Address:
                    <input
                        type="text"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        className="admin-input"
                        required
                    />
                </label>
                <label className="admin-label">
                    Batch:
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="admin-input"
                        required
                    >
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                </label>
                <button type="submit" className="admin-button" disabled={isMinting}>
                    {isMinting ? (
                        <div className="loading-circle"></div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AdminPage;
