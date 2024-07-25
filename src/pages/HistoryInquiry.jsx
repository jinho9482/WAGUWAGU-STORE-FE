import React, { useState } from 'react';
import './HistoryInquiry.css';
import StatusBox from '../components/StatusBox';
import { selectByDate } from '../config/orderApi'; 

const HistoryInquiry = () => {
  const [histories, setHistories] = useState([]);
  const [selectedFirstDate, setSelectedFirstDate] = useState(''); 
  const [selectedSecondDate, setSelectedSecondDate] = useState('');
  const [showDateInput, setShowDateInput] = useState(false);

  const statusCounts = histories.reduce((counts, history) => {
    counts[history.status] = (counts[history.status] || 0) + 1;
    return counts;
  }, {});

  const handleFirstDateChange = (event) => { 
    setSelectedFirstDate(event.target.value);
  };

  const handleSecondDateChange = (event) => { 
    setSelectedSecondDate(event.target.value);
  };

  const toggleDateInput = () => {
    setShowDateInput((prevShowDateInput) => !prevShowDateInput);
  };

  const handleInquiry = async () => {
    try {
      const data = await selectByDate('requestId', selectedFirstDate, selectedSecondDate);
      setHistories(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return { year: '', month: '', day: '' };
    const [year, month, day] = date.split('-');
    return { year, month, day };
  };

  const firstDate = formatDate(selectedFirstDate);
  const secondDate = formatDate(selectedSecondDate);

  return (
    <div className="history-inquiry">
      <div className="date-range">
        <div className="date-box">{firstDate.year}</div>
        <div className="date-box">{firstDate.month}</div>
        <div className="date-box">{firstDate.day}</div>
        <div className="date-separator">-</div>
        <div className="date-box">{secondDate.year}</div>
        <div className="date-box">{secondDate.month}</div>
        <div className="date-box">{secondDate.day}</div>
        <button className="inquiry-button" onClick={handleInquiry}>조회</button>
        <button className="inquiry-button" onClick={toggleDateInput}>날짜설정</button>
      </div>

      {showDateInput && (
        <div className="date-input-container">
          <input
            type="date"
            id="firstDateInput"
            value={selectedFirstDate} 
            onChange={handleFirstDateChange} 
          />
          <input
            type="date"
            id="secondDateInput"
            value={selectedSecondDate} 
            onChange={handleSecondDateChange}
          />
        </div>
      )}

      <div className="order-summary">
        <StatusBox
          status="배달 완료건"
          count={`${statusCounts['배달완료'] || 0}`}
        />

        <StatusBox
          status="주문 취소건"
          count={`${statusCounts['주문취소'] || 0}`}
        />
        <StatusBox
          status="금액 통계"
          statusCounts={statusCounts['금액 통계'] || 0}개
        />
        <StatusBox
          status="배달 수수료"
          statusCounts={statusCounts['배달 수수료'] || 0}개
        />
        <StatusBox
          status="기타 등등"
          statusCounts={statusCounts['기타 등등'] || 0}개
        />
      </div>

      <div className="history-details">
        {histories.map((history) => (
          <div key={history.id} className="history-box">
            <div className="history-status">{history.status}</div>
            <div>주문아이디:{history.id}</div>
            <div>고객아이디:{history.customerId}</div>
            <div>메뉴:{history.menu}</div>
            <div>옵션:{history.options}</div>
            <div>고객요청:{history.request}</div>
            <div>고객주소:{history.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryInquiry;