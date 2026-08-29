# Báo cáo HW06 - Kiểm thử API

> MSSV: **22127315**  
> Hệ thống kiểm thử (SUT): EShop (`http://localhost:3000`)  
> Chức năng đã chọn: **FR-05 Liệt kê/tìm kiếm sản phẩm**, **FR-08 Thanh toán**, **FR-15 Quản lý sản phẩm CRUD**

## 1. Phạm vi và API mục tiêu

| Mục tiêu | Endpoint thuộc phạm vi | Xác thực theo đặc tả |
|---|---|---|
| FR-05 | `GET /api/products`, `GET /api/products?search={search}` | Không yêu cầu |
| FR-08 | `POST /api/checkout` | Bearer token của người dùng |
| FR-15 | `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id` | Bearer token của admin |

Mọi request phải có header `X-Student-Id: 22127315`, được thêm ở pre-request script cấp Collection. Không ghi nhận kết quả chạy hoặc bug khi chưa tái hiện được và có bằng chứng.

## 2. Kế hoạch thực hiện

1. Đọc `api_specification.md` và mã nguồn để xác định hợp đồng mong đợi của từng endpoint.
2. Dùng AI qua các prompt nhỏ, có thể truy vết, để tạo tối thiểu 35 test case cho mỗi mục tiêu; lưu prompt và câu trả lời vào `AI_Audit_Report.md`.
3. Đánh giá từng test case AI là `VALID`, `INVALID`, hoặc `INCOMPLETE`; sửa các trường hợp không hợp lệ/chưa đủ và ghi lý do.
4. Tự bổ sung ít nhất 5 test case mỗi mục tiêu, ưu tiên bảo mật, trạng thái, phân quyền và schema.
5. Tạo Postman Collection, Environment, data file (nếu dùng), rồi chạy Newman trên SUT cục bộ.
6. Tái hiện lỗi thực sự, lập GitHub Issue có ảnh chụp; thêm CI/CD có một run pass và một run cố ý fail.
7. Tự vẽ sơ đồ AI test-generator, viết pseudocode và hoàn thiện AI Critique sau khi review kết quả AI thật.

## 3. Phân vùng miền giá trị

Chọn ít nhất một giá trị đại diện cho từng phân vùng và thêm giá trị biên. Với tham số không nằm trong đặc tả, chỉ ghi nhận hành vi như một thiếu hụt hợp đồng; không tự suy diễn là bug.

### 3.1. FR-05 - `GET /api/products`

Đặc tả công bố query tùy chọn `search`; các phân vùng và test case dưới đây chỉ dùng tham số này.

| Tham số | Phân vùng hợp lệ | Phân vùng không hợp lệ / robustness | Giá trị biên đại diện | Kỳ vọng cần kiểm tra |
|---|---|---|---|---|
| `search` | Bỏ qua; mảnh tên không rỗng; tên chính xác; khớp một phần; khác hoa/thường; tiếng Việt/Unicode; văn bản URL-encoded an toàn | Rỗng; chỉ khoảng trắng; không có kết quả; rất dài; ký tự/payload SQL; lặp `search`; query dạng mảng/đối tượng | 1 ký tự; cụm từ thường; độ dài tối đa chọn; tối đa + 1 | Response là mảng JSON; kết quả khớp quy tắc tìm kiếm; payload injection không làm lộ dữ liệu không liên quan hay lỗi server. |

### 3.2. FR-08 - `POST /api/checkout`

Body theo đặc tả có `total_amount` và `shipping_address`. Authorization được kiểm thử riêng trong phần Security.

| Tham số / điều kiện | Phân vùng hợp lệ | Phân vùng không hợp lệ / robustness | Giá trị biên đại diện | Kỳ vọng cần kiểm tra |
|---|---|---|---|---|
| `total_amount` | Số nguyên dương phù hợp số tiền phải trả | Bỏ qua; `null`; 0; âm; thập phân; chuỗi số; chuỗi chữ; boolean; mảng/đối tượng; số rất lớn | 1; giá thường; số nguyên an toàn lớn nhất; lớn nhất + 1 | Chỉ nhận số tiền hợp lệ; order lưu và schema response đúng. Dữ liệu sai được chấp nhận là bằng chứng cần điều tra. |
| `shipping_address` | Địa chỉ không rỗng; tiếng Việt/Unicode; dấu câu cho phép | Bỏ qua; `null`; rỗng; chỉ khoảng trắng; số; boolean; mảng/đối tượng; rất dài; HTML/script | độ dài 1; thường; giới hạn chọn; giới hạn + 1 | Đơn hợp lệ lưu đúng địa chỉ; dữ liệu thiếu/sai được xử lý an toàn và nhất quán. |

### 3.3. FR-15 - `POST`/`PUT`/`DELETE /api/products`

Theo đặc tả, CRUD sản phẩm là thao tác admin. Áp dụng `Authorization` cho mọi method, các trường dữ liệu cho POST/PUT và path `id` cho PUT/DELETE.

| Tham số / điều kiện | Phân vùng hợp lệ | Phân vùng không hợp lệ / robustness | Giá trị biên đại diện | Kỳ vọng cần kiểm tra |
|---|---|---|---|---|
| `name` | Tên không rỗng; tiếng Việt/Unicode; dấu câu hợp lệ | Bỏ qua; `null`; rỗng; chỉ khoảng trắng; số; boolean; mảng/đối tượng; trùng tên nếu có ràng buộc; rất dài; HTML/script | độ dài 1; thường; giới hạn chọn; giới hạn + 1 | Chỉ nhận tên hợp lệ; response/dữ liệu lưu đúng schema và giá trị. |
| `price` | Số nguyên dương (`price > 0`) | Bỏ qua; `null`; 0; âm; thập phân; chuỗi số; chuỗi chữ; boolean; mảng/đối tượng; số quá lớn | 0, 1, giá thường, số nguyên an toàn lớn nhất, lớn nhất + 1 | Chỉ giá dương hợp lệ được lưu; nhận giá 0/âm/sai kiểu là ứng viên bug. |
| `description` | Văn bản thường; chuỗi rỗng nếu tùy chọn; tiếng Việt/Unicode | Bỏ qua; `null`; sai kiểu; rất dài; HTML/script | rỗng; 1 ký tự; thường; giới hạn chọn; giới hạn + 1 | Đối chiếu quy tắc bắt buộc/tùy chọn; output vẫn JSON hợp lệ. |
| `imageUrl` | URL HTTP/HTTPS hợp lệ; chuỗi rỗng nếu tùy chọn | Bỏ qua; `null`; URL sai; không phải chuỗi; rất dài; scheme nguy hiểm | rỗng; URL ngắn hợp lệ; URL dài | Kiểm tra theo chính sách URL công bố; nếu chưa có, ghi nhận khoảng trống và kiểm tra lưu/xuất an toàn. |
| `category_id` | ID category dương đang tồn tại | Bỏ qua; `null`; 0; âm; ID không tồn tại; thập phân; chuỗi số/chữ; boolean; mảng/đối tượng | 0, 1, ID tồn tại, ID không tồn tại, giới hạn + 1 | Quan hệ category hợp lệ và response nhất quán; ID sai được chấp nhận cần điều tra. |
| path `id` cho PUT/DELETE | ID sản phẩm test đang tồn tại | Thiếu route; 0; âm; không tồn tại; thập phân; chữ; ký tự SQL; rất lớn | 0, 1, ID tồn tại, ID không tồn tại, giới hạn + 1 | Chỉ sản phẩm mục tiêu bị sửa/xóa; ID sai không ảnh hưởng sản phẩm khác. |
| `Authorization` | Token admin hợp lệ | Bỏ qua; token user thường; token sai/hết hạn/giả mạo | admin, user thường, không token | Chỉ admin được CRUD. Thành công không có admin token là ứng viên lỗi bảo mật sau khi tái hiện. |

### 3.4. Test case Domain Partitions do AI đề xuất

Các case bên dưới được sinh trực tiếp từ các phân vùng trên, **chưa audit và chưa chạy**. Với validation chưa được quy định rõ trong `api_specification.md`, expected result được ghi là hành vi an toàn mong đợi và phải dán nhãn `INCOMPLETE` nếu chưa có thêm yêu cầu chính thức.

