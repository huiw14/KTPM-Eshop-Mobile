# Nhật ký sử dụng AI - HW06

> MSSV: **22127315**  
> Cam kết: Tôi có sử dụng công cụ AI cho các công việc được ghi bên dưới. Tôi tự kiểm tra, chỉnh sửa và chịu trách nhiệm về mọi kết quả do AI tạo ra.

## Quy tắc ghi nhận

Từ tương tác này trở đi, mỗi prompt của sinh viên và câu trả lời tương ứng của Codex sẽ được bổ sung vào file này. Trước khi nộp, sinh viên phải tự rà soát các entry, bảo đảm prompt/câu trả lời được lưu đầy đủ và đánh giá từng test case AI là `VALID`, `INVALID` hoặc `INCOMPLETE`. Không tạo giả timestamp, prompt, output hay kết quả chạy test.

## AI-001 - Đọc đề và lập kế hoạch

- **Thời điểm (UTC+07:00):** 2026-08-30 00:26
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Đọc yêu cầu HW06, kiểm tra repository và tạo khung ban đầu cho bài làm.
- **Prompt nguyên văn:**

```text
đọc yêu cầu bài tập hw06 và xây dựng kế hoạch giúp đỡ và hướng dẫn tôi hoàn thành bài tập này. tôi chọn FR-05, FR-08, FR-15; mã số sinh viên của tôi là 22127315. bài làm này sẽ được ghi vào folder hw06: bắt buộc có REPORT.md là báo cáo chính, README.md là bảng Assessment Template theo yêu cầu đề, AI_Audit_Report.md để ghi lịch sử prompt, AI_Critique.md để đánh giá AI
```

- **Câu trả lời của AI:** Đã đọc PDF HW06, xác nhận FR-05/FR-08/FR-15 lần lượt thuộc Pool A/B/C; tạo khung bốn tài liệu trong `hw06`; nêu quy trình tạo bằng AI → audit → tự bổ sung → Postman/Newman → bug report → CI/CD → generator tự vẽ. Không tạo hay khẳng định kết quả chạy test.
- **Kiểm tra của con người:** Đã đối chiếu với đề PDF và `api_specification.md`. Khung giữ lại, nhưng phải điền bằng bằng chứng thực tế trước khi nộp.
- **Hành động:** Tạo bốn file khởi đầu trong `hw06`.

## AI-002 - Chia phân vùng miền giá trị

- **Thời điểm (UTC+07:00):** 2026-08-30 00:26
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Xây dựng các phân vùng miền giá trị cho input của ba chức năng đã chọn.
- **Prompt nguyên văn:**

```text
chia phân vùng miền giá trị cho các tham số input (ví dụ: `page`, `limit`, `keyword` của FR-05; `cartItems`, `shippingAddress` của FR-08; `name`, `price > 0` của FR-15).
```

- **Câu trả lời của AI:** Đã bổ sung bảng phân vùng vào `REPORT.md`. AI lưu ý đặc tả chỉ có `search` cho FR-05 và `total_amount`, `shipping_address` cho FR-08; `page`, `limit`, `keyword`, `cartItems` được phân loại là input robustness/contract gap. FR-15 bao phủ `name`, `price`, `description`, `imageUrl`, `category_id`, path `id` và `Authorization`.
- **Kiểm tra của con người:** Cần xác nhận lại tên trường là `shipping_address` (snake_case) theo API specification, không phải `shippingAddress`. Các tham số chưa được đặc tả không được coi là yêu cầu bắt buộc.
- **Hành động:** Đưa bảng phân vùng đã được chỉnh tên trường vào phần 3 của `REPORT.md`.

## AI-003 - Việt hóa bài làm và kiểm tra đặc tả API

- **Thời điểm (UTC+07:00):** 2026-08-30 01:04
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Chuyển các tài liệu HW06 sang tiếng Việt và xác nhận AI đã đọc API specification.
- **Prompt nguyên văn:**

