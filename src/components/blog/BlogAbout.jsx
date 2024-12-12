import React from 'react';
import styled, { css } from 'styled-components';
import { Helmet } from "react-helmet-async";
import { useParams } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

const BlogAboutWrapper = styled.div`
    width: 100%;
    height: auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    overflow: hidden;
    background-color: #fffcfb;
    flex: 1;
`
const BlogAboutBlock = styled.div`
    width: 893px;
    margin: 0 auto;
    background-color: white;
    position: relative;
    padding: 0 12px;
    font-family: ui-sans-serif;
    padding-bottom: 7rem;
`;

const BlogAboutHeader = styled.div`
    width: 100%;
    margin-top: 40px;
`

const BlogAboutName = styled.div`
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const BlogAboutSemiTitle = styled.div`
    font-size: 26px;
    font-weight: 600;
    margin-top: 35px;
    display: flex;
    gap: 14px;
    color: #28c1b7;
`;

const BlogAboutHighlightTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-top: 30px;
    line-height: 26px;
`

const BlogHrLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: #d0d7de;
`

const BlogAboutImgBlock = styled.div`
    position: absolute;
    width: 124px;
    height: 124px;
    right: 14px;
    top: 3px;
    border-radius: 4px;

    @media (max-width: 550px) {
        display:none;
    }
`;

const BlogAboutImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid gainsboro;
`;

const BlogAboutContent = styled.div`
    width: 100%;
`;

const BlogAboutIntro = styled.div`
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.8;
`;

const BlogAboutLink = styled.div`
    margin-top: 7px;
    font-size: 17px;
    line-height: 1.7;
`;

const BlogLink = styled.a`
    border-bottom: 0.05em solid;
    border-color: rgba(55, 53, 47, .4);
    opacity: 0.7;
    white-space: normal;
    word-break: break-all;
`

const BlogAboutTxt = styled.div`
    font-size: 19px;
    margin-top: 15px;
    color: rgb(55, 53, 47);
`

const BlogAboutTextBlock = styled.div`
    margin-top: 5px;
    font-size: 16px;

    ${props =>
        props.type === "text" &&
        css`
            display: flex;
            align-items: center;
            gap: 10px;
        `
    }
`

const BlogAboutTxtContentBlock = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    padding: 15px 20px;
    font-weight: 100;
`

const BlogAboutTag = styled.div`
    font-size: 14px;
    background-color: #f6f6f7;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .2);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 5px;
    color: black;
`

const BlogAboutSmTag = styled.span`
    font-size: 14px;
    background-color: #f6f6f7;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .2);
    border-radius: 5px;
    padding: 2px 5px;
    color: red;
`

const BlogAboutSideBlock = styled.div`
    display: flex;
    flex-direction: row;
`;

const BlogAboutLeftSide = styled.div`
    flex: 1;
    max-width: 263px;
`;

const BlogAboutRightSide = styled.div`
    flex: 3;
`;

const BlogSmInfoDiv = styled.div`
    font-size: 14px;
    margin-top: 5px;
`

const BlogAboutUl = styled.ul`
    list-style-type: disc;
    line-height: 1.5;
    text-indent: -1.2em;
    padding-left: 1.2em;

    & ul {
        list-style-type: circle;
        padding-left: 20px;
        font-weight: lighter;
        gap: 7px;
    }
`

const GitHubIconCustom = styled(GitHubIcon)`
    width: 17px;
    height: 17px;
