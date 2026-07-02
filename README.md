# 英文ノート

好きな英文をブラウザ内に保存し、和訳・単語・文法メモと一緒に復習できる静的Webアプリです。

## 特徴

- すべて静的ファイルだけで動作します。
- APIやAPIキーは使用しません。
- データはブラウザの `localStorage` に保存されます。
- バックアップと復元はJSONファイルで行えます。
- `manifest.webmanifest` と `service-worker.js` により、GitHub Pagesのサブディレクトリ配信でもPWAとして利用できます。
- アプリアイコンはバイナリ画像ではなく、テキスト形式の `icon.svg` です。

## GitHub Pagesでの利用

このリポジトリをGitHub Pagesで公開すると、`index.html` からそのまま利用できます。PWA関連ファイルは相対パスで参照しているため、ユーザーサイト直下だけでなく、プロジェクトページのサブディレクトリでも動作します。

## ローカルで確認する

Service WorkerはHTTP(S)または `localhost` で動作します。ローカル確認では、任意の簡易サーバーを起動してください。

```bash
python3 -m http.server 8000
```

その後、ブラウザで `http://localhost:8000/` を開きます。

## ファイル構成

- `index.html` - アプリ本体
- `manifest.webmanifest` - PWAマニフェスト
- `service-worker.js` - オフライン利用のためのService Worker
- `icon.svg` - PWAアイコン
