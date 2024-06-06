import { useState, useCallback } from 'react';

export const useImgUpload = () => {
    const [imgFile, setImgFile] = useState(null);
    const imgUpload = useCallback(() => {
        const promise = new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.accept = 'image/*';

            const timeout = setTimeout(reject, 1000 * 60 * 5);
            input.type = 'file';
            input.onchange = () => {
                clearTimeout(timeout);
                if (!input.files) return reject();
                const file = input.files[0];
                setImgFile(file)
                resolve(file)
            }
            input.click();
        })
        return promise;
    }, [])

    return [imgFile, imgUpload, setImgFile]
};