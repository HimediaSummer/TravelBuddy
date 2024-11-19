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

CREATE TABLE
    IF NOT EXISTS tbl_fq_type (
                                  fq_type_code INT NOT NULL AUTO_INCREMENT COMMENT '문의유형코드',
                                  fq_type_name VARCHAR(30) NOT NULL COMMENT '문의유형이름',
                                  PRIMARY KEY (fq_type_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = 'FAQ QnA 유형';

-- 테이블 생성 (PK, AUTO_INCREMENT, ENGINE, COMMENT, FK 포함)
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
    IF NOT EXISTS tbl_authority (
                                    authority_code INT NOT NULL AUTO_INCREMENT COMMENT '권한코드',
                                    authority_name VARCHAR(20) NOT NULL COMMENT '권한이름',
                                    PRIMARY KEY (authority_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '권한';

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
                                  member_img TEXT NULL COMMENT '프로필사진',
                                  authority_code INT NOT NULL COMMENT '권한코드',
                                  member_create TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '가입일',
                                  member_leave DATE NULL COMMENT '탈퇴일',
                                  PRIMARY KEY (member_code),
                                  FOREIGN KEY (authority_code) REFERENCES tbl_authority (authority_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '회원 계정';

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
    IF NOT EXISTS tbl_region (
                                 region_code INT NOT NULL AUTO_INCREMENT COMMENT '지역코드',
                                 region_name VARCHAR(30) NOT NULL COMMENT '지역명',
                                 region_description VARCHAR(255) NOT NULL COMMENT '지역설명',
                                 region_img TEXT NULL COMMENT '지역사진',
                                 region_thumbnail_img TEXT NULL COMMENT '지역썸네일사진',
                                 PRIMARY KEY (region_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '지역';

CREATE TABLE
    IF NOT EXISTS tbl_buddy_type (
                                     buddy_type_code INT NOT NULL AUTO_INCREMENT COMMENT '버디유형코드',
                                     buddy_type_name VARCHAR(50) NOT NULL COMMENT '버디유형이름',
                                     PRIMARY KEY (buddy_type_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '버디 유형';

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
    IF NOT EXISTS tbl_qna_answer (
                                     ans_code INT NOT NULL AUTO_INCREMENT COMMENT '답변코드',
                                     qna_code INT NOT NULL COMMENT '문의코드',
                                     ans_contents VARCHAR(500) NULL COMMENT '답변내용',
                                     ans_create DATETIME NULL COMMENT '답변날짜',
                                     PRIMARY KEY (ans_code),
                                     FOREIGN KEY (qna_code) REFERENCES tbl_qna (qna_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = 'QnA 답변';

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
    IF NOT EXISTS tbl_buddy_match_data (
                                           buddy_match_code INT NOT NULL AUTO_INCREMENT COMMENT '버디매칭코드',
                                           buddy_code INT NOT NULL COMMENT '버디코드',
                                           apply_id VARCHAR(30) NULL COMMENT '신청자아이디',
                                           apply_status INT NOT NULL DEFAULT '1' COMMENT '매칭신청',
                                           PRIMARY KEY (buddy_match_code),
                                           FOREIGN KEY (buddy_code) REFERENCES tbl_buddy (buddy_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '버디 매칭 데이터';

CREATE TABLE
    IF NOT EXISTS tbl_question_naire_theme (
                                               theme_code int NOT NULL AUTO_INCREMENT COMMENT '질문지테마코드',
                                               question_theme VARCHAR(255) NULL COMMENT '질문지 테마',
                                               PRIMARY KEY (theme_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '질문지 테마';

CREATE TABLE
    IF NOT EXISTS tbl_questionnaire (
                                        quest_code INT NOT NULL AUTO_INCREMENT COMMENT '질문지코드',
                                        question VARCHAR(255) NULL COMMENT '질문',
                                        theme_code INT NOT NULL COMMENT '질문지테마코드',
                                        PRIMARY KEY (quest_code),
                                        FOREIGN KEY (theme_code) REFERENCES tbl_question_naire_theme (theme_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '질문지';

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
    IF NOT EXISTS tbl_accommodation (
                                        accom_code INT NOT NULL COMMENT '숙소코드',
                                        accom_type VARCHAR(20) NULL COMMENT '숙소종류',
                                        accom_name VARCHAR(100) NULL COMMENT '숙소이름',
                                        accom_addres VARCHAR(100) NULL COMMENT '숙소주소',
                                        accom_img TEXT NULL COMMENT '숙소사진',
                                        accom_thumbnail_img TEXT NULL COMMENT '숙소썸네일사진',
                                        PRIMARY KEY (accom_code)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '숙소 테이블';

CREATE TABLE
    IF NOT EXISTS tbl_schedule (
                                   sche_code INT NOT NULL AUTO_INCREMENT COMMENT '스케줄넘버',
                                   region_code INT NOT NULL COMMENT '지역코드',
                                   accom_code INT NOT NULL COMMENT '숙소코드',
                                   member_code INT NOT NULL COMMENT '회원코드',
                                   member_answer_code INT NOT NULL COMMENT '회원답변코드',
                                   sche_list VARCHAR(255) NOT NULL COMMENT '생성된스케줄',
                                   sche_start_date DATE NOT NULL COMMENT '여행시작날짜',
                                   sche_end_date DATE NOT NULL COMMENT '여행종료날짜',
                                   sche_start_time time NOT NULL COMMENT '여행시작날짜',
                                   sche_end_time time NOT NULL COMMENT '여행종료날짜',
                                   travel_time VARCHAR(100) NOT NULL COMMENT '이동시간',
                                   sche_time VARCHAR(100) NOT NULL COMMENT '스케줄시간',
                                   PRIMARY KEY (sche_code),
                                   FOREIGN KEY (region_code) REFERENCES tbl_region (region_code) ON DELETE CASCADE,
                                   FOREIGN KEY (accom_code) REFERENCES tbl_accommodation (accom_code) ON DELETE CASCADE,
                                   FOREIGN KEY (member_code) REFERENCES tbl_account (member_code) ON DELETE CASCADE,
                                   FOREIGN KEY (member_answer_code) REFERENCES tbl_member_answer (member_answer_code) ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '스케줄';

-- tbl_question_type
INSERT INTO
    tbl_fq_type (fq_type_code, fq_type_name)
VALUES
    (1, '일정'),
    (2, '숙소'),
    (3, '지역'),
    (4, '보안');

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
    );

-- tbl_Authority
INSERT INTO
    tbl_authority (authority_code, authority_name)
VALUES
    (1, '관리자'),
    (2, '일반 사용자');

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
        'profile1.jpg',
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
        'profile2.jpg',
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
        'profile3.jpg',
        2,
        '2024-12-25',
        '2025-01-30'
    );

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
    (
        1,
        '시스템 점검 공지',
        '2024년 12월 1일 오전 2시부터 6시까지 시스템 점검이 예정되어 있습니다.',
        NOW(),
        1200,
        'notice1.jpg',
        'N'
    ),
    (
        2,
        '추석 연휴 휴무 안내',
        '추석 연휴로 인해 고객센터 운영이 중단됩니다. 불편을 드려 죄송합니다.',
        NOW(),
        2500,
        'notice2.jpg',
        'Y'
    );

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
    (
        1,
        '회원가입 매뉴얼',
        '회원가입 절차와 필요한 정보를 안내합니다.',
        NOW(),
        200,
        'manual1.jpg',
        'N'
    ),
    (
        2,
        '비밀번호 변경 매뉴얼',
        '비밀번호 변경 방법과 절차를 안내합니다.',
        NOW(),
        150,
        'manual2.jpg',
        'Y'
    );

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
        NOW());



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
    (3, 3, '비밀번호는 계정 설정에서 언제든지 변경 가능합니다.', NOW());

-- tbl_LocalMatchMemberType
INSERT INTO
    tbl_buddy_type (buddy_type_code, buddy_type_name)
VALUES
    (1, '버디'),
    (2, '여행객');

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
    (
        1001,
        101,
        1,
        '서울에서의 만남',
        '서울 지역에서 함께 할 여행 파트너를 찾고 있습니다.',
        NOW(),
        'N',
        'image1.jpg',
        150,
        'N'
    ),
    (
        1002,
        102,
        2,
        '부산 여행 모집',
        '부산 지역에서 일주일간 함께 여행할 사람을 모집합니다. 경험자 우대.',
        NOW(),
        'N',
        'image2.jpg',
        230,
        'N'
    ),
    (
        1003,
        101,
        1,
        '서울에서의 힐링',
        '서울에서 편안하게 쉴 수 있는 여행 동반자를 찾습니다.',
        NOW(),
        'Y',
        'image3.jpg',
        75,
        'Y'
    );

-- tbl_OfferMemberData
INSERT INTO
    tbl_buddy_match_data (buddy_match_code, buddy_code, apply_id, apply_status)
VALUES
    (1, 1, 'john_doe', 1),
    (2, 2, 'jane_smith', 2),
    (3, 3, 'alex_kim', 3);

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
    tbl_accommodation (accom_code, accom_type, accom_name, accom_addres)
VALUES
    (1, '게스트하우스', '우리나라전통하우스', '서울시 강동구 청화로 37길 11 2층'),
    (
        2,
        '호텔',
        '트럼프 호텔',
        '경주 맨하튼거리 372-531길 88 그린호스 사거리'
    ),
    (3, '빌라', '대흥빌라', '서울시 동작구 사당동 382 - 1길'),
    (4, '펜션', '풍선 펜션', '강원도 언주시 망하산로 286길 우리은행 옆');
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

-- tbl_questionnaire
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
