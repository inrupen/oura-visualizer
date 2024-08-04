import React, { useState } from 'react';
import styled from 'styled-components';

interface FileUploadProps {
  onDataParsed: (file: File) => void;
}

const UploadContainer = styled.div`
  background-color: #1c1c1e;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #8884d8;
  color: #ffffff;
`;

const UploadButton = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  background-color: #8884d8;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #6c64b3;
  }
`;

const FileUpload: React.FC<FileUploadProps> = ({ onDataParsed }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onDataParsed(file);
    }
  };

  return (
    <UploadContainer>
      <UploadButton
        type="file"
        id="file-upload"
        accept=".csv"
        onChange={handleFileChange}
      />
      <UploadLabel htmlFor="file-upload">
        {fileName ? fileName : 'Choose a CSV file to upload'}
      </UploadLabel>
    </UploadContainer>
  );
};

export default FileUpload;
