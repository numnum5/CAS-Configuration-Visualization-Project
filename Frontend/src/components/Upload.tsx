import { useState, useRef, useCallback, ChangeEvent, DragEvent } from 'react';
import { Upload } from 'lucide-react';

interface UploadedFile extends File {
  id?: string;
}

export default function DragDropFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles: UploadedFile[] = Array.from(e.dataTransfer.files).map(file => ({
        ...file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      }));
      
      setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
    }
  }, []);

  const onFileInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles: UploadedFile[] = Array.from(e.target.files).map(file => ({
        ...file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      }));
      
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    }
  }, []);

  const handleButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (indexToRemove: number): void => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB'];
    const i: number = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div 
        className={`w-full p-6 mb-4 border-2 border-dashed rounded-lg cursor-pointer flex flex-col items-center justify-center transition-colors duration-200 ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-500/50'
        }`}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={onFileInputChange}
        />
        <Upload className={`w-12 h-12 mb-3 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
        <p className="mb-2 text-sm text-black-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">Any file type accepted</p>
      </div>

      {files.length > 0 && (
        <div className="w-full bg-white rounded-md shadow overflow-hidden">
          <div className="px-4 py-2 bg-gray-100 border-b">
            <h3 className="text-sm font-medium text-gray-700">Uploaded Files ({files.length})</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {files.map((file, index) => (
              <li key={index} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-500">
                      {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 text-xs font-medium"
                  type="button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}