| ID | FR | Tham số/phân vùng | Input đại diện | Kết quả mong đợi |
|---|---|---|---|---|
| DP-FR05-01 | FR-05 | `search` bỏ qua | Không gửi query `search`. | HTTP 200, JSON array danh sách sản phẩm. |
| DP-FR05-02 | FR-05 | `search` tên chính xác | `search=iPhone 15 Pro Max`. | JSON array, có sản phẩm khớp nếu seed data tồn tại. |
| DP-FR05-03 | FR-05 | `search` khớp một phần | `search=iPhone`. | JSON array, tên kết quả chứa cụm tìm kiếm theo hành vi công bố. |
| DP-FR05-04 | FR-05 | `search` khác hoa/thường | `search=IPHONE`. | JSON array; ghi nhận tìm kiếm có/không phân biệt hoa thường. |
| DP-FR05-05 | FR-05 | `search` Unicode/tiếng Việt | `search=Điện thoại`. | JSON hợp lệ; server xử lý Unicode không lỗi. |
| DP-FR05-06 | FR-05 | `search` URL-encoded an toàn | `search=AirPods%20Pro`. | JSON hợp lệ; server giải mã đúng khoảng trắng. |
| DP-FR05-07 | FR-05 | `search` rỗng | `search=`. | Ghi nhận rõ hành vi list toàn bộ hay mảng rỗng; không lỗi server. |
| DP-FR05-08 | FR-05 | `search` chỉ khoảng trắng | `search=%20%20%20`. | JSON hợp lệ, không lỗi server; ghi nhận quy tắc trim nếu có. |
| DP-FR05-09 | FR-05 | `search` không khớp | `search=khong-ton-tai-22127315`. | JSON array rỗng, không phải `null`/HTML. |
| DP-FR05-10 | FR-05 | `search` rất dài | Chuỗi 1.000 ký tự chữ an toàn. | Server phản hồi an toàn, JSON hợp lệ, không 5xx/timeout bất thường. |
| DP-FR08-01 | FR-08 | `total_amount` biên dưới hợp lệ | `1`; địa chỉ hợp lệ. | Nếu quy tắc `> 0` được chấp nhận, tạo order `pending`; nếu có minimum khác, ghi yêu cầu đó. |
| DP-FR08-02 | FR-08 | `total_amount` hợp lệ thông thường | `200000`; địa chỉ hợp lệ. | Thành công, response có `orderId`; order lưu đúng số tiền. |
| DP-FR08-03 | FR-08 | `total_amount` bằng 0 | `0`; địa chỉ hợp lệ. | Hành vi an toàn mong đợi: từ chối, không tạo order. |
| DP-FR08-04 | FR-08 | `total_amount` âm | `-1`; địa chỉ hợp lệ. | Hành vi an toàn mong đợi: từ chối, không tạo order. |
| DP-FR08-05 | FR-08 | `total_amount` thập phân | `100.5`; địa chỉ hợp lệ. | Từ chối hoặc xử lý theo quy tắc tiền tệ công bố; không làm tròn âm thầm. |
| DP-FR08-06 | FR-08 | `total_amount` sai kiểu | `"200000"`, `"abc"`, `null` hoặc bỏ field (chạy từng giá trị). | Từ chối có JSON error; không tạo order. |
| DP-FR08-07 | FR-08 | `shipping_address` thông thường | `123 Lê Lợi, Quận 1, TP.HCM`; amount hợp lệ. | Thành công; order lưu đúng địa chỉ. |
| DP-FR08-08 | FR-08 | `shipping_address` Unicode | `Khu phố 6, Thủ Đức, TP.HCM`; amount hợp lệ. | Thành công; không lỗi encoding và dữ liệu lưu đúng. |
| DP-FR08-09 | FR-08 | `shipping_address` rỗng | `""`; amount hợp lệ. | Hành vi an toàn mong đợi: từ chối, không tạo order. |
| DP-FR08-10 | FR-08 | `shipping_address` chỉ khoảng trắng | `"   "`; amount hợp lệ. | Hành vi an toàn mong đợi: trim rồi từ chối, không tạo order. |
| DP-FR08-11 | FR-08 | `shipping_address` thiếu/null | Bỏ field hoặc gửi `null`. | Từ chối có JSON error; không tạo order. |
| DP-FR08-12 | FR-08 | `shipping_address` sai kiểu/rất dài | Số, object hoặc chuỗi 1.000 ký tự (chạy từng giá trị). | Từ chối an toàn hoặc áp dụng giới hạn công bố; không lỗi 5xx/không tạo order sai. |
| DP-FR15-01 | FR-15 | `name` hợp lệ thông thường | `HW06 Product 22127315`; các field khác hợp lệ. | Admin tạo được sản phẩm, response có ID. |
| DP-FR15-02 | FR-15 | `name` Unicode/biên 1 ký tự | `Đ` hoặc `Áo thun`; các field khác hợp lệ. | Dữ liệu được lưu/đọc đúng encoding. |
| DP-FR15-03 | FR-15 | `name` rỗng/chỉ khoảng trắng | `""` và `"   "` (chạy riêng). | Hành vi an toàn mong đợi: từ chối, không tạo sản phẩm. |
| DP-FR15-04 | FR-15 | `name` thiếu/null/sai kiểu | Bỏ field, `null`, số hoặc object (chạy riêng). | Từ chối an toàn, không tạo sản phẩm. |
| DP-FR15-05 | FR-15 | `name` rất dài | Chuỗi 1.000 ký tự an toàn. | Từ chối theo giới hạn hoặc lưu an toàn; không lỗi 5xx. |
| DP-FR15-06 | FR-15 | `price` biên dưới hợp lệ | `1`; các field khác hợp lệ. | Admin tạo/cập nhật thành công nếu quy tắc `price > 0` được áp dụng. |
| DP-FR15-07 | FR-15 | `price` hợp lệ thông thường | `100000`; các field khác hợp lệ. | Giá được lưu và đọc lại đúng. |
| DP-FR15-08 | FR-15 | `price` bằng 0 | `0`; các field khác hợp lệ. | Theo quy tắc `price > 0`: từ chối, không đổi dữ liệu. |
| DP-FR15-09 | FR-15 | `price` âm | `-1`; các field khác hợp lệ. | Theo quy tắc `price > 0`: từ chối, không đổi dữ liệu. |
| DP-FR15-10 | FR-15 | `price` thập phân | `100.5`; các field khác hợp lệ. | Từ chối hoặc xử lý theo quy tắc tiền tệ công bố; không làm tròn âm thầm. |
| DP-FR15-11 | FR-15 | `price` thiếu/null/sai kiểu | Bỏ field, `null`, `"100000"`, `"abc"`, boolean (chạy riêng). | Từ chối an toàn, không tạo/cập nhật dữ liệu sai. |
| DP-FR15-12 | FR-15 | `description` rỗng/Unicode | `""` và mô tả tiếng Việt (chạy riêng). | Xác nhận field có tùy chọn không; response JSON hợp lệ. |
| DP-FR15-13 | FR-15 | `description` null/sai kiểu/rất dài | `null`, object hoặc chuỗi 1.000 ký tự (chạy riêng). | Validate/lưu an toàn theo contract; không 5xx. |
| DP-FR15-14 | FR-15 | `imageUrl` HTTP/HTTPS hợp lệ | URL hình ảnh hợp lệ. | Sản phẩm lưu đúng URL. |
| DP-FR15-15 | FR-15 | `imageUrl` rỗng/sai định dạng | `""`, `not-a-url`, `javascript:...` (chạy riêng). | Áp dụng chính sách URL nếu có; không tạo dữ liệu nguy hiểm. |
| DP-FR15-16 | FR-15 | `category_id` tồn tại | `1` hoặc category seed đang tồn tại. | Sản phẩm liên kết đúng category. |
| DP-FR15-17 | FR-15 | `category_id` 0/âm/không tồn tại | `0`, `-1`, ID không tồn tại (chạy riêng). | Hành vi an toàn mong đợi: từ chối, không tạo/cập nhật. |
| DP-FR15-18 | FR-15 | `category_id` sai kiểu | `"1"`, `"abc"`, `null`, object (chạy riêng). | Từ chối an toàn, không tạo/cập nhật. |
| DP-FR15-19 | FR-15 | path `id` tồn tại | ID của `PRODUCT_A`. | PUT/DELETE chỉ tác động đúng `PRODUCT_A`. |
| DP-FR15-20 | FR-15 | path `id` không hợp lệ | `0`, âm, không tồn tại, text (chạy riêng). | Từ chối/không tìm thấy; không làm đổi sản phẩm khác. |

### 3.5. Điểm ưu tiên

- **FR-05:** SQL injection ở `search`, Unicode, query rỗng/dài và schema mảng. Mã nguồn hiện tạo SQL bằng nối chuỗi, nhưng chỉ báo bug khi tái hiện trên SUT.
- **FR-08:** token, số tiền âm/0/sai kiểu, địa chỉ thiếu, cart rỗng/lặp lại và quyền sở hữu order.
- **FR-15:** create-update-delete, ID sai, trường sai kiểu và phân quyền admin. Cần tái hiện bằng user thường/không token trước khi lập Issue.

## 4. Test case logic thay đổi dữ liệu/trạng thái

Các test case dưới đây do AI đề xuất, **chưa audit và chưa chạy**. Khi đưa vào workbook, sinh viên phải đánh dấu từng case `VALID` / `INVALID` / `INCOMPLETE`, điều chỉnh expected result theo đặc tả và lưu bằng chứng Newman.

### 4.1. Quy ước dữ liệu và trạng thái

- `USER_TOKEN`: token hợp lệ của user thường; `ADMIN_TOKEN`: token hợp lệ của admin.
- `PRODUCT_A`: sản phẩm chỉ được tạo bởi test suite này; ghi lại ID để cleanup.
- `ORDER_A`: order của `USER_TOKEN`, tạo bởi test suite này.
- Vòng đời mong đợi của `PRODUCT_A`: **không tồn tại → đã tạo → đã cập nhật → đã xóa → không tồn tại**.
- Vòng đời mong đợi của `ORDER_A`: **không tồn tại → pending** sau checkout. Nếu kiểm thử endpoint hủy đơn hỗ trợ thêm, chỉ kiểm tra chuyển trạng thái theo quy tắc công bố; không suy diễn các chuyển trạng thái khác.

### 4.2. FR-05 - API chỉ đọc: trạng thái dữ liệu không được thay đổi