```text
sửa lại bài làm trong hw06 thành tiếng việt, mỗi lần tôi prompt cho bạn thì bạn tự ghi câu prompt và câu trả lời của bạn vào AI_Audit_Report,md luôn nhé

'chia phân vùng miền giá trị cho các tham số input (ví dụ: `page`, `limit`, `keyword` của FR-05; `cartItems`, `shippingAddress` của FR-08; `name`, `price > 0` của FR-15).    ' này bạn đã đọc qua file D:\KTPM-Eshop-Mobile\api_specification.md chưa
```

- **Câu trả lời của AI:** Có. AI đã đọc `D:\KTPM-Eshop-Mobile\api_specification.md`; file chỉ khai báo `search` cho FR-05, và `total_amount`, `shipping_address` cho checkout; không khai báo `page`, `limit`, `keyword` hay `cartItems`. AI đã chuyển `REPORT.md`, `README.md`, `AI_Audit_Report.md`, `AI_Critique.md` sang tiếng Việt và thiết lập quy tắc ghi log mỗi tương tác tiếp theo.
- **Kiểm tra của con người:** Đã đối chiếu bảng phân vùng với API specification. Không thay đổi số liệu thực thi hay tạo bằng chứng giả.
- **Hành động:** Việt hóa bộ tài liệu và ghi lại tương tác này.

## AI-004 - Sinh test case chuyển trạng thái

- **Thời điểm (UTC+07:00):** 2026-08-30 01:16
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Sinh test case kiểm tra logic thay đổi dữ liệu/trạng thái cho FR-05, FR-08 và FR-15.
- **Prompt nguyên văn:**

```text
sinh test cases kiểm tra logic thay đổi dữ liệu/trạng thái  (State Transitions )
```

- **Câu trả lời của AI:** Đã bổ sung 19 test case đề xuất tại phần “Test case logic thay đổi dữ liệu/trạng thái” của `REPORT.md`: 5 case FR-05 kiểm tra API chỉ đọc không làm đổi dữ liệu và phản ánh dữ liệu CRUD; 7 case FR-08 kiểm tra tạo order `không tồn tại → pending`, hủy order và phân quyền; 7 case FR-15 kiểm tra vòng đời `không tồn tại → đã tạo → đã cập nhật → đã xóa → không tồn tại`, giá trị không hợp lệ và phân quyền. Toàn bộ được đánh dấu là do AI đề xuất, chưa audit/chưa chạy.
- **Kiểm tra của con người:** Cần xác nhận status code, response schema và quy tắc hủy đơn từ SUT khi chạy thực tế. Các case dùng `/api/orders/:id/cancel` là endpoint hỗ trợ ngoài mục tiêu FR-08, cần ghi phạm vi rõ ràng trong workbook.
- **Hành động:** Thêm các test case đề xuất vào `REPORT.md`; chưa cập nhật số lượng test thực thi hoặc bug.

## AI-005 - Sinh test case bảo mật

- **Thời điểm (UTC+07:00):** 2026-08-30 01:20
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Sinh test case SQL Injection, IDOR và phân quyền role cho các API đã chọn.
- **Prompt nguyên văn:**

```text
tạo test cases kiểm tra SQL Injection, IDOR, Phân quyền Role  (Security  )
```

- **Câu trả lời của AI:** Đã bổ sung 19 test case bảo mật tại phần “Test case bảo mật: SQL Injection, IDOR và phân quyền role” của `REPORT.md`: 7 case SQL Injection, 5 case IDOR và 7 case RBAC. Các case dùng SUT cục bộ, có baseline và hậu kiểm dữ liệu; tất cả là đề xuất AI, chưa audit/chưa chạy. Phần IDOR dùng hai user test và endpoint order hỗ trợ; phần RBAC kiểm tra FR-15 admin-only, FR-08 xác thực user và FR-05 public.
- **Kiểm tra của con người:** Cần kiểm tra status code/schema thực tế, che token trong evidence và chỉ lập GitHub Issue sau khi tái hiện hành vi không an toàn. Không đưa token/mật khẩu/dữ liệu nhạy cảm lên GitHub công khai.
- **Hành động:** Thêm nhóm test case bảo mật và hướng dẫn audit vào `REPORT.md`; chưa thực thi request nào.

