const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/'

export const uploadToPinataFile = async (file: File) => {

  console.log('Uploading Image File to Pinata...');

  const formData = new FormData();

  formData.append('file', file);
  formData.append('pinataMetadata', JSON.stringify({ name: 'File to upload' }));

  try {
    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    });

    const result = await res.json();
    const { IpfsHash } = result;
    const url = `${IPFS_GATEWAY}${IpfsHash}`;

    console.log('The URL is: ', url);

    return IpfsHash;
  } catch (e) {
    console.error('Error uploading file:', e);
    alert('Failed to upload file');
  }
}

export const uploadToPinataJson = async (formData: string) => {

  console.log('Uploading MetaData to Pinata...');

  try {
    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: { Authorization: `Bearer ${PINATA_JWT}`, 'Content-Type': 'application/json' },
      body: formData,
    });

    const result = await res.json();
    const { IpfsHash } = result;
    const url = `${IPFS_GATEWAY}${IpfsHash}`;

    console.log('The URL is: ', url);

    return IpfsHash;
  } catch (e) {
    console.error('Error uploading file:', e);
    alert('Failed to upload file');
  }
}