| ID | Tiền điều kiện | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| ST-FR05-01 | Lưu snapshot danh sách/ID sản phẩm trước test. | `GET /api/products?search=iPhone` hai lần liên tiếp. | Hai response có schema hợp lệ và danh sách kết quả nhất quán; không tạo/sửa/xóa sản phẩm. |
| ST-FR05-02 | Lưu snapshot danh sách/ID sản phẩm trước test. | `GET /api/products?search=khong-ton-tai-22127315`. | Trả mảng JSON rỗng (hoặc hành vi đã công bố); snapshot dữ liệu sản phẩm sau request không đổi. |
| ST-FR05-03 | Lưu snapshot danh sách/ID sản phẩm trước test. | Gửi search với input bất thường an toàn, ví dụ chuỗi rất dài hoặc ký tự đặc biệt. | Server xử lý an toàn; không phát sinh thêm/xóa/sửa sản phẩm. Nếu server lỗi hoặc trả dữ liệu không liên quan, lưu bằng chứng để điều tra. |
| ST-FR05-04 | `PRODUCT_A` đã được tạo và ghi ID/tên. | Tìm theo tên cũ; cập nhật `PRODUCT_A`; tìm theo tên mới và tên cũ. | Trước update tìm thấy theo tên cũ; sau update tìm thấy theo tên mới, không còn khớp tên cũ nếu tìm là exact/unique. Xác nhận FR-05 phản ánh thay đổi dữ liệu từ FR-15. |
| ST-FR05-05 | `PRODUCT_A` đang tồn tại. | Xóa `PRODUCT_A`; tìm theo ID/tên đã xóa. | Sản phẩm không còn xuất hiện trong danh sách/tìm kiếm. Đây là hậu điều kiện của chuyển trạng thái xóa từ FR-15. |

### 4.3. FR-08 - tạo order và trạng thái khởi đầu

| ID | Tiền điều kiện | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| ST-FR08-01 | `USER_TOKEN` hợp lệ; biết số order của user trước khi test. | `POST /api/checkout` với `total_amount` dương và `shipping_address` hợp lệ. | Thành công trả `orderId`; một order mới xuất hiện trong `GET /api/orders/my-orders`, thuộc user hiện tại và có `status = pending`. |
| ST-FR08-02 | Thực hiện ST-FR08-01, lưu `ORDER_A`. | Đọc `GET /api/orders/my-orders` hai lần; nếu dùng endpoint chi tiết thì đọc order đó. | `ORDER_A` vẫn tồn tại, dữ liệu/`pending` không tự đổi chỉ vì đọc. |
| ST-FR08-03 | Không có Authorization hoặc token sai. | Gọi checkout với body hợp lệ, sau đó đọc order history bằng token hợp lệ của user test. | Request bị từ chối; không xuất hiện order mới. Đây là kiểm tra “không chuyển từ không tồn tại sang pending” khi không được phép. |
| ST-FR08-04 | `USER_TOKEN` hợp lệ, ghi nhận số order trước test. | Gọi checkout với amount sai (0/âm/sai kiểu) hoặc thiếu địa chỉ; đọc order history. | Theo quy tắc mong đợi, request bị từ chối và không có order mới. Nếu order vẫn được tạo thì ghi nhận là candidate bug sau khi tái hiện. |
| ST-FR08-05 | `ORDER_A` là order `pending` của user test. | `PUT /api/orders/{ORDER_A}/cancel` với `USER_TOKEN` (endpoint hỗ trợ thêm cho kiểm thử trạng thái). | Nếu đặc tả/quy tắc cho phép: `pending → canceled`; order history phản ánh `canceled`. Nếu endpoint ngoài phạm vi hoặc quy tắc khác, ghi rõ và không dùng làm kết luận cho FR-08. |
| ST-FR08-06 | `ORDER_A` đã `canceled` từ ST-FR08-05. | Gửi lại request cancel. | Không được chuyển tiếp sang trạng thái khác; server từ chối hoặc trả kết quả idempotent đúng theo quy tắc công bố; order vẫn `canceled`. |
| ST-FR08-07 | User A và User B có token hợp lệ; `ORDER_A` thuộc User A. | User B gọi cancel `ORDER_A` hoặc kiểm tra order history của mình. | User B không thể làm thay đổi `ORDER_A` và không nhìn thấy order đó trong danh sách của mình. |

### 4.4. FR-15 - vòng đời CRUD sản phẩm

| ID | Tiền điều kiện | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| ST-FR15-01 | `ADMIN_TOKEN` hợp lệ; tên `HW06-22127315-A` chưa tồn tại. | `POST /api/products` với toàn bộ field hợp lệ. | Thành công trả ID; `PRODUCT_A` chuyển **không tồn tại → đã tạo** và đọc/list thấy đúng dữ liệu. |
| ST-FR15-02 | `PRODUCT_A` đã tạo. | `PUT /api/products/{PRODUCT_A}` đổi tên, giá, mô tả hoặc category hợp lệ. | Thành công; `PRODUCT_A` chuyển **đã tạo → đã cập nhật**; các field được chọn có giá trị mới, các field khác đúng theo contract. |
| ST-FR15-03 | `PRODUCT_A` đã tạo; lưu snapshot trước update. | `PUT` với `price = 0`, âm hoặc sai kiểu. | Theo quy tắc `price > 0`, request phải bị từ chối và snapshot không đổi. Nếu giá trị sai được lưu, đánh dấu candidate bug. |
| ST-FR15-04 | `PRODUCT_A` đã tạo; có token user thường/không token. | POST, PUT hoặc DELETE dùng token user thường hoặc không có token. | Theo đặc tả admin-only, request bị từ chối và trạng thái `PRODUCT_A` không đổi. Thành công là candidate lỗi phân quyền sau khi tái hiện. |
| ST-FR15-05 | `PRODUCT_A` đã cập nhật. | `DELETE /api/products/{PRODUCT_A}` với `ADMIN_TOKEN`. | Thành công; `PRODUCT_A` chuyển **đã cập nhật → đã xóa**; GET/list/search không còn sản phẩm này. |
| ST-FR15-06 | `PRODUCT_A` đã xóa. | Gửi lại DELETE với cùng ID. | Không được xóa sản phẩm khác. Hành vi mong đợi là 404/response idempotent phù hợp contract; danh sách sản phẩm không thay đổi. |
| ST-FR15-07 | Có `PRODUCT_B` không thuộc dữ liệu cleanup của case. | PUT/DELETE dùng ID không tồn tại, `0`, âm hoặc text; so sánh `PRODUCT_B` trước/sau. | Request bị từ chối hoặc không làm gì; `PRODUCT_B` và các sản phẩm khác không đổi. |

## 5. Test case bảo mật: SQL Injection, IDOR và phân quyền role

Các case dưới đây là đề xuất AI, **chưa audit và chưa chạy**. Chỉ chạy chúng trên SUT EShop cục bộ/phạm vi được cho phép. Không dùng payload phá hủy dữ liệu; lưu request, response, timestamp và ảnh/console evidence khi tái hiện.

### 5.1. SQL Injection

| ID | Mục tiêu | Tiền điều kiện | Thao tác | Kết quả mong đợi an toàn |
|---|---|---|---|---|
| SEC-SQL-01 | FR-05 | Ghi nhận kết quả tìm kiếm với chuỗi chắc chắn không tồn tại. | Gọi `GET /api/products` với `search` là payload boolean SQL injection, gửi qua Postman Params để được URL-encode. | Không trả về toàn bộ/dữ liệu không liên quan; không lộ lỗi SQL; response JSON hợp lệ theo contract. Nếu số kết quả bất thường so với baseline, lưu bằng chứng để tái hiện. |
| SEC-SQL-02 | FR-05 | Có baseline tìm kiếm bình thường. | Gửi `search` có dấu nháy đơn đơn lẻ và dấu nháy kép. | Không lỗi 5xx, stack trace hay thông báo database; không đổi dữ liệu sản phẩm. |
| SEC-SQL-03 | FR-05 | Có baseline. | Gửi `search` chứa SQL comment marker và phần từ khóa điều kiện. | Không bỏ qua điều kiện tìm kiếm, không trả tất cả sản phẩm, không lỗi DB. |
| SEC-SQL-04 | FR-05 | Có baseline. | Gửi `search` chứa wildcard `%` và `_`, sau đó so sánh với tìm kiếm văn bản thường. | Hành vi wildcard phải khớp chính sách tìm kiếm công bố; không làm lộ dữ liệu ngoài dự kiến. Nếu đặc tả không nói rõ, ghi là khoảng trống hợp đồng. |
| SEC-SQL-05 | FR-15 | `ADMIN_TOKEN` hợp lệ; có tên test duy nhất. | POST/PUT sản phẩm với `name` hoặc `description` chứa dấu nháy/payload SQL không phá hủy. | Request được validate hoặc lưu như dữ liệu văn bản; không thực thi SQL, không lỗi DB, không tác động sản phẩm khác. Cleanup dữ liệu test sau khi xong. |
| SEC-SQL-06 | FR-15 | Lưu snapshot `PRODUCT_B` không thuộc test. | PUT/DELETE sản phẩm với path `id` dạng SQL injection text. | Không thay đổi/xóa `PRODUCT_B` hay sản phẩm khác; response là lỗi input/không tìm thấy theo contract, không lộ lỗi DB. |
| SEC-SQL-07 | FR-08 | `USER_TOKEN` hợp lệ; ghi số order trước test. | Gửi `total_amount` hoặc `shipping_address` chứa chuỗi SQL injection không phá hủy, rồi đọc order history. | Input sai bị từ chối hoặc được xử lý như text an toàn; không có tác động đến order khác, không lộ lỗi SQL. |