## AI-006 - Viết kịch bản Schema Validation

- **Thời điểm (UTC+07:00):** 2026-08-30 01:24
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Viết kịch bản kiểm tra response JSON khớp đặc tả/schema.
- **Prompt nguyên văn:**

```text
viết kịch bản kiểm tra cấu trúc JSON response trả về khớp với Spec.  (Schema Validation)
```

- **Câu trả lời của AI:** Đã bổ sung phần Schema Validation vào `REPORT.md`, gồm: bảng phân biệt schema thực sự công bố với schema suy luận từ mã nguồn; 15 test case kiểm tra list/search, checkout, Product CRUD, lỗi xác thực và endpoint order hỗ trợ; cùng Postman assertion JavaScript cho JSON, error response, product list và checkout. AI nêu rõ `api_specification.md` chưa mô tả schema response đầy đủ cho ba chức năng đã chọn nên các schema suy luận phải được audit, không được trình bày là schema chính thức.
- **Kiểm tra của con người:** Khi chạy, cần điều chỉnh assertion theo schema OpenAPI/chính thức nếu có; nếu không, ghi contract gap và chứng minh kết quả bằng response/Newman thực tế.
- **Hành động:** Thêm kịch bản, schema suy luận và script assertion; chưa chạy request nào.

## AI-007 - Tổng hợp test case để audit

- **Thời điểm (UTC+07:00):** 2026-08-30 02:26
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Tổng hợp tất cả test case do AI tạo thành một bảng để sinh viên audit từng dòng.
- **Prompt nguyên văn:**

```text
tổng hợp lại tất cả test case bạn đã tạo thành một bảng trong mục 7.1 để tôi dán nhãn VALID (Đúng), INVALID (Sai), INCOMPLETE (Thiếu) cho từng test case do AI sinh ra kèm giải thích lý do
```

- **Câu trả lời của AI:** Đã thay ma trận audit mẫu bằng mục 7.1 trong `REPORT.md`. Bảng tổng hợp gồm 53 test case AI sinh ra: 19 test state transitions, 19 test security và 15 test schema validation. Mỗi dòng có ID, nhóm, mô tả, kỳ vọng/điểm audit, cột nhãn của sinh viên và cột giải thích/hiệu chỉnh. Chưa có nhãn hoặc kết quả thực thi nào được tự điền.
- **Kiểm tra của con người:** Sinh viên cần so từng case với `api_specification.md`, phạm vi bài, endpoint thực tế và mã nguồn; dán nhãn cùng lý do trước khi chuyển test case sang Postman/Excel.
- **Hành động:** Tạo bảng audit tập trung tại mục 7.1; sửa số test Schema Validation được ghi nhầm từ 14 thành 15 trong AI-006.

## AI-008 - Khôi phục bảng audit 7.1

- **Thời điểm (UTC+07:00):** 2026-08-30 02:34
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Khôi phục bảng tổng hợp test case do AI sinh ra đã bị xóa khỏi mục 7.1.
- **Prompt nguyên văn:**

```text
tôi lỡ bấm gì đó nên xóa mất cái bạn vừa tạo rồi, khôi phục lại đi
```

- **Câu trả lời của AI:** Đã kiểm tra `REPORT.md`, xác nhận mục 7.1 chỉ còn tiêu đề và phần 7.2 do sinh viên bổ sung vẫn còn. AI đã khôi phục bảng audit 7.1 gồm 53 test case do AI sinh ra, với cột nhãn `VALID`/`INVALID`/`INCOMPLETE` và cột giải thích/hiệu chỉnh. Không chỉnh sửa phần 7.2 hoặc nội dung khác.
- **Kiểm tra của con người:** Cần kiểm tra các test case trong bảng, dán nhãn và nêu lý do trước khi thực thi.
- **Hành động:** Khôi phục bảng audit tập trung tại `REPORT.md` mục 7.1.

## AI-009 - Bổ sung Domain Partitions và loại tham số ngoài đặc tả

