"use client";

import * as React from "react";
import { UploadCloud, X, FileText, Image as ImageIcon } from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { Button } from "@/app/components/ui/button";

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
    onFileSelect?: (files: File[]) => void;
    maxFiles?: number;
    accept?: string;
    maxSize?: number; // in bytes
}

export function FileUpload({
    className,
    onFileSelect,
    maxFiles = 1,
    accept,
    maxSize,
    ...props
}: FileUploadProps) {
    const [dragActive, setDragActive] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const validateFiles = (newFiles: File[]) => {
        const validFiles = newFiles.filter((file) => {
            // Check size
            if (maxSize && file.size > maxSize) {
                alert(`File ${file.name} is too large.`);
                return false;
            }
            return true;
        });
        return validFiles;
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            const validFiles = validateFiles(droppedFiles);

            const updatedFiles = [...files, ...validFiles].slice(0, maxFiles);
            setFiles(updatedFiles);
            onFileSelect?.(updatedFiles);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            const validFiles = validateFiles(selectedFiles);

            const updatedFiles = [...files, ...validFiles].slice(0, maxFiles);
            setFiles(updatedFiles);
            onFileSelect?.(updatedFiles);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        onFileSelect?.(newFiles);
    };

    const triggerSelect = () => {
        inputRef.current?.click();
    };

    return (
        <div className={cn("w-full", className)} {...props}>
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed transition-colors duration-200 ease-in-out",
                    dragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 bg-muted/50 hover:bg-muted/70",
                    "cursor-pointer"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={triggerSelect}
            >
                <input
                    ref={inputRef}
                    className="hidden"
                    type="file"
                    multiple={maxFiles > 1}
                    accept={accept}
                    onChange={handleChange}
                />

                <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                    <div className="text-sm">
                        <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {accept ? accept : "Any file"} (Max {maxFiles} file{maxFiles > 1 ? "s" : ""})
                    </p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="mt-4 grid gap-2">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between p-2 rounded-md border bg-background"
                        >
                            <div className="flex items-center gap-2 overflow-hidden">
                                {file.type.startsWith("image/") ? (
                                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="flex flex-col truncate">
                                    <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                }}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