### 5.2. IDOR (Insecure Direct Object Reference)

Thiết lập tối thiểu hai user thử nghiệm: User A có `USER_A_TOKEN`, User B có `USER_B_TOKEN`; `ORDER_A` thuộc User A. Không dùng account của người khác ngoài dữ liệu test được phép.

| ID | Mục tiêu | Tiền điều kiện | Thao tác | Kết quả mong đợi an toàn |
|---|---|---|---|---|
| SEC-IDOR-01 | FR-08 / order hỗ trợ | User A tạo `ORDER_A`; User B có token. | User B gọi `GET /api/orders/{ORDER_A}`. | Bị từ chối (401/403/404 không tiết lộ dữ liệu theo contract); không trả thông tin order của User A. Nếu trả order, đó là ứng viên IDOR nghiêm trọng. |
| SEC-IDOR-02 | FR-08 / order hỗ trợ | `ORDER_A` đang `pending`, thuộc User A. | User B gọi `PUT /api/orders/{ORDER_A}/cancel`. | Bị từ chối; trạng thái `ORDER_A` vẫn `pending`. Nếu trạng thái đổi là ứng viên IDOR. |
| SEC-IDOR-03 | FR-08 | User A và B đều có một hoặc nhiều order riêng. | Mỗi user gọi `GET /api/orders/my-orders`, so sánh danh sách. | Mỗi response chỉ có order của chính token đang dùng; không lộ `ORDER_A` cho User B. |
| SEC-IDOR-04 | FR-15 | `PRODUCT_A` do test tạo; lưu ID và snapshot. | Dùng ID không tồn tại, âm, 0 và ID của `PRODUCT_B` cho PUT/DELETE. | ID sai không tác động dữ liệu; thao tác trên `PRODUCT_B` chỉ được phép khi role admin được xác nhận. Nếu API public theo đặc tả, ghi rõ đây là kiểm tra phân quyền, không phải IDOR user ownership. |
| SEC-IDOR-05 | FR-05 | Có danh sách sản phẩm hợp lệ. | Thử query/path ID bất thường ở các endpoint sản phẩm, so sánh dữ liệu trước/sau. | API đọc chỉ trả dữ liệu công khai đúng contract và không cho input ID tác động đến dữ liệu. |

### 5.3. Phân quyền theo role (RBAC)

Chuẩn bị ba context: `ADMIN_TOKEN`, `USER_TOKEN` hợp lệ và request không có/không hợp lệ token. `FR-15` theo đặc tả là admin-only; FR-05 là public; FR-08 cần user đã xác thực.

| ID | Mục tiêu | Context | Thao tác | Kết quả mong đợi an toàn |
|---|---|---|---|---|
| SEC-RBAC-01 | FR-15 | Không có `Authorization`. | POST sản phẩm hợp lệ. | Bị từ chối 401/403; không có sản phẩm mới. Thành công là ứng viên bypass authentication. |
| SEC-RBAC-02 | FR-15 | `USER_TOKEN` hợp lệ. | POST sản phẩm hợp lệ. | Bị từ chối 403 (hoặc mã được contract quy định); không có sản phẩm mới. Thành công là ứng viên privilege escalation. |
| SEC-RBAC-03 | FR-15 | `USER_TOKEN` hợp lệ; `PRODUCT_A` tồn tại. | PUT rồi DELETE `PRODUCT_A`. | Cả hai bị từ chối; `PRODUCT_A` giữ nguyên. Không dùng request này cho cleanup. |
| SEC-RBAC-04 | FR-15 | `ADMIN_TOKEN` hợp lệ. | POST → PUT → DELETE một `PRODUCT_A` riêng. | Được phép; chỉ dữ liệu test thay đổi và cleanup hoàn tất. Đây là control case so sánh với SEC-RBAC-01 đến 03. |
| SEC-RBAC-05 | FR-15 | Authorization là token hỏng, hết hạn hoặc user token được sửa một ký tự. | POST/PUT/DELETE sản phẩm. | Bị từ chối; không thay đổi dữ liệu. Không cố tạo token giả. |
| SEC-RBAC-06 | FR-08 | Không token, token hỏng, `USER_TOKEN`, `ADMIN_TOKEN`. | Gọi checkout cùng một body hợp lệ (mỗi context một lần), kiểm tra order history. | Không token/token hỏng bị từ chối và không tạo order; token hợp lệ tạo order cho chính user tương ứng. |
| SEC-RBAC-07 | FR-05 | Không token, `USER_TOKEN`, `ADMIN_TOKEN`. | Gọi product listing/search cùng query. | Vì API public theo đặc tả, ba response chức năng phải tương đương; token không được làm lộ field/sản phẩm đặc quyền. |

### 5.4. Cách audit và báo bug bảo mật

1. Mỗi case phải có baseline, request đầy đủ (đã che token), response, trạng thái dữ liệu trước/sau và Newman evidence.
2. Với SQL injection, chỉ kết luận khi payload tạo hành vi khác baseline rõ rệt, lỗi database hoặc truy xuất dữ liệu vượt phạm vi.
3. Với IDOR/RBAC, cần chứng minh token/context không được phép đã đọc hoặc thay đổi dữ liệu không thuộc quyền của nó.
4. Không commit token, mật khẩu, database thật hoặc payload có dữ liệu nhạy cảm vào GitHub công khai.

## 6. Kịch bản kiểm tra schema JSON response

### 6.1. Giới hạn của đặc tả và schema kiểm thử

`api_specification.md` công bố endpoint và request body cho FR-05, FR-08, FR-15, nhưng **không mô tả đầy đủ schema response** của các chức năng này. Vì yêu cầu HW06 đòi response khớp đặc tả, mọi schema suy ra từ mã nguồn/response chạy thử phải được đánh dấu là **schema suy luận, cần audit**, không được trình bày như nội dung đã có trong đặc tả.

| Endpoint | Schema response được công bố trong đặc tả | Schema dùng để kiểm thử | Trạng thái audit |
|---|---|---|---|
| `GET /api/products` | Không có | Mảng JSON; mỗi product dự kiến có `id`, `name`, `price`, `description`, `imageUrl`, `category_id` | `INCOMPLETE`: suy ra từ bảng products/mã nguồn |
| `POST /api/checkout` | Không có | Success: object `{message: string, orderId: positive integer}` | `INCOMPLETE`: suy ra từ mã nguồn |
| `POST /api/products` | Không có | Success: object `{message: string, id: positive integer}` | `INCOMPLETE`: suy ra từ mã nguồn |
| `PUT /api/products/:id` | Không có | Success: object `{message: string}` | `INCOMPLETE`: suy ra từ mã nguồn |
| `DELETE /api/products/:id` | Không có | Success: object `{message: string}` | `INCOMPLETE`: suy ra từ mã nguồn |
| Endpoint có xác thực | Không có | Error: object `{error: string}` cho 401/403 theo middleware | `INCOMPLETE`: suy ra từ mã nguồn |

Trong workbook, tách hai kết luận: (1) **schema thực tế có khớp schema suy luận không**; (2) **đặc tả có đủ để yêu cầu exact schema không**. Thiếu schema trong đặc tả là contract gap, không tự động là lỗi implementation.

### 6.2. Schema JSON đề xuất để audit

```json
// Product item (schema suy luận)
{
  "id": "integer > 0",
  "name": "string",
  "price": "number",
  "description": "string | null",
  "imageUrl": "string | null",
  "category_id": "integer | null"
}
```

```json
// Response thành công checkout (schema suy luận)
{ "message": "string", "orderId": "integer > 0" }

// Response thành công tạo sản phẩm (schema suy luận)
{ "message": "string", "id": "integer > 0" }

// Response lỗi xác thực (schema suy luận)
{ "error": "string" }
```

Khi đặc tả được cập nhật OpenAPI/schema chính thức, thay các schema suy luận bằng schema chính thức và kiểm tra cả field thừa (`additionalProperties: false`) nếu đặc tả yêu cầu response “exact”.

### 6.3. Test case Schema Validation