- **Thời điểm (UTC+07:00):** 2026-08-30 02:42
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Tạo test case cho kỹ thuật chia phân vùng miền giá trị và chỉ giữ tham số có trong API specification.
- **Prompt nguyên văn:**

```text
theo yêu cầu đề thì phải có test case cho chia phân vùng miền giá trị cho các tham số input   (domain  partitions) luôn thì phải. lúc đầu bạn phân vùng giá trị, tham số nào không có trong đặc tả thì bạn cứ xóa đi nhé
```

- **Câu trả lời của AI:** Đã xóa khỏi `REPORT.md` các tham số không có trong `api_specification.md`: `page`, `limit`, `keyword`, `cartItems`. Báo cáo giữ FR-05 `search`; FR-08 `total_amount`, `shipping_address`; FR-15 `name`, `price`, `description`, `imageUrl`, `category_id`, path `id`. AI thêm 42 test case Domain Partitions tại mục 3.4 và đưa tất cả vào bảng audit 7.1; tổng bảng audit là 95 case AI đề xuất. Các case vẫn chưa audit/chưa chạy.
- **Kiểm tra của con người:** Cần đối chiếu các kỳ vọng validation chưa ghi rõ trong đặc tả với yêu cầu giảng viên/hành vi SUT. Những case dựa trên quy tắc suy luận, ví dụ `price > 0`, phải dán `INCOMPLETE` nếu không tìm được nguồn yêu cầu chính thức.
- **Hành động:** Bổ sung test case Domain Partitions, cập nhật bảng audit và giữ audit history cũ nguyên vẹn để phản ánh quá trình sử dụng AI.

## AI-010 - Thực thi Postman/Newman và xuất artifacts

- **Thời điểm (UTC+07:00):** 2026-08-30 03:36
- **Công cụ/mô hình:** Codex (GPT-5), Newman 6.2.2
- **Mục đích:** Tạo Postman Collection/Environment, JSON schema, chạy API test trên SUT cục bộ và xuất báo cáo.
- **Prompt nguyên văn:**

```text
'Execute. Run the test cases with Postman + Newman (or Karate /&#x20;
RestAssured). Every request must carry the header X-Student-Id: {22127315}&#x20;
(for example, via a pre-request script). Produce the Newman / HTML
report.'

làm bước này đi. mấy cái schema bạn có thể xuất file json nếu cần dùng luôn. hay xuất bất kì file gì cần thiết theo yêu cầu đề bài
```

- **Câu trả lời của AI:** Đã tạo Postman Collection và Environment trong `hw06/postman`, ba JSON Schema trong `hw06/schemas`, và chạy collection bằng Newman 6.2.2 trên `http://127.0.0.1:3000`. Kết quả thực tế: 15 request, 31 assertions, 29 pass, 2 fail; cả 15 request đều mang `X-Student-Id: 22127315` do collection-level pre-request script. JSON nguồn lưu tại `hw06/newman-reports/HW06_Newman_Run_22127315.json`; HTML được tạo từ dữ liệu Newman JSON tại `hw06/newman-reports/HW06_Newman_Report_22127315.html`. Hai assertion fail: SQL injection search và tạo product không token. AI đã không coi chúng là bug đã xác nhận; cần tái hiện/audit và lập Issue nếu xác nhận. Chỉ pilot subset được chạy, chưa phải toàn bộ 95 case audit.
- **Kiểm tra của con người:** Xem HTML/JSON report, tự chụp console pre-request script trong Postman nếu đề yêu cầu ảnh chứng minh header; audit hai failure trước khi ghi bug report. Không commit token hay environment đã thực thi.
- **Hành động:** Tạo artifacts, chạy Newman, cập nhật báo cáo với số liệu pilot run và xóa environment đã thực thi chứa token.

## AI-011 - Quy ước dùng Newman trên Windows host

- **Thời điểm (UTC+07:00):** 2026-08-30 03:36
- **Công cụ/mô hình:** Codex (GPT-5), Newman 6.2.2
- **Mục đích:** Thiết lập đường dẫn Newman bắt buộc cho các lần chạy sau.
- **Prompt nguyên văn:**

