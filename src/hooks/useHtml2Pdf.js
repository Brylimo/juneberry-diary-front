import { useRef, useCallback } from 'react';
import html2pdf from 'html2pdf.js';

export const useHtml2Pdf = () => {
    const contentRef = useRef(null);

    const convertToPdf = useCallback((filename) => {
        const content = contentRef.current;

        const options = {
			filename: filename,
			margin: 0.6,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: {
                 scale: 2,
                 scrollY: 0,
                 useCORS: true, 
                 letterRendering: true, 
                 dpi: 300,
                 allowTaint: false
            },
			jsPDF: {
				unit: 'in',
				format: 'a4',
				orientation: 'portrait',
			},
		};

        html2pdf().set(options).from(content).save();
    }, []);

    return [contentRef, convertToPdf];
}