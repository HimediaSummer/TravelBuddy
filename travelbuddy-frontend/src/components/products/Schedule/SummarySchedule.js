import React from 'react';

function SummarySchedule() {
  return (
    <div>
      <h2>전체 일정</h2>
      {/* 전체 일정 요약 UI 구현 */}
        {/* Schedule */}
        <div class="button-edit">
            <div class="create-schedule">
                <button class="submit-button" type="submit" id="button" onclick="btnshow()">일정 생성</button>
                <div id="loading-gif">
                    {/* <img src="/Img/spin.gif" alt="로딩이미지"/> */}
                </div>
            </div>
            <div class="reset-travel">
                <button id="button" type="reset" onclick="reset()">초기화
                </button>
            </div>
        </div>
        {/* Loading */}
        <div class="chat-answer">
            <div id="answer">
                <textarea
                name="content"
                id="chat-content"
                placeholder="여행 일정이 완성되고 있습니다. 잠시만 기다려주세요 :)"></textarea>
            </div>
        </div>
    </div>
  );
}

export default SummarySchedule;