| ID | Endpoint / điều kiện | Thao tác | Assertion schema JSON | Kết quả mong đợi |
|---|---|---|---|---|
| SCH-FR05-01 | `GET /api/products` | Gọi không query. | HTTP 200; `Content-Type` là JSON; root là array; mọi item có đủ field/type của Product item schema suy luận. | Response khớp schema suy luận hoặc ghi rõ field/type lệch. |
| SCH-FR05-02 | `GET /api/products?search={tên hợp lệ}` | Tìm kiếm có kết quả. | Cùng schema array/item như SCH-FR05-01; mọi `name` là string. | Schema không đổi giữa list và search. |
| SCH-FR05-03 | `GET /api/products?search={không tồn tại}` | Tìm kiếm không có kết quả. | Root là array JSON rỗng, không phải `null`, object hay HTML. | `[]` hoặc hành vi chính thức khác đã được ghi nhận. |
| SCH-FR05-04 | Search input bất thường | Gửi ký tự nháy/payload SQL không phá hủy. | Nếu endpoint báo lỗi, response vẫn phải theo schema lỗi JSON đã công bố/suy luận; không nhận HTML/stack trace. | Không lộ cấu trúc DB; sai Content-Type/body là candidate lỗi API contract sau audit. |
| SCH-FR08-01 | `POST /api/checkout`, `USER_TOKEN` hợp lệ | Gửi body hợp lệ. | HTTP success; root là object; có đúng/ít nhất `message: string`, `orderId: integer > 0`; không có `error`. | Khớp schema checkout success suy luận. |
| SCH-FR08-02 | `POST /api/checkout`, không token | Gửi body hợp lệ. | HTTP 401; root object có `error: string`; không có `orderId`; Content-Type JSON. | Khớp schema lỗi xác thực suy luận. |
| SCH-FR08-03 | `POST /api/checkout`, token sai/hết hạn | Gửi body hợp lệ. | HTTP 403; root object có `error: string`; không có `orderId`. | Khớp schema lỗi xác thực suy luận. |
| SCH-FR08-04 | `POST /api/checkout`, body sai | Bỏ `shipping_address` hoặc gửi `total_amount` sai kiểu. | Nếu bị từ chối: object JSON `{error: string}`; nếu được nhận: success schema và hậu kiểm order. | Ghi nhận hành vi; nếu schema success cho dữ liệu sai, điều tra validation nghiệp vụ riêng. |
| SCH-FR15-01 | `POST /api/products`, `ADMIN_TOKEN` | Tạo `PRODUCT_A` body hợp lệ. | Success object có `message: string`, `id: integer > 0`; không có `error`; ID trả về dùng được để GET/list. | Khớp schema create success suy luận. |
| SCH-FR15-02 | `PUT /api/products/{PRODUCT_A}`, `ADMIN_TOKEN` | Cập nhật body hợp lệ. | Success root object có `message: string`; không có `id`/field bất ngờ nếu contract chính thức quy định exact shape. | Khớp schema update success suy luận. |
| SCH-FR15-03 | `DELETE /api/products/{PRODUCT_A}`, `ADMIN_TOKEN` | Xóa sản phẩm test. | Success root object có `message: string`; không có `error`; hậu kiểm sản phẩm không còn. | Khớp schema delete success suy luận. |
| SCH-FR15-04 | FR-15 không token/user token | POST, PUT, DELETE riêng từng request. | Theo đặc tả admin-only: response phải là JSON error `{error: string}` và không có `id`/success message. | Nếu response success, đánh dấu sai cả phân quyền lẫn schema error mong đợi. |
| SCH-FR15-05 | FR-15 ID/path hoặc body sai | Dùng ID không tồn tại hoặc field sai kiểu. | Response không phải HTML/plain text; nếu error có `{error: string}`; không có stack trace/SQL details. | Ghi nhận lệch schema và/hoặc validation để audit. |
| SCH-ORD-01 | `GET /api/orders/my-orders`, `USER_TOKEN` | Đọc danh sách order của chính user. | Root array; mỗi order có `id`, `user_id`, `total_amount`, `status`, `shipping_address`, `created_at` với type phù hợp dữ liệu thực tế. | Schema hỗ trợ kiểm tra hậu điều kiện checkout, được đánh dấu suy luận. |
| SCH-ORD-02 | `GET /api/orders/{id}` không tồn tại hoặc không được phép | Gọi endpoint hỗ trợ order. | Error response phải là JSON object `{error: string}`; không trả HTML/stack trace. | Dùng làm kiểm tra contract/error handling hỗ trợ cho FR-08/IDOR. |

### 6.4. Postman assertion dùng lại

Đặt assertion sau ở phần **Tests** của request; chỉnh danh sách field nếu schema chính thức được cung cấp. Script không cần thư viện ngoài và kiểm tra cấu trúc cơ bản trước khi kiểm tra nghiệp vụ.

```javascript
const response = pm.response.json();

pm.test("Response có Content-Type JSON", () => {
  pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Schema response lỗi", () => {
  pm.expect(response).to.be.an("object");
  pm.expect(response).to.have.property("error").that.is.a("string");
});
```

Ví dụ cho `GET /api/products`:

```javascript
pm.test("Schema danh sách sản phẩm", () => {
  const data = pm.response.json();
  pm.expect(data).to.be.an("array");
  data.forEach((product) => {
    pm.expect(product).to.be.an("object");
    pm.expect(product.id).to.be.a("number");
    pm.expect(product.name).to.be.a("string");
    pm.expect(product.price).to.be.a("number");
    pm.expect(product).to.have.property("description");
    pm.expect(product).to.have.property("imageUrl");
    pm.expect(product).to.have.property("category_id");
  });
});
```

Ví dụ cho checkout thành công:

```javascript
pm.test("Schema checkout thành công", () => {
  const data = pm.response.json();
  pm.expect(data).to.be.an("object");
  pm.expect(data.message).to.be.a("string");
  pm.expect(data.orderId).to.be.a("number").and.to.be.above(0);
  pm.expect(data).not.to.have.property("error");
});
```

## 7. Ma trận audit test case

### 7.1. Audit (human review)

Mục này tổng hợp **95 test case do AI sinh ra** ở các phần 3.4, 4, 5 và 6. Đây là bản để audit; chưa có case nào được xác nhận là đúng hoặc đã chạy.

Quy ước dán nhãn:

- `VALID (Đúng)`: test case phù hợp đặc tả/phạm vi, có tiền điều kiện và kết quả mong đợi kiểm chứng được.
- `INVALID (Sai)`: test case dựa trên giả định sai, endpoint/field không tồn tại, hoặc kỳ vọng mâu thuẫn đặc tả.
- `INCOMPLETE (Thiếu)`: ý tưởng phù hợp nhưng còn thiếu dữ liệu test, status code/schema chính thức, bước hậu kiểm hoặc tiền điều kiện.


