import React from 'react';
import EditorForm from "../../containers/post/EditorForm";

const PublishRenderer = ({ tempCntActive }) => {
    const containerStyle = {
        position: 'relative',
        height: '100%',
        ...(tempCntActive && { overflow: 'hidden' })
    }
    
    return (
        <div style={containerStyle}>
            <EditorForm />
        </div>
    )
}

export default PublishRenderer;