import { ChangeEvent, useEffect, useRef, useState } from "react";

import Button from "./Button";
import classes from "./ImageUpload.module.css";
import inputClasses from "./Input.module.css";

interface ImageUploadProps {
    id: string;
    center: boolean;
    onInput: (id: string, file: any, isValid: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any>();
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result as string);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let pickedFile;
        let fileIsValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current!.click();
    };

    return (
        <div className={inputClasses["form-control"]}>
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: "none" }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div
                className={`${classes["image-upload"]} ${
                    props.center && "center"
                }`}
            >
                <div className={classes["image-upload__preview"]}>
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    Pick image
                </Button>
            </div>
            {/* {!isValid && <p>{props.errorText}</p>} */}
        </div>
    );
};

export default ImageUpload;
