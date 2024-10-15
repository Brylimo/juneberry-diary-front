import React from 'react';
import PublishRenderer from '../../components/post/PublishRenderer';
import { useSelector } from 'react-redux';

const PublishRendererForm = () => {
    const { tempCntActive } = useSelector(({ publish }) => ({
        tempCntActive: publish.tempCntActive
    }))

    return <PublishRenderer tempCntActive={tempCntActive} />
}

export default PublishRendererForm;