| ID | Nhóm | Tóm tắt test AI đề xuất | Kỳ vọng/điểm cần audit | Nhãn Audit | Giải thích lý do và hiệu chỉnh |
|---|---|---|---|---|---|
| **DP-FR05-01** | Domain partition | `search` bị bỏ qua. | 200, JSON array danh sách sản phẩm. | **VALID** | Phù hợp quy tắc API public: khi tham số `search` trống, mặc định trả về toàn bộ danh sách sản phẩm. |
| **DP-FR05-02** | Domain partition | `search` tên chính xác. | Có sản phẩm khớp nếu seed data tồn tại. | **VALID** | Luồng tìm kiếm cơ bản khớp với đặc tả FR-05. |
| **DP-FR05-03** | Domain partition | `search` khớp một phần. | Kết quả khớp hành vi tìm kiếm công bố. | **VALID** | Đảm bảo tính năng tìm kiếm theo chuỗi con (substring) hoạt động bình thường. |
| **DP-FR05-04** | Domain partition | `search` khác hoa/thường. | Ghi nhận quy tắc phân biệt hoa thường. | **VALID** | Phân vùng biên kiểm thử tính nhạy cảm hoa/thường (Case Sensitivity) của DB query. |
| **DP-FR05-05** | Domain partition | `search` Unicode/tiếng Việt. | JSON hợp lệ, không lỗi encoding. | **VALID** | Phân vùng ký tự đặc biệt/tiếng Việt có dấu, kiểm tra encoding UTF-8. |
| **DP-FR05-06** | Domain partition | `search` URL-encoded an toàn. | Giải mã đúng và JSON hợp lệ. | **VALID** | Kiểm thử khả năng xử lý Query Parameter đã được URL-encode (%20, %26...). |
| **DP-FR05-07** | Domain partition | `search` rỗng. | Ghi nhận list toàn bộ hay mảng rỗng; không lỗi. | **VALID** | Phân vùng giá trị rỗng (`search=`), API cần xử lý an toàn không báo lỗi Server. |
| **DP-FR05-08** | Domain partition | `search` chỉ khoảng trắng. | JSON hợp lệ; ghi nhận quy tắc trim. | **VALID** | Phân vùng biên khoảng trắng, kiểm tra API có trim trước khi query hay không. |
| **DP-FR05-09** | Domain partition | `search` không khớp. | JSON array rỗng, không `null`/HTML. | **VALID** | Đảm bảo trả về mảng rỗng `[]` chuẩn RESTful khi không tìm thấy kết quả. |
| **DP-FR05-10** | Domain partition | `search` rất dài. | Xử lý an toàn, không 5xx/timeout bất thường. | **VALID** | Phân vùng độ dài chuỗi cực đại (Boundary/Stress) để chống tràn bộ nhớ hoặc crash query. |
| **DP-FR08-01** | Domain partition | `total_amount = 1`. | Thành công nếu không có minimum khác; ghi rõ quy tắc. | **VALID** | Biên dưới hợp lệ (Minimum boundary) cho giá trị đơn hàng. |
| **DP-FR08-02** | Domain partition | `total_amount` hợp lệ thông thường. | Tạo order, lưu đúng số tiền. | **VALID** | Happy path phân vùng số tiền hợp lệ nằm trong khoảng cho phép. |
| **DP-FR08-03** | Domain partition | `total_amount = 0`. | Mong đợi từ chối, không tạo order. | **VALID** | Phân vùng biên không hợp lệ (`total_amount <= 0`), API bắt buộc phải reject. |
| **DP-FR08-04** | Domain partition | `total_amount` âm. | Mong đợi từ chối, không tạo order. | **VALID** | Phân vùng số âm không hợp lệ cho giá trị giao dịch. |
| **DP-FR08-05** | Domain partition | `total_amount` thập phân. | Từ chối/xử lý theo quy tắc tiền tệ, không làm tròn âm thầm. | **VALID** | Kiểm thử kiểu dữ liệu số thực/thập phân đối với đơn vị tiền tệ VND/USD. |
| **DP-FR08-06** | Domain partition | `total_amount` thiếu/null/sai kiểu. | JSON error, không tạo order. | **INCOMPLETE** | **Thiếu thông tin:** Cần chỉ rõ HTTP Status trả về phải là `400 Bad Request` dạng JSON. |
| **DP-FR08-07** | Domain partition | `shipping_address` thông thường. | Thành công, lưu đúng địa chỉ. | **VALID** | Phân vùng chuỗi địa chỉ hợp lệ cho luồng Checkout. |
| **DP-FR08-08** | Domain partition | `shipping_address` Unicode. | Thành công, không lỗi encoding. | **VALID** | Kiểm thử địa chỉ chứa ký tự UTF-8 (tiếng Việt có dấu). |
| **DP-FR08-09** | Domain partition | `shipping_address` rỗng. | Mong đợi từ chối, không tạo order. | **VALID** | Phân vùng trường bắt buộc (Required field) bị bỏ rỗng. |
| **DP-FR08-10** | Domain partition | `shipping_address` chỉ khoảng trắng. | Mong đợi trim rồi từ chối. | **VALID** | Phân vùng chuỗi toàn khoảng trắng cho trường địa chỉ bắt buộc. |
| **DP-FR08-11** | Domain partition | `shipping_address` thiếu/null. | JSON error, không tạo order. | **INCOMPLETE** | **Thiếu thông tin:** Bổ sung kỳ vọng HTTP `400 Bad Request` và phản hồi dạng JSON error. |
| **DP-FR08-12** | Domain partition | `shipping_address` sai kiểu/rất dài. | Xử lý an toàn, không 5xx/không tạo order sai. | **VALID** | Kiểm thử robustness khi gửi sai type (e.g. number/array) hoặc chuỗi cực dài. |
| **DP-FR15-01** | Domain partition | `name` hợp lệ thông thường. | Admin tạo product, response có ID. | **VALID** | Happy path tạo sản phẩm với tên đúng quy cách. |
| **DP-FR15-02** | Domain partition | `name` Unicode/1 ký tự. | Lưu/đọc đúng encoding. | **VALID** | Phân vùng biên ký tự tối thiểu và ký tự đặc biệt tiếng Việt. |
| **DP-FR15-03** | Domain partition | `name` rỗng/chỉ khoảng trắng. | Mong đợi từ chối, không tạo sản phẩm. | **VALID** | Tên sản phẩm là bắt buộc, không chấp nhận chuỗi rỗng/space. |
| **DP-FR15-04** | Domain partition | `name` thiếu/null/sai kiểu. | Từ chối an toàn, không tạo sản phẩm. | **INCOMPLETE** | **Thiếu thông tin:** Cần khẳng định phải từ chối với HTTP Status `400 Bad Request`. |
| **DP-FR15-05** | Domain partition | `name` rất dài. | Từ chối theo giới hạn/lưu an toàn, không 5xx. | **VALID** | Phân vùng độ dài tên cực đại để tránh đệm dữ liệu DB (Data truncation). |
| **DP-FR15-06** | Domain partition | `price = 1`. | Thành công nếu áp dụng `price > 0`. | **VALID** | Phân vùng giá trị biên dương nhỏ nhất của giá sản phẩm. |
| **DP-FR15-07** | Domain partition | `price` hợp lệ thông thường. | Giá được lưu/đọc đúng. | **VALID** | Phân vùng giá trị dương hợp lệ của sản phẩm. |
| **DP-FR15-08** | Domain partition | `price = 0`. | Theo `price > 0`: từ chối, không đổi dữ liệu. | **VALID** | Phân vùng giá trị bằng 0 (vi phạm quy tắc `price > 0`). |
| **DP-FR15-09** | Domain partition | `price` âm. | Theo `price > 0`: từ chối, không đổi dữ liệu. | **VALID** | Phân vùng số âm không hợp lệ cho giá sản phẩm. |
| **DP-FR15-10** | Domain partition | `price` thập phân. | Từ chối/xử lý theo quy tắc tiền tệ công bố. | **VALID** | Kiểm thử nhập số thực vào trường giá sản phẩm. |
| **DP-FR15-11** | Domain partition | `price` thiếu/null/sai kiểu. | Từ chối an toàn, không tạo/cập nhật dữ liệu sai. | **INCOMPLETE** | **Thiếu thông tin:** Cần bổ sung khẳng định trả về HTTP Status `400 Bad Request`. |
| **DP-FR15-12** | Domain partition | `description` rỗng/Unicode. | Xác nhận tùy chọn/bắt buộc; JSON hợp lệ. | **VALID** | Phân vùng dữ liệu mô tả sản phẩm (Optional text field). |
| **DP-FR15-13** | Domain partition | `description` null/sai kiểu/rất dài. | Validate/lưu an toàn, không 5xx. | **VALID** | Phân vùng biên độ dài và sai kiểu dữ liệu cho mô tả. |
| **DP-FR15-14** | Domain partition | `imageUrl` HTTP/HTTPS hợp lệ. | Sản phẩm lưu đúng URL. | **VALID** | Phân vùng đường dẫn hình ảnh hợp lệ. |
| **DP-FR15-15** | Domain partition | `imageUrl` rỗng/sai định dạng. | Áp dụng chính sách URL, không tạo dữ liệu nguy hiểm. | **VALID** | Phân vùng định dạng URL không hợp lệ (Invalid URL format). |
| **DP-FR15-16** | Domain partition | `category_id` tồn tại. | Liên kết đúng category. | **VALID** | Kiểm thử khóa ngoại (Foreign key) đến danh mục hợp lệ. |
| **DP-FR15-17** | Domain partition | `category_id` 0/âm/không tồn tại. | Mong đợi từ chối, không tạo/cập nhật. | **VALID** | Phân vùng khóa ngoại không tồn tại hoặc không hợp lệ. |
| **DP-FR15-18** | Domain partition | `category_id` sai kiểu. | Từ chối an toàn, không tạo/cập nhật. | **INCOMPLETE** | **Thiếu thông tin:** Chỉ rõ HTTP `400 Bad Request` khi gửi sai kiểu dữ liệu (vd: string thay vì integer). |
| **DP-FR15-19** | Domain partition | Path `id` tồn tại. | PUT/DELETE chỉ tác động sản phẩm mục tiêu. | **VALID** | Kiểm thử đường dẫn tài nguyên tồn tại trên hệ thống. |
| **DP-FR15-20** | Domain partition | Path `id` không hợp lệ. | Không tìm thấy/từ chối, không đổi sản phẩm khác. | **VALID** | Phân vùng Path Parameter không đúng hoặc không tồn tại (mong đợi HTTP 404/400). |
| **ST-FR05-01** | State | Gọi product search hợp lệ hai lần liên tiếp. | Response ổn định; API đọc không tạo/sửa/xóa sản phẩm. | **VALID** | Kiểm thử tính idempotent & Safe Method của HTTP `GET`. |
| **ST-FR05-02** | State | Tìm sản phẩm không tồn tại. | Mảng rỗng/hành vi công bố; dữ liệu sản phẩm không đổi. | **VALID** | Đảm bảo truy vấn không tìm thấy kết quả không làm thay đổi state hệ thống. |
| **ST-FR05-03** | State | Search với input bất thường an toàn. | Server xử lý an toàn; không thay đổi dữ liệu. | **VALID** | Đảm bảo input lỗi ở API GET không ảnh hưởng tới CSDL. |
| **ST-FR05-04** | State | Tìm `PRODUCT_A`, cập nhật tên, tìm tên cũ/mới. | Tìm kiếm phản ánh đúng trạng thái sau update. | **VALID** | Đảm bảo chuyển giao trạng thái sau khi cập nhật dữ liệu (State Integration). |
| **ST-FR05-05** | State | Xóa `PRODUCT_A`, sau đó tìm theo ID/tên. | Sản phẩm đã xóa không còn xuất hiện. | **VALID** | Đảm bảo tính nhất quán trạng thái sau thao tác Xóa (Delete State Verification). |
| **ST-FR08-01** | State | Checkout hợp lệ với user token. | Order mới được tạo với `status = pending`. | **VALID** | Kiểm thử khởi tạo trạng thái ban đầu của đơn hàng. |
| **ST-FR08-02** | State | Đọc order vừa tạo hai lần. | Đọc không tự làm thay đổi order/status. | **VALID** | Đảm bảo thao tác xem đơn hàng không làm biến đổi trạng thái `pending`. |
| **ST-FR08-03** | State | Checkout không token/token sai. | Bị từ chối, không tạo order mới. | **VALID** | Đảm bảo thất bại xác thực không sinh ra đơn hàng rác trong DB. |
| **ST-FR08-04** | State | Checkout amount sai hoặc thiếu địa chỉ. | Bị từ chối, không tạo order mới. | **VALID** | Đảm bảo thất bại validation không lưu đơn hàng lỗi. |
| **ST-FR08-05** | State | Hủy `ORDER_A` đang pending. | `pending → canceled` nếu quy tắc công bố cho phép. | **INVALID** | **Ngoài phạm vi (Out of Scope):** Endpoint Hủy đơn hàng thuộc Pool D, không thuộc phạm vi 3 API được giao. |
| **ST-FR08-06** | State | Hủy lại order đã canceled. | Không chuyển trạng thái tiếp; từ chối/idempotent theo contract. | **INVALID** | **Ngoài phạm vi:** Phụ thuộc vào endpoint Cancel của Pool D. |
| **ST-FR08-07** | State | User B thử hủy/đọc `ORDER_A` của User A. | Không thay đổi/không thấy order của User A. | **INVALID** | **Ngoài phạm vi:** Hành vi hủy/xem chi tiết từng order thuộc Pool D. |
| **ST-FR15-01** | State | Admin tạo `PRODUCT_A`. | `không tồn tại → đã tạo`, ID/dữ liệu được đọc lại. | **VALID** | Chuyển giao trạng thái từ chưa tồn tại sang đã tạo mới. |
| **ST-FR15-02** | State | Admin cập nhật `PRODUCT_A`. | `đã tạo → đã cập nhật`; field thay đổi đúng. | **VALID** | Chuyển giao trạng thái cập nhật thông tin sản phẩm. |
| **ST-FR15-03** | State | Update `PRODUCT_A` với price sai. | Bị từ chối; snapshot dữ liệu không đổi. | **VALID** | Đảm bảo cập nhật thất bại thì dữ liệu cũ được giữ nguyên (Atomic rollback). |
| **ST-FR15-04** | State | User thường/không token thực hiện CRUD. | Bị từ chối; `PRODUCT_A` không đổi. | **VALID** | Đảm bảo vi phạm phân quyền không làm thay đổi trạng thái sản phẩm. |
| **ST-FR15-05** | State | Admin xóa `PRODUCT_A`. | `đã cập nhật → đã xóa`; không còn trong list/search. | **VALID** | Chuyển giao trạng thái xóa sản phẩm khỏi hệ thống. |
| **ST-FR15-06** | State | Xóa lại `PRODUCT_A` đã xóa. | Không xóa sản phẩm khác; 404/idempotent theo contract. | **VALID** | Thao tác xóa lại tài nguyên đã xóa (Idempotent Delete). |
| **ST-FR15-07** | State | PUT/DELETE bằng ID sai và kiểm tra `PRODUCT_B`. | Không làm đổi `PRODUCT_B`/dữ liệu khác. | **VALID** | Kiểm thử tính cô lập dữ liệu (Data Isolation) giữa các sản phẩm. |
| **SEC-SQL-01** | Security - SQLi | Search với payload boolean SQL injection URL-encoded. | Không trả dữ liệu không liên quan/lỗi DB. | **VALID** | Kiểm thử lỗ hổng SQLi dạng Boolean-based qua tham số Query. |
| **SEC-SQL-02** | Security - SQLi | Search với nháy đơn/nháy kép. | Không 5xx, stack trace hoặc lỗi database. | **VALID** | Kiểm thử escape ký tự đặc biệt phá vỡ cấu trúc SQL. |
| **SEC-SQL-03** | Security - SQLi | Search với SQL comment marker. | Không bỏ qua điều kiện tìm kiếm/trả toàn bộ sản phẩm. | **VALID** | Kiểm thử triệt tiêu truy vấn SQL qua các dấu comment (`--`, `/*`). |
| **SEC-SQL-04** | Security - SQLi | Search với wildcard `%` và `_`. | Hành vi khớp chính sách đã công bố/ghi contract gap. | **VALID** | Kiểm thử khai thác logic wildcard trong câu lệnh `LIKE`. |
| **SEC-SQL-05** | Security - SQLi | POST/PUT product text chứa ký tự SQL. | Lưu như text/validate; không thực thi SQL hay đổi sản phẩm khác. | **VALID** | Kiểm thử an toàn SQLi trong Request Body của thao tác Admin. |
| **SEC-SQL-06** | Security - SQLi | PUT/DELETE với path ID dạng SQL text. | Không đổi/xóa dữ liệu khác; không lộ lỗi DB. | **VALID** | Kiểm thử chèn mã SQL vào Path Parameter `id`. |
| **SEC-SQL-07** | Security - SQLi | Checkout fields chứa chuỗi SQL không phá hủy. | Xử lý an toàn; không tác động order khác/lộ lỗi SQL. | **VALID** | Kiểm thử chèn mã SQL vào body của Checkout API. |
| **SEC-IDOR-01** | Security - IDOR | User B đọc `ORDER_A` của User A qua endpoint detail. | Bị từ chối/không lộ dữ liệu. | **INCOMPLETE** | **Nhầm Endpoint:** Detail order thuộc Pool D. Cần sửa sang hậu kiểm thông qua API `POST /api/checkout` bằng tài khoản khác. |
| **SEC-IDOR-02** | Security - IDOR | User B hủy `ORDER_A` của User A. | Bị từ chối; status của `ORDER_A` không đổi. | **INVALID** | **Ngoài phạm vi:** Phụ thuộc vào endpoint Cancel order (Pool D). |
| **SEC-IDOR-03** | Security - IDOR | User A/B đọc `my-orders`. | Mỗi user chỉ thấy order của mình. | **VALID** | Kiểm thử cô lập dữ liệu ngang (Horizontal Privilege Escalation) ở danh sách đơn hàng. |
| **SEC-IDOR-04** | Security - IDOR | CRUD product với ID không tồn tại/ID sản phẩm khác. | Không tác động dữ liệu ngoài phạm vi quyền. | **VALID** | Kiểm thử tác động chéo tài nguyên khi sửa/xóa ID sản phẩm. |
| **SEC-IDOR-05** | Security - IDOR | Gửi query/path ID bất thường tới API product. | Input không được tác động dữ liệu; API đọc theo contract public. | **VALID** | Kiểm thử tính toàn vẹn tài nguyên công khai trước các tham số bất thường. |
| **SEC-RBAC-01** | Security - RBAC | Không token POST product. | Bị từ chối 401/403; không tạo sản phẩm. | **VALID** | Kiểm thử thiếu xác thực khi thực hiện thao tác Admin. |
| **SEC-RBAC-02** | Security - RBAC | User token POST product. | Bị từ chối; không tạo sản phẩm. | **VALID** | Kiểm thử leo thang đặc quyền từ Role User lên Admin. |
| **SEC-RBAC-03** | Security - RBAC | User token PUT/DELETE `PRODUCT_A`. | Bị từ chối; sản phẩm không đổi. | **VALID** | Kiểm thử phân quyền RBAC cho các thao tác sửa/xóa sản phẩm. |
| **SEC-RBAC-04** | Security - RBAC | Admin token thực hiện product CRUD. | Được phép; chỉ đổi dữ liệu test và cleanup hoàn tất. | **VALID** | Phân quyền hợp lệ (Positive RBAC check) cho Role Admin. |
| **SEC-RBAC-05** | Security - RBAC | Token hỏng/hết hạn/đã sửa thực hiện product CRUD. | Bị từ chối; không đổi dữ liệu. | **VALID** | Kiểm thử chống giả mạo token (JWT signature manipulation/expiration). |
| **SEC-RBAC-06** | Security - RBAC | Checkout với không token, token hỏng, user, admin. | Chỉ token hợp lệ tạo order cho đúng user. | **VALID** | Kiểm thử phân quyền và xác thực đa kịch bản cho API Checkout. |
| **SEC-RBAC-07** | Security - RBAC | List/search product với các token khác nhau. | API public có response chức năng tương đương, không lộ field đặc quyền. | **VALID** | Kiểm thử an toàn API Public không rò rỉ thông tin quản trị. |
| **SCH-FR05-01** | Schema | List product không query. | 200 JSON array; item có field/type Product schema suy luận. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** `api_specification.md` không công bố Schema Response chính thức; cấu trúc này do AI tự suy luận từ nguồn code[cite: 1]. |
| **SCH-FR05-02** | Schema | Search product có kết quả. | Cùng schema array/item như list. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Response schema do AI suy luận, chưa có tài liệu spec chính thức quy định[cite: 1]. |
| **SCH-FR05-03** | Schema | Search không có kết quả. | JSON array rỗng, không `null`/object/HTML. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Cấu trúc JSON khi tìm kiếm không ra kết quả chưa được chuẩn hóa trong spec[cite: 1]. |
| **SCH-FR05-04** | Schema | Search input bất thường. | Error (nếu có) là JSON error, không HTML/stack trace. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Cấu trúc JSON Error chưa được công bố trong tài liệu API spec[cite: 1]. |
| **SCH-FR08-01** | Schema | Checkout hợp lệ. | Object success có `message: string`, `orderId: integer > 0`. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Spec không quy định rõ cấu trúc JSON trả về khi Checkout thành công[cite: 1]. |
| **SCH-FR08-02** | Schema | Checkout không token. | 401 JSON `{error: string}`, không `orderId`. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Spec thiếu Schema chuẩn cho các phản hồi lỗi Auth[cite: 1]. |
| **SCH-FR08-03** | Schema | Checkout token sai/hết hạn. | 403 JSON `{error: string}`, không `orderId`. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Chưa có tài liệu đặc tả cấu trúc JSON Error cho HTTP 403[cite: 1]. |
| **SCH-FR08-04** | Schema | Checkout body sai. | Nếu reject: JSON error; nếu accept: success schema + hậu kiểm order. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Toàn bộ cấu trúc response body sai đều dựa trên suy luận từ mã nguồn[cite: 1]. |
| **SCH-FR15-01** | Schema | Admin tạo product hợp lệ. | Object `message: string`, `id: integer > 0`, không `error`. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Đặc tả không công bố Schema chi tiết cho response tạo mới sản phẩm[cite: 1]. |
| **SCH-FR15-02** | Schema | Admin update `PRODUCT_A`. | Object success có `message: string`. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Không có Schema chính thức cho response cập nhật sản phẩm[cite: 1]. |
| **SCH-FR15-03** | Schema | Admin delete `PRODUCT_A`. | Object success có `message: string`; hậu kiểm đã xóa. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Cấu trúc response xóa sản phẩm dựa hoàn toàn vào code suy luận[cite: 1]. |
| **SCH-FR15-04** | Schema | FR-15 không token/user token. | Theo đặc tả: JSON error, không `id`/success message. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Không có quy định chính thức về Schema báo lỗi phân quyền[cite: 1]. |
| **SCH-FR15-05** | Schema | FR-15 ID/path/body sai. | JSON error, không HTML/plain-text/stack trace. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Thiếu định nghĩa Schema cho các mã lỗi HTTP 400/404[cite: 1]. |
| **SCH-ORD-01** | Schema | User đọc `my-orders`. | JSON array; order item có field/type theo schema suy luận. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Cấu trúc mảng lịch sử đơn hàng không có đặc tả Schema đi kèm[cite: 1]. |
| **SCH-ORD-02** | Schema | Đọc order không tồn tại/không quyền. | JSON object `{error: string}`, không HTML/stack trace. | **INCOMPLETE** | **Thiếu căn cứ trong đặc tả:** Không có đặc tả chính thức cho Schema báo lỗi truy cập đơn hàng[cite: 1]. |