`

const BlogAbout = () => {
    const { id: paramId } = useParams()

    if (paramId !== 'tourist0302') {
        return null;
    }

    return (
        <>
            <Helmet>
                <title>임채진</title>
            </Helmet>
            <BlogAboutWrapper>
                <BlogAboutBlock>
                    <BlogAboutHeader>
                        <BlogAboutName>
                            임채진 | 백엔드 개발자
                        </BlogAboutName>
                        <BlogHrLine />
                    </BlogAboutHeader>
                    <BlogAboutContent>
                        <BlogAboutImgBlock>
                            <BlogAboutImg src="/chaejin.jpg"/>
                        </BlogAboutImgBlock>

                        {/*<BlogAboutIntro>
                            제주도청 주관 '<i>퍼스널 모빌리티 안전 사고 다발지역 안내 서비스</i>'를 Project Leader로 준공해 1억 4천 만원 가량의 회사 매출을 창출한 경험이 있으며 블로그/다이어리 서비스인 '준베리다이어리'를 개발해 운영하고 있다.
                            '준베리다이어리' 캘린더 태그 표출시 성능 4.5초 개선, '지능형 디지털 트윈 연합 프로젝트' 수집기 서버 평균 메모리 점유율 83.13% 절감 등 다수의 성능 개선 경험이 있고 미국에서 현지 학생들과 대학교 수강신청 서비스를 개발해 5팀 중 1등을 한 경험이 있다.
                        </BlogAboutIntro>*/}

                        <BlogAboutSemiTitle>
                            About Me
                        </BlogAboutSemiTitle>
                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide style={{ flex: '0.6' }}>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    Introduce
                                </BlogAboutHighlightTitle>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>안녕하세요! 주니어 백엔드 개발자 임채진 입니다.</li>
                                        <li>Cloudflare 모니터링 기준 한달 고유 방문자 1.02k명의 자체 서비스를 운영중입니다.</li>
                                        <li>Spring/Spring Boot 기반 10개 이상의 프로젝트에 참여하였습니다.</li>
                                        <li>감리가 필요한 1억원대 규모 프로젝트 포함 3번의 프로젝트 리딩을 경험했습니다.</li>
                                        <li>redis, jpa 최적화 및 sql 튜닝 등 다수의 성능 최적화를 경험했습니다.</li>
                                        <li>미국에 9개월 가량 거주하여 영어로 편하게 의사소통 가능합니다.</li>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide style={{ flex: '0.6' }}>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    Blog
                                </BlogAboutHighlightTitle>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>🔗<BlogLink href="https://juneberrydiary.com/blog/tourist0302" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com/blog/tourist0302</BlogLink></li>
                                        <li>react + spring boot로 자체 개발한 블로그를 이용하고 있습니다.</li>
                                        <li>같은 실수를 반복하지 않기 위해 시작했습니다.</li>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide style={{ flex: '0.6' }}>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    etc
                                </BlogAboutHighlightTitle>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>Career Summary : 🔗<BlogLink href="https://docs.google.com/document/d/1_lEl3kxrgruhx6m9kaZ0h1zMR4ZRba9CD6_SWnp0xe0/edit?usp=sharing" target="_blank" rel="noopener noreferrer">경력 기술서</BlogLink></li>
                                        <li>Github : 🔗<BlogLink href="https://github.com/Brylimo" target="_blank" rel="noopener noreferrer">https://github.com/Brylimo</BlogLink></li>
                                        <li>Email : icj0103@gmail.com</li>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        {/*<BlogAboutLink>
                            <b>Github</b> : <BlogLink href="https://github.com/Brylimo" target="_blank" rel="noopener noreferrer">https://github.com/Brylimo</BlogLink>
                            <br />
                            <b>Email</b> : icj0103@gmail.com
                            <br/>
                            <br/>
                            <b>Career Summary (경력 기술서)</b> : <br/>
                            <BlogLink href="https://docs.google.com/document/d/1_lEl3kxrgruhx6m9kaZ0h1zMR4ZRba9CD6_SWnp0xe0/edit?usp=sharing" target="_blank" rel="noopener noreferrer">https://docs.google.com/document/d/1_lEl3kxrgruhx6m9kaZ0h1zMR4ZRba9CD6_SWnp0xe0/edit?usp=sharing</BlogLink>
                        </BlogAboutLink>*/}

                        <BlogAboutSemiTitle>
                            Skills
                        </BlogAboutSemiTitle>
                        <BlogSmInfoDiv>※ (1) - Novice, (2) - Developing, (3) - Proficient, (4) - Advanced</BlogSmInfoDiv>
                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    <span style={{backgroundColor: "rgb(251, 243, 219)"}}>Backend</span>
                                </BlogAboutHighlightTitle>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>Java (4), JavaScript (4), node.js (4), python (3)</li>
                                        <li>Spring Boot (3), Spring MVC (4), Spring Data JPA (4), Spring Security (3)</li>
                                        <li>JPA (4), Querydsl (3), MyBatis (4), Prisma (3)</li>
                                        <li>Gradle (4), Maven (4)</li>
                                        <li>IntelliJ (4), Visual Studio Code (4), Vim (4), DBeaver (4), HeidiSQL (4)</li>
                                        <li>Git (4)</li>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    <span style={{backgroundColor: "rgb(251, 243, 219)"}}>DevOps</span>
                                </BlogAboutHighlightTitle>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>AWS EC2 (4), AWS S3 (3), AWS RDS (3), AWS Lambda (3), Cloudflare R2 (4), Vercel (4), Cafe24 (4), GoDaddy (4)</li>
                                        <li>Postgresql (4), MySQL (4), MariaDB (4), Redis (3), SQLite (3)</li>
                                        <li>Jenkins (3)</li>
                                        <li>Nginx (3), Tomcat (4), Docker (4)</li>
                                        <li>Prometheus (3), Grafana (3)</li>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    <span style={{backgroundColor: "rgb(251, 243, 219)"}}>Frontend</span>
                                </BlogAboutHighlightTitle>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>HTML5 (4), CSS (4), JS(ES5, ES6) (4), Thymeleaf (4), Pug (3), JSP (4), Sass (4), BootStrap (3), JQuery (4)</li>
                                        <li>React.js (3)</li>
                                        <li>React Query (3), Redux (3), Styled Components (4), CodeMirror (3)</li>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    <span style={{backgroundColor: "rgb(251, 243, 219)"}}>Collaboration</span>
                                </BlogAboutHighlightTitle>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>Slack (3)</li>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>
                        
                        <BlogAboutSemiTitle>
                            <span>Work Experience & Projects</span>
                            <BlogAboutTag>총 경력 2년</BlogAboutTag>
                        </BlogAboutSemiTitle>
                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    지능형 디지털 트윈 연합 프로젝트
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2024.04 ~ 2024.07 (총 4개월) / 2명
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)진우소프트이노베이션</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>제주도 내 데이터들(미세먼지, 교통 상황)을 활용한 디지털 데이터 트윈 서비스</li>
                                        <ul>
                                            <li style={{fontWeight: "400"}}>데이터 수집기 개발</li>
                                            <ul>
                                                <li>Spring으로 개발된 데이터 수집기를 node.js 기반 데이터 수집기로 변경<br/>
                                                    → 수집기 서버 평균 메모리 점유율 <b>83.13%</b> 절감 경험 (652 MiB → 110 MiB) <br />
                                                    <span style={{marginLeft: "20px"}}>- <span style={{fontWeight: "400", marginLeft: "10px"}}>Spring 데이터 수집기</span> 메모리 점유율 : 200MiB 후반 ~ 1GiB</span> <br />
                                                    <span style={{marginLeft: "20px"}}>- <span style={{fontWeight: "400", marginLeft: "10px"}}>node.js 데이터 수집기</span> 메모리 점유율 : 90MiB ~ 130MiB</span>
                                                </li>
                                                <li>가변 데이터 처리 가능하도록 NoSQL인 couch DB + 스프링 기반 데이터 수집기 개발</li>
                                            </ul>
                                            <li style={{fontWeight: "400"}}>데이터 포털 사이트 개발</li>
                                            <ul>
                                                <li>휴대폰 본인확인 서비스 개발</li>
                                                <li>실시간 데이터 변화를 data activity graph로 시각화</li>
                                            </ul>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    JCMS 프로젝트[Frontend PL]
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2024.01 ~ 2024.07 (총 7개월) / 2명
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)진우소프트이노베이션</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>(주)진우소프트이노베이션 사내 CMS 솔루션 프로젝트</li>
                                        <ul>
                                            <li>공통적으로 사용되는 Sass, js 코드를 라이브러리로 만들어 개발 업무 효율성 증대</li>
                                            <li>라이트 / 다크 모드 개발</li>
                                            <li>JCMS 라이브러리 사용법 매뉴얼 제작 및 전 개발자 대상 <b>사내 교육 담당</b></li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    퍼스널 모빌리티(PM) 안전사고 다발지역 안내 서비스[PL]
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2023.04 ~ 2023.10 (총 7개월) / 2명
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://juneberrydiary.com/blog/tourist0302/16" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com/blog/tourist0302/16</BlogLink>
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)진우소프트이노베이션</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>퍼스널 모빌리티의 실시간 이용, 사고 데이터 모니터링 기능을 제공하여 도청 공무원들의 의사결정을 도와주는 서비스</li>
                                        <ul>
                                            <li>PM 불법 주차 판단 알고리즘을 개발하여 PM 불법 주차 여부를 실시간으로 판단하는 과정 자동화</li>
                                            <li>제주도 PM 이용 정보/사고 정보를 그래프, 지도 표출로 시각화</li>
                                            <li>여러 유형의 사고 다발지역 표출 기능 구현</li>
                                            <li>데이터마트 DB를 서비스 DB가 항상 동기화하도록 개발<br/>
                                                → DB 운영 효율 개선 및 서비스 안정성 향상</li>
                                            <li>
                                                중간 감리, 최종 감리, 시큐리티 코딩 테스트 대응<br/>
                                                → <b>1억 4천 만원</b> 규모의 회사 매출 창출
                                            </li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>
                        
                        {/*<BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    평광건설 출퇴근 관리 키오스크
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2023.03 ~ 2023.03 (총 1개월) / 2명
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)투비스마트</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>평광건설 출퇴근 관리 키오스크 개발</li>
                                        <ul>
                                            <li>QR 코드 기반 출퇴근 처리 기능 개발</li>
                                            <li>일기예보 안내 기능을 포함한 키오스크 DID 개발</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>*/}

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    슈슈댕(셀프 펫 목욕탕 업체) 키오스크 관리 서비스
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2022.12 ~ 2023.03 (총 4개월) / 3명
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://juneberrydiary.com/blog/tourist0302/15" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com/blog/tourist0302/15</BlogLink>
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)투비스마트</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>슈슈댕 키오스크 사용 현황 및 슈슈댕 지점별 실시간 정산을 관리하는 서비스</li>
                                        <ul>
                                            <li>문자 요청시 메시지 정보 이력을 저장하는 미들웨어 서버 개발</li>
                                            <li>핵심 정산 처리 로직 80% 수정 & 고도화</li>
                                            <li>점주들 요구사항에 맞게 6개 이상 기능 수정<br/>
                                            → 이후 실시한 고객 만족도 평가에서 <b>만족도 상승</b>
                                            </li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    투비스마트 사내 긴급지원업무 서비스[PL]
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2022.09 ~ 2022.12 (총 4개월) / 1명
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://juneberrydiary.com/blog/tourist0302/14" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com/blog/tourist0302/14</BlogLink>
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)투비스마트</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>투비스마트 고객들이 자주 찾는 질문(FAQ)들에 대한 해답을 모아 놓은 서비스</li>
                                        <ul>
                                            <li style={{fontWeight: "400"}}>사내 긴급지원업무 서비스 개발</li>
                                            <ul>
                                                <li>제목/내용/태그/카테고리 별 검색 기능 개발</li>
                                            </ul>
                                            <li style={{fontWeight: "400"}}>사내 긴급지원업무 서비스를 관리하는 서비스 개발</li>
                                            <ul>
                                                <li>운영팀이 자주 찾는 질문과 답변을 등록할 수 있는 블로그 에디터 개발</li>
                                                <li>실시간 FAQ 조회 지표를 모니터링할 수 있는 그래프 개발</li>
                                            </ul>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        {/*<BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    소우주
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2021.12 ~ 2022.02 (총 1개월) / 2명
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)파크웨이브</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>소우주 사이트 유지보수</li>
                                        <ul>
                                            <li>
                                                잘못된 세션 기반 인증 방식을 JWT 기반 방식으로 변경해 불필요하게 적재되는 세션 데이터 양 <b>100%</b> 감소
                                            </li>
                                            <li>HTTPS 프로토콜 기반으로 서비스 변경</li>
                                            <li>Scrum 방식 agile 개발</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>*/}

                        <BlogAboutSemiTitle>
                            <span>Personal Experience & Projects</span>
                        </BlogAboutSemiTitle>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    준베리다이어리[PL]
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock type={"text"}>
                                    2024.03 ~ 현재 / 1명
                                    <a href="https://github.com/Brylimo/juneberry-diary-front" target="_blank" rel="noopener noreferrer"><GitHubIconCustom style={{color: 'rgb(25, 118, 210)'}} /></a>
                                    <a href="https://github.com/Brylimo/juneberry-diary-back" target="_blank" rel="noopener noreferrer"><GitHubIconCustom /></a>
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    임시 ID : jbdtest, 임시 PWD : test99
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://juneberrydiary.com/blog/tourist0302/28" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com/blog/tourist0302/28</BlogLink>
                                </BlogAboutTextBlock>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>캘린더, 블로그를 통해 일상과 기록을 공유하는 종합 다이어리 서비스</li>
                                        <ul>
                                            <li>
                                                redis, 휴리스틱 캐시를 이용해 달력 태그 렌더링 성능 개선<br/>
                                                - <b>5초</b> → <b>0.5초</b> 개선한 경험
                                            </li>
                                            <li>React + CodeMirror + R2를 이용해 블로그 에디터 자체 개발</li>
                                            <li>JPA, QueryDSL을 사용한 다수의 쿼리 튜닝 경험</li>
                                            <li>Jenkins 기반 CI/CD 파이프라인 구축</li>
                                            <li>Prometheus, Grafana를 이용한 모니터링 시스템 구축</li>
                                            <li>https 프로토콜 기반 서비스 <b>운영중</b></li>
                                        </ul>
                                        <li>🚀 <b>Service  </b> 
                                            <BlogLink href="https://juneberrydiary.com" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com</BlogLink>
                                        </li>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    MERCI[PL]
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock type={"text"}>
                                    2023.08 ~ 2024.03 / 1명
                                    <a href="https://github.com/Brylimo/merci" target="_blank" rel="noopener noreferrer"><GitHubIconCustom /></a>
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    임시 ID : mercitest, 임시 PWD : test99
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://www.juneberrydiary.com/blog/tourist0302/17" target="_blank" rel="noopener noreferrer">https://www.juneberrydiary.com/blog/tourist0302/17</BlogLink>
                                </BlogAboutTextBlock>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>지도 저장, 캘린더를 통해 일상을 기록, 관리하는 서비스</li>
                                        <ul>
                                            <li>준베리다이어리의 초창기 버전 프로젝트</li>
                                            <li>Java8 CompletableFuture 기반 시설물 지도 표출 기능 성능 개선</li>
                                            - <b>1.4초</b> → <b>1초</b> 개선한 경험
                                            <li>지도 확대시 현재 위치 기준 주변 건물들을 모두 표출하는 기능 개발</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    다모여<br/>[Backend PL]
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2022.03 ~ 2022.06 / 5명
                                    <a href="https://github.com/06BOM/BOM-backend" target="_blank" rel="noopener noreferrer"><GitHubIconCustom /></a>
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>대학교 캡스톤디자인</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>OX 게임과 공부를 접목시킨 공부 게임 서비스</li>
                                        <ul>
                                            <li>node.js Socket.IO를 이용한 O, X 게임 기능 개발</li>
                                            <li>AWS 기반 서버 인프라 구축</li>
                                            <li>16여 개 이상의 Mocha.js 기반 테스트 코드 작성</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSemiTitle>
                            Presentation & Article
                        </BlogAboutSemiTitle>
                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    달력 성능 개선<br/>
                                    (feat. 캐싱)
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://juneberrydiary.com/blog/tourist0302/26" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com/blog/tourist0302/26</BlogLink>
                                </BlogAboutTextBlock>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>준베리다이어리의 달력 성능 개선 과정을 블로그 포스팅으로 정리</li>
                                        <ul>
                                            <li>레디스 및 react query에 대한 이해</li>
                                            <li>성능 개선 경험 기록</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    JCMS 프론트엔드
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://www.miricanvas.com/v/13d03fr" target="_blank" rel="noopener noreferrer">https://www.miricanvas.com/v/13d03fr</BlogLink>
                                </BlogAboutTextBlock>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>(주)진우소프트이노베이션에서 JCMS 사용법 사내 교육시 사용한 발표 자료</li>
                                        <ul>
                                            <li>타임리프, sass 기초 교육</li>
                                            <li>JCMS 라이브러리 사용법 교육</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    WebGL 튜토리얼 사이트
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://brylimo.github.io/WebGL-Tutorial/" target="_blank" rel="noopener noreferrer">https://brylimo.github.io/WebGL-Tutorial/</BlogLink>
                                </BlogAboutTextBlock>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>
                                            WebGL을 익히고 체험해볼 수 있는 튜토리얼 사이트 개발
                                            <a href="https://github.com/Brylimo/WebGL-Tutorial" target="_blank" rel="noopener noreferrer"><GitHubIconCustom style={{width: '20px', height: '20px', marginLeft: '7px', position: 'relative', top: '2.5px'}}/></a>
                                        </li>
                                        <ul>
                                            <li>WebGL의 textual mapping 사용법 설명</li>
                                            <li>textual mapping이 사용된 큐브 개발</li>
                                            <li>전부분 영어로 작성</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSemiTitle>
                            Education
                        </BlogAboutSemiTitle>
                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    University of North Dakota<br/> 
                                    Computer Science
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2018.08 ~ 2019.05
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>교환학생</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>
                                            2019 데이터베이스 수업 프로젝트 평가 5팀 중 1위
                                            <a href="https://github.com/bstafford2017/OURS" target="_blank" rel="noopener noreferrer"><GitHubIconCustom style={{width: '20px', height: '20px', marginLeft: '7px', position: 'relative', top: '2.5px'}}/></a> 
                                        </li>
                                        <ul>
                                            <li>미국 학생들과 협업 경험</li>
                                            <li>프론트엔드 개발</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    아주대학교<br/> 
                                    소프트웨어학과
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2017.03 ~ 2023.02
                                </BlogAboutTextBlock>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>학점 4.06 / 4.5</li>
                                        <li>
                                            2021 바둑 경기 기력 예측 머신러닝 대회 참가
                                            <a href="https://github.com/Brylimo/go-game-ranking-prediction-machine" target="_blank" rel="noopener noreferrer"><GitHubIconCustom style={{width: '20px', height: '20px', marginLeft: '7px', position: 'relative', top: '2.5px'}}/></a>
                                        </li>
                                        <ul>
                                            <li>팀의 조장으로 대회 참가</li>
                                            <li>XGBoost 지도 학습 알고리즘 사용</li>
                                            <li>13개 팀 중 7위</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSemiTitle>
                            Community
                        </BlogAboutSemiTitle>
                        <BlogAboutHighlightTitle style={{marginTop: '10px', display: 'flex', gap: '7px'}}>
                            알고리즘 스터디(햇살마을) / 2023.10 ~ 현재
                            <a href="https://github.com/HaessalTown/Coding-Test-Study" target="_blank" rel="noopener noreferrer">
                                <GitHubIconCustom style={{ width: '22px', height: '22px' }}/>
                            </a>
                        </BlogAboutHighlightTitle>
                        <BlogAboutTextBlock style={{marginTop: '10px'}}>
                            매주마다 코딩테스트 문제 하나를 풀고 서로의 풀이법을 공유
                        </BlogAboutTextBlock>
                    </BlogAboutContent>
                </BlogAboutBlock>
            </BlogAboutWrapper>
        </>
    )
}

export default BlogAbout;