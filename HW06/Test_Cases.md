Quy ước: `200/201` là phản hồi thành công tùy implementation; dữ liệu `{valid...}` là dữ liệu hợp lệ đã tạo sẵn, `USER_TOKEN` là token user thường và `ADMIN_TOKEN` là token admin. Các test schema xác nhận cả mã HTTP, kiểu dữ liệu, trường bắt buộc và không có trường ngoài hợp đồng.

| Test Case ID | Description | Payload/Steps | Expected Result |
|---|---|---|---|
| TC-001 | Đăng ký với dữ liệu hợp lệ | `POST /api/register` với `name="Nguyen Van A"`, email hợp lệ, password `Password123!` | `200/201`; tạo đúng một user; response có `message` và `id` là number. |
| TC-002 | Partition name rỗng/thiếu | Gửi `{ "email":"new@test.com", "password":"Password123!" }`, sau đó `name:""` | `400`; báo thiếu hoặc không hợp lệ; không tạo user. |
| TC-003 | Partition email | Lần lượt email thiếu `@`, rỗng, thiếu field, và email hợp lệ có dấu `+` | Chỉ email đúng format được chấp nhận; lỗi trả `4xx` theo schema; không lộ SQL/database error. |
| TC-004 | Partition password | Lần lượt thiếu, rỗng, quá ngắn, và `Password123!` | Password không đạt policy bị `400`; password hợp lệ đăng ký thành công. |
| TC-005 | Email trùng | Đăng ký lại email đã tồn tại | `409/400`; không tạo bản ghi thứ hai. |
| TC-006 | Schema register chống field thừa | Gửi payload hợp lệ kèm `role:"admin"`, `id:99` | `400` hoặc bỏ qua field thừa; user không bị gán admin và ID không bị client ghi đè. |
| TC-007 | Đăng nhập thành công | `POST /api/login` với email/password hợp lệ | `200`; `token` là non-empty string JWT; `user` đúng schema và đúng tài khoản. |
| TC-008 | Domain partition login credentials | Lần lượt email không tồn tại, password sai, email rỗng, password rỗng | `401/400`; thông báo không phân biệt user tồn tại hay không; không cấp token. |
| TC-009 | Schema login | Gửi array/string thay cho object; thêm field `role:"admin"` | `400`; response lỗi theo schema; không thay đổi quyền hoặc dữ liệu user. |
| TC-010 | Lấy OTP cho email tồn tại | `POST /api/forgot-password` với email hợp lệ đã đăng ký | `200`; `resetToken` là string/mã đúng độ dài và có thời hạn; không trả password. |
| TC-011 | Partition forgot-password email | Email thiếu, sai format, không tồn tại | Input sai trả `400`; email không tồn tại trả thông báo chung, không tiết lộ account existence. |
| TC-012 | Reset password thành công | Dùng email, `resetToken` còn hạn, `newPassword:"NewPassword123!"` | `200`; đổi password; password cũ bị từ chối và password mới đăng nhập được. |
| TC-013 | Partition reset token | Dùng token sai, rỗng, hết hạn, đã dùng lại | `400/401`; không đổi password; token dùng một lần. |
| TC-014 | Schema reset-password | Thiếu từng field; `newPassword` là number/null; thêm `role` | `400`; không reset; field ngoài không tạo quyền hay dữ liệu ngoài schema. |
| TC-015 | Truy cập profile không token | `GET /api/users/me` không có `Authorization` | `401`; không trả dữ liệu cá nhân. |
| TC-016 | Authorization header partition | Dùng `Bearer` rỗng, token malformed, token hết hạn, token hợp lệ | Ba trường hợp đầu `401`; token hợp lệ trả profile đúng user. |
| TC-017 | Cập nhật profile hợp lệ | `PUT /api/users/me` với name, shipping_address, phone hợp lệ | `200`; chỉ cập nhật 3 field cho phép; response đúng schema. |
| TC-018 | Partition profile fields | Lần lượt name/address/phone rỗng, quá dài, phone chứa chữ, phone hợp lệ | Giá trị không hợp lệ `400`; giá trị biên hợp lệ được lưu mà không cắt/tràn dữ liệu. |
| TC-019 | Profile mass assignment | Gửi thêm `id`, `email`, `password`, `role:"admin"` | `400` hoặc ignore; email, ID, password, role không bị thay đổi. |
| TC-020 | Tìm kiếm sản phẩm | `GET /api/products?search=`; search là keyword, chuỗi Unicode, chuỗi rất dài | `200`; response là array; empty trả toàn bộ hoặc array rỗng theo contract, không lỗi server. |
| TC-021 | SQL injection search | `GET /api/products?search=' OR 1=1 --` và `search="; DROP TABLE products;--` | `400` hoặc kết quả literal an toàn; không trả toàn bộ dữ liệu bất thường, không lỗi SQL, DB vẫn hoạt động. |
| TC-022 | Product ID partitions | `GET /api/products/:id` với ID hợp lệ, `0`, âm, chữ, decimal, rất lớn | ID hợp lệ trả object đúng schema; ID còn lại trả `400/404`, không stack trace. |
| TC-023 | Product admin authorization | User thường gọi POST/PUT/DELETE product với payload hợp lệ | `403`; không tạo/sửa/xóa sản phẩm. |
| TC-024 | Product schema/partition | Admin gửi thiếu name, price âm/0/string, category_id không tồn tại, imageUrl sai format | `400`; chỉ payload có name, price number hợp lệ, category tồn tại và URL hợp lệ được lưu. |
| TC-025 | Product IDOR | `USER_TOKEN` đọc product ID hợp lệ; admin sửa product ID không thuộc request context | Product công khai chỉ đọc được theo contract; thao tác ghi của user `403`; admin chỉ sửa đúng resource được chỉ định, không có cross-tenant access. |
| TC-026 | Category CRUD schema | Admin tạo category với name hợp lệ, rỗng, trùng, number; sửa bằng ID invalid | Chỉ name string không rỗng được chấp nhận; duplicate/invalid ID trả `4xx`; response đúng schema. |
| TC-027 | Category role escalation | User thường gọi POST/PUT/DELETE `/api/categories` | `403`; không thay đổi category. |
| TC-028 | Cart token and item ID | Không token; `id` là 0/âm/string/nonexistent; item hợp lệ | Không token `401`; ID invalid/nonexistent `400/404`; item hợp lệ thêm thành công. |
| TC-029 | Cart item schema partitions | Gửi thiếu name/price/quantity; price âm/string; quantity 0, âm, decimal, string | `400` cho schema/domain invalid; quantity nguyên dương và price number hợp lệ được chấp nhận. |
| TC-030 | Cart ownership IDOR | User A thêm item, User B gọi `GET /api/cart` và thử sửa/xóa item của A | B chỉ thấy cart của B; truy cập item của A `403/404`; dữ liệu A không đổi. |
| TC-031 | Checkout amount partition | Có cart hợp lệ; gửi `total_amount` thiếu, 0, âm, string, decimal và amount hợp lệ | Invalid trả `400`; amount hợp lệ phải khớp server calculation/cart, không tin giá trị client. |
| TC-032 | Checkout address schema | `shipping_address` thiếu, rỗng, quá dài, có script, và địa chỉ hợp lệ | Invalid `400`; script không thực thi/lưu unsafe; địa chỉ hợp lệ tạo order `pending`. |
| TC-033 | Checkout replay/idempotency | Gửi lại cùng request checkout hai lần hoặc request với cart rỗng | Không tạo duplicate order khi replay theo policy; cart rỗng bị từ chối `400`; dữ liệu nhất quán. |
| TC-034 | Order list/detail authorization | User A gọi my-orders và detail ID của User B | Danh sách chỉ có order A; detail order B trả `403/404`, không rò rỉ schema/dữ liệu. |
| TC-035 | Cancel valid transition | Tạo order `pending`, gọi `PUT /api/orders/:id/cancel` bằng chủ order | `200`; trạng thái chuyển `pending -> canceled`; không thể checkout tiếp từ order đó. |
| TC-036 | Cancel invalid transitions | Với order `confirmed`, `shipping`, `delivered`, `canceled`, gọi cancel | Chỉ trạng thái chưa giao được hủy theo rule; delivered/canceled không đổi và trả `409/400`. |
| TC-037 | Admin order state transitions | Admin lần lượt `pending -> confirmed -> shipping -> delivered` | Mỗi bước hợp lệ cập nhật đúng trạng thái; response có status thuộc enum và audit fields nếu contract hỗ trợ. |
| TC-038 | Admin invalid state transition | Thử `delivered -> pending`, `canceled -> shipping`, và status `unknown` | `400/409`; trạng thái cũ giữ nguyên; không tạo trạng thái ngoài enum. |
| TC-039 | Coupon code partitions | Apply code đúng, lowercase/whitespace, rỗng, không tồn tại, hết hạn | Chỉ code hợp lệ theo policy áp dụng được; invalid trả `4xx`; không phân biệt hoặc làm lộ coupon nội bộ ngoài contract. |
| TC-040 | Coupon amount and user_id partitions | `total_amount` âm/0/string, dưới/đúng/trên min order; user_id thiếu/0/âm/string/hợp lệ | Schema/domain invalid `400`; discount chỉ áp dụng khi đạt min; user_id phải là integer hợp lệ và được kiểm tra quyền sở hữu. |
| TC-041 | Coupon calculation schema | Áp dụng coupon percent và fixed với amount hợp lệ | `200`; `discount_amount` và `final_amount` là number, discount không âm, final không âm và khớp phép tính server. |
| TC-042 | Coupon abuse and IDOR | User A gửi `user_id` của B, gọi coupon vượt `max_uses_per_user`, hoặc replay nhiều lần | Server dùng identity từ token/kiểm tra ownership; vượt giới hạn bị từ chối; không tăng usage sai. |
| TC-043 | Admin-only endpoint without role | User thường gọi GET coupons, admin users/orders, import, coupon CRUD | Tất cả trả `403`; không có side effect và không tiết lộ dữ liệu admin. |
| TC-044 | Admin role escalation | User gọi endpoint admin với JWT payload tự sửa `role:"admin"`, header giả, hoặc token của user khác | `401/403`; server xác thực chữ ký và role từ nguồn tin cậy; không cấp quyền admin. |
| TC-045 | Admin user/order IDOR | Admin gọi delete user ID khác, order status ID không tồn tại/không hợp lệ; user gọi các endpoint này | User `403`; admin ID invalid `400/404`; admin hợp lệ chỉ thay đổi resource được chỉ định. |
| TC-046 | Import products array partitions | Admin gửi thiếu `products`, null/object/empty array, array có một product hợp lệ | Payload không phải array hoặc rỗng `400`; array hợp lệ import thành công và trả count đúng kiểu number. |
| TC-047 | Import nested product schema | Trong array, thiếu name/price/category_id; price âm/string; category không tồn tại; có field `role` | Import bị reject theo policy (toàn bộ hoặc item lỗi được báo rõ); không mass-assign field thừa; không tạo item lỗi. |
| TC-048 | SQL injection on write fields | Gửi SQLi vào name, description, category name, coupon code và shipping_address | Input được xử lý như literal hoặc bị `400`; không thực thi SQL, không thay đổi bảng/dữ liệu ngoài request. |
| TC-049 | Coupon admin schema | Admin tạo coupon với code rỗng/trùng, type ngoài `percent`, discount âm/>100, min âm, date sai, max uses 0 | `400`; chỉ enum/type và range hợp lệ được lưu; response không chứa secret/internal SQL detail. |
| TC-050 | Coupon delete state and authorization | Admin xóa coupon ID hợp lệ, đã xóa, âm/chữ; user thử xóa | Admin hợp lệ xóa đúng một coupon; lần hai/ID invalid `404/400`; user `403`; coupon không còn được áp dụng. |
