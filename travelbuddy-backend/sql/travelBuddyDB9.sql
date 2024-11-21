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
		                                   member_code INT NOT NULL COMMENT '회원코드',
		                                   apply_id VARCHAR(30) NULL COMMENT '신청자아이디',
		                                   apply_status INT NOT NULL DEFAULT '1' COMMENT '매칭신청',
		                                   PRIMARY KEY (buddy_match_code),
		                                   FOREIGN KEY (buddy_code) REFERENCES tbl_buddy (buddy_code) ON DELETE CASCADE,
		                                   FOREIGN KEY (member_code) REFERENCES tbl_account (member_code) ON DELETE CASCADE
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
    ),
    (1004, 'user_john24', 'password1234', '김영훈', '1990-07-15', 'john24@example.com', '010-2345-6789', 'N', 'N', 72, 'profile1.jpg', 2, '2023-06-01', NULL),
    (1005, 'sarah_park', 'secure7890', '박지민', '1995-03-22', 'sarah.park@example.com', '010-1234-5678', 'N', 'N', 85, 'profile2.jpg', 2, '2023-08-15', '2024-02-20'),
    (1006, 'charlie_lee', 'mypassword', '이찬호', '1988-11-03', 'charlie.lee@example.com', '010-9876-5432', 'N', 'N', 67, 'profile3.jpg', 2, '2023-05-10', NULL),
    (1007, 'emily_han', 'pass5678', '한유리', '1992-12-18', 'emily.han@example.com', '010-3456-7890', 'N', 'N', 92, 'profile4.jpg', 2, '2023-07-07', '2024-03-15'),
    (1008, 'daniel_choi', 'hello2023', '최현우', '1985-06-30', 'daniel.choi@example.com', '010-6789-1234', 'N', 'N', 45, 'profile5.jpg', 2, '2022-11-25', NULL),
    (1009, 'kate_kim99', 'pw1234abcd', '김민정', '1998-05-14', 'kate.kim99@example.com', '010-5555-4444', 'N', 'N', 33, 'profile6.jpg', 2, '2023-02-10', NULL),
    (1010, 'joshua_park', 'secure9876', '박정수', '1987-08-20', 'joshua.park@example.com', '010-1111-2222', 'N', 'N', 54, 'profile7.jpg', 2, '2023-03-08', '2024-01-12'),
    (1011, 'amy_lee88', 'qwerty456', '이수빈', '1994-04-27', 'amy.lee88@example.com', '010-7777-8888', 'N', 'N', 76, 'profile8.jpg', 2, '2023-01-25', NULL),
    (1012, 'kevin_jung', 'pass4321', '정도영', '1990-10-01', 'kevin.jung@example.com', '010-2222-3333', 'N', 'N', 63, 'profile9.jpg', 2, '2023-05-12', NULL),
    (1013, 'sophia_oh', 'password999', '오예은', '1996-02-14', 'sophia.oh@example.com', '010-8888-7777', 'N', 'N', 28, 'profile10.jpg', 2, '2023-09-10', '2024-05-18'),
    (1014, 'brian_kwon', 'mypw2023', '권민호', '1989-01-05', 'brian.kwon@example.com', '010-6666-5555', 'N', 'N', 48, 'profile11.jpg', 2, '2023-04-15', NULL),
    (1015, 'grace_yun', 'securepass', '윤소현', '1997-09-12', 'grace.yun@example.com', '010-9999-8888', 'N', 'N', 38, 'profile12.jpg', 2, '2023-02-22', NULL),
    (1016, 'ryan_kang', 'hello789', '강재원', '1991-03-11', 'ryan.kang@example.com', '010-4444-3333', 'N', 'N', 57, 'profile13.jpg', 2, '2022-12-30', NULL),
    (1017, 'emma_lim', 'pw6543', '임유나', '1993-11-21', 'emma.lim@example.com', '010-1212-3434', 'N', 'N', 80, 'profile14.jpg', 2, '2023-06-22', '2024-08-20'),
    (1018, 'henry_ahn', 'pass2020', '안성훈', '1986-07-08', 'henry.ahn@example.com', '010-1313-2424', 'N', 'N', 62, 'profile15.jpg', 2, '2023-01-01', NULL),
    (1019, 'mia_kim', 'mypw678', '김다은', '1999-01-22', 'mia.kim@example.com', '010-1515-3535', 'N', 'N', 25, 'profile16.jpg', 2, '2023-07-17', NULL),
    (1020, 'lucas_song', 'secure123', '송우진', '1988-05-09', 'lucas.song@example.com', '010-1717-4646', 'N', 'N', 70, 'profile17.jpg', 2, '2023-03-05', '2024-02-15'),
    (1021, 'isabella_hwang', 'pass0987', '황서연', '1995-10-19', 'isabella.hwang@example.com', '010-1818-5757', 'N', 'N', 29, 'profile18.jpg', 2, '2023-09-05', NULL),
    (1022, 'ethan_kim', 'password2468', '김도현', '1992-12-31', 'ethan.kim@example.com', '010-1919-6868', 'N', 'N', 93, 'profile19.jpg', 2, '2023-04-10', NULL),
    (1023, 'olivia_choi', 'mypw5555', '최유진', '1991-06-16', 'olivia.choi@example.com', '010-2020-7979', 'N', 'N', 44, 'profile20.jpg', 2, '2023-08-20', '2024-09-25'),
    (1024, 'alice_park99', 'pw5678abcd', '박지수', '1997-06-13', 'alice.park99@example.com', '010-4343-5656', 'N', 'N', 34, 'profile21.jpg', 2, '2023-02-12', NULL),
    (1025, 'jackson_oh', 'secure3456', '오민재', '1992-03-19', 'jackson.oh@example.com', '010-2424-3434', 'N', 'N', 87, 'profile22.jpg', 2, '2023-01-05', NULL),
    (1026, 'luna_kang', 'mypw9876', '강예린', '1990-09-25', 'luna.kang@example.com', '010-5555-6767', 'N', 'N', 58, 'profile23.jpg', 2, '2023-05-15', '2024-02-14'),
    (1027, 'dylan_kim', 'pw5678efgh', '김도경', '1994-11-07', 'dylan.kim@example.com', '010-6767-7878', 'N', 'N', 71, 'profile24.jpg', 2, '2023-07-01', NULL),
    (1028, 'ella_lee88', 'pass5678', '이수연', '1998-12-12', 'ella.lee88@example.com', '010-7878-8989', 'N', 'N', 43, 'profile25.jpg', 2, '2023-06-18', NULL),
    (1029, 'noah_han', 'pwabc123', '한지후', '1987-10-03', 'noah.han@example.com', '010-8989-9090', 'N', 'N', 64, 'profile26.jpg', 2, '2022-12-20', '2024-03-05'),
    (1030, 'sophia_kim', 'securepass', '김유정', '1996-01-15', 'sophia.kim@example.com', '010-9090-1212', 'N', 'N', 50, 'profile27.jpg', 2, '2023-03-30', NULL),
    (1031, 'ethan_park', 'mypw9999', '박주호', '1993-08-18', 'ethan.park@example.com', '010-1212-2323', 'N', 'N', 66, 'profile28.jpg', 2, '2023-02-10', NULL),
    (1032, 'mia_ahn', 'passabcd', '안소율', '1999-02-09', 'mia.ahn@example.com', '010-2323-3434', 'N', 'N', 40, 'profile29.jpg', 2, '2023-07-22', '2024-09-15'),
    (1033, 'leo_jung', 'pw123456', '정민석', '1988-04-25', 'leo.jung@example.com', '010-3434-4545', 'N', 'N', 89, 'profile30.jpg', 2, '2023-04-12', NULL),
    (1034, 'ava_choi', 'mypw5678', '최윤아', '1992-07-03', 'ava.choi@example.com', '010-4545-5656', 'N', 'N', 53, 'profile31.jpg', 2, '2023-08-02', NULL),
    (1035, 'ryan_kim99', 'secure9876', '김정훈', '1986-11-19', 'ryan.kim99@example.com', '010-5656-6767', 'N', 'N', 72, 'profile32.jpg', 2, '2023-01-18', NULL),
    (1036, 'hannah_lee', 'pw2468abcd', '이혜진', '1995-05-09', 'hannah.lee@example.com', '010-6767-7878', 'N', 'N', 39, 'profile33.jpg', 2, '2023-03-01', NULL),
    (1037, 'james_park88', 'pass7890', '박현수', '1990-06-16', 'james.park88@example.com', '010-7878-8989', 'N', 'N', 47, 'profile34.jpg', 2, '2023-02-25', '2024-05-11'),
    (1038, 'olivia_oh', 'pw5678xyz', '오하은', '1997-03-22', 'olivia.oh@example.com', '010-8989-9090', 'N', 'N', 55, 'profile35.jpg', 2, '2023-06-15', NULL),
    (1039, 'daniel_kwon', 'mypw3456', '권우빈', '1989-02-07', 'daniel.kwon@example.com', '010-9090-1212', 'N', 'N', 62, 'profile36.jpg', 2, '2022-12-10', '2024-03-20'),
    (1040, 'amelia_kang', 'pass6543', '강서현', '1994-08-29', 'amelia.kang@example.com', '010-1212-2323', 'N', 'N', 41, 'profile37.jpg', 2, '2023-01-22', NULL),
    (1041, 'lucas_ahn', 'pwabcd5678', '안도영', '1991-01-12', 'lucas.ahn@example.com', '010-2323-3434', 'N', 'N', 70, 'profile38.jpg', 2, '2023-03-12', NULL),
    (1042, 'isabella_lee', 'mypw2020', '이소미', '1998-10-18', 'isabella.lee@example.com', '010-3434-4545', 'N', 'N', 44, 'profile39.jpg', 2, '2023-07-10', NULL),
    (1043, 'harry_kim', 'securepass1', '김준호', '1993-05-26', 'harry.kim@example.com', '010-4545-5656', 'N', 'N', 49, 'profile40.jpg', 2, '2023-05-02', '2024-06-01'),
    (1044, 'grace_kim', 'pw5678abcd', '김은혜', '1993-09-15', 'grace.kim@example.com', '010-3333-4444', 'N', 'N', 65, 'profile41.jpg', 2, '2023-03-11', NULL),
    (1045, 'benjamin_lee', 'secure4321', '이태호', '1989-12-22', 'benjamin.lee@example.com', '010-5555-6666', 'N', 'N', 49, 'profile42.jpg', 2, '2022-11-05', NULL),
    (1046, 'chloe_park', 'mypw6789', '박수민', '1995-04-30', 'chloe.park@example.com', '010-7777-8888', 'N', 'N', 72, 'profile43.jpg', 2, '2023-01-19', NULL),
    (1047, 'william_oh', 'pw8901abcd', '오민호', '1992-07-07', 'william.oh@example.com', '010-9999-1111', 'N', 'N', 56, 'profile44.jpg', 2, '2023-05-21', '2024-06-15'),
    (1048, 'emma_han', 'pass1234', '한주연', '1997-10-13', 'emma.han@example.com', '010-2222-3333', 'N', 'N', 34, 'profile45.jpg', 2, '2023-02-14', NULL),
    (1049, 'samuel_kang', 'pw5678efgh', '강우진', '1988-03-20', 'samuel.kang@example.com', '010-4444-5555', 'N', 'N', 63, 'profile46.jpg', 2, '2023-04-28', '2024-02-25'),
    (1050, 'sophia_choi', 'mypw3456', '최나현', '1991-06-12', 'sophia.choi@example.com', '010-6666-7777', 'N', 'N', 58, 'profile47.jpg', 2, '2023-06-30', NULL),
    (1051, 'ethan_kwon', 'pass5678', '권민성', '1994-02-18', 'ethan.kwon@example.com', '010-8888-9999', 'N', 'N', 71, 'profile48.jpg', 2, '2023-07-22', NULL),
    (1052, 'lucy_jung', 'pw4321abcd', '정서영', '1999-08-01', 'lucy.jung@example.com', '010-1111-2222', 'N', 'N', 45, 'profile49.jpg', 2, '2023-08-12', '2024-05-04'),
    (1053, 'oliver_ahn', 'mypw5678', '안현우', '1990-05-26', 'oliver.ahn@example.com', '010-3333-4444', 'N', 'N', 83, 'profile50.jpg', 2, '2023-09-05', NULL),
    (1054, 'ava_kim', 'secure6789', '김다은', '1996-11-08', 'ava.kim@example.com', '010-5555-6666', 'N', 'N', 68, 'profile51.jpg', 2, '2023-01-18', NULL),
    (1055, 'ryan_park', 'pw2468abcd', '박준영', '1987-09-03', 'ryan.park@example.com', '010-7777-8888', 'N', 'N', 52, 'profile52.jpg', 2, '2022-12-12', NULL),
    (1056, 'mia_lee', 'mypw6543', '이하은', '1992-02-22', 'mia.lee@example.com', '010-9999-1111', 'N', 'N', 40, 'profile53.jpg', 2, '2023-02-05', '2024-03-10'),
    (1057, 'noah_kim', 'secure4567', '김도윤', '1997-01-10', 'noah.kim@example.com', '010-2222-3333', 'N', 'N', 48, 'profile54.jpg', 2, '2023-06-03', NULL),
    (1058, 'luna_ahn', 'passabcd', '안소미', '1998-03-14', 'luna.ahn@example.com', '010-4444-5555', 'N', 'N', 74, 'profile55.jpg', 2, '2023-08-09', NULL),
    (1059, 'james_kwon', 'pw123456', '권재민', '1986-11-20', 'james.kwon@example.com', '010-6666-7777', 'N', 'N', 62, 'profile56.jpg', 2, '2022-11-25', NULL),
    (1060, 'amelia_park', 'mypw9876', '박예진', '1994-12-19', 'amelia.park@example.com', '010-8888-9999', 'N', 'N', 50, 'profile57.jpg', 2, '2023-04-20', '2024-01-14'),
    (1061, 'leo_choi', 'pwabcd5678', '최태현', '1993-06-07', 'leo.choi@example.com', '010-1111-2222', 'N', 'N', 66, 'profile58.jpg', 2, '2023-03-15', NULL),
    (1062, 'emma_han99', 'securepass', '한지아', '1996-05-04', 'emma.han99@example.com', '010-3333-4444', 'N', 'N', 39, 'profile59.jpg', 2, '2023-05-25', NULL),
    (1063, 'harry_kim', 'mypw2468', '김현수', '1991-04-21', 'harry.kim@example.com', '010-5555-6666', 'N', 'N', 55, 'profile60.jpg', 2, '2023-08-14', NULL);

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
	tbl_buddy_match_data (buddy_match_code, buddy_code, member_code, apply_id, apply_status)
VALUES
	(1, 1, 1001,'john_doe', 1),
	(2, 2, 1002, 'jane_smith',2),
	(3, 3, 1003, 'alex_kim', 3);

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
