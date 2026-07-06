### Sinh viên:
Nguyễn Hoàng Uyển Như - 22127315

---

### AI CRITIQUE 

Trong bài tập này, AI đã bộc lộ những hạn chế lớn trong việc dự đoán các hành vi động của phần mềm ngoài thực tế, để lại nhiều khoảng trống kiểm thử nghiêm trọng trên cả bốn tính năng FR-04, FR-07, FR-14, FR-05. Cụ thể, AI đã tạo ra các kịch bản thiếu sót khi bỏ qua việc chuẩn hóa dữ liệu chuỗi thực tế (như khoảng trắng thừa) và hoàn toàn bỏ sót các lỗi logic phát sinh lúc vận hành (runtime), bao gồm: lỗi tràn giao diện mobile khi số lượng/thành tiền quá lớn, xung đột dữ liệu do người dùng bấm nút liên tục (double-submit), và hiện tượng tranh chấp dữ liệu (race conditions).

Nguyên nhân là do AI phụ thuộc hoàn toàn vào việc phân tích văn bản tĩnh. Nó chỉ đánh giá các trường đầu vào như những tham số tuyến tính, cô lập dựa trên mô tả bề mặt trong tài liệu đặc tả. Vì vậy, AI hoàn toàn bị "mù" trước sự tích hợp bất đồng bộ của backend, ràng buộc phụ thuộc dữ liệu của database, và trải nghiệm di động động (Dynamic Mobile UX) vốn không được viết tường minh.

Nguyên lý cốt lõi em học được là: chỉ nên coi AI như một công cụ tạo dữ liệu thô có kỷ luật, chứ không phải một thực thể ra quyết định độc lập. Dù AI xuất sắc trong việc triển khai nhanh các phương pháp như Phân tích giá trị biên hay Phân hoạch tương đương, nó lại thiếu tư duy trực giác nghiệp vụ thực tế. Sự kiểm duyệt của kỹ sư QA là bắt buộc để chủ động bổ sung các edge case và bắt được các lỗ hổng kiến trúc mà AI mặc định sẽ bỏ sót.