Mục tiêu tối thiểu của đề vẫn là **35 test do AI tạo + 5 test tự bổ sung = 40 test hoàn chỉnh** cho mỗi mục tiêu. Bảng này là danh sách khởi tạo; sau audit có thể tách, sửa, loại hoặc bổ sung test case và phải lưu lý do cho từng thay đổi.

### 7.2. Các Test Cases tự bổ sung (Human Extension)

| ID | Chức năng (FR) | Tên kịch bản & Phân vùng kiểm thử | Thao tác (Input / Request) | Kết quả mong đợi (Expected Output) | Lý do AI bỏ sót |
|---|---|---|---|---|---|
| **EXT-01** | **FR-05** | Special Characters & XSS Encoding in Search Query | Gọi `GET /api/products?search=%3Cscript%3Ealert(1)%3C/script%3E` | HTTP Status `200 OK`, `Content-Type: application/json`. Trả về mảng JSON rỗng `[]` hoặc danh sách không chứa mã script thực thi. | AI chỉ tập trung tạo kịch bản SQL Injection, bỏ qua kịch bản Reflected XSS qua Query String. |
| **EXT-02** | **FR-05** | HTTP Parameter Pollution (HPP) | Gọi `GET /api/products?search=phone&search=laptop` (truyền 2 tham số search trùng tên) | HTTP Status `200 OK`. Server xử lý an toàn (lấy tham số đầu/cuối hoặc gộp lại), không bị crash ứng dụng (`500 Server Error`). | AI chỉ sinh kịch bản với đúng 1 tham số duy nhất theo đúng cấu trúc mẫu, không thử kịch bản lặp lại tham số. |
| **EXT-03** | **FR-08** | Mass Assignment / Extra Fields Injection (Over-posting) | Gọi `POST /api/checkout` kèm body chứa trường định danh trạng thái: `{"total_amount": 100000, "shipping_address": "HCM", "is_paid": true, "status": "delivered"}` (kèm `USER_TOKEN`) | HTTP Status `200 OK` hoặc `201 Created`. Đơn hàng tạo ra trong CSDL bắt buộc giữ trạng thái mặc định `pending` và `is_paid = false`, không bị ghi đè thuộc tính nhạy cảm. | AI chỉ kiểm thử các trường có sẵn trong spec, bỏ qua kịch bản cố tình chèn thêm các thuộc tính quản trị nhạy cảm vào payload client. |
| **EXT-04** | **FR-15** | Cross-Site Scripting (XSS) in Product Payload | Gọi `POST /api/products` với body chứa payload: `{"name": "<img src=x onerror=alert(1)>", "price": 50000, "category_id": 1}` (kèm `ADMIN_TOKEN`) | HTTP Status `200 OK` hoặc `201 Created`. Dữ liệu được Encode/Sanitize an toàn, Header trả về `Content-Type: application/json`, không làm lỗi giao diện hiển thị. | AI tập trung kiểm thử phân vùng giá trị numeric (`price > 0`) và SQL Injection, không chủ động thử nghiệm XSS trên các trường văn bản. |
| **EXT-05** | **FR-15** | Unsupported Media Type Header Enforcement | Gọi `POST /api/products` với Header `Content-Type: text/plain` (truyền raw text thay vì JSON) kèm `ADMIN_TOKEN` | HTTP Status `415 Unsupported Media Type` hoặc `400 Bad Request`. Server từ chối xử lý và trả về JSON báo lỗi cấu trúc request. | AI mặc định luôn giả định Client gửi đúng Header `Content-Type: application/json`, không kiểm thử ranh giới Header HTTP. |


