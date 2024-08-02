import React, { useState } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

interface FileUploadProps {
  onDataParsed: (data: any[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataParsed }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleFileUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          console.log("Parsed Data:", results.data); // Add this line
          onDataParsed(results.data);
        },
      });

      
    }
  };

  return (
    <UploadContainer>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleFileUpload}>Upload Data</Button>
    </UploadContainer>
  );
};

export default FileUpload;
