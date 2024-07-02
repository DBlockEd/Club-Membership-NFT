"use client";

import React, {useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { abi, address as contractAddress } from '../../constants';
import axios from 'axios';
import UserNft from '../components/UserNFT';
import Members from '../components/Members';

const Page = () => {
    const { address } = useAccount();
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState('');
    const [uri, setUri] = useState([]);

    const { data: tokenURIData } = useReadContract({
        abi,
        address: contractAddress,
        functionName: 'getAllURIs',
        args: [],
    });

    const { data: currUserUri } = useReadContract({
        abi,
        address: contractAddress,
        functionName: 'getUserURI',
        args: [address],
    });

    useEffect(() => {
        if (tokenURIData) {
            setUri(tokenURIData.filter(uri => uri)); 
        }
    }, [tokenURIData]);

    useEffect(() => {
        const fetchMetadata = async () => {
            if (uri.length > 0) {
                try {
                    const dataArray = [];
                    for (const uriItem of uri) {
                        const url = `https://gateway.pinata.cloud/ipfs/${uriItem}`;
                        const response = await axios.get(url);
                        dataArray.push(response.data);
                    }
                    setData(dataArray);
                } catch (error) {
                    console.error('Error fetching metadata:', error);
                }
            }
        };
        const fetchUserMetadata = async () => {
            if (currUserUri) {
                try {
                    const url = `https://gateway.pinata.cloud/ipfs/${currUserUri}`;
                    const response = await axios.get(url);
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching metadata:', error);
                }
            }
        }
        fetchMetadata();
        fetchUserMetadata();
    }, [uri]);

    return (
        <div>
            <UserNft data={userData} />
            <Members members={data} />
        </div>
    );
}

export default Page;
