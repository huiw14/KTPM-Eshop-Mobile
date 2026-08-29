# Báo cáo CI/CD - HW06 API Testing

## Cấu hình pipeline

Workflow: `.github/workflows/hw06-api-tests.yml`.

Pipeline chạy khi push thay đổi liên quan hoặc chạy thủ công từ GitHub Actions. Các bước chính:

1. Checkout mã nguồn và cài dependencies backend bằng `npm ci`.
2. Khởi động EShop backend trên `http://127.0.0.1:3000`.
3. Chạy Newman bằng `npx --package=newman` trong GitHub-hosted Ubuntu runner.
4. Collection-level pre-request script thêm `X-Student-Id: 22127315` vào mọi request.
5. Lưu Newman JSON và backend log làm GitHub Actions artifact, kể cả khi run fail.

## Hai lần chạy bắt buộc

### Run 1 - Tất cả test pass

- Commit: _Chưa push_
- Workflow run link: _Chưa có_
- Screenshot: _Chụp trang GitHub Actions sau khi run pass_
- Collection: `hw06/postman/ESHOP_HW06_CI_Passing.postman_collection.json`
- Cách chạy: push một commit có message bình thường, ví dụ `ci: verify HW06 API tests passing`. Hoặc sau khi workflow đã có trên default branch: **Actions → HW06 API Tests → Run workflow → suite: passing**.

### Run 2 - Cố ý có một test fail

- Commit: _Chưa push_
- Workflow run link: _Chưa có_
- Screenshot: _Chụp trang GitHub Actions sau khi run fail_
- Collection: `hw06/postman/ESHOP_HW06_CI_Failing_Demo.postman_collection.json`
- Cách chạy không cần nút Run workflow: tạo/push một commit có đúng marker `[ci-fail-demo]` trong commit message, ví dụ `ci: [ci-fail-demo] demonstrate one failing test`. Hoặc sau khi workflow đã có trên default branch: **Actions → HW06 API Tests → Run workflow → suite: failing-demo**. Test duy nhất cố ý kỳ vọng HTTP `201` trong khi `GET /api/products` thực tế trả `200`; không dùng case này để báo lỗi SUT.

## Lưu ý trung thực

Collection `ESHOP_HW06_CI_Passing` là smoke suite ổn định cho minh chứng pipeline pass. Collection `ESHOP_HW06_CI_Failing_Demo` chỉ phục vụ yêu cầu minh chứng pipeline fail. Bộ test audit đầy đủ và các security failure thực tế vẫn được duy trì riêng trong `ESHOP_HW06_22127315.postman_collection.json` và phải được audit trước khi coi là kết quả cuối.
