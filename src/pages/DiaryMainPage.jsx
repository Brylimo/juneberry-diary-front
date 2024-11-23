import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import DiaryMain from '../components/diary/DiaryMain';

const DiaryMainPage = () => {
    return (
        <>
            <Helmet>
                <title>다이어리</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%' }}>
                <DiaryMain/>
            </div>
        </>
    )
}

export default DiaryMainPage;