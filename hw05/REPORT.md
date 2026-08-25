# PERFORMANCE TESTING REPORT - HW05

* **Họ và tên:** Nguyễn Hoàng Uyển Như
* **MSSV:** 22127315
* **Link GitHub:** `https://github.com/huiw14/KTPM-Eshop-Mobile`

---

## 1. Tóm tắt kết quả (Executive Summary)

Bài kiểm thử hiệu năng được thực hiện với 3 kịch bản khác nhau nhằm đánh giá khả năng xử lý, độ trễ và điểm nghẽn của hệ thống.

| Chỉ số | Load Test (Read Heavy) | Stress Test (Auth Heavy) | Spike Test (Transactional) |
| :--- | :--- | :--- | :--- |
| **Kịch bản JMX** | `22127315_Load_20260825.jmx` | `22127315_Stress_20260825.jmx` | `22127315_Spike_20260825.jmx` |
| **Số luồng (Threads)** | 20 users | 55 users | 100 users |
| **Tổng Request (Samples)** | 20 | 55 | 100 |
| **Response Time TB (Avg)** | ~3,892 ms | ~1,038 ms | ~1,146 ms |
| **Tỷ lệ lỗi (Error %)** | 5.00% (1 Error) | 0.00% | 2.00% (2 Errors) |
| **Trạng thái chính** | 95.0% Success | 100.0% Success | 98.0% Success |

---

## 2. Chi tiết phân tích & Điểm nghẽn (Bottlenecks)

* **Load Test (Read Heavy):**
  * Gặp tình trạng độ trễ cao đột biến (High Latency Outliers lên đến 47,557 ms) do lỗi ngắt kết nối mạng (`NoHttpResponseException`: `google.com:443 failed to respond`).
  * Xuất hiện mã phản hồi `301 Moved Permanently`.
* **Stress Test (Auth Heavy):**
  * Hệ thống hoạt động rất ổn định dưới mức tải đỉnh (Peak Concurrency), đạt tỷ lệ thành công 100% không phát sinh lỗi.
  * Thời gian phản hồi trung bình duy trì mức tốt (~1,038 ms).
* **Spike Test (Transactional):**
  * Khả năng chịu tải đột ngột tốt, thời gian phản hồi trung bình thấp (~1,146 ms).
  * Xuất hiện điểm nghẽn nhỏ với 2 lỗi tạm thời `502 Bad Gateway`.

---

## 3. Đề xuất Continuous Performance Testing (Task 3 - Proposal G9.6)

Để tích hợp kiểm thử hiệu năng vào chu trình CI/CD tự động, hệ thống đề xuất như sau:

* **Tích hợp JMeter CLI vào CI/CD Pipeline (GitHub Actions / GitLab CI):** Chạy kịch bản JMeter dưới dạng Non-GUI mode (`jmeter -n -t ... -l ...`) tự động mỗi khi có Pull Request mới vào nhánh `main`.
* **Thiết lập Quality Gates (SLA Thresholds):** 
  * Tỷ lệ lỗi (Error Rate) < 0.5%.
  * P95 Response Time < 1,500 ms.
  * Tự động fail Pipeline nếu vượt ngưỡng SLA quy định.
* **Giám sát thời gian thực:** Kết hợp JMeter Backend Listener gửi dữ liệu trực tiếp về InfluxDB và hiển thị trực quan qua Dashboard Grafana.