## 8. Thực thi và bằng chứng

### Tính năng Postman đã dùng

- [ ] Workspace và Collection
- [ ] Biến Collection/Environment
- [ ] Pre-request script cấp Collection thêm `X-Student-Id: 22127315`
- [ ] Test và assertion
- [ ] Chạy data-driven với data file
- [ ] Báo cáo Newman HTML
- [ ] Khác: _chỉ ghi khi thực tế đã dùng_

### Tổng kết Newman

| Mục tiêu | AI tạo | Tự thêm | Đã chạy | Pass | Fail | Báo cáo Newman |
|---|---:|---:|---:|---:|---:|---|
| FR-05 | 0 | 0 | 4 request đại diện | 11 | 1 | `hw06/newman-reports/HW06_Newman_Report_22127315.html` |
| FR-08 | 0 | 0 | 4 request đại diện | 9 | 0 | `hw06/newman-reports/HW06_Newman_Report_22127315.html` |
| FR-15 | 0 | 0 | 7 request đại diện | 9 | 1 | `hw06/newman-reports/HW06_Newman_Report_22127315.html` |

### Kết quả chạy Newman - 2026-08-30 03:43 (Windows host)

- Newman thực thi trực tiếp: `C:\Users\Uyen Nhu\AppData\Roaming\npm\newman.cmd` (v6.2.2), target `http://127.0.0.1:3000`; Collection-level pre-request script đã thêm `X-Student-Id: 22127315` cho **15/15 request**.
- Tổng cộng: **15 request**, **31 assertions**, **29 pass**, **2 fail**.
- Hai assertion fail cần tái hiện/audit: `SEC-SQL-01` (payload search trả số sản phẩm bằng baseline) và `SEC-RBAC-01` (POST product không token trả HTTP 200 thay vì 401/403).
- Đây mới là **lần chạy đại diện (pilot run)** của Collection hiện tại, không phải xác nhận đã chạy hết 95 test case trong mục 7.1. Không dùng các số liệu này để khai báo hoàn thành toàn bộ bài.
- Evidence: JSON nguồn `hw06/newman-reports/HW06_Newman_Run_22127315.json`; HTML `hw06/newman-reports/HW06_Newman_Report_22127315.html`.

## 9. Báo cáo lỗi

| Bug ID | Tiêu đề | Mục tiêu | Tái hiện/bằng chứng | GitHub Issue |
|---|---|---|---|---|
| _Chờ thực hiện_ |  |  |  |  |

## 10. CI/CD

Workflow đã được tạo tại `.github/workflows/hw06-api-tests.yml`; báo cáo chi tiết ở `hw06/CI_CD_Report.md`. Smoke suite pass đã được xác minh cục bộ bằng Newman host: 3 request, 6 assertions, 0 fail. Link/screenshot GitHub Actions chỉ được bổ sung sau khi workflow được push và chạy trên GitHub.

| Tình huống | Commit | Workflow run | Ảnh chụp | Kết quả |
|---|---|---|---|---|
| Tất cả API test pass | _Chờ thực hiện_ | _Chờ thực hiện_ | _Chờ thực hiện_ | _Chờ thực hiện_ |
| Cố ý để một test fail | _Chờ thực hiện_ | _Chờ thực hiện_ | _Chờ thực hiện_ | _Chờ thực hiện_ |

## 11. Thiết kế AI-driven test generator

Bổ sung sơ đồ **tự vẽ** (`.png` hoặc Mermaid) và pseudocode. Thiết kế cần đọc endpoint/tham số/bảo mật, suy ra phân vùng và test âm/bảo mật/schema, loại trùng lặp, rồi xuất bảng test case để con người review.

## 12. Checklist nộp bài

- [ ] Báo cáo chính dạng Markdown và PDF
- [ ] Link GitHub repository công khai
- [ ] Postman Collection và Newman HTML report
- [ ] Excel test cases và test summary
- [ ] Báo cáo CI/CD, screenshots và 2 run links
- [ ] Bug report và screenshots GitHub Issues
- [ ] Sơ đồ generator tự vẽ và pseudocode
- [ ] `AI_Audit_Report.md`, `AI_Critique.md` và bản PDF
- [ ] Git commit log dạng text
- [ ] File ZIP cuối: `22127315_HW06_AI_API_<grade>.zip`
