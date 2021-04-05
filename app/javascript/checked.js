function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load", true) != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      // メモをクリックした時の処理
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      // ↑はリクエスト送信までの処理
      // ↓はレスポンス受信からの処理
      XHR.onload = () => {
        // エラー時の処理
        if (XHR.status != 200) { // 200は成功ステータス
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        // レスポンスのcheckedが既読⇆未読を判定して処理を実行する
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);