-- 테이블이 이미 존재하면 삭제
DROP TABLE IF EXISTS tbl_qna_answer;

DROP TABLE IF EXISTS tbl_qna;

DROP TABLE IF EXISTS tbl_buddy_match_data;

DROP TABLE IF EXISTS tbl_buddy;

DROP TABLE IF EXISTS tbl_buddy_type;

DROP TABLE IF EXISTS tbl_notice;

DROP TABLE IF EXISTS tbl_useinfo;

DROP TABLE IF EXISTS tbl_schedule;

DROP TABLE IF EXISTS tbl_member_answer;

DROP TABLE IF EXISTS tbl_region;

DROP TABLE IF EXISTS tbl_accommodation;

DROP TABLE IF EXISTS tbl_answer;

DROP TABLE IF EXISTS tbl_questionnaire;

DROP TABLE IF EXISTS tbl_question_naire_theme;

DROP TABLE IF EXISTS tbl_verification;

DROP TABLE IF EXISTS tbl_account;

DROP TABLE IF EXISTS tbl_authority;

DROP TABLE IF EXISTS tbl_faq;

DROP TABLE IF EXISTS tbl_fq_type;

-- 테이블 생성 (PK, AUTO_INCREMENT, ENGINE, COMMENT, FK 포함)
CREATE TABLE
    IF NOT EXISTS tbl_authority (
                                    authority_code INT NOT NULL AUTO_INCREMENT COMMENT '권한코드',
                                    authority_name VARCHAR(20) NOT NULL COMMENT '권한이름',
                                    PRIMARY KEY (authority_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '권한';

CREATE TABLE
    IF NOT EXISTS tbl_fq_type (
                                  fq_type_code INT NOT NULL AUTO_INCREMENT COMMENT '문의유형코드',
                                  fq_type_name VARCHAR(30) NOT NULL COMMENT '문의유형이름',
                                  PRIMARY KEY (fq_type_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = 'FAQ QnA 유형';

CREATE TABLE
    IF NOT EXISTS tbl_region (
                                 region_code INT NOT NULL AUTO_INCREMENT COMMENT '지역코드',
                                 region_name VARCHAR(30) NOT NULL COMMENT '지역명',
                                 region_description VARCHAR(255) NOT NULL COMMENT '지역설명',
                                 region_img TEXT NULL COMMENT '지역사진',
                                 region_thumbnail_img TEXT NULL COMMENT '지역썸네일사진',
								 region_user_detail TEXT NULL COMMENT '사용자입력상세주소',
                                 PRIMARY KEY (region_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '지역';

CREATE TABLE
    IF NOT EXISTS tbl_buddy_type (
                                     buddy_type_code INT NOT NULL AUTO_INCREMENT COMMENT '버디유형코드',
                                     buddy_type_name VARCHAR(50) NOT NULL COMMENT '버디유형이름',
                                     PRIMARY KEY (buddy_type_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '버디 유형';

CREATE TABLE
    IF NOT EXISTS tbl_question_naire_theme (
                                               theme_code int NOT NULL AUTO_INCREMENT COMMENT '질문지테마코드',
                                               question_theme VARCHAR(255) NULL COMMENT '질문지 테마',
                                               PRIMARY KEY (theme_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '질문지 테마';

CREATE TABLE
    IF NOT EXISTS tbl_accommodation (
                                        accom_code INT NOT NULL COMMENT '숙소코드',
                                        accom_type VARCHAR(20) NULL COMMENT '숙소종류',
                                        accom_name VARCHAR(100) NULL COMMENT '숙소이름',
                                        accom_addres VARCHAR(100) NULL COMMENT '숙소주소',
                                        accom_img TEXT NULL COMMENT '숙소사진',
                                        accom_thumbnail_img TEXT NULL COMMENT '숙소썸네일사진',
										accom_user_detail TEXT NULL COMMENT '사용자입력상세주소',
                                        PRIMARY KEY (accom_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '숙소 테이블';

CREATE TABLE
    IF NOT EXISTS tbl_account (
                                  member_code INT NOT NULL AUTO_INCREMENT COMMENT '회원코드',
                                  member_name VARCHAR(20) NOT NULL COMMENT '회원아이디',
                                  member_password VARCHAR(255) NOT NULL COMMENT '회원비밀번호',
                                  member_full_name VARCHAR(20) NOT NULL COMMENT '회원이름',
                                  member_birthday DATE NOT NULL COMMENT '회원생년월일',
                                  member_email VARCHAR(50) NOT NULL COMMENT '회원이메일',
                                  member_phone VARCHAR(15) NOT NULL COMMENT '회원전화번호',
                                  member_suspension VARCHAR(1) NOT NULL DEFAULT 'N' COMMENT '정지여부',
                                  member_deletion VARCHAR(1) NOT NULL DEFAULT 'N' COMMENT '탈퇴여부',
                                  member_like INT NULL DEFAULT 0 COMMENT '좋아요',
                                  member_img VARCHAR(255) NOT NULL DEFAULT 'member_img_default.png' COMMENT '프로필사진',
                                  authority_code INT NOT NULL COMMENT '권한코드',
                                  member_create TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '가입일',
                                  member_leave DATE NULL COMMENT '탈퇴일',
                                  PRIMARY KEY (member_code),
                                  FOREIGN KEY (authority_code) REFERENCES tbl_authority (authority_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '회원 계정';

CREATE TABLE
    IF NOT EXISTS tbl_faq (
                              faq_code INT NOT NULL AUTO_INCREMENT COMMENT '문의코드',
                              fq_type_code INT NOT NULL COMMENT '문의유형코드',
                              faq_title VARCHAR(100) NOT NULL COMMENT 'faq제목',
                              faq_contents VARCHAR(500) NOT NULL COMMENT 'faq내용',
                              faq_at VARCHAR(1) NOT NULL DEFAULT 'N' COMMENT '은폐여부',
                              PRIMARY KEY (faq_code),
                              FOREIGN KEY (fq_type_code) REFERENCES tbl_fq_type (fq_type_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = 'FAQ';

CREATE TABLE
    IF NOT EXISTS tbl_buddy (
                                buddy_code INT NOT NULL AUTO_INCREMENT COMMENT '버디코드',
                                member_code INT NOT NULL COMMENT '회원코드',
                                region_code INT NOT NULL COMMENT '지역코드',
                                buddy_type_code INT NOT NULL COMMENT '버디유형코드',
                                buddy_title VARCHAR(50) NOT NULL COMMENT '게시글제목',
                                buddy_contents VARCHAR(500) NOT NULL COMMENT '게시글내용',
                                buddy_create DATETIME NOT NULL COMMENT '게시글작성일',
                                buddy_status VARCHAR(1) NOT NULL DEFAULT 'N' COMMENT '게시글상태',
                                buddy_img TEXT NULL COMMENT '게시글이미지',
                                buddy_count INT NOT NULL DEFAULT 0 COMMENT '조회수',
                                buddy_at VARCHAR(1) NOT NULL DEFAULT 'N' COMMENT '은폐여부',
                                PRIMARY KEY (buddy_code),
                                FOREIGN KEY (member_code) REFERENCES tbl_account (member_code) ON DELETE CASCADE,
                                FOREIGN KEY (region_code) REFERENCES tbl_region (region_code) ON DELETE CASCADE,
                                FOREIGN KEY (buddy_type_code) REFERENCES tbl_buddy_type (buddy_type_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '버디게시판';

CREATE TABLE
    IF NOT EXISTS tbl_questionnaire (
                                        quest_code INT NOT NULL AUTO_INCREMENT COMMENT '질문지코드',
                                        question VARCHAR(255) NULL COMMENT '질문',
                                        theme_code INT NOT NULL COMMENT '질문지테마코드',
                                        PRIMARY KEY (quest_code),
                                        FOREIGN KEY (theme_code) REFERENCES tbl_question_naire_theme (theme_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '질문지';

CREATE TABLE
    IF NOT EXISTS tbl_verification (
                                       verification_code INT NOT NULL AUTO_INCREMENT COMMENT '인증코드',
                                       verification_number INT NOT NULL COMMENT '인증번호',
                                       is_verified BOOLEAN NOT NULL COMMENT '인증여부',
                                       verification_time DATETIME NOT NULL COMMENT '만료시간',
                                       member_code INT NOT NULL COMMENT '회원코드',
                                       PRIMARY KEY (verification_code),
                                       FOREIGN KEY (member_code) REFERENCES tbl_account (member_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '인증';

CREATE TABLE
    IF NOT EXISTS tbl_buddy_match_data (
                                           buddy_match_code INT NOT NULL AUTO_INCREMENT COMMENT '버디매칭코드',
                                           buddy_code INT NOT NULL COMMENT '버디코드',
                                           member_code INT NOT NULL COMMENT '회원코드',
                                           apply_id VARCHAR(30) NULL COMMENT '신청자아이디',
                                           apply_status INT NOT NULL DEFAULT '1' COMMENT '매칭신청',
                                           PRIMARY KEY (buddy_match_code),
                                           FOREIGN KEY (buddy_code) REFERENCES tbl_buddy (buddy_code) ON DELETE CASCADE,
                                           FOREIGN KEY (member_code) REFERENCES tbl_account (member_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '버디 매칭 데이터';

CREATE TABLE
    IF NOT EXISTS tbl_qna (
                              qna_code INT NOT NULL AUTO_INCREMENT COMMENT '문의코드',
                              fq_type_code INT NOT NULL COMMENT '문의유형코드',
                              member_code INT NOT NULL COMMENT '회원코드',
                              qna_title VARCHAR(100) NOT NULL COMMENT '문의제목',
                              qna_contents VARCHAR(500) NOT NULL COMMENT '문의내용',
                              qna_create DATETIME NOT NULL COMMENT '문의생성일',
                              PRIMARY KEY (qna_code),
                              FOREIGN KEY (fq_type_code) REFERENCES tbl_fq_type (fq_type_code) ON DELETE CASCADE,
                              FOREIGN KEY (member_code) REFERENCES tbl_account (member_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = 'QnA';

CREATE TABLE
    IF NOT EXISTS tbl_qna_answer (
                                     ans_code INT NOT NULL AUTO_INCREMENT COMMENT '답변코드',
                                     qna_code INT NOT NULL COMMENT '문의코드',
                                     ans_contents VARCHAR(500) NULL COMMENT '답변내용',
                                     ans_create DATETIME NULL COMMENT '답변날짜',
                                     PRIMARY KEY (ans_code),
                                     FOREIGN KEY (qna_code) REFERENCES tbl_qna (qna_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = 'QnA 답변';

CREATE TABLE
    IF NOT EXISTS tbl_answer (
                                 answer_code INT NOT NULL AUTO_INCREMENT COMMENT '답변코드',
                                 answer TEXT NOT NULL COMMENT '답변',
                                 quest_code INT NOT NULL COMMENT '질문지코드',
                                 PRIMARY KEY (answer_code),
                                 FOREIGN KEY (quest_code) REFERENCES tbl_questionnaire (quest_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '답변';

CREATE TABLE
    IF NOT EXISTS tbl_member_answer (
                                        member_answer_code INT NOT NULL AUTO_INCREMENT COMMENT '회원답변코드',
                                        quest_code INT NOT NULL COMMENT '질문지코드',
                                        answer_code INT NOT NULL COMMENT '답변코드',
                                        PRIMARY KEY (member_answer_code),
                                        FOREIGN KEY (answer_code) REFERENCES tbl_answer (answer_code) ON DELETE CASCADE,
                                        FOREIGN KEY (quest_code) REFERENCES tbl_questionnaire (quest_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '회원답변';

CREATE TABLE
    IF NOT EXISTS tbl_notice (
                                 notice_code INT NOT NULL AUTO_INCREMENT COMMENT '공지코드',
                                 notice_title VARCHAR(100) NOT NULL COMMENT '공지제목',
                                 notice_contents TEXT NOT NULL COMMENT '공지내용',
                                 notice_create DATETIME NOT NULL COMMENT '등록일시',
                                 notice_count INT NOT NULL DEFAULT 0 COMMENT '조회수',
                                 notice_img VARCHAR(300) NULL COMMENT '이미지경로',
                                 notice_at VARCHAR(1) NOT NULL DEFAULT 'N' COMMENT '은폐여부',
                                 PRIMARY KEY (notice_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '공지사항';

CREATE TABLE
    IF NOT EXISTS tbl_useinfo (
                                  useinfo_code INT NOT NULL AUTO_INCREMENT COMMENT '설명서코드',
                                  useinfo_title VARCHAR(50) NOT NULL COMMENT '설명서제목',
                                  useinfo_contents TEXT NOT NULL COMMENT '설명서내용',
                                  useinfo_create DATETIME NOT NULL COMMENT '등록일시',
                                  useinfo_count INT NOT NULL DEFAULT 0 COMMENT '조회수',
                                  useinfo_img VARCHAR(300) NULL COMMENT '이미지경로',
                                  useinfo_at VARCHAR(1) NOT NULL DEFAULT 'N' COMMENT '은폐여부',
                                  PRIMARY KEY (useinfo_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '사용설명서';

CREATE TABLE
    IF NOT EXISTS tbl_schedule (
                                   sche_code INT NOT NULL AUTO_INCREMENT COMMENT '스케줄넘버',
                                   region_code INT NOT NULL COMMENT '지역코드',
                                   accom_code INT NOT NULL COMMENT '숙소코드',
                                   member_code INT NOT NULL COMMENT '회원코드',
                                   member_answer_code INT NULL COMMENT '회원답변코드',
                                   sche_list TEXT NOT NULL COMMENT '생성된스케줄',
                                   sche_start_date DATE NOT NULL COMMENT '여행시작날짜',
                                   sche_end_date DATE NOT NULL COMMENT '여행종료날짜',
                                   sche_start_time time NOT NULL COMMENT '여행시작날짜',
                                   sche_end_time time NOT NULL COMMENT '여행종료날짜',
                                   travel_time VARCHAR(100) NULL COMMENT '이동시간',
                                   sche_time VARCHAR(100) NULL COMMENT '스케줄시간',
                                   PRIMARY KEY (sche_code),
                                   FOREIGN KEY (region_code) REFERENCES tbl_region (region_code) ON DELETE CASCADE,
                                   FOREIGN KEY (accom_code) REFERENCES tbl_accommodation (accom_code) ON DELETE CASCADE,
                                   FOREIGN KEY (member_code) REFERENCES tbl_account (member_code) ON DELETE CASCADE,
                                   FOREIGN KEY (member_answer_code) REFERENCES tbl_member_answer (member_answer_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '스케줄';

-- tbl_Authority
INSERT INTO
    tbl_authority (authority_code, authority_name)
VALUES
    (1, 'ROLE_ADMIN'),
    (2, 'ROLE_USER');

-- tbl_question_type
INSERT INTO
    tbl_fq_type (fq_type_code, fq_type_name)
VALUES
    (1, '일정'),
    (2, '숙소'),
    (3, '지역'),
    (4, '보안');

-- tbl_region
INSERT INTO
    tbl_region (
    region_code,
    region_name,
    region_description,
    region_img,
    region_thumbnail_img
)
VALUES
    (
        101,
        '서울',
        '서울은 대한민국의 수도로, 다양한 문화와 관광지로 유명합니다.',
        'seoul.jpg',
        'seoul_thumb.jpg'
    ),
    (
        102,
        '경기도',
        '경기도는 서울을 둘러싸고 있는 지역으로, 산업과 자연경관이 어우러져 있습니다.',
        'gyeonggi.jpg',
        'gyeonggi_thumb.jpg'
    ),
    (
        103,
        '인천',
        '인천은 항구 도시로, 인천항과 송도의 현대적인 도시 경관이 인상적입니다.',
        'incheon.jpg',
        'incheon_thumb.jpg'
    ),
    (
        104,
        '강원도',
        '강원도는 아름다운 자연경관과 겨울 스포츠로 유명한 지역입니다.',
        'gangwon.jpg',
        'gangwon_thumb.jpg'
    ),
    (
        105,
        '충청북도',
        '충청북도는 다양한 자연경관과 역사적 유적지가 있는 지역입니다.',
        'chungbuk.jpg',
        'chungbuk_thumb.jpg'
    ),
    (
        106,
        '충청남도',
        '충청남도는 서해안과 가까워 바다와 산의 조화가 아름다운 지역입니다.',
        'chungnam.jpg',
        'chungnam_thumb.jpg'
    ),
    (
        107,
        '대전',
        '대전은 대한민국의 과학과 기술의 중심지로, 많은 연구기관과 성심당 및 기업들이 위치해 있습니다.',
        'daejeon.jpg',
        'daejeon_thumb.jpg'
    ),
    (
        108,
        '세종',
        '세종은 행정 중심복합도시로, 행정기관과 함께 자연 친화적인 환경을 자랑합니다.',
        'sejong.jpg',
        'sejong_thumb.jpg'
    ),
    (
        109,
        '전라북도',
        '전라북도는 고풍스러운 전통과 풍성한 자연을 갖춘 지역입니다.',
        'jeonbuk.jpg',
        'jeonbuk_thumb.jpg'
    ),
    (
        110,
        '전라남도',
        '전라남도는 아름다운 바다와 다양한 섬들이 있는 지역입니다.',
        'jeonnam.jpg',
        'jeonnam_thumb.jpg'
    ),
    (
        111,
        '광주',
        '광주는 대한민국의 대표적인 문화도시로, 다양한 미술관과 박물관이 있습니다.',
        'gwangju.jpg',
        'gwangju_thumb.jpg'
    ),
    (
        112,
        '경상북도',
        '경상북도는 고대 역사 유적과 자연경관이 잘 보존되어 있는 지역입니다.',
        'gyeongbuk.jpg',
        'gyeongbuk_thumb.jpg'
    ),
    (
        113,
        '경상남도',
        '경상남도는 산업과 자연이 조화를 이루는 지역으로, 아름다운 해변이 많습니다.',
        'gyeongnam.jpg',
        'gyeongnam_thumb.jpg'
    ),
    (
        114,
        '부산',
        '부산은 해운대, 광안리 등 해변이 유명한 도시입니다.',
        'busan.jpg',
        'busan_thumb.jpg'
    ),
    (
        115,
        '대구',
        '대구는 섬유산업의 중심지이자, 맛있는 음식과 다양한 볼거리가 있는 도시입니다.',
        'daegu.jpg',
        'daegu_thumb.jpg'
    ),
    (
        116,
        '울산',
        '울산은 산업도시로, 현대자동차와 같은 대기업들이 위치해 있습니다.',
        'ulsan.jpg',
        'ulsan_thumb.jpg'
    ),
    (
        117,
        '제주도',
        '제주는 자연경관이 아름다운 섬으로, 제주특별자치도로 유명합니다.',
        'jeju.jpg',
        'jeju_thumb.jpg'
    );

-- tbl_BuddyMatchType
INSERT INTO
    tbl_buddy_type (buddy_type_code, buddy_type_name)
VALUES
    (1, '버디'),
    (2, '여행객');

-- tbl_question_naire_theme
INSERT INTO
    tbl_question_naire_theme (theme_code, question_theme)
VALUES
    (1, '힐링'),
    (2, '관광/문화'),
    (3, '활동'),
    (4, '식사');

-- 숙소 유형 데이터 예시
INSERT INTO
    tbl_accommodation (accom_code, accom_type, accom_name, accom_addres, accom_thumbnail_img)
VALUES
    (1, '게스트하우스', '게스트하우스', '다양한 사람들과 어울리며 숙박을 할 수 있습니다.', 'guesthouse_thumb.jpg'),
    (
        2,
        '호텔',
        '호텔',
        '깔끔하고 객실과 친절한 서비스를 받으며 숙박을 할 수 있습니다.',
        'hotel_thumb.jpg'
    ),
    (3, '에어비앤비', '에어비앤비', '정형화된 숙소의 느낌보단 현지에서 생활하는 것 같은 느낌으로 숙박을 할 수 있습니다.', 'villa_thumb.jpg'),
    (4, '펜션', '펜션', '자연과 어울리며 일행과 함께 프라이빗한 숙박을 할 수 있습니다.', 'cottage_thumb.jpg');

-- tbl_Account
INSERT INTO
    tbl_account (
    member_code,
    member_name,
    member_password,
    member_full_name,
    member_birthday,
    member_email,
    member_phone,
    member_suspension,
    member_deletion,
    member_like,
    member_img,
    authority_code,
    member_create,
    member_leave
)
VALUES
    (
        1001,
        'admin',
        '$2a$10$COvazywgZPXseeKaYhruh.pAYYfcSeGO5aSrHOsLZN0X8joNwW2dW',
        'John Doe',
        '1985-06-15',
        'john.doe@example.com',
        '010-1111-2222',
        'N',
        'N',
        42,
        'member_img_default.png',
        1,
        '2024-12-25',
        NULL
    ),
    (
        1002,
        'user01',
        '$2a$10$COvazywgZPXseeKaYhruh.pAYYfcSeGO5aSrHOsLZN0X8joNwW2dW',
        'Jane Smith',
        '1990-09-25',
        'jane.smith@example.com',
        '010-3333-4444',
        'N',
        'N',
        37,
        'member_img_default.png',
        2,
        '2024-12-25',
        NULL
    ),
    (
        1003,
        'alex_kim',
        'password5678',
        'Alex Kim',
        '1992-04-05',
        'alex.kim@example.com',
        '010-5555-6666',
        'N',
        'N',
        58,
        'member_img_default.png',
        2,
        '2024-12-25',
        '2025-01-30'
    ),
    (1004, 'user_john24', 'password1234', '김영훈', '1990-07-15', 'john24@example.com', '010-2345-6789', 'N', 'N', 72, 'member_img_default.png', 2, '2023-06-01', NULL),
    (1005, 'sarah_park', 'secure7890', '박지민', '1995-03-22', 'sarah.park@example.com', '010-1234-5678', 'N', 'N', 85, 'member_img_default.png', 2, '2023-08-15', '2024-02-20'),
    (1006, 'charlie_lee', 'mypassword', '이찬호', '1988-11-03', 'charlie.lee@example.com', '010-9876-5432', 'N', 'N', 67, 'member_img_default.png', 2, '2023-05-10', NULL),
    (1007, 'emily_han', 'pass5678', '한유리', '1992-12-18', 'emily.han@example.com', '010-3456-7890', 'N', 'N', 92, 'member_img_default.png', 2, '2023-07-07', '2024-03-15'),
    (1008, 'daniel_choi', 'hello2023', '최현우', '1985-06-30', 'daniel.choi@example.com', '010-6789-1234', 'N', 'N', 45, 'member_img_default.png', 2, '2022-11-25', NULL),
    (1009, 'kate_kim99', 'pw1234abcd', '김민정', '1998-05-14', 'kate.kim99@example.com', '010-5555-4444', 'N', 'N', 33, 'member_img_default.png', 2, '2023-02-10', NULL),
    (1010, 'joshua_park', 'secure9876', '박정수', '1987-08-20', 'joshua.park@example.com', '010-1111-2222', 'N', 'N', 54, 'member_img_default.png', 2, '2023-03-08', '2024-01-12'),
    (1011, 'amy_lee88', 'qwerty456', '이수빈', '1994-04-27', 'amy.lee88@example.com', '010-7777-8888', 'N', 'N', 76, 'member_img_default.png', 2, '2023-01-25', NULL),
    (1012, 'kevin_jung', 'pass4321', '정도영', '1990-10-01', 'kevin.jung@example.com', '010-2222-3333', 'N', 'N', 63, 'member_img_default.png', 2, '2023-05-12', NULL),
    (1013, 'sophia_oh', 'password999', '오예은', '1996-02-14', 'sophia.oh@example.com', '010-8888-7777', 'N', 'N', 28, 'member_img_default.png', 2, '2023-09-10', '2024-05-18'),
    (1014, 'brian_kwon', 'mypw2023', '권민호', '1989-01-05', 'brian.kwon@example.com', '010-6666-5555', 'N', 'N', 48, 'member_img_default.png', 2, '2023-04-15', NULL),
    (1015, 'grace_yun', 'securepass', '윤소현', '1997-09-12', 'grace.yun@example.com', '010-9999-8888', 'N', 'N', 38, 'member_img_default.png', 2, '2023-02-22', NULL),
    (1016, 'ryan_kang', 'hello789', '강재원', '1991-03-11', 'ryan.kang@example.com', '010-4444-3333', 'N', 'N', 57, 'member_img_default.png', 2, '2022-12-30', NULL),
    (1017, 'emma_lim', 'pw6543', '임유나', '1993-11-21', 'emma.lim@example.com', '010-1212-3434', 'N', 'N', 80, 'member_img_default.png', 2, '2023-06-22', '2024-08-20'),
    (1018, 'henry_ahn', 'pass2020', '안성훈', '1986-07-08', 'henry.ahn@example.com', '010-1313-2424', 'N', 'N', 62, 'member_img_default.png', 2, '2023-01-01', NULL),
    (1019, 'mia_kim', 'mypw678', '김다은', '1999-01-22', 'mia.kim@example.com', '010-1515-3535', 'N', 'N', 25, 'member_img_default.png', 2, '2023-07-17', NULL),
    (1020, 'lucas_song', 'secure123', '송우진', '1988-05-09', 'lucas.song@example.com', '010-1717-4646', 'N', 'N', 70, 'member_img_default.png', 2, '2023-03-05', '2024-02-15'),
    (1021, 'isabella_hwang', 'pass0987', '황서연', '1995-10-19', 'isabella.hwang@example.com', '010-1818-5757', 'N', 'N', 29, 'member_img_default.png', 2, '2023-09-05', NULL),
    (1022, 'ethan_kim', 'password2468', '김도현', '1992-12-31', 'ethan.kim@example.com', '010-1919-6868', 'N', 'N', 93, 'member_img_default.png', 2, '2023-04-10', NULL),
    (1023, 'olivia_choi', 'mypw5555', '최유진', '1991-06-16', 'olivia.choi@example.com', '010-2020-7979', 'N', 'N', 44, 'member_img_default.png', 2, '2023-08-20', '2024-09-25'),
    (1024, 'alice_park99', 'pw5678abcd', '박지수', '1997-06-13', 'alice.park99@example.com', '010-4343-5656', 'N', 'N', 34, 'member_img_default.png', 2, '2023-02-12', NULL),
    (1025, 'jackson_oh', 'secure3456', '오민재', '1992-03-19', 'jackson.oh@example.com', '010-2424-3434', 'N', 'N', 87, 'member_img_default.png', 2, '2023-01-05', NULL),
    (1026, 'luna_kang', 'mypw9876', '강예린', '1990-09-25', 'luna.kang@example.com', '010-5555-6767', 'N', 'N', 58, 'member_img_default.png', 2, '2023-05-15', '2024-02-14'),
    (1027, 'dylan_kim', 'pw5678efgh', '김도경', '1994-11-07', 'dylan.kim@example.com', '010-6767-7878', 'N', 'N', 71, 'member_img_default.png', 2, '2023-07-01', NULL),
    (1028, 'ella_lee88', 'pass5678', '이수연', '1998-12-12', 'ella.lee88@example.com', '010-7878-8989', 'N', 'N', 43, 'member_img_default.png', 2, '2023-06-18', NULL),
    (1029, 'noah_han', 'pwabc123', '한지후', '1987-10-03', 'noah.han@example.com', '010-8989-9090', 'N', 'N', 64, 'member_img_default.png', 2, '2022-12-20', '2024-03-05'),
    (1030, 'sophia_kim', 'securepass', '김유정', '1996-01-15', 'sophia.kim@example.com', '010-9090-1212', 'N', 'N', 50, 'member_img_default.png', 2, '2023-03-30', NULL),
    (1031, 'ethan_park', 'mypw9999', '박주호', '1993-08-18', 'ethan.park@example.com', '010-1212-2323', 'N', 'N', 66, 'member_img_default.png', 2, '2023-02-10', NULL),
    (1032, 'mia_ahn', 'passabcd', '안소율', '1999-02-09', 'mia.ahn@example.com', '010-2323-3434', 'N', 'N', 40, 'member_img_default.png', 2, '2023-07-22', '2024-09-15'),
    (1033, 'leo_jung', 'pw123456', '정민석', '1988-04-25', 'leo.jung@example.com', '010-3434-4545', 'N', 'N', 89, 'member_img_default.png', 2, '2023-04-12', NULL),
    (1034, 'ava_choi', 'mypw5678', '최윤아', '1992-07-03', 'ava.choi@example.com', '010-4545-5656', 'N', 'N', 53, 'member_img_default.png', 2, '2023-08-02', NULL),
    (1035, 'ryan_kim99', 'secure9876', '김정훈', '1986-11-19', 'ryan.kim99@example.com', '010-5656-6767', 'N', 'N', 72, 'member_img_default.png', 2, '2023-01-18', NULL),
    (1036, 'hannah_lee', 'pw2468abcd', '이혜진', '1995-05-09', 'hannah.lee@example.com', '010-6767-7878', 'N', 'N', 39, 'member_img_default.png', 2, '2023-03-01', NULL),
    (1037, 'james_park88', 'pass7890', '박현수', '1990-06-16', 'james.park88@example.com', '010-7878-8989', 'N', 'N', 47, 'member_img_default.png', 2, '2023-02-25', '2024-05-11'),
    (1038, 'olivia_oh', 'pw5678xyz', '오하은', '1997-03-22', 'olivia.oh@example.com', '010-8989-9090', 'N', 'N', 55, 'member_img_default.png', 2, '2023-06-15', NULL),
    (1039, 'daniel_kwon', 'mypw3456', '권우빈', '1989-02-07', 'daniel.kwon@example.com', '010-9090-1212', 'N', 'N', 62, 'member_img_default.png', 2, '2022-12-10', '2024-03-20'),
    (1040, 'amelia_kang', 'pass6543', '강서현', '1994-08-29', 'amelia.kang@example.com', '010-1212-2323', 'N', 'N', 41, 'member_img_default.png', 2, '2023-01-22', NULL),
    (1041, 'lucas_ahn', 'pwabcd5678', '안도영', '1991-01-12', 'lucas.ahn@example.com', '010-2323-3434', 'N', 'N', 70, 'member_img_default.png', 2, '2023-03-12', NULL),
    (1042, 'isabella_lee', 'mypw2020', '이소미', '1998-10-18', 'isabella.lee@example.com', '010-3434-4545', 'N', 'N', 44, 'member_img_default.png', 2, '2023-07-10', NULL),
    (1043, 'harry_kim', 'securepass1', '김준호', '1993-05-26', 'harry.kim@example.com', '010-4545-5656', 'N', 'N', 49, 'member_img_default.png', 2, '2023-05-02', '2024-06-01'),
    (1044, 'grace_kim', 'pw5678abcd', '김은혜', '1993-09-15', 'grace.kim@example.com', '010-3333-4444', 'N', 'N', 65, 'member_img_default.png', 2, '2023-03-11', NULL),
    (1045, 'benjamin_lee', 'secure4321', '이태호', '1989-12-22', 'benjamin.lee@example.com', '010-5555-6666', 'N', 'N', 49, 'member_img_default.png', 2, '2022-11-05', NULL),
    (1046, 'chloe_park', 'mypw6789', '박수민', '1995-04-30', 'chloe.park@example.com', '010-7777-8888', 'N', 'N', 72, 'member_img_default.png', 2, '2023-01-19', NULL),
    (1047, 'william_oh', 'pw8901abcd', '오민호', '1992-07-07', 'william.oh@example.com', '010-9999-1111', 'N', 'N', 56, 'member_img_default.png', 2, '2023-05-21', '2024-06-15'),
    (1048, 'emma_han', 'pass1234', '한주연', '1997-10-13', 'emma.han@example.com', '010-2222-3333', 'N', 'N', 34, 'member_img_default.png', 2, '2023-02-14', NULL),
    (1049, 'samuel_kang', 'pw5678efgh', '강우진', '1988-03-20', 'samuel.kang@example.com', '010-4444-5555', 'N', 'N', 63, 'member_img_default.png', 2, '2023-04-28', '2024-02-25'),
    (1050, 'sophia_choi', 'mypw3456', '최나현', '1991-06-12', 'sophia.choi@example.com', '010-6666-7777', 'N', 'N', 58, 'member_img_default.png', 2, '2023-06-30', NULL),
    (1051, 'ethan_kwon', 'pass5678', '권민성', '1994-02-18', 'ethan.kwon@example.com', '010-8888-9999', 'N', 'N', 71, 'member_img_default.png', 2, '2023-07-22', NULL),
    (1052, 'lucy_jung', 'pw4321abcd', '정서영', '1999-08-01', 'lucy.jung@example.com', '010-1111-2222', 'N', 'N', 45, 'member_img_default.png', 2, '2023-08-12', '2024-05-04'),
    (1053, 'oliver_ahn', 'mypw5678', '안현우', '1990-05-26', 'oliver.ahn@example.com', '010-3333-4444', 'N', 'N', 83, 'member_img_default.png', 2, '2023-09-05', NULL),
    (1054, 'ava_kim', 'secure6789', '김다은', '1996-11-08', 'ava.kim@example.com', '010-5555-6666', 'N', 'N', 68, 'member_img_default.png', 2, '2023-01-18', NULL),
    (1055, 'ryan_park', 'pw2468abcd', '박준영', '1987-09-03', 'ryan.park@example.com', '010-7777-8888', 'N', 'N', 52, 'member_img_default.png', 2, '2022-12-12', NULL),
    (1056, 'mia_lee', 'mypw6543', '이하은', '1992-02-22', 'mia.lee@example.com', '010-9999-1111', 'N', 'N', 40, 'member_img_default.png', 2, '2023-02-05', '2024-03-10'),
    (1057, 'noah_kim', 'secure4567', '김도윤', '1997-01-10', 'noah.kim@example.com', '010-2222-3333', 'N', 'N', 48, 'member_img_default.png', 2, '2023-06-03', NULL),
    (1058, 'luna_ahn', 'passabcd', '안소미', '1998-03-14', 'luna.ahn@example.com', '010-4444-5555', 'N', 'N', 74, 'member_img_default.png', 2, '2023-08-09', NULL),
    (1059, 'james_kwon', 'pw123456', '권재민', '1986-11-20', 'james.kwon@example.com', '010-6666-7777', 'N', 'N', 62, 'member_img_default.png', 2, '2022-11-25', NULL),
    (1060, 'amelia_park', 'mypw9876', '박예진', '1994-12-19', 'amelia.park@example.com', '010-8888-9999', 'N', 'N', 50, 'member_img_default.png', 2, '2023-04-20', '2024-01-14'),
    (1061, 'leo_choi', 'pwabcd5678', '최태현', '1993-06-07', 'leo.choi@example.com', '010-1111-2222', 'N', 'N', 66, 'member_img_default.png', 2, '2023-03-15', NULL),
    (1062, 'emma_han99', 'securepass', '한지아', '1996-05-04', 'emma.han99@example.com', '010-3333-4444', 'N', 'N', 39, 'member_img_default.png', 2, '2023-05-25', NULL),
    (1063, 'harry_kim', 'mypw2468', '김현수', '1991-04-21', 'harry.kim@example.com', '010-5555-6666', 'N', 'N', 55, 'member_img_default.png', 2, '2023-08-14', NULL);

-- tbl_faq
INSERT INTO
    tbl_faq (fq_type_code, faq_title, faq_contents, faq_at)
VALUES
    (
        4,
        '비밀번호를 잊었어요',
        '비밀번호를 재설정하려면 이메일을 통해 새 비밀번호를 발송해드립니다.',
        'N'
    ),
    (
        3,
        '회원 탈퇴 방법',
        '회원 탈퇴는 개인정보 보호 정책에 따라, 탈퇴 후 30일 이내에는 복구가 불가능합니다.',
        'Y'
    ),
    (
        2,
        '비밀번호를 잊었어요',
        '비밀번호를 재설정하려면 이메일을 통해 새 비밀번호를 발송해드립니다.',
        'N'
    ),
    (
        1,
        '회원 낚는 방법',
        '회원 낚시는 개인정보 보호 정책에 따라, 탈퇴 후 30일 이내에는 복구가 불가능합니다.',
        'Y'
    ),
    (
        1,
        '버디 매칭은 어떻게 하나요?',
        '버디 배칭은 버디매칭 게시판을 들어가서 신청 버튼을 눌러주세요.',
        'N'
    ),
    (
        1,
        '회원가입을 하고 싶어요',
        '회원가입은 이메일 주소와 비밀번호만 있으면 가능합니다.',
        'N'
    ),
    (
        2,
        '로그인이 안돼요',
        '로그인 오류가 지속될 경우 고객센터에 문의해주세요.',
        'N'
    ),
    (
        3,
        '비밀번호를 변경하고 싶어요',
        '비밀번호 변경은 계정 설정에서 가능합니다.',
        'N'
    ),
    (
        4,
        '비밀번호를 잊었어요',
        '비밀번호를 재설정하려면 이메일을 통해 새 비밀번호를 발송해드립니다.',
        'N'
    ),
    (
        1,
        '이용 가능한 서비스는 무엇인가요?',
        '여행 추천, 커뮤니티 참여, 일정 관리를 제공합니다.',
        'N'
    ),
    (
        2,
        '결제는 어떤 방법으로 하나요?',
        '결제는 신용카드와 계좌이체 모두 가능합니다.',
        'N'
    ),
    (
        3,
        '예약을 취소하고 싶어요',
        '예약 취소는 마이페이지의 예약 내역에서 진행할 수 있습니다.',
        'N'
    ),
    (
        4,
        '환불은 어떻게 받나요?',
        '환불 처리는 결제 수단에 따라 3~5일이 소요됩니다.',
        'N'
    ),
    (
        1,
        '고객센터는 몇 시까지 운영되나요?',
        '고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다.',
        'N'
    ),
    (
        2,
        '서비스 이용료가 있나요?',
        '일부 유료 서비스는 별도 비용이 발생합니다.',
        'N'
    ),
    (
        1,
        '프로필 사진을 변경하고 싶어요',
        '프로필 사진은 계정 설정에서 수정 가능합니다.',
        'N'
    ),
    (
        2,
        '회원탈퇴는 어떻게 하나요?',
        '회원탈퇴는 계정 설정에서 신청할 수 있으며, 처리까지 7일이 소요됩니다.',
        'N'
    ),
    (
        3,
        '알림 설정을 바꾸고 싶어요',
        '알림 설정은 환경설정 메뉴에서 변경할 수 있습니다.',
        'N'
    ),
    (
        4,
        '예약 내역을 확인하고 싶어요',
        '예약 내역은 마이페이지에서 확인 가능합니다.',
        'N'
    ),
    (
        1,
        '포인트 적립은 어떻게 하나요?',
        '서비스 이용 시 자동으로 포인트가 적립됩니다.',
        'N'
    ),
    (
        2,
        '포인트를 사용하고 싶어요',
        '포인트는 결제 화면에서 적용할 수 있습니다.',
        'N'
    ),
    (
        3,
        '다른 사람과 일정을 공유하고 싶어요',
        '일정 공유는 일정 관리 페이지에서 가능합니다.',
        'N'
    ),
    (
        4,
        '위치 서비스를 켜야 하나요?',
        '정확한 추천을 위해 위치 서비스가 필요합니다.',
        'N'
    ),
    (
        1,
        '아이디를 변경할 수 있나요?',
        '아이디 변경은 불가능하니 신중히 선택해주세요.',
        'N'
    ),
    (
        2,
        '정기 결제를 취소하고 싶어요',
        '정기 결제 취소는 결제 관리에서 가능합니다.',
        'N'
    ),
    (1, '프로모션 코드를 어디서 확인하나요?', '프로모션 코드는 마이페이지에서 확인 가능합니다.', 'N'),
    (2, '계정을 복구하고 싶어요', '계정 복구는 고객센터를 통해 진행할 수 있습니다.', 'N'),
    (3, '앱이 계속 종료돼요', '앱 업데이트를 확인하거나 재설치를 권장합니다.', 'N'),
    (4, '여행 가이드를 저장하고 싶어요', '여행 가이드는 즐겨찾기 기능으로 저장 가능합니다.', 'N'),
    (1, '특별 이벤트는 어디서 확인하나요?', '특별 이벤트는 홈페이지 배너에서 확인 가능합니다.', 'N'),
    (2, '알림이 오지 않아요', '앱 알림 설정을 확인해주세요.', 'N'),
    (3, '비행기 예약이 실패했어요', '결제 수단을 확인하거나 다른 카드로 시도해주세요.', 'N'),
    (4, '출발 시간을 변경할 수 있나요?', '출발 시간 변경은 예약 수정 메뉴에서 가능합니다.', 'N'),
    (1, '포인트는 언제 만료되나요?', '포인트는 적립 후 1년간 유효합니다.', 'N'),
    (2, '비밀번호 보안을 강화하고 싶어요', '2단계 인증을 설정하시면 더 안전합니다.', 'N'),
    (3, '친구 초대 링크가 작동하지 않아요', '초대 링크가 만료되었는지 확인해주세요.', 'N'),
    (4, '쿠폰을 여러 개 사용할 수 있나요?', '쿠폰은 1회 결제 시 한 개만 사용할 수 있습니다.', 'N'),
    (1, '예약 알림을 받고 싶어요', '예약 알림은 알림 설정에서 활성화할 수 있습니다.', 'N'),
    (2, '결제 영수증은 어디서 확인하나요?', '결제 영수증은 이메일로 발송됩니다.', 'N'),
    (3, '후기를 작성하고 싶어요', '후기는 예약 내역 페이지에서 작성 가능합니다.', 'N'),
    (4, '인증 이메일이 오지 않아요', '스팸 메일함을 확인하거나 이메일 주소를 다시 입력해주세요.', 'N'),
    (1, '가장 인기 있는 여행지는 어디인가요?', '홈페이지에서 인기 여행지를 확인할 수 있습니다.', 'N'),
    (2, '여행 일정을 추천받고 싶어요', '여행 추천 기능을 이용해주세요.', 'N'),
    (3, '사진을 업로드할 수 없어요', '파일 크기를 확인하거나 다른 브라우저를 사용해보세요.', 'N'),
    (4, '예약 완료 알림이 안 와요', '예약 알림은 설정 메뉴에서 활성화해야 합니다.', 'N'),
    (1, '숙소 예약을 취소하고 싶어요', '숙소 예약 취소는 마이페이지에서 가능합니다.', 'N'),
    (2, '신용카드 정보를 변경하고 싶어요', '결제 관리 메뉴에서 변경 가능합니다.', 'N'),
    (3, '여행 친구를 찾고 싶어요', '여행 친구 매칭 서비스가 제공됩니다.', 'N'),
    (4, '계정이 잠겼어요', '비밀번호를 재설정하거나 고객센터에 문의해주세요.', 'N'),
    (1, '여행 기록을 공유하고 싶어요', '여행 기록은 커뮤니티에서 공유 가능합니다.', 'N'),
    (2, '이메일 알림을 끄고 싶어요', '환경 설정에서 이메일 알림을 비활성화할 수 있습니다.', 'N'),
    (3, '장바구니에 담긴 항목을 확인하고 싶어요', '장바구니는 메인 메뉴에서 확인 가능합니다.', 'N'),
    (4, '예약 전 상담을 받고 싶어요', '고객센터를 통해 상담을 신청할 수 있습니다.', 'N'),
    (1, '새로운 여행 상품이 있나요?', '신규 여행 상품은 매주 업데이트됩니다.', 'N');

-- tbl_buddy
INSERT INTO
    tbl_buddy (
    member_code,
    region_code,
    buddy_type_code,
    buddy_title,
    buddy_contents,
    buddy_create,
    buddy_status,
    buddy_img,
    buddy_count,
    buddy_at
)
VALUES
    (1001, 101, 2, '2인 방탈출 투어',
     '홍대에서 방탈출 투어하실분 구합니다~ 홍대 방탈출 3-4개 정도 돌 예정이고 방탈출 고수분만 원합니다. 방탈출 잘하는 친구가 없어요... 12월 3일 수요일 오전 11시부터 오후까지 생각하고 있습니다. 자세한 건 카톡 minnni23 아이디로 문의주세요~',
     NOW(), 'N', '', 150, 'N'),

    (1002, 114, 2, '부산 떡볶이 투어',
     '1월 10일에 하루종일 떡볶이 투어 다니실 분 구합니다. 택시타고 이동하며 매운 떡볶이를 좋아하시는 분 환영합니다. 사진은 제가 어제 먹은 떡볶이입니다. 많은 신청 부탁드려요!',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1003, 101, 2, '청계천 산책 메이트',
     '12월 19일 서울 여행 때 청계천을 혼자 걷기 심심해서 같이 걸으실 분 구해요. 근처 맛집도 함께 갈 예정입니다. 스몰토크 가능하신 분 환영합니다!',
     NOW(), 'Y', 'image3.jpg', 75, 'Y'),

    (1004, 115, 1, '대구 수목원 에듀케이터 이벤트',
     '안녕하세요. 매주 주말 대구 수목원에서 에듀케이터 활동을 진행 중입니다. 이번에 새로 단장된 수목원에서 4월 26일 하루 동안 무료 에듀케이터 이벤트를 진행합니다. 많은 신청 부탁드립니다!',
     NOW(), 'Y', 'image3.jpg', 75, 'Y'),

    (1010, 114, 2, '부산 택시 투어',
     '부산에서 １월　１２일　하루 동안 택시 투어　구해요 부산의 유명 맛집을 많이 알고 계신 기사님을 구합니다.',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1004, 115, 1, '대구 수목원 가이드 이벤트',
     '새롭게 단장된 대구 수목원에서 특별 할인 이벤트를 진행합니다. 3월 26일 하루만 입장료 1,000원! 가족, 친구와 함께 즐기세요!',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1015, 109, 1, '전주 한옥마을 일일 가이드',
     '매주 주말 전주 한옥마을에서 전통 한옥과 역사를 소개하는 무료 일일 가이드 프로그램을 진행합니다. 가족, 단체, 커플 모두 환영합니다!',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1002, 102, 1, '부산 태종대 투어',
     '태종대, 감천문화마을, 송도스카이워크, 해동용궁사를 당일치기로 즐겨보세요. 오전 9시 부산역 출발! 자세한 일정은 카톡으로 문의 바랍니다.',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1012, 102, 1, '양평 양떼목장 체험',
     '2월 2일 양평 양떼목장에서 하루 무료 입장 이벤트를 진행합니다. 건초 먹이기 체험과 시즌별 플라워 포토존도 포함되어 있습니다!',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1022, 115, 1, '대구 원데이 클래스 할인 이벤트',
     '도자기 원데이 클래스를 새로 오픈했습니다. 12월 14일부터 1월 14일까지 반값 할인 이벤트를 진행하니 많은 참여 부탁드립니다!',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1009, 102, 2, '행궁동 저녁 메이트',
     '수원 행궁동의 파스타 맛집과 디저트를 즐기실 분을 모집합니다. 맛집 투어는 정확히 N빵으로 진행됩니다.',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1015, 109, 1, '전주 한옥마을 2월 4일 가이드',
     '2월 4일 전주 한옥마을에서 무료 가이드 이벤트를 진행합니다. 한옥의 역사와 전통문화를 자세히 안내합니다. 많은 신청 부탁드립니다!',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1021, 103, 1, '요트 세일링 체험',
     '석양을 보며 요트 위에서 힐링하세요. 요트를 직접 운전하며 럭셔리한 경험을 즐길 수 있습니다. 1시간 세일링 체험 금액은 50,000원입니다.',
     NOW(), 'N', 'image2.jpg', 230, 'N'),

    (1021, 101, 1, '서울 야경 투어',
     '서울의 멋진 야경 명소들을 돌아보는 투어! 남산타워와 한강, 그리고 이태원의 숨은 스팟까지, 사진 찍기 딱 좋은 곳들만 모아봅니다. 같이 즐겨요~ 12월 20일 오후 6시 남산 케이블카 앞에서 만나요!',
     NOW(), 'N', '', 50, 'N'),

    (1007, 117, 1, '제주 감귤 체험 투어',
     '제주에서 감귤 따기 체험 함께해요! 직접 따서 먹는 재미는 물론, 감귤 농장 풍경도 너무 예뻐요. 수확한 감귤은 집으로 가져갈 수 있어요! 1월 5일 오전 9시 제주공항에서 만나요~',
     NOW(), 'N', '', 80, 'N'),

    (1002, 104, 2, '강릉 커피거리 투어',
     '강릉 안목해변 카페 거리의 핫플을 돌아다니며 커피 향에 취해볼까요? 바다도 보고 커피도 즐기고! 12월 15일 오전 11시 강릉역에서 만나요!',
     NOW(), 'N', '', 70, 'N'),

    (1002, 104, 1, '속초 설악산 트레킹',
     '설악산 트레킹 초보자도 걱정 없어요! 가벼운 코스로 자연을 만끽하며, 끝나고 근처 맛집에서 밥 한 끼 어때요? 12월 22일 오전 8시 속초 버스터미널에서 출발합니다.',
     NOW(), 'N', '', 90, 'N'),

    (1011, 112, 2, '포항 호미곶 해돋이 투어',
     '새해 첫 해돋이를 포항 호미곶에서 함께 봐요! 밤 11시에 포항역에서 출발해서, 새벽의 특별한 순간을 함께 나눠요. 따뜻한 음료 준비해갈게요~',
     NOW(), 'N', '', 150, 'N'),

    (1011, 102, 1, '수원 화성 투어',
     '유네스코 세계문화유산 수원 화성을 걸으며 역사를 체험해봐요! 전통 무예 공연도 보고, 마무리는 수원갈비로 배도 든든하게! 가족 단위로도 추천드립니다~ 1월 7일 오전 10시 수원역에서 만나요!',
     NOW(), 'N', 'suwon_hwaseong.jpg', 45, 'N'),

    (1012, 103, 2, '인천 차이나타운 맛집 투어',
     '차이나타운의 만두와 짜장면, 그리고 삼국지 벽화 거리까지! 인천의 숨겨진 매력을 같이 즐겨봐요. 12월 28일 오전 11시 차이나타운 입구에서 시작합니다.',
     NOW(), 'N', 'incheon_chinatown.jpg', 50, 'N'),

    (1013, 104, 1, '대관령 양떼목장 체험',
     '강원도의 대관령에서 양떼들에게 먹이를 주고 자연과 교감하는 시간을 가져봐요! 포근한 풍경 속에서 사진도 찍고, 맛있는 간식도 나눠요. 1월 15일 오전 10시 양떼목장 입구에서 만나요~',
     NOW(), 'N', 'suwon_hwaseong.jpg', 35, 'N'),

    (1014, 105, 2, '청주 예술 거리 산책',
     '예술의 감성을 느낄 수 있는 청주 예술 거리로 함께 떠나요! 다양한 전시와 아트센터 방문, 그리고 감성 카페에서 여유롭게 마무리~ 12월 18일 오후 1시 청주 터미널에서 만나요.',
     NOW(), 'N', 'cheongju_art.jpg', 20, 'N'),

    (1015, 106, 1, '공주 무령왕릉 탐방',
     '공주의 백제 역사를 느낄 수 있는 무령왕릉 탐방! 함께 걸으며 역사 속으로 빠져볼까요? 1월 9일 오전 9시 공주역에서 시작합니다.',
     NOW(), 'N', 'gongju_tomb.jpg', 40, 'N'),

    (1016, 107, 1, '유성 온천 체험',
     '유성 온천에서 따끈한 스파로 몸과 마음을 힐링해요! 온천 후엔 근처 재래시장에서 지역 음식도 즐겨볼까요? 1월 20일 오후 2시 유성 온천 입구에서 시작해요.',
     NOW(), 'N', 'daejeon_spa.jpg', 50, 'N'),

    (1017, 108, 1, '세종 호수공원 요가 클래스',
     '아름다운 호수공원을 배경으로 요가 한 시간, 어때요? 초보자도 환영이고, 클래스 끝나고 간단한 스무디도 제공돼요~ 1월 12일 오전 9시 호수공원 주차장에서 만나요!',
     NOW(), 'N', 'sejong_yoga.jpg', 15, 'N'),

    (1018, 109, 1, '전주 한옥마을 야경 투어',
     '한옥마을에서 은은한 조명 속 전통 가옥의 매력을 느껴보세요. 저녁식사로 전주비빔밥도 함께합니다! 1월 6일 오후 6시 전주역에서 만나요~',
     NOW(), 'N', 'jeonju_night.jpg', 60, 'N'),

    (1019, 110, 2, '순천만 국가정원 산책',
     '순천만의 절경을 산책하며 자연 속에서 힐링해요. 산책 후엔 갈대밭을 배경으로 사진도 찍고, 한적한 카페에서 마무리~ 1월 14일 오후 2시 순천 정원 입구에서 시작합니다.',
     NOW(), 'N', 'suncheon_bay.jpg', 70, 'N'),

    (1020, 111, 1, '광주 미디어아트 투어',
     '현대 미술과 미디어 아트를 경험하며 창의적인 영감을 받아보세요! 작품 해설과 함께 깊이 있는 시간을 가져봐요. 12월 23일 오후 3시 아시아문화전당 입구에서 만나요!',
     NOW(), 'N', 'gwangju_media.jpg', 40, 'N'),

    (1021, 112, 1, '경주 불국사 탐방',
     '한국 전통 사찰 불국사와 석굴암에서 평온한 시간을 가져봐요. 첨성대와 안압지도 포함된 코스랍니다~ 12월 25일 오전 10시 경주역에서 시작해요.',
     NOW(), 'N', 'gyeongju_bulguksa.jpg', 90, 'N'),

    (1022, 113, 2, '거제 외도 섬 투어',
     '거제 외도의 아름다운 섬을 크루즈로 여행해요! 식물원과 해안 절경까지, 특별한 하루를 보장합니다. 1월 18일 오전 9시 거제 크루즈 선착장에서 만나요~',
     NOW(), 'N', 'geoje_island.jpg', 80, 'N'),

    (1023, 114, 1, '해운대 서핑 클래스',
     '해운대 해변에서 신나는 서핑 클래스, 초보자도 쉽게 배울 수 있어요! 강습 후엔 카페에서 여유롭게 하루를 마무리합니다. 12월 30일 오후 1시 해운대 해변 입구에서 만나요~',
     NOW(), 'N', 'haeundae_surfing.jpg', 50, 'N'),

    (1024, 115, 1, '김광석 거리 예술 투어',
     '대구의 김광석 거리를 걸으며 예술 작품을 감상하고 음악과 함께하는 여유로운 하루를 보내세요. 12월 27일 오후 3시 거리 입구에서 만나요!',
     NOW(), 'N', 'kim_kwangseok.jpg', 30, 'N'),

    (1025, 116, 1, '울산 간절곶 해돋이 투어',
     '간절곶에서 한국에서 가장 먼저 떠오르는 해돋이를 감상해요. 뜨끈한 아침 국밥도 제공됩니다~ 1월 1일 새벽 4시 울산역에서 출발합니다.',
     NOW(), 'N', 'ulsan_sunrise.jpg', 25, 'N'),

    (1026, 117, 1, '제주 우도 자전거 여행',
     '우도의 아름다운 풍경 속을 자전거로 달려보세요! 땅콩아이스크림 먹으면서 섬의 매력을 가득 느껴보아요. 12월 29일 오전 10시 우도 선착장에서 만나요~',
     NOW(), 'N', 'jeju_udo.jpg', 60, 'N'),

    (1027, 101, 1, '서촌 골목길 맛집 탐방',
     '서울 서촌 골목길의 숨겨진 맛집과 카페를 탐방하며 특별한 하루를 보내세요. 12월 21일 오후 1시 경복궁역 2번 출구에서 만나요~',
     NOW(), 'N', 'seochon_alley.jpg', 30, 'N'),

    (1028, 102, 1, '양평 두물머리 투어',
     '두물머리에서 조용하고 한적한 아침을 함께 즐겨요. 사진 찍기 좋은 장소를 추천해드릴게요! 1월 8일 오전 7시 두물머리 주차장에서 만나요~',
     NOW(), 'N', 'yangpyeong.jpg', 40, 'N'),

    (1029, 103, 1, '강화도 전등사 탐방',
     '강화도의 고즈넉한 전등사에서 사찰 체험과 템플스테이를 즐겨보세요. 마음이 편안해지는 하루가 될 거예요~ 12월 29일 오전 10시 전등사 입구에서 만나요.',
     NOW(), 'N', 'ganghwa_temple.jpg', 20, 'N'),

    (1030, 104, 1, '평창 송어 축제 체험',
     '평창 송어 축제에서 얼음낚시와 송어 요리를 즐겨보세요! 가족과 함께 겨울의 낭만을 만끽하세요~ 1월 20일 오전 9시 축제 입구에서 만나요.',
     NOW(), 'N', 'pyeongchang_festival.jpg', 70, 'N'),

    (1031, 105, 1, '단양 도담삼봉 투어',
     '단양 도담삼봉에서 한적한 강가 산책과 함께 단양의 특산물을 즐길 수 있습니다. 1월 12일 오전 9시 단양역에서 만나요',
     NOW(), 'N', 'dodamsambong.jpg', 50, 'N'),

    (1032, 106, 1, '충남 서천 국립생태원 투어',
     '서천의 국립생태원에서 다양한 생태계를 탐방하며 자연을 체험하세요. 가족과 함께 즐길 수 있는 최고의 코스입니다. 1월 15일 오전 10시 생태원 입구에서 만나요~',
     NOW(), 'N', 'seocheon_ecopark.jpg', 40, 'N'),

    (1033, 107, 1, '대전 카이스트 과학 체험 투어',
     '카이스트 과학박물관에서 최첨단 과학기술을 경험하고 대전의 과학 도시 매력을 느껴보세요! 1월 17일 오전 10시 카이스트 정문에서 시작합니다.',
     NOW(), 'N', 'kaist_tour.jpg', 60, 'N'),

    (1034, 108, 1, '세종 중앙공원 산책',
     '세종 중앙공원의 넓은 잔디밭에서 함께 걷고, 한적한 자연 속에서 여유로운 시간을 보내요. 1월 22일 오전 9시 중앙공원 정문에서 출발합니다.',
     NOW(), 'N', 'sejong_park.jpg', 30, 'N'),

    (1035, 109, 1, '전주 비빔밥 쿠킹 클래스',
     '전주의 대표 음식 비빔밥을 직접 만들어보고 맛보는 쿠킹 클래스를 진행합니다. 전주 한옥마을 쿠킹 스튜디오에서 만나요! 1월 10일 오후 2시에 시작합니다.',
     NOW(), 'N', 'jeonju_cooking.jpg', 45, 'N'),

    (1036, 110, 2, '여수 오동도 산책',
     '여수의 오동도에서 바다와 함께하는 산책을 즐겨보세요. 섬 속의 대나무 숲과 멋진 해안 절경이 기다리고 있습니다. 1월 25일 오후 1시에 오동도 입구에서 만나요~',
     NOW(), 'N', 'odongdo.jpg', 55, 'N'),

    (1037, 111, 1, '광주 양림동 예술 투어',
     '광주의 예술적인 감성을 느낄 수 있는 양림동에서 갤러리와 전통 건축을 탐방하세요. 1월 8일 오후 3시 양림동 입구에서 만나요!',
     NOW(), 'N', 'yangrim_art.jpg', 35, 'N'),

    (1038, 112, 1, '경북 청도 와인터널 투어',
     '청도의 와인터널에서 와인 시음과 낭만적인 시간을 보내보세요. 1월 18일 오후 2시에 터널 입구에서 시작합니다.',
     NOW(), 'N', 'cheongdo_wine.jpg', 50, 'N'),

    (1039, 113, 1, '경남 통영 루지 체험',
     '통영 루지에서 신나는 활강을 체험하며 통영의 아름다운 풍경을 감상해보세요! 1월 20일 오전 11시에 루지센터에서 만나요.',
     NOW(), 'N', 'tongyeong_luge.jpg', 70, 'N'),

    (1040, 114, 1, '부산 광안리 SUP 체험',
     '광안리 해변에서 스탠드업 패들보드(SUP)를 타며 바다 위를 누벼보세요. 초보자도 쉽게 배울 수 있어요. 1월 23일 오후 1시에 광안리 SUP 센터에서 만나요!',
     NOW(), 'N', 'gwangalli_sup.jpg', 40, 'N'),

    (1041, 115, 1, '대구 팔공산 케이블카 투어',
     '팔공산 케이블카를 타고 정상에서 대구의 전경을 감상하세요. 산책로를 따라 여유롭게 자연을 만끽할 수 있습니다. 1월 28일 오전 10시에 팔공산 입구에서 출발합니다.',
     NOW(), 'N', 'palgong_cablecar.jpg', 50, 'N'),

    (1042, 116, 1, '울산 대왕암공원 탐방',
     '대왕암공원의 멋진 해안 절벽을 따라 걷고 자연 속에서 힐링하는 시간을 가져요. 1월 16일 오전 10시 공원 입구에서 만나요!',
     NOW(), 'N', 'daewangam.jpg', 30, 'N'),

    (1043, 117, 1, '제주 올레길 걷기',
     '제주의 올레길을 걸으며 섬의 풍경과 함께 마음의 여유를 찾아보세요. 1월 30일 오전 9시 올레길 7코스 시작점에서 만나요!',
     NOW(), 'N', 'jeju_ollegil.jpg', 60, 'N'),

    (1044, 101, 1, '서울 북촌 한옥마을 산책',
     '북촌의 전통 한옥을 둘러보며 조용하고 여유로운 산책을 즐겨요. 1월 12일 오전 10시 북촌 입구에서 출발합니다.',
     NOW(), 'N', 'bukchon.jpg', 50, 'N'),

    (1045, 102, 1, '양평 레일바이크 체험',
     '양평의 레일바이크를 타고 자연을 만끽하며 가족과 함께 즐거운 시간을 보내세요. 1월 27일 오전 10시에 레일바이크 센터에서 만나요.',
     NOW(), 'N', 'yangpyeong_railbike.jpg', 40, 'N'),

    (1002, 101, 2, '홍대 카페 같이 가요~',
     '홍대에 예쁜 카페들이 너무 많아서 혼자 가기 아쉽더라고요. 디저트 맛집도 탐방하고 사진도 찍을 분 구해요! 12월 15일 오후 2시에 홍대입구역에서 만나요~ 부담 없이 와주세요!',
     NOW(), 'N', 'hongdae_cafe.jpg', 80, 'N'),

    (1002, 108, 1, '세종시 역사 투어 갑시다!',
     '세종시에 재밌는 역사 명소들 많거든요. 국립세종도서관부터 시작해서 박물관도 가보고요, 점심도 같이 먹으면 좋을 것 같아요. 1월 10일 오전 10시에 세종시청 앞에서 만나요~ 친구나 가족이랑 오셔도 대환영!',
     NOW(), 'N', 'sejong_history.jpg', 50, 'N'),

    (1002, 104, 2, '강릉 맛집 같이 돌아다닐 사람~',
     '강릉에서 맛집 투어 할 건데 혼자 가기엔 너무 아쉽더라고요. 초당두부마을도 가고, 커피거리도 둘러볼 예정이에요. 1월 5일 오전 11시 강릉역에서 만나요! 같이 맛난 하루 보내요!',
     NOW(), 'N', 'gangneung_food.jpg', 120, 'N'),

    (1002, 115, 1, '대구 근대골목 걸으며 힐링해요~',
     '대구 근대골목에서 천천히 걸으면서 숨겨진 이야기 들어볼까요? 계산성당, 진골목 같은 곳도 들러볼 예정이에요. 12월 20일 오후 3시에 대구역에서 만나요! 걸으면서 이런저런 얘기 나눠요~',
     NOW(), 'N', 'daegu_street.jpg', 70, 'N'),

    (1002, 112, 1, '경주 역사 투어 같이 가실래요?',
     '경주의 불국사, 석굴암, 대릉원을 하루에 다 돌아볼 거예요! 경주의 고즈넉한 매력을 느껴보러 같이 가요. 12월 25일 오전 9시에 경주역에서 만나요~ 사진도 많이 찍어드릴게요!',
     NOW(), 'N', 'gyeongju_tour.jpg', 150, 'N'),

    (1002, 117, 2, '제주 오름 걷기 좋아하는 분~',
     '제주 오름 올라가면서 힐링할 분 구해요! 쉬운 코스니까 걱정 마시고요, 끝나고 맛있는 현지 음식도 같이 먹어요. 1월 20일 오전 8시 제주 공항에서 만나요! 같이 멋진 추억 만들어요~',
     NOW(), 'N', 'jeju_orum.jpg', 90, 'N'),

    (1002, 114, 1, '부산 야경 투어 같이 해요!',
     '부산의 예쁜 야경 명소, 광안리랑 해운대 같이 갈 사람~! 카메라 필수고요, 예쁜 사진도 찍어드릴게요. 1월 15일 오후 6시 부산역에서 만나요! 끝나고 포장마차도 들릴 수 있어요~',
     NOW(), 'N', 'busan_night.jpg', 60, 'N'),

    (1002, 102, 2, '수원 화성 구경 같이 해요~',
     '수원 화성 진짜 멋있는데 같이 걸어다니며 둘러볼 분 찾습니다. 역사 좋아하는 분이면 더 좋고요, 행궁동도 들러서 한옥 느낌도 느껴봐요! 12월 30일 오전 10시에 수원역에서 만나요!',
     NOW(), 'N', 'suwon_fortress.jpg', 100, 'N'),

    (1002, 103, 1, '인천 차이나타운 맛집 탐방!',
     '인천 차이나타운에서 만두랑 짜장면 맛있는 데 돌아다닐 거예요. 삼국지 벽화 거리도 보고 분위기 느껴봐요! 1월 3일 오전 10시에 차이나타운 입구에서 만나요~ 함께하면 더 재밌을 거예요!',
     NOW(), 'N', 'incheon_chinatown.jpg', 110, 'N'),

    (1002, 110, 2, '여수 낭만 포차 거리 투어',
     '여수 밤바다 보면서 포차 거리에서 해산물 먹고 즐길 분 찾아요~ 분위기도 즐기고, 여수 맛집에서 신나게 먹어요! 12월 28일 오후 7시에 여수엑스포역에서 만나요!',
     NOW(), 'N', 'yeosu_pocha.jpg', 85, 'N'),

    (1002, 111, 1, '광주 문화 전당 투어',
     '광주 국립아시아문화전당에서 현대 미술도 보고 전통문화 체험도 해봐요! 오후에는 문화전당 카페에서 쉬어가는 시간도 가질 거예요. 1월 8일 오후 1시에 전당 정문에서 만나요!',
     NOW(), 'N', 'gwangju_culture.jpg', 95, 'N'),

    (1002, 109, 1, '전주 한옥마을 맛집 탐방',
     '전주 한옥마을에서 전통 비빔밥이랑 떡갈비 맛보실 분 구해요! 전통 한옥 찻집도 들러볼 예정이에요. 12월 22일 오전 11시에 전주역에서 만나서 함께 걸어요!',
     NOW(), 'N', 'jeonju_hanok.jpg', 105, 'N'),

    (1002, 113, 2, '창원 마산 어시장 탐방',
     '마산 어시장에서 싱싱한 해산물 보고 맛있는 거 같이 먹어요! 바닷바람 맞으며 시장 둘러보고, 현지 맛집도 가요! 1월 12일 오전 10시에 마산역에서 만나요!',
     NOW(), 'N', 'changwon_market.jpg', 75, 'N'),

    (1002, 105, 1, '단양 구경시장 구경해요~',
     '단양 구경시장 구경하면서 먹거리 탐방하실 분 구해요! 맛있는 전통 음식이랑 특산물 많으니 같이 즐겨봐요! 1월 3일 오전 9시에 단양역에서 만나요!',
     NOW(), 'N', 'danyang_market.jpg', 65, 'N'),

    (1002, 107, 1, '대전 성심당 빵투어~',
     '성심당에서 튀김소보로, 부추빵 같이 먹으면서 수다 떨고 사진 찍을 분 구해요! 성심당 내부 구경도 하고, 카페에서 따뜻한 커피 마시면서 여유로운 시간도 보내요. 12월 27일 오후 2시에 대전역에서 만나요!',
     NOW(), 'N', 'daejeon_bakery.jpg', 120, 'N');

-- tbl_questionnaire
INSERT INTO
    tbl_questionnaire (quest_code, theme_code, question)
VALUES
    (1, 1, '여행 중 가장 힐링되는 순간은?'),
    (2, 1, '여행 중 마음을 편안하게 해주는 활동은?'),
    (3, 1, '힐링 여행지로 떠날 때 가장 중요한 것은?'),
    (4, 1, '숙소에서 가장 편안하게 느껴지는 요소는?'),
    (5, 1, '여행 중 스트레스가 풀리는 순간은?'),
    (6, 1, '여행 중 가장 편안하게 즐기는 음식은?'),
    (7, 1, '바쁜 일상을 떠나 여행할 때 가장 중요한 준비물은?'),
    (8, 1, '여행지에서 편안한 시간을 보내는 방법은?'),
    (9, 1, '여행 중 피로를 풀기 위해 자주 하는 일은?'),
    (10, 1, '여행지에서 가장 힐링이 되는 풍경은?'),
    (11, 1, '여행 후 나의 힐링 방식은?'),
    (12, 1, '여행지에서 느끼는 평화로운 분위기는?'),
    (13, 2, '여행지에서 가장 좋아하는 관광지는?'),
    (14, 2, '여행 중 가장 기억에 남는 문화체험은?'),
    (15, 2, '새로운 도시를 여행할 때 가장 먼저 찾는 곳은?'),
    (16, 2, '여행 중 가장 많이 가는 관광지는?'),
    (17, 2, '여행지에서 가장 흥미로운 사람들을 만날 때?'),
    (18, 2, '여행 중 가장 기억에 남는 문화 공연은?'),
    (19, 2, '여행 중 현지에서 가장 많이 먹은 음식은?'),
    (20, 2, '여행지에서 현지 문화를 배우는 방법은?'),
    (21, 2, '여행 중 가장 좋아하는 박물관은?'),
    (22, 2, '여행지에서 경험하고 싶은 문화 활동은?'),
    (23, 2, '여행 중 가장 인상 깊은 역사적인 장소는?'),
    (24, 2, '문화적 차이를 경험할 때 가장 신선하게 느끼는 부분은?'),
    (25, 3, '여행 중 가장 좋아하는 액티비티는?'),
    (26, 3, '여행지에서 가장 즐기고 싶은 액티비티는?'),
    (27, 3, '액티비티 여행에서 가장 중요한 준비물은?'),
    (28, 3, '여행지에서 도전해보고 싶은 활동은?'),
    (29, 3, '여행 중 가장 기억에 남는 액티비티는?'),
    (30, 3, '액티비티 여행지에서 가장 중요한 요소는?'),
    (31, 3, '여행지에서 가장 멋졌던 자연 경관은?'),
    (32, 3, '여행지에서 도전할 만한 스포츠는?'),
    (33, 3, '여행지에서 즐긴 모험은?'),
    (34, 3, '여행지에서 가장 재미있었던 액티비티는?'),
    (35, 3, '여행 중 가장 기억에 남는 모험은?'),
    (36, 3, '여행에서 경험하고 싶은 극한 스포츠는?'),
    (37, 4, '여행 중 가장 기억에 남는 음식은?'),
    (38, 4, '여행지에서 가장 많이 먹은 음식은?'),
    (39, 4, '여행 중 새로운 음식을 시도할 때의 기분은?'),
    (40, 4, '여행 중 가장 맛있었던 디저트는?'),
    (41, 4, '식사할 때 가장 즐기는 분위기는?'),
    (42, 4, '여행 중 가장 신기했던 음식 조합은?'),
    (43, 4, '여행 중 가장 많이 방문한 식당은?'),
    (44, 4, '여행 중 가장 인상 깊었던 음료는?'),
    (45, 4, '여행 중 식사를 하면서 가장 중요하게 생각하는 것은?'),
    (46, 4, '여행 중 가장 신선하게 먹었던 음식은?'),
    (47, 4, '여행지에서 가장 인상 깊었던 식사 경험은?'),
    (48, 4, '여행지에서 먹어보고 싶은 음식은?');

-- tbl_verification
INSERT INTO
    tbl_verification (
    verification_code,
    verification_number,
    is_verified,
    verification_time,
    member_code
)
VALUES
    (1, 1234, false, '2024-11-10 12:00:00', 1001),
    (2, 5678, false, '2024-11-10 12:05:00', 1002),
    (3, 2468, TRUE, '2024-11-10 12:10:00', 1003);

-- tbl_BuddyMatchData
INSERT INTO
    tbl_buddy_match_data (buddy_code, member_code, apply_id, apply_status)
VALUES
    (1, 1001, 'john_doe', 1),
    (2, 1002, 'jane_smith', 1),
    (3, 1003, 'alex_kim', 1),
    (4, 1004, 'sarah_lee', 1),
    (5, 1005, 'michael_choi', 1),
    (6, 1006, 'emily_park', 1),
    (7, 1007, 'daniel_kang', 1),
    (8, 1008, 'sophia_kim', 1),
    (9, 1009, 'james_han', 1),
    (10, 1010, 'olivia_cho', 1),
    (11, 1011, 'william_yoon', 1),
    (12, 1012, 'emma_ahn', 1),
    (13, 1013, 'noah_jeong', 1),
    (14, 1014, 'ava_kwon', 1),
    (15, 1015, 'liam_kim', 1),
    (16, 1016, 'mia_hong', 1),
    (17, 1017, 'lucas_lee', 1),
    (18, 1018, 'harper_park', 1),
    (19, 1019, 'benjamin_kang', 1),
    (20, 1020, 'amelia_choi', 1),
    (21, 1021, 'elijah_ahn', 1),
    (22, 1022, 'evelyn_han', 1),
    (23, 1023, 'jacob_kwon', 1),
    (24, 1024, 'scarlett_yoon', 1),
    (25, 1025, 'henry_jeong', 1),
    (26, 1026, 'layla_kim', 1),
    (27, 1027, 'jackson_lee', 1),
    (28, 1028, 'ella_park', 1),
    (29, 1029, 'logan_hong', 1),
    (30, 1030, 'chloe_kim', 1),
    (2, 1054, 'emma_lee', 1),
    (2, 1055, 'noah_kim', 1),
    (2, 1056, 'oliver_park', 1),
    (2, 1057, 'ava_choi', 1),
    (2, 1058, 'isabella_kwon', 1),
    (2, 1059, 'liam_jeong', 1),
    (2, 1060, 'sophia_hong', 1),
    (2, 1061, 'william_yoon', 1),
    (2, 1062, 'mia_kang', 1),
    (2, 1063, 'lucas_kwon', 1);

-- tbl_qna
INSERT INTO tbl_qna (qna_code,
                     fq_type_code,
                     member_code,
                     qna_title,
                     qna_contents,
                     qna_create)
VALUES (1,
        1,
        1001,
        '회원가입 방법에 대해 알려주세요',
        '회원가입을 위한 이메일 주소와 비밀번호 설정이 필요합니다.',
        NOW()),
       (2,
        2,
        1002,
        '결제 오류 발생시 어떻게 하나요?',
        '결제 오류 발생 시 고객센터를 통해 처리할 수 있습니다.',
        NOW()),
       (3,
        1,
        1003,
        '비밀번호를 변경하려면 어떻게 해야 하나요?',
        '비밀번호 변경은 계정 설정에서 할 수 있습니다.',
        NOW()),
       (4, 2, 1004, '회원탈퇴는 어떻게 진행하나요?', '회원탈퇴는 계정 설정 메뉴에서 가능합니다.', NOW()),
       (5, 3, 1005, '비밀번호 재설정 이메일이 오지 않아요.', '스팸 메일함을 확인하거나 이메일 주소를 다시 확인해 주세요.', NOW()),
       (6, 1, 1006, '프로필 사진은 어떻게 변경하나요?', '프로필 페이지에서 사진 업로드 기능을 통해 변경할 수 있습니다.', NOW()),
       (7, 4, 1007, '앱에서 알림 설정을 변경하는 방법을 알려주세요.', '설정 메뉴에서 알림 옵션을 선택할 수 있습니다.', NOW()),
       (8, 2, 1008, '결제 후 영수증은 어디서 확인할 수 있나요?', '구매 내역에서 영수증을 확인할 수 있습니다.', NOW()),
       (9, 1, 1009, '계정을 비활성화하면 어떤 영향이 있나요?', '비활성화된 계정은 로그인할 수 없으며 데이터가 유지됩니다.', NOW()),
       (10, 3, 1010, '결제 수단을 추가하려면 어떻게 해야 하나요?', '결제 설정 메뉴에서 새로운 결제 수단을 추가할 수 있습니다.', NOW()),
       (11, 1, 1011, '다른 사용자와 채팅이 가능한가요?', '메시지 기능이 활성화된 경우에만 가능합니다.', NOW()),
       (12, 4, 1012, '이벤트 참여 방법을 알려주세요.', '홈페이지의 이벤트 섹션에서 참여 가능합니다.', NOW()),
       (13, 2, 1013, '로그아웃 버튼이 어디에 있나요?', '프로필 메뉴에서 로그아웃 버튼을 찾을 수 있습니다.', NOW()),
       (14, 3, 1014, '다중 계정 사용이 가능한가요?', '한 계정만 로그인할 수 있으며 계정 전환이 필요합니다.', NOW()),
       (15, 1, 1015, '이메일 알림을 끄는 방법이 있나요?', '알림 설정에서 이메일 알림을 비활성화할 수 있습니다.', NOW()),
       (16, 4, 1016, '포인트 적립 내역은 어디서 확인할 수 있나요?', '내 계정 메뉴에서 포인트 적립 내역을 볼 수 있습니다.', NOW()),
       (17, 2, 1017, '실수로 잘못된 정보를 입력했어요. 수정할 수 있나요?', '정보 수정은 프로필에서 가능합니다.', NOW()),
       (18, 3, 1018, '내가 작성한 리뷰를 삭제할 수 있나요?', '리뷰 관리 메뉴에서 삭제 가능합니다.', NOW()),
       (19, 4, 1019, '아이디를 변경할 수 있나요?', '아이디 변경은 지원하지 않습니다.', NOW()),
       (20, 1, 1020, '로그인 실패 시 어떤 조치를 취해야 하나요?', '비밀번호를 확인하고 재설정을 시도해 보세요.', NOW()),
       (21, 2, 1021, '서비스 이용료에 대해 알려주세요.', '서비스 이용료는 결제 페이지에서 확인할 수 있습니다.', NOW()),
       (22, 3, 1022, '계정 연동이 제대로 되지 않습니다.', '연동 문제 발생 시 고객센터로 문의해 주세요.', NOW()),
       (23, 4, 1023, '다른 사용자 차단 기능이 있나요?', '차단 기능은 프로필 메뉴에서 사용할 수 있습니다.', NOW()),
       (24, 1, 1024, '추천 친구 기능이 있나요?', '추천 친구는 활동 내역에 따라 자동으로 표시됩니다.', NOW()),
       (25, 2, 1025, '앱 데이터 사용량을 줄이는 방법이 있나요?', '설정에서 데이터 절약 모드를 활성화하세요.', NOW()),
       (26, 3, 1026, '이벤트 알림을 받으려면 어떻게 해야 하나요?', '알림 설정에서 이벤트 알림을 활성화하면 됩니다.', NOW()),
       (27, 4, 1027, '게시글을 작성할 수 있는 조건이 있나요?', '계정 인증 후 게시글 작성이 가능합니다.', NOW()),
       (28, 2, 1028, '실시간 채팅은 언제 이용할 수 있나요?', '고객센터 운영 시간 내에 실시간 채팅이 가능합니다.', NOW()),
       (29, 1, 1029, '다른 사용자의 게시글을 신고할 수 있나요?', '게시글 하단의 신고 버튼을 통해 신고할 수 있습니다.', NOW()),
       (30, 3, 1030, '새로운 소식은 어디서 확인할 수 있나요?', '공지사항 페이지에서 확인 가능합니다.', NOW()),
       (31, 4, 1031, '이메일 주소를 변경하고 싶어요.', '계정 설정 메뉴에서 이메일 변경이 가능합니다.', NOW()),
       (32, 2, 1032, '결제 취소는 어떻게 진행하나요?', '결제 내역에서 취소 요청을 보낼 수 있습니다.', NOW()),
       (33, 1, 1033, '오류가 발생했을 때 로그를 확인할 수 있나요?', '로그는 고객센터 요청 시 제공됩니다.', NOW()),
       (34, 3, 1034, '내 계정 보안을 강화하려면 어떻게 해야 하나요?', '2단계 인증을 설정해 보안을 강화할 수 있습니다.', NOW()),
       (35, 4, 1035, '사용자 이름을 비공개로 설정할 수 있나요?', '설정 메뉴에서 이름 공개 여부를 선택할 수 있습니다.', NOW()),
       (36, 2, 1036, '업데이트 내용은 어디서 볼 수 있나요?', '앱 업데이트 로그에서 확인 가능합니다.', NOW()),
       (37, 1, 1037, '이용 가능한 쿠폰은 어디서 확인하나요?', '마이페이지의 쿠폰 섹션에서 확인할 수 있습니다.', NOW()),
       (38, 4, 1038, '회원 등급별 혜택은 어디서 확인할 수 있나요?', '혜택 페이지에서 회원 등급별 상세 내용을 확인할 수 있습니다.', NOW()),
       (39, 3, 1039, '로그아웃 후에도 알림을 받을 수 있나요?', '로그아웃 상태에서는 푸시 알림을 받을 수 없습니다.', NOW()),
       (40, 1, 1040, '다운로드한 파일은 어디에 저장되나요?', '파일은 기기별 기본 다운로드 폴더에 저장됩니다.', NOW()),
       (41, 2, 1041, '친구 요청을 거절하면 알림이 가나요?', '친구 요청 거절 시 상대방에게 알림이 가지 않습니다.', NOW()),
       (42, 3, 1042, '계정 사용 이력을 확인할 수 있나요?', '보안 메뉴에서 최근 로그인 기록을 확인할 수 있습니다.', NOW()),
       (43, 4, 1043, '설문조사에 참여하면 어떤 혜택이 있나요?', '설문조사 참여 시 소정의 포인트를 지급합니다.', NOW());

-- tbl_qna_answer
INSERT INTO
    tbl_qna_answer (ans_code, qna_code, ans_contents, ans_create)
VALUES
    (
        1,
        1,
        '회원가입은 간단한 절차로 이메일과 비밀번호를 입력한 후 가입을 완료할 수 있습니다.',
        NOW()
    ),
    (
        2,
        2,
        '결제 오류 시 고객센터에서 결제내역을 확인하고 문제를 해결해드립니다.',
        NOW()
    ),
    (3, 3, '비밀번호는 계정 설정에서 언제든지 변경 가능합니다.', NOW()),
    (4, 4, '프로필 사진을 등록하여 계정을 더욱 개인화하세요.', NOW()),
    (5, 5, '공지사항 페이지에서 최신 소식을 확인하세요.', NOW()),
    (6, 6, '고객센터 운영 시간은 오전 9시부터 오후 6시까지입니다.', NOW()),
    (7, 7, '앱 알림 설정으로 중요한 업데이트를 놓치지 마세요.', NOW()),
    (8, 8, '포인트 적립 내역은 마이페이지에서 확인 가능합니다.', NOW()),
    (9, 9, '이메일 알림을 설정하여 최신 정보를 받아보세요.', NOW()),
    (10, 10, '회원 탈퇴는 계정 설정에서 가능합니다.', NOW()),
    (11, 11, '결제 내역은 마이페이지에서 확인할 수 있습니다.', NOW()),
    (12, 12, '아이디와 비밀번호를 안전하게 관리하세요.', NOW()),
    (13, 13, '이용 약관은 서비스 이용 전 꼭 확인해주세요.', NOW()),
    (14, 14, '개인정보 보호 정책을 확인하여 안전하게 서비스를 이용하세요.', NOW()),
    (15, 15, '계정 설정에서 비밀번호 변경이 가능합니다.', NOW()),
    (16, 16, '회원 가입 후 바로 서비스를 이용할 수 있습니다.', NOW()),
    (17, 17, '앱 업데이트 후 새 기능을 확인하세요.', NOW()),
    (18, 18, '결제 수단을 추가하여 다양한 방법으로 결제하세요.', NOW()),
    (19, 19, '실시간 채팅으로 고객 지원을 받을 수 있습니다.', NOW()),
    (20, 20, '서비스 이용 중 문제가 발생하면 고객센터에 문의하세요.', NOW()),
    (21, 21, '앱 내에서 제공하는 이벤트에 참여해 보세요.', NOW()),
    (22, 22, '신규 가입자에게 특별한 혜택을 제공합니다.', NOW()),
    (23, 23, '알림 설정에서 중요한 알림만 받도록 설정할 수 있습니다.', NOW()),
    (24, 24, '내 계정 보안을 강화하려면 2단계 인증을 설정하세요.', NOW()),
    (25, 25, '앱에서 제공하는 다양한 쿠폰을 활용하세요.', NOW()),
    (26, 26, '계정 설정에서 개인정보 수정이 가능합니다.', NOW()),
    (27, 27, '서비스 이용을 중지하려면 계정 삭제를 진행하세요.', NOW()),
    (28, 28, '다른 사용자의 리뷰를 확인하고 상품을 선택하세요.', NOW()),
    (29, 29, '예약 확인 및 취소는 마이페이지에서 가능합니다.', NOW()),
    (30, 30, '계정에 연결된 소셜 미디어 계정을 관리할 수 있습니다.', NOW()),
    (31, 31, '앱 내에서 실시간으로 결제 내역을 확인할 수 있습니다.', NOW()),
    (32, 32, '친구 추천 기능을 활용해 더 많은 사람들과 함께 이용하세요.', NOW()),
    (33, 33, '주문 내역에서 제품 정보를 쉽게 확인할 수 있습니다.', NOW()),
    (34, 34, '알림을 끄면 더 이상 푸시 알림을 받지 않습니다.', NOW()),
    (35, 35, '앱에서 제공하는 다양한 할인 혜택을 놓치지 마세요.', NOW()),
    (36, 36, '결제 실패 시에는 즉시 고객센터에 문의해주세요.', NOW()),
    (37, 37, '리뷰 작성 시 사진을 첨부하여 더욱 신뢰할 수 있는 후기를 남겨주세요.', NOW()),
    (38, 38, '서비스 이용 중 불편함을 겪으셨다면 빠르게 해결해 드리겠습니다.', NOW()),
    (39, 39, '앱을 최신 버전으로 유지하여 원활한 서비스를 이용하세요.', NOW()),
    (40, 40, '결제 후 영수증을 이메일로 받을 수 있습니다.', NOW()),
    (41, 41, '업데이트 내역에서 버전 정보를 확인할 수 있습니다.', NOW()),
    (42, 42, '앱을 통해 예약 및 결제를 쉽게 처리할 수 있습니다.', NOW()),
    (43, 43, '고객센터에서는 24시간 응대 가능한 서비스를 제공합니다.', NOW());

-- tbl_answer
INSERT INTO
    tbl_answer (answer_code, quest_code, answer)
VALUES
    (1, 1, '자연 속에서 맨발로 걷는 시간'),
    (2, 1, '혼자만의 고요한 시간'),
    (3, 2, '해변에서 일광욕'),
    (4, 2, '따뜻한 차 한잔과 책'),
    (5, 3, '자연과의 조화'),
    (6, 3, '고요한 분위기'),
    (7, 4, '넓고 아늑한 침대'),
    (8, 4, '따뜻한 목욕과 좋은 향기'),
    (9, 5, '온천에 몸을 담그는 시간'),
    (10, 5, '깊은 숨을 쉬며 산책할 때'),
    (11, 6, '소박한 한 끼 식사'),
    (12, 6, '맛있는 스무디나 차'),
    (13, 7, '내 마음의 여유'),
    (14, 7, '편안한 옷과 신발'),
    (15, 8, '풀밭에서 눕고 하늘 보기'),
    (16, 8, '조용한 카페에서 책 읽기'),
    (17, 9, '따뜻한 차를 마시며 휴식'),
    (18, 9, '해변가에서 산책'),
    (19, 10, '푸른 바다와 하늘'),
    (20, 10, '깊은 숲과 나무들'),
    (21, 11, '친구나 가족과의 시간'),
    (22, 11, '나만의 조용한 공간에서 휴식'),
    (23, 12, '조용한 시골 마을의 풍경'),
    (24, 12, '고요한 호수와 산'),
    (25, 13, '유명한 랜드마크'),
    (26, 13, '역사적인 유적지'),
    (27, 14, '전통 음식 만들기'),
    (28, 14, '현지 사람들이 하는 축제 참여'),
    (29, 15, '박물관과 미술관'),
    (30, 15, '역사적인 장소'),
    (31, 16, '전통 의상을 입은 현지인'),
    (32, 16, '전통 무용 공연'),
    (33, 17, '음악회나 오페라'),
    (34, 17, '현지 전통 요리'),
    (35, 18, '거리 음식'),
    (36, 18, '전통 공예 체험'),
    (37, 19, '미술박물관'),
    (38, 19, '전통 춤이나 음악 체험'),
    (39, 20, '고대 유적지'),
    (40, 20, '오래된 성곽과 궁전'),
    (41, 21, '길거리 예술가나 음악가'),
    (42, 21, '현지인의 친절함'),
    (43, 22, '음식과 음료의 차이'),
    (44, 22, '현지인이 자주 가는 레스토랑'),
    (45, 23, '미슐랭 별이 있는 고급 레스토랑'),
    (46, 23, '전통 음식'),
    (47, 24, '거리 음식'),
    (48, 24, '현지 시장 탐방'),
    (49, 25, '하이킹과 트레킹'),
    (50, 25, '수상 스포츠'),
    (51, 26, '편안한 운동복과 신발'),
    (52, 26, '안전 장비'),
    (53, 27, '번지 점프'),
    (54, 27, '패러글라이딩'),
    (55, 28, '카약'),
    (56, 28, '암벽 등반'),
    (57, 29, '정글 탐험'),
    (58, 29, '빙하 트레킹'),
    (59, 30, 'ATV 타기'),
    (60, 30, '스노우보드'),
    (61, 31, '편안한 옷과 신발'),
    (62, 31, '활동에 적합한 날씨'),
    (63, 32, '액티비티의 안전성'),
    (64, 32, '거대한 산과 계곡'),
    (65, 33, '푸른 바다와 섬'),
    (66, 33, '정글 탐험'),
    (67, 34, '스카이 다이빙'),
    (68, 34, '헬리콥터 관광'),
    (69, 35, '다이빙'),
    (70, 35, '심장 쫄릿한 번지점프하기'),
    (71, 36, '폭포에서 수영하기'),
    (72, 36, '카약 타고 강 하류 따라가기'),
    (73, 37, '현지 특산물'),
    (74, 37, '고유한 향신료가 들어간 음식'),
    (75, 38, '호기심 가득'),
    (76, 38, '조금 걱정되지만 도전'),
    (77, 39, '전통 디저트'),
    (78, 39, '아이스크림'),
    (79, 40, '바다를 보며 식사하는 곳'),
    (80, 40, '산속의 아늑한 레스토랑'),
    (81, 41, '생선과 과일이 함께 들어간 요리'),
    (82, 41, '맵고 달콤한 향신료 조합'),
    (83, 42, '현지인이 자주 가는 레스토랑'),
    (84, 42, '미슐랭 별이 있는 고급 레스토랑'),
    (85, 43, '현지에서 바로 만든 빵과 치즈'),
    (86, 43, '신선한 주스와 칵테일'),
    (87, 44, '식사의 퀄리티'),
    (88, 44, '현지 맛을 느끼는 것'),
    (89, 45, '신선한 해산물'),
    (90, 45, '현지에서 바로 만든 빵과 치즈'),
    (91, 46, '밤하늘을 보며 해산물 파티'),
    (92, 46, '거리에서 먹은 야식'),
    (93, 47, '지역 특산 전통 요리'),
    (94, 47, '유명한 고급 디저트'),
    (95, 48, '고유한 향신료가 들어간 음식'),
    (96, 48, '생선과 과일이 함께 들어간 요리');

-- tbl_member_answer
INSERT INTO
    tbl_member_answer (member_answer_code, quest_code, answer_code)
VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 3, 3);

-- tbl_notice
INSERT INTO
    tbl_notice (
    notice_code,
    notice_title,
    notice_contents,
    notice_create,
    notice_count,
    notice_img,
    notice_at
)
VALUES
    (1, '시스템 점검 공지','2024년 12월 1일 오전 2시부터 6시까지 시스템 점검이 예정되어 있습니다.',NOW(), 1200,'notice1.jpg','N'),
    (2, '추석 연휴 휴무 안내', '추석 연휴로 인해 고객센터 운영이 중단됩니다. 불편을 드려 죄송합니다.',  NOW(),  2500, 'notice2.jpg', 'N' ),
    (3, '서비스 이용 약관 변경 안내', '서비스 이용 약관이 2024년 12월 15일부터 변경될 예정입니다. 자세한 내용은 공지를 참고해주세요.', NOW(), 3000, 'notice3.jpg', 'N'),
    (4, '시스템 업그레이드 알림', '더 나은 서비스를 제공하기 위해 시스템 업그레이드가 진행될 예정입니다.', NOW(), 1700, 'notice4.jpg', 'N'),
    (5, '개인정보 처리방침 변경 안내', '개인정보 처리방침이 변경되었습니다. 변경된 내용을 확인해주세요.', NOW(), 2100, 'notice5.jpg', 'N'),
    (6, '긴급 서버 점검 공지', '서버 장애로 인해 긴급 점검이 진행됩니다. 이용에 불편을 드려 죄송합니다.', NOW(), 1800, 'notice6.jpg', 'N'),
    (7, '이벤트 당첨자 발표', '지난 이벤트의 당첨자를 발표합니다. 축하드립니다!', NOW(), 4000, 'notice7.jpg', 'N'),
    (8, '앱 업데이트 안내', '최신 버전의 앱을 이용하시면 더욱 편리한 서비스를 이용하실 수 있습니다.', NOW(), 1900, 'notice8.jpg', 'N'),
    (9, '회원 등급 정책 변경', '2025년부터 회원 등급 정책이 일부 변경됩니다. 공지사항을 확인해주세요.', NOW(), 2300, 'notice9.jpg', 'N'),
    (10, '새해맞이 휴무 안내', '2025년 1월 1일은 휴무일로 고객센터 운영이 중단됩니다.', NOW(), 2500, 'notice10.jpg', 'N'),
    (11, '배송 지연 안내', '폭설로 인해 일부 지역의 배송이 지연될 수 있습니다. 양해 부탁드립니다.', NOW(), 1200, 'notice11.jpg', 'N'),
    (12, '서비스 종료 안내', '특정 서비스가 2025년 1월 31일자로 종료될 예정입니다.', NOW(), 3100, 'notice12.jpg', 'N'),
    (13, '결제 시스템 점검 공지', '결제 시스템이 2024년 12월 10일 오전 2시부터 점검됩니다.', NOW(), 2700, 'notice13.jpg', 'N'),
    (14, '회원 설문조사 안내', '더 나은 서비스를 위해 회원 설문조사에 참여해주세요.', NOW(), 1400, 'notice14.jpg', 'N'),
    (15, '보안 업데이트 완료', '시스템 보안 업데이트가 완료되었습니다. 안전하게 이용해주세요.', NOW(), 3000, 'notice15.jpg', 'N'),
    (16, '정기 서비스 점검 안내', '정기 점검으로 인해 일부 서비스가 일시 중단됩니다.', NOW(), 2000, 'notice16.jpg', 'N'),
    (17, '긴급 공지: 이메일 오류', '일부 이메일 수신 오류가 발생하여 복구 작업 중입니다.', NOW(), 1500, 'notice17.jpg', 'N'),
    (18, '출석 이벤트 공지', '출석 이벤트에 참여하고 특별한 혜택을 받아보세요!', NOW(), 4000, 'notice18.jpg', 'N'),
    (19, '크리스마스 휴무 안내', '2024년 12월 25일 크리스마스에는 고객센터 운영이 중단됩니다.', NOW(), 2200, 'notice19.jpg', 'N'),
    (20, '특별 할인 이벤트 알림', '특별 할인 이벤트가 2024년 12월 한 달간 진행됩니다.', NOW(), 3500, 'notice20.jpg', 'N'),
    (21, '고객센터 운영시간 변경', '2025년부터 고객센터 운영시간이 변경됩니다. 자세한 내용은 공지를 확인해주세요.', NOW(), 2500, 'notice21.jpg', 'N'),
    (22, '서비스 오류 복구 안내', '서비스 오류가 복구되었습니다. 이용에 불편을 드려 죄송합니다.', NOW(), 2800, 'notice22.jpg', 'N'),
    (23, '서비스 점검 일정 변경 안내', '기존 공지된 시스템 점검 일정이 변경되었습니다. 자세한 내용은 공지를 확인해주세요.', NOW(), 2000, 'notice23.jpg', 'N'),
    (24, '신규 회원 혜택 안내', '신규 가입 회원을 위한 특별 혜택이 준비되어 있습니다. 지금 확인해보세요.', NOW(), 1800, 'notice24.jpg', 'N'),
    (25, '고객 만족도 조사 안내', '고객 만족도를 높이기 위한 설문조사에 참여 부탁드립니다.', NOW(), 1900, 'notice25.jpg', 'N'),
    (26, '명절 배송 안내', '설 명절 기간 동안 배송 일정이 일부 조정될 수 있습니다.', NOW(), 1700, 'notice26.jpg', 'N'),
    (27, '긴급 공지: 로그인 오류', '일부 회원의 로그인 오류가 확인되어 조치 중입니다. 불편을 드려 죄송합니다.', NOW(), 2200, 'notice27.jpg', 'N'),
    (28, '회원 등급 혜택 업데이트', '회원 등급별 혜택이 새롭게 추가되었습니다. 자세한 내용을 확인해주세요.', NOW(), 2500, 'notice28.jpg', 'N'),
    (29, '정기 점검 알림', '더 나은 서비스를 제공하기 위해 정기 점검이 예정되어 있습니다.', NOW(), 2100, 'notice29.jpg', 'N'),
    (30, '이벤트 참여 방법 안내', '특별 이벤트에 참여하는 방법을 공지드립니다. 지금 확인하고 참여하세요!', NOW(), 3000, 'notice30.jpg', 'N'),
    (31, '출석 체크 리워드 안내', '출석 체크를 통해 받을 수 있는 리워드 혜택을 소개합니다.', NOW(), 2800, 'notice31.jpg', 'N'),
    (32, '서비스 장애 복구 완료', '일부 서비스 장애가 복구되었습니다. 이용에 불편을 드려 죄송합니다.', NOW(), 2400, 'notice32.jpg', 'N'),
    (33, '정책 변경 사전 안내', '서비스 이용 정책이 2025년부터 변경될 예정입니다. 확인 부탁드립니다.', NOW(), 2600, 'notice33.jpg', 'N'),
    (34, '특별 프로모션 진행 안내', '한정된 기간 동안 특별 프로모션이 진행됩니다. 지금 확인해보세요.', NOW(), 3400, 'notice34.jpg', 'N'),
    (35, '신규 기능 추가 알림', '새롭게 추가된 기능을 통해 더 편리하게 서비스를 이용해보세요.', NOW(), 3200, 'notice35.jpg', 'N'),
    (36, '시스템 업데이트 일정 공지', '2024년 12월 중순 시스템 업데이트가 예정되어 있습니다.', NOW(), 3100, 'notice36.jpg', 'N'),
    (37, '공지사항 구독 안내', '중요 공지사항을 놓치지 않도록 알림 기능을 활성화하세요.', NOW(), 2300, 'notice37.jpg', 'N'),
    (38, '회원가입 혜택 변경 안내', '회원가입 시 제공되는 혜택이 일부 조정되었습니다.', NOW(), 2700, 'notice38.jpg', 'N'),
    (39, '고객센터 서비스 개선 안내', '더 나은 상담 서비스를 위해 고객센터 시스템을 개선했습니다.', NOW(), 2000, 'notice39.jpg', 'N');

-- tbl_manual
INSERT INTO
    tbl_useinfo (
    useinfo_code,
    useinfo_title,
    useinfo_contents,
    useinfo_create,
    useinfo_count,
    useinfo_img,
    useinfo_at
)
VALUES
    (1,'회원가입 매뉴얼','회원가입 절차와 필요한 정보를 안내합니다.',NOW(),200,'manual1.jpg','N'),
    (2,'비밀번호 변경 매뉴얼','비밀번호 변경 방법과 절차를 안내합니다.',NOW(),150,'manual2.jpg','Y'),
    (3, '로그인 도움말', '로그인 문제를 해결하는 방법을 안내합니다.', NOW(), 120, 'manual3.jpg', 'N'),
    (4, '비밀번호 복구 매뉴얼', '비밀번호 복구를 위한 절차를 안내합니다.', NOW(), 100, 'manual4.jpg', 'N'),
    (5, '프로필 설정 가이드', '프로필 사진 및 정보 수정 방법을 안내합니다.', NOW(), 90, 'manual5.jpg', 'N'),
    (6, '이메일 인증 매뉴얼', '이메일 인증 절차와 문제 해결 방법을 안내합니다.', NOW(), 80, 'manual6.jpg', 'N'),
    (7, '2단계 인증 안내', '2단계 인증 설정 및 사용 방법을 안내합니다.', NOW(), 70, 'manual7.jpg', 'N'),
    (8, '회원 탈퇴 가이드', '회원 탈퇴 절차와 유의사항을 안내합니다.', NOW(), 60, 'manual8.jpg', 'N'),
    (9, '알림 설정 도움말', '알림 설정 및 끄는 방법을 안내합니다.', NOW(), 50, 'manual9.jpg', 'N'),
    (10, '계정 복구 매뉴얼', '계정 복구 방법과 필요한 정보를 안내합니다.', NOW(), 40, 'manual10.jpg', 'N'),
    (11, '결제 오류 해결 방법', '결제 관련 문제를 해결하는 절차를 안내합니다.', NOW(), 110, 'manual11.jpg', 'N'),
    (12, '구독 취소 매뉴얼', '구독 취소 방법과 절차를 안내합니다.', NOW(), 130, 'manual12.jpg', 'N'),
    (13, '앱 설치 가이드', '앱 설치 및 초기 설정 방법을 안내합니다.', NOW(), 90, 'manual13.jpg', 'N'),
    (14, '데이터 백업 매뉴얼', '데이터 백업 및 복원 절차를 안내합니다.', NOW(), 120, 'manual14.jpg', 'N'),
    (15, '보안 설정 도움말', '보안 설정 및 관련 문제 해결 방법을 안내합니다.', NOW(), 140, 'manual15.jpg', 'N'),
    (16, '로그아웃 매뉴얼', '로그아웃 방법과 관련 문제 해결 방법을 안내합니다.', NOW(), 60, 'manual16.jpg', 'N'),
    (17, '앱 업데이트 가이드', '앱 업데이트 및 최신 버전 확인 방법을 안내합니다.', NOW(), 70, 'manual17.jpg', 'N'),
    (18, '계정 설정 도움말', '계정 설정 및 옵션 변경 방법을 안내합니다.', NOW(), 90, 'manual18.jpg', 'N'),
    (19, '오류 보고 가이드', '오류를 보고하고 해결하는 방법을 안내합니다.', NOW(), 80, 'manual19.jpg', 'N'),
    (20, '서비스 이용 가이드', '서비스를 효과적으로 이용하는 방법을 안내합니다.', NOW(), 150, 'manual20.jpg', 'N'),
    (21, '공지사항 확인 방법', '중요 공지사항을 확인하는 방법을 안내합니다.', NOW(), 85, 'manual21.jpg', 'N'),
    (22, '계정 잠금 해제 가이드', '계정이 잠긴 경우 해제 방법을 안내합니다.', NOW(), 95, 'manual22.jpg', 'N'),
    (23, '개인정보 수정 매뉴얼', '개인정보 수정 및 관리 방법을 안내합니다.', NOW(), 110, 'manual23.jpg', 'N'),
    (24, '서비스 점검 안내', '서비스 점검 중 확인할 사항을 안내합니다.', NOW(), 75, 'manual24.jpg', 'N'),
    (25, '고객센터 이용 방법', '고객센터에 문의하는 절차를 안내합니다.', NOW(), 105, 'manual25.jpg', 'N'),
    (26, 'FAQ 사용 방법', '자주 묻는 질문 검색 및 이용 방법을 안내합니다.', NOW(), 115, 'manual26.jpg', 'N'),
    (27, '쿠폰 등록 방법', '쿠폰을 등록하고 사용하는 절차를 안내합니다.', NOW(), 130, 'manual27.jpg', 'N'),
    (28, '이벤트 참여 매뉴얼', '이벤트 참여 방법과 주의사항을 안내합니다.', NOW(), 140, 'manual28.jpg', 'N'),
    (29, '알림 해제 가이드', '불필요한 알림을 끄는 방법을 안내합니다.', NOW(), 90, 'manual29.jpg', 'N'),
    (30, '다중 계정 관리', '여러 계정을 관리하는 팁과 절차를 안내합니다.', NOW(), 70, 'manual30.jpg', 'N'),
    (31, '사용 기록 삭제 매뉴얼', '이용 기록을 삭제하는 방법을 안내합니다.', NOW(), 60, 'manual31.jpg', 'N'),
    (32, '화면 설정 도움말', '화면 밝기 및 테마 설정 방법을 안내합니다.', NOW(), 55, 'manual32.jpg', 'N'),
    (33, '언어 변경 가이드', '앱 언어를 변경하는 절차를 안내합니다.', NOW(), 65, 'manual33.jpg', 'N'),
    (34, '오프라인 모드 사용법', '오프라인 상태에서 앱을 사용하는 방법을 안내합니다.', NOW(), 50, 'manual34.jpg', 'N'),
    (35, '데이터 사용량 확인', '데이터 사용량을 확인하는 방법을 안내합니다.', NOW(), 95, 'manual35.jpg', 'N'),
    (36, '파일 업로드 도움말', '파일 업로드 및 오류 해결 방법을 안내합니다.', NOW(), 120, 'manual36.jpg', 'N'),
    (37, '위치 서비스 가이드', '위치 서비스를 활성화 및 설정하는 방법을 안내합니다.', NOW(), 110, 'manual37.jpg', 'N'),
    (38, '초기화 매뉴얼', '앱 또는 계정을 초기화하는 방법을 안내합니다.', NOW(), 135, 'manual38.jpg', 'N'),
    (39, '멀티 디바이스 설정', '여러 기기에서 계정을 사용하는 설정 방법을 안내합니다.', NOW(), 125, 'manual39.jpg', 'N'),
    (40, '시스템 요구사항 안내', '앱이 정상적으로 작동하기 위한 요구사항을 안내합니다.', NOW(), 145, 'manual40.jpg', 'N');

-- tbl_schedule
INSERT INTO tbl_schedule (sche_code,
                          region_code,
                          accom_code,
                          member_code,
                          member_answer_code,
                          sche_list,
                          sche_start_date,
                          sche_end_date,
                          sche_start_time,
                          sche_end_time,
                          travel_time,
                          sche_time)
VALUES (101,
        101,
        1,
        1001,
        1,
        '서울의 명소를 알려주세요',
        '2024-12-01',
        '2024-12-02',
        '10:00:00',
        '22:00:00',
        '09:00:00',
        '18:00:00'),
       (102,
        102,
        2,
        1002,
        2,
        '부산에서 무엇을 할 수 있을까요?',
        '2024-12-02',
        '2024-12-05',
        '10:00:00',
        '22:00:00',
        '08:00:00',
        '19:00:00'),
       (103,
        101,
        3,
        1003,
        3,
        '서울에서의 자유여행',
        '2024-12-05',
        '2024-12-06',
        '10:00:00',
        '22:00:00',
        '10:00:00',
        '17:00:00');