```text
Newman đã được cài sẵn trên Windows host tại `%AppData%\npm\newman`. Hãy gọi trực tiếp bằng đường dẫn tuyệt đối `C:\Users\Uyen Nhu\AppData\Roaming\npm\newman.cmd run <file_collection>` thay vì dùng lệnh `newman` ngắn gọn và KHÔNG thực hiện `npm install` nữa.
```

- **Câu trả lời của AI:** Đã xác nhận file `C:\Users\Uyen Nhu\AppData\Roaming\npm\newman.cmd` tồn tại và chạy được, phiên bản 6.2.2. Từ bây giờ AI sẽ gọi Newman bằng đường dẫn tuyệt đối này và không thực hiện `npm install`.
- **Kiểm tra của con người:** Không có test case mới hoặc kết quả test mới trong tương tác này.
- **Hành động:** Ghi nhận quy ước thực thi cho các lần chạy Newman tiếp theo.

## AI-012 - Chạy lại Newman bằng runtime Windows host

- **Thời điểm (UTC+07:00):** 2026-08-30 03:43
- **Công cụ/mô hình:** Codex (GPT-5), Newman 6.2.2 tại Windows host
- **Mục đích:** Chạy lại Collection bằng đúng Newman được sinh viên chỉ định để thay thế evidence pilot trước đó.
- **Prompt nguyên văn:**

```text
ủa vậy bạn có cần làm lại bước này ''Execute. Run the test cases with Postman + Newman (or Karate /&#x20;
RestAssured). Every request must carry the header X-Student-Id: {22127315}&#x20;
(for example, via a pre-request script). Produce the Newman / HTML  report.' với bản newman tôi vừa cung cấp không vậy
```

- **Câu trả lời của AI:** Có. AI đã chạy lại Collection bằng đường dẫn tuyệt đối `C:\Users\Uyen Nhu\AppData\Roaming\npm\newman.cmd` (v6.2.2), sau đó tạo lại HTML từ JSON Newman. Kết quả: 15 request, 31 assertions, 29 pass, 2 fail; 15/15 request có `X-Student-Id: 22127315`. Hai failure không đổi: `SEC-SQL-01` và `SEC-RBAC-01`. Đây vẫn là pilot subset, chưa phải chạy toàn bộ 95 case audit.
- **Kiểm tra của con người:** Xem HTML/JSON mới, tái hiện hai failure trước khi lập bug report; chụp console Postman để có screenshot header theo yêu cầu đề.
- **Hành động:** Ghi đè báo cáo Newman JSON/HTML bằng run từ Windows host và cập nhật `REPORT.md`.

## AI-013 - Làm rõ Newman và hướng dẫn bằng chứng Postman

- **Thời điểm (UTC+07:00):** 2026-08-30 03:43
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Làm rõ cách Collection được chạy và hướng dẫn lấy ảnh minh chứng bug trong Postman.
- **Prompt nguyên văn:**

```text
ủa bạn không chạy test trên app postman hả, tôi mở postman không thấy collection mới nào.

giờ báo cáo bug thì tôi phải chạy như thế nào để lấy ảnh minh chứng?
```

- **Câu trả lời của AI:** AI đã chạy file Collection bằng Newman CLI, không có quyền điều khiển hoặc import vào giao diện Postman đang mở của sinh viên; vì vậy Collection không tự xuất hiện trên app. Sinh viên cần Import file `hw06/postman/ESHOP_HW06_22127315.postman_collection.json` và Environment tương ứng, chọn environment, mở Postman Console, chạy request để chụp header `X-Student-Id`, request/response và dữ liệu hậu kiểm. Với hai failure pilot, cần chạy lại request SQL injection search và request tạo product không Authorization, chụp request, response, HTTP status, console và bước hậu kiểm; chỉ tạo GitHub Issue sau khi tái hiện được.
- **Kiểm tra của con người:** Thực hiện screenshot trong Postman/app để bảo đảm ảnh là bằng chứng thực tế do sinh viên tạo, không dùng hình AI tạo.
- **Hành động:** Ghi rõ giới hạn của run Newman và quy trình thu thập evidence.

