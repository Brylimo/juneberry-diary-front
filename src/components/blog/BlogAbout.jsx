import React from 'react';
import styled, { css } from 'styled-components';
import { Helmet } from "react-helmet-async";
import { useParams } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

const BlogAboutWrapper = styled.div`
    width: 100%;
    margin-top: 8rem;
    height: auto;
    min-height: calc(100vh - 8rem);
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
    margin-bottom: 12px;
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
    font-weight: 400;
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
    flex: 1.3;
    max-width: 263px;
`;

const BlogAboutRightSide = styled.div`
    flex: 3;
`;

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
                        <BlogAboutIntro>
                            제주도청 주관 '<i>퍼스널 모빌리티 안전 사고 다발지역 안내 서비스</i>'를 1인 개발 및 준공해 1억 4천 만원 가량의 회사 매출을 창출한 경험이 있으며 블로그/다이어리 사이트인 '준베리다이어리'를 개발해 운영하고 있다.
                            준베리다이어리 캘린더 성능 4.5초 개선, 데이터 수집기 서버 메모리 점유율을 28% 절감 등 여러 성능 개선 경험이 있고 미국에서 현지 학생들과 대학교 수강신청 서비스를 개발해 5팀 중 1등을 한 경험이 있다. 
                        </BlogAboutIntro>
                        <BlogAboutLink>
                            <b>Blog</b> : <BlogLink href="https://juneberrydiary.com/blog/tourist0302" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com/blog/tourist0302</BlogLink>
                            <br />
                            <b>Github</b> : <BlogLink href="https://github.com/Brylimo" target="_blank" rel="noopener noreferrer">https://github.com/Brylimo</BlogLink>
                            <br />
                            <b>Email</b> : icj0103@gmail.com
                            <br/>
                            <br/>
                            <b>Career Summary</b> : <br/>
                            <BlogLink href="https://docs.google.com/document/d/1_lEl3kxrgruhx6m9kaZ0h1zMR4ZRba9CD6_SWnp0xe0/edit?usp=sharing" target="_blank" rel="noopener noreferrer">https://docs.google.com/document/d/1_lEl3kxrgruhx6m9kaZ0h1zMR4ZRba9CD6_SWnp0xe0/edit?usp=sharing</BlogLink>
                        </BlogAboutLink>
                        <BlogAboutSemiTitle>
                            Skills
                        </BlogAboutSemiTitle>
                        <BlogHrLine />
                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    <span style={{backgroundColor: "rgb(251, 243, 219)"}}>Backend</span>
                                </BlogAboutHighlightTitle>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>Java, node.js, python</li>
                                        <li>Spring Boot, Spring MVC, Spring Data JPA, Spring Security</li>
                                        <li>JPA, Querydsl, MyBatis, Prisma</li>
                                        <li>Gradle, Maven</li>
                                        <li>IntelliJ, Visual Studio Code, Vim, DBeaver, HeidiSQL</li>
                                        <li>Git</li>
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
                                        <li>AWS EC2, S3, RDS, Lambda, Cloudflare R2, Vercel, Cafe24, GoDaddy</li>
                                        <li>Postgresql, MySQL, MariaDB, SQLite</li>
                                        <li>Jenkins</li>
                                        <li>Nginx, Tomcat, Docker</li>
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
                                        <li>HTML5, CSS, JS(ES5, ES6), Thymeleaf, Pug, JSP, Sass, BootStrap, JQuery</li>
                                        <li>React.js</li>
                                        <li>React Query, Redux, Styled Components, CodeMirror</li>
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
                                        <li>Slack</li>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>
                        
                        <BlogAboutSemiTitle>
                            <span>Work Experience & Projects</span>
                            <BlogAboutTag>총 경력 2년</BlogAboutTag>
                        </BlogAboutSemiTitle>
                        <BlogHrLine />
                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    지능형 디지털 트윈 연합 핵심기술 개발 사업
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2024.04 ~ 2024.07 (총 4개월) / 2명
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)진우소프트이노베이션</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>데이터 수집기 개발</li>
                                        <ul>
                                            <li>Spring으로 개발된 데이터 수집기를 node.js 기반 데이터 수집기로 변경<br/>
                                                → 수집기 서버 메모리 점유율 <b>28%</b> 절감 경험
                                            </li>
                                            <li>가변 데이터 처리 가능하도록 NoSQL인 couch DB + 스프링 기반 데이터 수집기 개발</li>
                                        </ul>
                                        <li>데이터 포털 사이트 개발</li>
                                        <ul>
                                            <li>휴대폰 본인확인 서비스 개발</li>
                                            <li>실시간 데이터 변화를 data activity graph로 시각화</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    JCMS 서비스 리뉴얼[PL]
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2024.01 ~ 2024.07 (총 7개월) / 2명
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)진우소프트이노베이션</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>JCMS 프론트엔드 리뉴얼 담당</li>
                                        <ul>
                                            <li>공통적으로 사용되는 Sass, js 코드를 라이브러리로 만들어 개발 업무 효율성 <b>20%</b> 증대</li>
                                            <li>라이트 / 다크 모드 개발</li>
                                            <li>JCMS 라이브러리 사용법 매뉴얼 제작 및 전 개발자 대상 사내 교육</li>
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
                                    2023.04 ~ 2023.10 (총 7개월) / 1명
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://juneberrydiary.com/blog/tourist0302/16" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com/blog/tourist0302/16</BlogLink>
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>(주)진우소프트이노베이션</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>퍼스널 모빌리티 안전사고 다발지역 안내 서비스 개발</li>
                                        <ul>
                                            <li>PM 불법 주차 판단 알고리즘을 개발하여 PM 불법 주차 여부를 실시간으로 판단하는 과정 자동화</li>
                                            <li>제주도 PM 이용 정보/사고 정보를 그래프, 지도 표출로 시각화</li>
                                            <li>여러 유형의 사고 다발지역 표출 기능 구현</li>
                                            <li>데이터마트 DB를 서비스 DB가 항상 동기화하도록 개발<br/>
                                                → DB 운영 효율 개선 및 서비스 안정성 향상</li>
                                            <li>
                                                중간 감리, 최종 감리, 시큐리티 코딩 테스트 대응<br/>
                                                → <b>1억 4천 만원</b> 가량 회사 매출 창출
                                            </li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>
                        
                        <BlogAboutSideBlock>
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
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    슈슈댕(셀프 펫 목욕탕 업체) 키오스크 관리 사이트
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
                                        <li>슈슈댕 키오스크 관리 사이트 개발</li>
                                        <ul>
                                            <li>문자 요청시 메시지 정보를 저장하는 미들웨어 서버 개발</li>
                                            <li>정산 처리 로직 80% 수정 & 고도화</li>
                                            <li>점주들 요구사항에 맞게 6개 이상 기능 수정<br/>
                                            → 고객 만족도 평가 <b>25%p</b> 상승
                                            </li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    투비스마트 사내 긴급지원업무 사이트[PL]
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
                                        <li>투비스마트 사내 긴급지원업무 사이트 개발</li>
                                        <ul>
                                            <li>블로그 에디터를 통해 운영팀이 답변을 등록할 수 있는 관리 서비스 별도 개발</li>
                                            <li>제목/내용/태그/카테고리 별 검색 기능 개발</li>
                                            <li>FAQ 조회 지표를 나타내는 그래프 개발</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
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
                                                잘못된 세션 기반 인증 방식을 JWT 기반 방식으로 변경해 불필요하게 적재되는 세션 데이터 양 100% 감소
                                            </li>
                                            <li>HTTPS 프로토콜 기반으로 서비스 변경</li>
                                            <li>Scrum 방식 agile 개발</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSemiTitle>
                            <span>Personal Experience & Projects</span>
                        </BlogAboutSemiTitle>
                        <BlogHrLine />

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    준베리다이어리[PL]
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2024.03 ~ 현재 / 1명
                                    <a href="https://github.com/Brylimo/juneberry-diary-front" target="_blank" rel="noopener noreferrer"><GitHubIconCustom style={{color: 'rgb(25, 118, 210)'}} /></a>
                                    <a href="https://github.com/Brylimo/juneberry-diary-back" target="_blank" rel="noopener noreferrer"><GitHubIconCustom /></a>
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://juneberrydiary.com/blog/tourist0302/28" target="_blank" rel="noopener noreferrer">https://juneberrydiary.com/blog/tourist0302/28</BlogLink>
                                </BlogAboutTextBlock>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>준베리다이어리 프론트/백엔드 개발</li>
                                        <ul>
                                            <li>
                                                redis, 휴리스틱 캐시를 이용해 달력 태그 렌더링 성능 개선<br/>
                                                5초 → 0.5초 개선한 경험
                                            </li>
                                            <li>React + CodeMirror + R2를 이용해 블로그 에디터 자체 개발</li>
                                            <li>JPA, QueryDSL을 사용한 다수의 쿼리 튜닝 경험</li>
                                            <li>Jenkins 기반 CI/CD 파이프라인 구축</li>
                                            <li>https 프로토콜 기반 서비스 운영중</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    MERCI[PL]
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2023.08 ~ 2024.03 / 1명
                                    <a href="https://github.com/Brylimo/merci" target="_blank" rel="noopener noreferrer"><GitHubIconCustom /></a>
                                </BlogAboutTextBlock>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}}>
                                    <BlogLink href="https://www.juneberrydiary.com/blog/tourist0302/17" target="_blank" rel="noopener noreferrer">https://www.juneberrydiary.com/blog/tourist0302/17</BlogLink>
                                </BlogAboutTextBlock>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>MERCI 프론트/백엔드 개발</li>
                                        <ul>
                                            <li>Java8 CompletableFuture 기반 시설물 지도 표출 기능 성능 개선</li>
                                            <li>지도 확대시 현재 위치 주변 건물들을 모두 표출하는 기능 개발</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    다모여[PL]
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
                                        <li>다모여 백엔드 개발</li>
                                        <ul>
                                            <li>Socket.IO를 이용한 O, X 게임 기능 개발</li>
                                            <li>AWS 기반 인프라 전체 구축</li>
                                            <li>16여 개의 테스트 코드 작성</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSideBlock>
                            <BlogAboutLeftSide>
                                <BlogAboutHighlightTitle style={{fontSize: '27px'}}>
                                    University of North Dakota 대학교 수강신청 서비스(미국 교환학생)
                                </BlogAboutHighlightTitle>
                                <BlogAboutTextBlock style={{marginBottom: '10px'}} type={"text"}>
                                    2019.04 ~ 2019.05 / 3명
                                    <a href="https://github.com/bstafford2017/OURS" target="_blank" rel="noopener noreferrer"><GitHubIconCustom /></a>
                                </BlogAboutTextBlock>
                                <BlogAboutSmTag>대학교 팀프로젝트</BlogAboutSmTag>
                            </BlogAboutLeftSide>
                            <BlogAboutRightSide>
                                <BlogAboutTxtContentBlock>
                                    <BlogAboutUl>
                                        <li>UND 대학교 수강신청 서비스 프론트 개발</li>
                                        <ul>
                                            <li>html, css, js 이용 프론트 개발</li>
                                            <li>데모 시현 및 최종 발표 진행</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSemiTitle>
                            Presentation & Article
                        </BlogAboutSemiTitle>
                        <BlogHrLine />

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
                        <BlogHrLine />

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
                                        <li>
                                            2021 바둑 경기 기력 예측 머신러닝 대회 참가
                                            <a href="https://github.com/Brylimo/go-game-ranking-prediction-machine" target="_blank" rel="noopener noreferrer"><GitHubIconCustom style={{width: '20px', height: '20px', marginLeft: '7px', position: 'relative', top: '2.5px'}}/></a>
                                        </li>
                                        <ul>
                                            <li>XGBoost 지도 학습 알고리즘 사용</li>
                                            <li>팀의 조장으로 대회 참가</li>
                                        </ul>
                                    </BlogAboutUl>
                                </BlogAboutTxtContentBlock>
                            </BlogAboutRightSide>
                        </BlogAboutSideBlock>

                        <BlogAboutSemiTitle>
                            Community
                        </BlogAboutSemiTitle>
                        <BlogHrLine />
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