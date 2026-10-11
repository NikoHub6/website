# 网站发布设置

修改 content.txt 即可修改网站文字，第一行是标题，空行分隔段落。

Cloudflare Pages 连接本仓库，设置如下：

- Production branch: main
- Framework preset: None
- Build command: node build.mjs
- Build output directory: public
- Root directory: 保持默认

每次提交到 main 后自动生成网页和 /content.txt 纯文本入口。