## AI-014 - Chẩn đoán lỗi biến Environment trong Postman

- **Thời điểm (UTC+07:00):** 2026-08-30 04:37
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Chẩn đoán lỗi không gửi được request trong Postman từ ảnh chụp.
- **Prompt nguyên văn:**

```text
sao bấm send bị error nhỉ
```

- **Câu trả lời của AI:** Ảnh cho thấy lỗi `getaddrinfo ENOTFOUND {{baseUrl}}`; console hiển thị URL `http://{{baseUrl}}/api/products...`. Điều này xác nhận biến `baseUrl` chưa được resolve. Cần bấm `Apply` ở panel “Set the active environment”, sau đó kiểm tra environment có Current Value `http://127.0.0.1:3000` cho `baseUrl` và backend đang chạy. Không có test case mới hay kết quả chạy mới.
- **Kiểm tra của con người:** Sau khi Apply, kiểm tra URL chuyển thành `http://127.0.0.1:3000/api/products...`; nếu vẫn lỗi, mở Environment và điền Current Value cho `baseUrl`.
- **Hành động:** Ghi nhận hướng dẫn xử lý lỗi Postman.

## AI-015 - Tạo pipeline CI/CD cho API test

- **Thời điểm (UTC+07:00):** 2026-08-30 04:37
- **Công cụ/mô hình:** Codex (GPT-5), GitHub Actions, Newman 6.2.2
- **Mục đích:** Tích hợp API test vào CI/CD và chuẩn bị minh chứng một pipeline pass/một pipeline fail.
- **Prompt nguyên văn:**

```text
"Integrate into CI/CD. Add your API test cases to a CI/CD pipeline for the&#x20;
SUT (for example, run Newman in GitHub Actions in your repository), and
write a short CI/CD report describing the pipeline configuration and the two
runs below, with screenshots and links. Provide two sample commits: one
whose pipeline run shows all API test cases passing, and another whose
pipeline run shows one test case failing."

làm tiếp bước này đi
```

- **Câu trả lời của AI:** Đã tạo GitHub Actions workflow `.github/workflows/hw06-api-tests.yml`, CI passing collection, CI intentionally-failing-demo collection và `hw06/CI_CD_Report.md`. Workflow checkout source, cài backend dependencies, khởi động SUT localhost, chạy Newman và upload JSON/log artifact. Smoke suite pass đã chạy cục bộ: 3 request, 6 assertions, 0 fail. Link/screenshot/two GitHub runs chưa thể tạo vì các file chưa được push lên remote; report có hướng dẫn tạo hai commit/run. Failure-demo là minh chứng workflow có một test fail, không phải bug SUT.
- **Kiểm tra của con người:** Trước khi nộp, push workflow lên GitHub, mở Actions chạy `passing` và `failing-demo`, chụp mỗi run và dán link/commit SHA vào `CI_CD_Report.md`.
- **Hành động:** Tạo pipeline artifacts và xác minh cục bộ pass suite; không push hoặc commit thay sinh viên.

## AI-016 - Hướng dẫn xử lý GitHub Actions fail và Run workflow

- **Thời điểm (UTC+07:00):** 2026-08-30 04:37
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Giải thích run CI thất bại và vị trí nút chạy workflow thủ công.
- **Prompt nguyên văn:**

```text
sao mới commit lên là fail luôn, giờ chạy tiếp sao, tôi không thấy nút run workflow
```

- **Câu trả lời của AI:** Ảnh chỉ cho thấy job `newman` thất bại, không hiển thị step/log nên chưa thể kết luận nguyên nhân chính xác. Cần bấm job `newman` ở panel trái, mở step màu đỏ đầu tiên và chụp/dán log. Nút `Run workflow` không có ở trang chi tiết run; phải quay về trang workflow bằng breadcrumb `HW06 API Tests` hoặc Actions → chọn workflow. Repository remote có default branch `main`, trong khi run được push từ branch `Nhu`; GitHub chỉ hiển thị manual dispatch đáng tin cậy khi file workflow đã tồn tại trên default branch. Cần merge/push workflow vào `main`, rồi mở workflow chính để chọn `passing` hoặc `failing-demo`.
- **Kiểm tra của con người:** Không tạo kết quả workflow mới. Sinh viên cần cung cấp log step lỗi để AI sửa nguyên nhân thay vì đoán.
- **Hành động:** Ghi nhận hướng dẫn và điều kiện branch cho workflow_dispatch.

## AI-017 - Làm rõ việc commit package-lock cho CI

- **Thời điểm (UTC+07:00):** 2026-08-30 04:37
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Giải thích file nào cần commit để sửa CI lỗi `npm ci`.
- **Prompt nguyên văn:**

```text
tôi bắt buộc phải commit cả file `backend/package-lock.json`   à
```

- **Câu trả lời của AI:** Có, nếu workflow tiếp tục dùng `npm ci` - cách phù hợp để cài dependency tái lập trong CI. Log GitHub cho thấy `backend/package-lock.json` thiếu `picomatch@4.0.7`; nếu không commit lockfile đã sửa thì runner vẫn fail trước khi chạy Newman. Lựa chọn thay thế là đổi workflow sang `npm install`, nhưng không khuyến nghị vì dependency có thể thay đổi giữa các lần chạy và làm bằng chứng CI kém tin cậy.
- **Kiểm tra của con người:** Chỉ stage `backend/package-lock.json`, workflow và các artifact HW06 liên quan; không stage `backend/database.sqlite` nếu đó là thay đổi dữ liệu cục bộ không cần nộp.
- **Hành động:** Ghi nhận hướng dẫn commit an toàn; không tự commit/push.

## AI-018 - Hướng dẫn hoàn tất hai bằng chứng CI/CD

- **Thời điểm (UTC+07:00):** 2026-08-30 06:38
- **Công cụ/mô hình:** Codex (GPT-5)
- **Mục đích:** Hướng dẫn chi tiết tạo run pass và run fail có chủ ý trên GitHub Actions.
- **Prompt nguyên văn:**

```text
ok pass được cái đầu tiên, giờ làm gì tiếp đây, hướng dẫn chi tiết từng bước , từng vị trí để thực hiện nhé
```

- **Câu trả lời của AI:** Đã xác nhận workflow hiện tại hỗ trợ hai cách tạo run fail: chạy thủ công `failing-demo` hoặc push commit có marker `[ci-fail-demo]`. Vì nút Run workflow có thể chưa hiện trên nhánh hiện tại, AI hướng dẫn dùng commit marker: lưu link/screenshot run xanh trước; tạo một file ghi chú vô hại trong `hw06`, commit với message chứa marker, push và chụp run đỏ. Sau đó điền SHA/link/đường dẫn screenshot vào `CI_CD_Report.md`. AI nhắc không commit `backend/database.sqlite`, hiện là thay đổi cục bộ duy nhất không liên quan.
- **Kiểm tra của con người:** Sinh viên cần tự tạo ảnh chụp GitHub Actions thật và xác nhận run đỏ là demo test cố ý fail, không phải bug SUT.
- **Hành động:** Cung cấp quy trình thao tác; không tự commit/push.

## Mẫu cho tương tác tiếp theo

## AI-XXX - _tên ngắn gọn_

- **Thời điểm (UTC+07:00):**
- **Công cụ/mô hình:**
- **Mục đích:**
- **Prompt nguyên văn:**

```text
Dán nguyên văn prompt tại đây.
```

- **Câu trả lời nguyên văn của AI:**

```text
Dán nguyên văn câu trả lời tại đây, hoặc ghi tham chiếu file cục bộ bất biến khi quá dài.
```

- **Kiểm tra của con người:** Đánh giá từng khuyến nghị/test case `VALID`, `INVALID` hoặc `INCOMPLETE`, giải thích lý do và ghi sửa đổi.
- **Hành động:**
